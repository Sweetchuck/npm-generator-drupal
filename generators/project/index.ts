
import * as _ from 'lodash';
import * as YG from 'yeoman-generator';

module.exports = YG.Base.extend({

    constructor: function (): void {
        YG.Base.apply(this, arguments);

        this.config = {
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
            }
        };

        this.templateVars = {};

        this.fileNameVars = {};

        this.upperFirst = function (str: string): string {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

        this.stringReplace = function (
            str: string,
            args: {[from: string]: string},
            keys?: string[]
        ): string {
            if (str.length === 0) {
                return str;
            }

            // If the array of keys is not passed then collect the keys from the args.
            if (!Array.isArray(keys)) {
                keys = [];
                for (var k in args) {
                    if (args.hasOwnProperty(k)) {
                        keys.push(k);
                    }
                }

                // Order the keys by the character length. The shortest one is the first.
                keys.sort(function (a: string, b: string): number {
                    return a.length - b.length;
                });
            }

            if (keys.length === 0) {
                return str;
            }

            // Take next longest one from the end.
            var key: string = keys.pop();
            var fragments: string[] = str.split(key);

            if (keys.length) {
                for (let i: number = 0; i < fragments.length; i++) {
                    // Process each fragment with a copy of remaining keys.
                    fragments[i] = this.stringReplace(fragments[i], args, keys.slice(0));
                }
            }

            return fragments.join(args[key]);
        };

        this.destinationFileName = function (fileName: string): string {
            return this
                .stringReplace(fileName, this.fileNameVars)
                .replace(/\.ejs$/, '');
        };

        this.initTemplateVars = function (): void {
            this.templateVars = {
                vendorDash: this.config.vendorDash,
                vendorSnake: this.config.vendorDash.replace('-', '_'),
                vendorLowerCamel: _.camelCase(this.config.vendorDash),
                vendorUpperCamel: this.upperFirst(_.camelCase(this.config.vendorDash)),
                nameDash: this.config.nameDash,
                nameSnake: this.config.nameDash.replace('-', '_'),
                nameLowerCamel: _.camelCase(this.config.nameDash),
                nameUpperCamel: this.upperFirst(_.camelCase(this.config.nameDash)),
                sitesSubDir: 'default',
                taskRunner: this.config.taskRunner,
                composerRequire: [],
                composerRequireDev: []
            };

            if (this.config.taskRunner === 'robo') {
                this.config.composerRequireDev['consolidation/robo'].enabled = true;
                this.config.composerRequireDev['cheppers/robo-phpcs'].enabled = true;
            }

            for (let key of Object.keys(this.config.composerRequire)) {
                this.config.composerRequire[key].name = key;
                this.templateVars.composerRequire.push(this.config.composerRequire[key]);
            }

            for (let key of Object.keys(this.config.composerRequireDev)) {
                this.config.composerRequireDev[key].name = key;
                this.templateVars.composerRequireDev.push(this.config.composerRequireDev[key]);
            }
        };

        this.initFileNameVars = function (): void {
            for (let key of Object.keys(this.templateVars)) {
                if (this.templateVars.hasOwnProperty(key)
                    && (typeof this.templateVars[key] === 'string'
                        || typeof this.templateVars[key] === 'number'
                    )
                ) {
                    this.fileNameVars[key] = this.templateVars[key];
                }
            }
        };

        this.copyTpl = function (srcFileName: string, dstFileName?: string): void {
            if (!dstFileName) {
                dstFileName = srcFileName;
            }

            this.fs.copyTpl(
                this.templatePath(srcFileName + '.ejs'),
                this.destinationPath(this.destinationFileName(dstFileName)),
                this.templateVars
            );
        };
    },

    initializing: function (): void {
        this.log(require('yeoman-welcome'));
    },

    prompting: function (): void {
        return this
            .prompt([
                {
                    name: 'vendorDash',
                    type: 'input',
                    message: 'Vendor',
                    store: true,
                    'default': function (): string {
                        let path: string[] = this.destinationPath().split('/');
                        path.pop();

                        return path.pop();
                    }.bind(this)
                },
                {
                    name: 'nameDash',
                    type: 'input',
                    message: 'Name',
                    'default': function (): string {
                        return this.destinationPath().split('/').pop();
                    }.bind(this)
                },
                {
                    name: 'taskRunner',
                    type: 'list',
                    store: true,
                    message: 'Task runner',
                    choices: [
                        {
                            name: '- None -',
                            value: ''
                        },
                        {
                            name: 'Robo',
                            value: 'robo'
                        }
                    ],
                    'default': ''
                },
                {
                    name: 'runComposerInstall',
                    type: 'confirm',
                    message: 'Install Composer packages',
                    store: true,
                    'default': false
                }
            ])
            .then(function (answers: any) : void {
                for (let name of Object.keys(answers)) {
                    this.config[name] = answers[name];
                }
            }.bind(this));
    },

    configuring: function (): void {
        this.initTemplateVars();
        this.initFileNameVars();
    },

    writing: {
        'copyFiles': function (): void {
            let files: string[] = [
                'src/Composer/Scripts.php',
                'composer.json',
                '.editorconfig'
            ];
            for (let file of files) {
                this.copyTpl(file);
            }

            if (this.config.taskRunner) {
                this.copyTpl('.git-hooks.' + this.config.taskRunner, '.git-hooks');
            }

            if (this.config.taskRunner === 'robo') {
                this.copyTpl('RoboFile.php');
            }
        }
    },

    end: function (): void {
        //
    }

});
