
import * as YeomanGenerator from 'yeoman-generator';
import * as _ from 'lodash';
import IConfig = GeneratorDrupal.Typed.IConfig;
import IAnswer = GeneratorDrupal.Typed.IAnswer;

module.exports = YeomanGenerator.Base.extend({

    constructor: function (): void {
        YeomanGenerator.Base.apply(this, arguments);

        this.option('use-npm-cache', {
            type: 'Boolean',
            desc: 'Adds "--cache-min 999999" option to `npm install`.',
            alias: null,
            'default': true,
            hide: false
        });
    },

    _config: <IConfig>{
        moduleName: 'my_module_1'
    },

    _upperFirst: function (str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    _appName2ModuleName: function (appName: string): string {
        return appName
            .replace(/^typed drupal /, '')
            .replace(' ', '_');
    },

    _destinationFileName: function (tplFileName: string): string {
        return tplFileName
            .replace(/\.ejs$/, '')
            .replace('moduleName', this._config.moduleName);
    },

    initializing: function () : void {
        // @todo Do something.
    },

    prompting: function (): void {
        return this
            .prompt([
                {
                    type: 'input',
                    name: 'moduleName',
                    message: 'Machine-name of the Drupal module',
                    'default': this._appName2ModuleName(this.appname)
                },
                {
                    type: 'confirm',
                    name: 'runInstall',
                    message: 'Install NPM packages2',
                    'default': false,
                    store: true
                }
            ])
            .then(function (answers: IAnswer) : void {
                this._config.moduleName = answers.moduleName;
                this._config.runInstall = answers.runInstall;
            }.bind(this));
    },

    writing: {
        'copyFiles': function (): void {
            var tplVars: {[key: string]: string} = {
                moduleName: this._config.moduleName,
                moduleNameDash: this._config.moduleName.replace('_', '-'),
                moduleNameLowerCamel: _.camelCase(this._config.moduleName),
                moduleNameUpperCamel: this._upperFirst(_.camelCase(this._config.moduleName))
            };

            var files: string[] = [
                'source/moduleName.d.ts',
                'source/moduleName.t.ts',
                'source/tsconfig.json',
                '.editorconfig',
                '.gitignore',
                '.npmignore',
                'package.json',
                'README.md',
                'tslint.json',
                'typings.json'
            ];

            for (var i: number = 0; i < files.length; i++) {
                this.fs.copyTpl(
                    this.templatePath(files[i] + '.ejs'),
                    this.destinationPath(this._destinationFileName(files[i])),
                    tplVars
                );
            }
        }
    },

    install: function () : void {
        if (this._config.runInstall === true) {
            this.runInstall(
                'npm',
                [],
                {'cache-min': this.options['use-npm-cache'] ? '999999' : '0'},
                function (npmExitCode: number): void {
                    if (npmExitCode !== 0) {
                        this.log('Something has gone wrong with the `npm install`!\n');

                        return;
                    }

                    this.runInstall(
                        'node_modules/.bin/typings',
                        [],
                        {},
                        function (typingsExitCode: number): void {
                            if (typingsExitCode !== 0) {
                                this.log('Something has gone wrong with the `typings install`!\n');

                                return;
                            }

                            this.log('Everything is ready!\n');
                        }.bind(this)
                    );

                }.bind(this)
            );
        }
    },

    end: function () : void {
        this.log('Good bye');
    }

});
