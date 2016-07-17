
declare namespace YeomanTest {

    export interface IStatic {

        run(path: string) : ICase;

    }

    export interface ICase {

        inDir(dirPath: string, cb: () => void) : this;

        withOptions(options: {[key: string]: any}) : this;

        withArguments(args: string[]) : this;

        withPrompts(answers: {[key: string]: string | number | boolean}) : this;

        toPromise() : PromiseLike<any>;

    }

}

declare module 'yeoman-test' {

    var yoTest: YeomanTest.IStatic;

    export = yoTest;

}
