
declare namespace GeneratorDrupal {

    export namespace Base {

        export interface IGenerator extends yo.IYeomanGenerator {

            preProcessConfig?(): void;

        }

    }

    export namespace Typed {

        export interface IGenerator extends Base.IGenerator {

            config: IConfig;

            appName2ModuleName(appName: string): string;

            destinationFileName(tplFileName: string): string;

        }

        export interface IAnswer extends Inquirer.IAnswers {

            moduleNameSnake?: string;

            runInstall?: boolean;

        }

        export interface IConfig extends IAnswer {

            moduleNameSnake?: string;

            moduleNameLowerCamel?: string;

            moduleNameUpperCamel?: string;

            moduleNameDash?: string;

        }

    }

    export namespace Project {

        export interface IGenerator extends Base.IGenerator {

            config: IConfig;

            fileNameVars?: {[from: string]: string};

            destinationFileName(fileName: string): string;

            copyTpl(srcFileName: string, dstFileName?: string): void;

        }

        export interface IConfig {

            vendorDash?: string;

            vendorSnake?: string;

            vendorLowerCamel?: string;

            vendorUpperCamel?: string;

            nameDash?: string;

            nameSnake?: string;

            nameLowerCamel?: string;

            nameUpperCamel?: string;

            taskRunner?: '' | 'robo';

            composerRequire?: {[name: string]: IComposerRequireItem};

            composerRequireDev?: {[name: string]: IComposerRequireItem};

            enabledComposerRequire?: IComposerRequireItem[];

            enabledComposerRequireDev?: IComposerRequireItem[];

            sitesSubDir: string;

            drupalRoot: string;

            publicHtml: string;

        }

        export interface IComposerRequireItem {

            enabled: boolean;

            name?: string;

            version: string;

        }

    }

}

declare module 'generator-drupal' {

    export = GeneratorDrupal;

}
