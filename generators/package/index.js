
var generators = require('yeoman-generator');

var DrupalTypingsGenerator = generators.Base.extend({

  config: {
    moduleName: 'my_module_1'
  },

  appName2ModuleName: function (appName) {
    return appName
      .replace(/^typings /, '')
      .replace(' ', '_');
  },

  destinationFileName: function (tplFileName) {
    return tplFileName
      .replace(/(^_)|(\/_)/, '.')
      .replace('moduleName', this.config.moduleName);
  }

});

module.exports = DrupalTypingsGenerator.extend({

  initializing: function () {},

  prompting: function () {
    return this
      .prompt([
        {
          type: 'input',
          name: 'moduleName',
          message: 'Machine-name of the Drupal module',
          default: this.appName2ModuleName(this.appname)
        }
      ])
      .then(function (answers) {
        this.config.moduleName = answers.moduleName;
      }.bind(this));
  },

  configuring: function () {},

  writing: function () {
    var tplVars = {
      moduleName: this.config.moduleName,
      moduleNameDash: this.config.moduleName.replace('_', '-')
    };

    var files = [
      'source/moduleName.d.ts',
      'source/moduleName.t.ts',
      'source/tsconfig.json',
      '_editorconfig',
      '_gitignore',
      'package.json',
      'README.md',
      'tslint.json',
      'typings.json'
    ];

    var i;
    for (i = 0; i < files.length; i++) {
      this.fs.copyTpl(
        this.templatePath(files[i]),
        this.destinationPath(this.destinationFileName(files[i])),
        tplVars
      );
    }
  },

  conflicts: function () {},

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      callback: function () {
        console.log('Everything is ready!');
      }
    });
  },

  end: function () {}

});
