
declare namespace GeneratorDrupal {

    export namespace Typed {

        export interface IConfig {

            moduleName: string;

            runInstall: boolean;

        }

        export interface IAnswer {

            moduleName: string;

            runInstall: boolean;

        }

    }

}

declare module 'generator-drupal' {

    export = GeneratorDrupal;

}
