"use strict";
var YeomanGenerator = require('yeoman-generator');
var _ = require('lodash');
module.exports = YeomanGenerator.Base.extend({
    _config: {
        moduleName: 'my_module_1'
    },
    _appName2ModuleName: function (appName) {
        return appName
            .replace(/^typings /, '')
            .replace(' ', '_');
    },
    _destinationFileName: function (tplFileName) {
        return tplFileName
            .replace(/\.ejs$/, '')
            .replace('moduleName', this._config.moduleName);
    },
    initializing: function () {
        // @todo Do something.
    },
    prompting: function () {
        return this
            .prompt([
            {
                type: 'input',
                name: 'moduleName',
                message: 'Machine-name of the Drupal module',
                'default': this._appName2ModuleName(this.appname)
            }
        ])
            .then(function (answers) {
            this._config.moduleName = answers.moduleName;
        }.bind(this));
    },
    writing: {
        'base': function () {
            var tplVars = {
                moduleName: this._config.moduleName,
                moduleNameDash: this._config.moduleName.replace('_', '-'),
                moduleNameLowerCamel: _.camelCase(this._config.moduleName)
            };
            var files = [
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
            for (var i = 0; i < files.length; i++) {
                this.fs.copyTpl(this.templatePath(files[i] + '.ejs'), this.destinationPath(this._destinationFileName(files[i])), tplVars);
            }
        }
    },
    install: function () {
        this.installDependencies({
            bower: false,
            npm: true,
            callback: function () {
                console.log('Everything is ready!');
            }
        });
    },
    end: function () {
        // @todo Do something.
    }
});
