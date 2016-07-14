
import * as YeomanGenerator from 'yeoman-generator';
import * as _ from 'lodash';
import IConfig = GeneratorDrupal.TypingsPackage.IConfig;
import IAnswer = GeneratorDrupal.TypingsPackage.IAnswer;

module.exports = YeomanGenerator.Base.extend({

    _config: <IConfig>{
        moduleName: 'my_module_1'
    },

    _appName2ModuleName: function (appName: string): string {
        return appName
            .replace(/^typings /, '')
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
                }
            ])
            .then(function (answers: IAnswer) : void {
                this._config.moduleName = answers.moduleName;
            }.bind(this));
    },

    writing: {
        'base': function (): void {
            var tplVars: {[key: string]: string} = {
                moduleName: this._config.moduleName,
                moduleNameDash: this._config.moduleName.replace('_', '-'),
                moduleNameLowerCamel: _.camelCase(this._config.moduleName),
                moduleNameUpperCamel: _.capitalize(_.camelCase(this._config.moduleName))
            };

            var files: string[] = [
                'source/moduleName.d.ts',
                'source/moduleName.t.ts',
                'source/tsconfig.json',
                '.editorconfig',
                '.gitignore',
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
        this.installDependencies({
            bower: false,
            npm: true,
            callback: function () : void {
                console.log('Everything is ready!');
            }
        });
    },

    end: function () : void {
        // @todo Do something.
    }

});
