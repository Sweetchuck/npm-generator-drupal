
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

        export interface IAnswers extends Inquirer.IAnswers {

            moduleNameSnake?: string;

            runInstall?: boolean;

        }

        export interface IConfig extends IAnswers {

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

        export interface IConfig extends IConfigBase {

            vendorSnake?: string;

            vendorLowerCamel?: string;

            vendorUpperCamel?: string;

            vendorUpper?: string;

            nameSnake?: string;

            nameLowerCamel?: string;

            nameUpperCamel?: string;

            nameUpper?: string;

            composerRequire?: {[name: string]: IComposerRequireItem};

            composerRequireDev?: {[name: string]: IComposerRequireItem};

            enabledComposerRequire?: IComposerRequireItem[];

            enabledComposerRequireDev?: IComposerRequireItem[];

        }

        export interface IAnswers extends Inquirer.IAnswers, IConfigBase {}

        export interface IConfigBase {

            vendorDash?: string;

            nameDash?: string;

            taskRunner?: '' | 'robo';

            sitesSubDir: string;

            drupalRoot: string;

            publicHtml: string;

            runComposerInstall?: boolean;

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
