
declare namespace YeomanAssert {

    export interface IStatic {

        file(files: string[]) : this;

        noFile(files: string[]) : this;

        fileContent(fileName: string, fileContent: string) : this;

        noFileContent(fileName: string, fileContent: string) : this;

    }

}

declare module 'yeoman-assert' {

    var yoAssert: YeomanAssert.IStatic;

    export = yoAssert;

}
