
declare namespace yo {

    export type InitializingCallback = () => void;

    export type PromptingCallback = () => PromiseLike<any>;

    export type ConfiguringCallback = () => void;

    export type WritingCallback = () => void;

    export type ConflictsCallback = () => void;

    export type InstallCallback = () => void;

    export type EndCallback = () => void;

    export interface IPriorities {

        initializing?: InitializingCallback | {[key: string]: InitializingCallback};

        prompting?: PromptingCallback | {[key: string]: PromptingCallback};

        configuring?: ConfiguringCallback | {[key: string]: ConfiguringCallback};

        writing?: WritingCallback | {[key: string]: WritingCallback};

        conflicts?: ConflictsCallback | {[key: string]: ConflictsCallback};

        install?: InstallCallback | {[key: string]: InstallCallback};

        end?: EndCallback | {[key: string]: EndCallback};

    }

    export interface IYeomanGenerator extends IPriorities {

        appname: string;

        options: { [key: string]: any };

        fs: IMemFsEditor;

        extend(priorities: IPriorities): this;

        argument(name: string, config: IArgumentConfig): void;

        composeWith(namespace: string, options: any, settings?: IComposeSetting): IYeomanGenerator;

        defaultFor(name: string): void;

        destinationRoot(rootPath?: string): string;

        destinationPath(...path: string[]): string;

        determineAppname(): void;

        getCollisionFilter(): (output: any) => void;

        hookFor(name: string, config: IHookConfig): void;

        option(name: string, config: IYeomanGeneratorOption): void;

        rootGeneratorName(): string;

        run(args?: any): void;

        run(args: any, callback?: Function): void;

        runHooks(callback?: Function): void;

        sourceRoot(rootPath?: string): string;

        templatePath(...path: string[]): string;

        prompt(opt: Inquirer.Questions, callback: (answers: any) => void): void;

        prompt<T>(opt: Inquirer.Questions): PromiseLike<T>;

        npmInstall(packages?: string[] | string, options?: any, cb?: Function): void;

        /**
         * Combine package manager cmd line arguments and run the install command.
         *
         * During the install step, every command will be scheduled to run once,
         * on the run loop. (So don't combine the callback with this.async())
         *
         * @param installer
         *   Which package manager to use.
         * @param paths
         *   Packages to install.Use an empty string for npm install.
         * @param options
         *   Options to pass to dargs as arguments, then to child_process.spawn.
         * @param cb
         */
        runInstall(
            installer: string,
            paths?: string | string[],
            options?: any,
            cb?: (exitCode: number) => void
        ): void;

        installDependencies(options?: IInstallDependencyOptions): void;

        spawnCommand(name: string, args?: string[], options?: Object): void;

        /**
         * Normalize a command across OS and spawn it (synchronously).
         */
        spawnCommandSync(name: string, args?: string[], options?: Object): void;

        log(message: string) : void;

    }

    export class YeomanGeneratorBase implements IYeomanGenerator, NodeJS.EventEmitter {

        public apply(child: IYeomanGenerator, args: IArguments): void;

        public extend(priorities: IPriorities | IYeomanGenerator): this;

        public argument(name: string, config: IArgumentConfig): void;

        public composeWith(namespace: string, options: any, settings?: IComposeSetting): IYeomanGenerator;

        public defaultFor(name: string): void;

        public destinationRoot(rootPath?: string): string;

        public destinationPath(...path: string[]): string;

        public determineAppname(): void;

        public getCollisionFilter(): (output: any) => void;

        public hookFor(name: string, config: IHookConfig): void;

        public option(name: string, config?: IYeomanGeneratorOption): void;

        public rootGeneratorName(): string;

        public run(args?: any): void;

        public run(args: any, callback?: Function): void;

        public runHooks(callback?: Function): void;

        public sourceRoot(rootPath?: string): string;

        public templatePath(...path: string[]): string;

        public addListener(event: string, listener: Function): this;

        public on(event: string, listener: Function): this;

        public once(event: string, listener: Function): this;

        public removeListener(event: string, listener: Function): this;

        public removeAllListeners(event?: string): this;

        public setMaxListeners(n: number): this;

        public getMaxListeners(): number;

        public listeners(event: string): Function[];

        public emit(event: string, ...args: any[]): boolean;

        public listenerCount(type: string): number;

        public async(): any;

        public prompt(opt: Inquirer.Questions, callback: (answers: any) => void): void;

        public prompt<T>(opt: Inquirer.Questions): PromiseLike<T>;

        public log(message: string) : void;

        public npmInstall(packages: string[], options?: any, cb?: Function): void;

        public runInstall(
            installer: string,
            paths?: string | string[],
            options?: any,
            cb?: (exitCode: number) => void
        ): void;

        public installDependencies(options?: IInstallDependencyOptions): void;

        public spawnCommand(name: string, args?: string[], options?: Object): void;

        public spawnCommandSync(name: string, args?: string[], options?: Object): void;

        public appname: string;

        public gruntfile: IGruntFileStatic;

        public options: { [key: string]: any };

        public fs: IMemFsEditor;
    }

    export interface IMemFsEditor {

        read(filepath: string, options?: Object): string;

        readJSON(filepath: string, defaults?: Object): Object;

        write(filepath: string, contents: string): void;

        writeJSON(filepath: string, contents: Object, replacer?: Function, space?: number): void;

        'delete'(filepath: string, options?: Object): void;

        copy(from: string, to: string, options?: Object): void;

        copyTpl(from: string, to: string, context: Object, options?: Object): void;

        move(from: string, to: string, options?: Object): void;

        exists(filepath: string): boolean;

        commit(callback: Function): void;

        commit(filters: any[], callback: Function): void;

    }

    export interface IInstallDependencyOptions {

        npm?: boolean;

        bower?: boolean;

        skipMessage?: boolean;

        callback?: Function;

    }

    export interface IGruntFileStatic {

        loadNpmTasks(pluginName: string): void;

        insertConfig(name: string, config: any): void;

        registerTask(name: string, tasks: any): void;

        insertVariable(name: string, value: any): void;

        prependJavaScript(code: string): void;

    }

    export interface IArgumentConfig {

        desc: string;

        required?: boolean;

        optional?: boolean;

        type: String | Boolean | Number;

        defaults?: any;

    }

    export interface IComposeSetting {

        local?: string;

        link?: string;

    }

    export interface IHookConfig {

        as: string;

        args: any;

        options: any;

    }

    export interface IYeomanGeneratorOption {

        alias?: string;

        defaults?: any;

        desc?: string;

        hide?: boolean;

        type?: any;

    }

    export interface ITestHelper {

        createDummyGenerator(): IYeomanGenerator;

        createGenerator(name: string, dependencies: any[], args: any, options: any): IYeomanGenerator;

        decorate(context: any, method: string, replacement: Function, options: any): void;

        gruntfile(options: any, done: Function): void;

        mockPrompt(generator: IYeomanGenerator, answers: any): void;

        registerDependencies(dependencies: string[]): void;

        restore(): void;

        run(generator: string | Function): IRunContext;
    }

    export interface IRunContext {

        async(): Function;

        inDir(dirPath: string): IRunContext;

        /** @param {String|String[]} args */
        withArguments(args: any): IRunContext;

        withGenerators(dependencies: string[]): IRunContext;

        withOptions(options: any): IRunContext;

        withPrompts(answers: any): IRunContext;

    }

    export var Base: YeomanGeneratorBase;

}

declare module 'yeoman-generator' {
    export = yo;
}
