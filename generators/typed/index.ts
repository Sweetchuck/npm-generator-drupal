
import * as YG from 'yeoman-generator';
import * as _ from 'lodash';
import Utils = require('../../lib/Utils');

module.exports = YG.Base.extend({

    constructor: function (): void {
        YG.Base.apply(this, arguments);

        let self: GeneratorDrupal.Typed.IGenerator = this;

        self.option('use-npm-cache', {
            type: 'Boolean',
            desc: 'Adds "--cache-min 999999" option to `npm install`.',
            alias: null,
            'default': true,
            hide: false
        });

        self.config = {};

        self.appName2ModuleName = function (appName: string): string {
            return appName
                .replace(/^typed drupal /, '')
                .replace(' ', '_');
        };

        /**
         * @todo DRY - There is a same function in "project" generator.
         */
        self.destinationFileName = function (tplFileName: string): string {
            return tplFileName
                .replace(/\.ejs$/, '')
                .replace('moduleNameSnake', self.config.moduleNameSnake);
        };

        self.preProcessConfig = function (): void {
            self.config.moduleNameDash = self.config.moduleNameSnake.replace('_', '-');
            self.config.moduleNameLowerCamel = _.camelCase(self.config.moduleNameSnake);
            self.config.moduleNameUpperCamel = Utils.upperFirst(self.config.moduleNameLowerCamel);
        };

    },

    initializing: {
        welcomeMessage: function () : void {
            let self: GeneratorDrupal.Typed.IGenerator = this;

            self.log('Project template for TypeScript type definition');
        }
    },

    prompting: {
        base: function (): PromiseLike<any> {
            let self: GeneratorDrupal.Typed.IGenerator = this;

            return self
                .prompt([
                    {
                        type: 'input',
                        name: 'moduleNameSnake',
                        message: 'Machine-name of the Drupal module',
                        'default': self.appName2ModuleName(self.appname)
                    },
                    {
                        type: 'confirm',
                        name: 'runInstall',
                        message: 'Install NPM packages',
                        'default': false,
                        store: true
                    }
                ])
                .then(function (answers: GeneratorDrupal.Typed.IAnswers) : void {
                    self.config.moduleNameSnake = answers.moduleNameSnake;
                    self.config.runInstall = answers.runInstall;
                }.bind(this));
        }
    },

    configuring: {
        templateVariables: function (): void {
            let self: GeneratorDrupal.Typed.IGenerator = this;

            self.preProcessConfig();
        }
    },

    writing: {
        copyFiles: function (): void {
            let self: GeneratorDrupal.Typed.IGenerator = this;

            var files: string[] = [
                'source/moduleNameSnake.d.ts',
                'source/moduleNameSnake.t.ts',
                'source/tsconfig.json',
                '.editorconfig',
                '.gitignore',
                '.npmignore',
                'package.json',
                'README.md',
                'tslint.json',
                'typings.json'
            ];

            for (let file of files) {
                self.fs.copyTpl(
                    self.templatePath(file + '.ejs'),
                    self.destinationPath(self.destinationFileName(file)),
                    self.config
                );
            }
        }
    },

    install: {
        npmAndTypings: function () : void {
            let self: GeneratorDrupal.Typed.IGenerator = this;

            if (self.config.runInstall !== true) {
                return;
            }

            self.runInstall(
                'npm',
                [],
                {'cache-min': self.options['use-npm-cache'] ? '999999' : '0'},
                function (npmExitCode: number): void {
                    if (npmExitCode !== 0) {
                        self.log('Something has gone wrong with the `npm install`!\n');

                        return;
                    }

                    self.runInstall(
                        'node_modules/.bin/typings',
                        [],
                        {},
                        function (typingsExitCode: number): void {
                            if (typingsExitCode !== 0) {
                                self.log('Something has gone wrong with the `typings install`!\n');
                            }
                        }.bind(this)
                    );

                }.bind(this)
            );
        }
    },

    end: {
        goodByeMessage: function () : void {
            let self: GeneratorDrupal.Typed.IGenerator = this;

            self.log('Good bye');
        }
    }

});
