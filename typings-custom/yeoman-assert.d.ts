
declare namespace YeomanAssert {

    export interface IStatic {

        file(files: string | string[]) : this;

        noFile(files: string | string[]) : this;

        fileContent(fileName: string, fileContent: string | RegExp) : this;

        noFileContent(fileName: string, fileContent: string | RegExp) : this;

        textEqual(value: string, expected: string): this;
    }

}

declare module 'yeoman-assert' {

    var yoAssert: YeomanAssert.IStatic;

    export = yoAssert;

}
