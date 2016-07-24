
import * as YG from 'yeoman-generator';
import * as _ from 'lodash';
import Utils = require('../../lib/Utils');

module.exports = YG.Base.extend({

    constructor: function (): void {
        YG.Base.apply(this, arguments);

        let self: GeneratorDrupal.Project.IGenerator = this;

        self.config = {
            composerRequire: {
                'drupal/core': {
                    version: '~8.1',
                    enabled: true
                },
                'drush/drush': {
                    version: '~8.0',
                    enabled: true
                }
            },
            composerRequireDev: {
                'cheppers/git-hooks': {
                    version: '0.0.8',
                    enabled: true
                },
                'cheppers/robo-phpcs': {
                    version: '0.0.1',
                    enabled: false
                },
                'consolidation/robo': {
                    version: 'dev-master#6af485e667c0e01111fd07e9e03a2f089ac67cb3',
                    enabled: false
                },
                'composer/installers': {
                    version: '^1.0.20',
                    enabled: true
                },
                'cweagans/composer-patches': {
                    version: '~1.0',
                    enabled: true
                },
                'drupal-composer/drupal-scaffold': {
                    version: '^2.0.0',
                    enabled: true
                },
                'drupal/coder': {
                    version: '^8.2',
                    enabled: true
                },
                'drupal/devel': {
                    version: '^1.0',
                    enabled: true
                },
                'drupal/drupal-extension': {
                    version: '^3.2',
                    enabled: true
                }
            },
            enabledComposerRequire: [],
            enabledComposerRequireDev: [],
            drupalRoot: 'drupal_root',
            publicHtml: 'public_html',
            sitesSubDir: 'default',
            runComposerInstall: false
        };

        self.fileNameVars = {};

        self.destinationFileName = function (fileName: string): string {
            let fromTo: {[from: string]: string} = {};

            for (var from of Object.keys(self.config)) {
                if (typeof self.config[from] === 'string') {
                    fromTo[from] = self.config[from];
                }
            }

            return Utils
                .stringReplace(fileName, fromTo)
                .replace(/\.ejs$/, '');
        };

        self.preProcessConfig = function (): void {
            self.config.vendorSnake = self.config.vendorDash.replace('-', '_');
            self.config.vendorLowerCamel = _.camelCase(self.config.vendorDash);
            self.config.vendorUpperCamel = Utils.upperFirst(_.camelCase(self.config.vendorDash));
            self.config.vendorUpper = self.config.vendorSnake.toUpperCase();
            self.config.nameSnake = self.config.nameDash.replace('-', '_');
            self.config.nameLowerCamel = _.camelCase(self.config.nameDash);
            self.config.nameUpperCamel = Utils.upperFirst(_.camelCase(self.config.nameDash));
            self.config.nameUpper = self.config.nameSnake.toUpperCase();
            self.config.sitesSubDir = 'default';

            if (self.config.taskRunner === 'robo') {
                self.config.composerRequireDev['consolidation/robo'].enabled = true;
                self.config.composerRequireDev['cheppers/robo-phpcs'].enabled = true;
            }

            for (let name of Object.keys(self.config.composerRequire)) {
                self.config.composerRequire[name].name = name;
                if (self.config.composerRequire[name].enabled) {
                    self.config.enabledComposerRequire.push(self.config.composerRequire[name]);
                }
            }

            for (let name of Object.keys(self.config.composerRequireDev)) {
                self.config.composerRequireDev[name].name = name;
                if (self.config.composerRequireDev[name].enabled) {
                    self.config.enabledComposerRequireDev.push(self.config.composerRequireDev[name]);
                }
            }
        };

        self.copyTpl = function (srcFileName: string, dstFileName?: string): void {
            if (!dstFileName) {
                dstFileName = srcFileName;
            }

            self.fs.copyTpl(
                self.templatePath(srcFileName + '.ejs'),
                self.destinationPath(self.destinationFileName(dstFileName)),
                self.config
            );
        };
    },

    initializing: {
        welcomeMessage: function (): void {
            let self: GeneratorDrupal.Project.IGenerator = this;

            self.log('Template for a Drupal 8 project');
        }
    },

    prompting: {
        base: function (): PromiseLike<any> {
            let self: GeneratorDrupal.Project.IGenerator = this;

            return self
                .prompt(<Inquirer.Questions>[
                    <Inquirer.IQuestion>{
                        name: 'vendorDash',
                        type: 'input',
                        message: 'Vendor of this Composer package. (Use dashes instead of spaces)',
                        store: true,
                        'default': function (): string {
                            let path: string[] = self.destinationPath().split('/');
                            path.pop();

                            return path.pop();
                        }.bind(this),
                        filter: Utils.promptFilterComposerPackageName
                    },
                    <Inquirer.IQuestion>{
                        name: 'nameDash',
                        type: 'input',
                        message: 'Name',
                        'default': function (): string {
                            return self.destinationPath().split('/').pop();
                        }.bind(this),
                        filter: Utils.promptFilterComposerPackageName
                    },
                    <Inquirer.IQuestion>{
                        name: 'taskRunner',
                        type: 'list',
                        store: true,
                        message: 'Task runner',
                        choices: Utils.taskRunnerChoiceOptions(),
                        'default': self.config.taskRunner
                    },
                    <Inquirer.IQuestion>{
                        name: 'runComposerInstall',
                        type: 'confirm',
                        message: 'Install Composer packages',
                        store: true,
                        'default': self.config.runComposerInstall
                    }
                ])
                .then(function (answers: GeneratorDrupal.Project.IAnswers): void {
                    for (let name of Object.keys(answers)) {
                        self.config[name] = answers[name];
                    }
                }.bind(this));
        }
    },

    configuring: {
        templateVariables: function (): void {
            let self: GeneratorDrupal.Project.IGenerator = this;

            self.preProcessConfig();
        }
    },

    writing: {
        copyFiles: function (): void {
            let self: GeneratorDrupal.Project.IGenerator = this;

            let files: string[] = [
                'drupalRoot/drush/nameSnake.drush.inc',
                'src/Composer/Scripts.php',
                '.editorconfig',
                '.gitignore',
                'composer.json',
                'README.md'
            ];
            for (let file of files) {
                self.copyTpl(file);
            }

            if (self.config.taskRunner) {
                self.copyTpl('.git-hooks.' + self.config.taskRunner, '.git-hooks');
            }

            if (self.config.taskRunner === 'robo') {
                self.copyTpl('RoboFile.php');
            }
        }
    },

    install: {
        gitInit: function (): void {
            let self: GeneratorDrupal.Project.IGenerator = this;

            if (self.fs.exists(self.destinationPath() + '/.git')) {
                return;
            }

            // @todo Configurable during prompting.
            // @todo Find the `git` executable.
            self.spawnCommandSync('git', ['init']);
        },
        composer: function (): void {
            let self: GeneratorDrupal.Project.IGenerator = this;

            if (self.config.runComposerInstall !== true) {
                return;
            }

            self.runInstall(
                'composer',
                [],
                {},
                function (composerExitCode: number): void {
                    if (composerExitCode !== 0) {
                        self.log('Something has gone wrong with the `composer install`!\n');
                    }
                }.bind(this)
            );
        }
    },

    end: {
        goodByeMessage: function (): void {
            let self: GeneratorDrupal.Project.IGenerator = this;

            self.log('Everything is ready');
        }
    }

});
