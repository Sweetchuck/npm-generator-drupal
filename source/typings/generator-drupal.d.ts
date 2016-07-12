
declare namespace GeneratorDrupal {

    export namespace TypingsPackage {

        export interface IConfig {

            moduleName: string;

        }

        export interface IAnswer {

            moduleName: string;

        }

    }

}

declare module 'generator-drupal' {

    export = GeneratorDrupal;

}
