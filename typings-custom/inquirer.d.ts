
declare namespace InquirerES6Promise {
    export interface IThenable <R> {
        then <U> (onFulfilled?: (value: R) => U | IThenable<U>, onRejected?: (error: any) => U | IThenable<U>): IThenable<U>;
        then <U> (onFulfilled?: (value: R) => U | IThenable<U>, onRejected?: (error: any) => void): IThenable<U>;
    }

    export class Promise <R> implements IThenable <R> {

        /**
         * Make a new promise from the thenable.
         * A thenable is promise-like in as far as it has a "then" method.
         */
        public static resolve(): Promise<void>;

        public static resolve <R>(value: R | IThenable<R>): Promise<R>;

        /**
         * Make a promise that rejects to obj. For consistency and debugging (eg stack traces), obj should be an instanceof Error
         */
        public static reject <R>(error: any): Promise<R>;

        /**
         * Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects.
         * the array passed to all can be a mixture of promise-like objects and other objects.
         * The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
         */
        public static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
            values: [
                T1 | IThenable<T1>,
                T2 | IThenable<T2>,
                T3 | IThenable<T3>,
                T4 | IThenable<T4>,
                T5 | IThenable<T5>,
                T6 | IThenable<T6>,
                T7 | IThenable<T7>,
                T8 | IThenable<T8>,
                T9 | IThenable<T9>,
                T10 | IThenable<T10>]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

        public static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
            values: [
                T1 | IThenable<T1>,
                T2 | IThenable<T2>,
                T3 | IThenable<T3>,
                T4 | IThenable<T4>,
                T5 | IThenable<T5>,
                T6 | IThenable<T6>,
                T7 | IThenable<T7>,
                T8 | IThenable<T8>,
                T9 | IThenable<T9>]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

        public static all<T1, T2, T3, T4, T5, T6, T7, T8>(
            values: [
                T1 | IThenable<T1>,
                T2 | IThenable<T2>,
                T3 | IThenable<T3>,
                T4 | IThenable<T4>,
                T5 | IThenable<T5>,
                T6 | IThenable<T6>,
                T7 | IThenable<T7>,
                T8 | IThenable<T8>]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;

        public static all<T1, T2, T3, T4, T5, T6, T7>(
            values: [
                T1 | IThenable<T1>,
                T2 | IThenable<T2>,
                T3 | IThenable<T3>,
                T4 | IThenable<T4>,
                T5 | IThenable<T5>,
                T6 | IThenable<T6>,
                T7 | IThenable<T7>]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7]>;

        public static all<T1, T2, T3, T4, T5, T6>(
            values: [
                T1 | IThenable<T1>,
                T2 | IThenable<T2>,
                T3 | IThenable<T3>,
                T4 | IThenable<T4>,
                T5 | IThenable<T5>,
                T6 | IThenable<T6>]
        ): Promise<[T1, T2, T3, T4, T5, T6]>;

        public static all<T1, T2, T3, T4, T5>(
            values: [
                T1 | IThenable<T1>,
                T2 | IThenable<T2>,
                T3 | IThenable<T3>,
                T4 | IThenable<T4>,
                T5 | IThenable<T5>]
        ): Promise<[T1, T2, T3, T4, T5]>;

        public static all<T1, T2, T3, T4>(
            values: [
                T1 | IThenable<T1>,
                T2 | IThenable<T2>,
                T3 | IThenable<T3>,
                T4 | IThenable<T4>]
        ): Promise<[T1, T2, T3, T4]>;

        public static all<T1, T2, T3>(values: [T1 | IThenable<T1>, T2 | IThenable<T2>, T3 | IThenable<T3>]): Promise<[T1, T2, T3]>;

        public static all<T1, T2>(values: [T1 | IThenable<T1>, T2 | IThenable<T2>]): Promise<[T1, T2]>;

        public static all<T1>(values: [T1 | IThenable<T1>]): Promise<[T1]>;

        public static all<TAll>(values: Array<TAll | IThenable<TAll>>): Promise<TAll[]>;

        /**
         * Make a Promise that fulfills when any item fulfills, and rejects if any item rejects.
         */
        public static race <R>(promises: (R | IThenable<R>)[]): Promise<R>;

        /**
         * If you call resolve in the body of the callback passed to the constructor,
         * your promise is fulfilled with result object passed to resolve.
         * If you call reject your promise is rejected with the object passed to resolve.
         * For consistency and debugging (eg stack traces), obj should be an instanceof Error.
         * Any errors thrown in the constructor callback will be implicitly passed to reject().
         */
        constructor(callback: (resolve: (value?: R | IThenable<R>) => void, reject: (error?: any) => void) => void);

        /**
         * A onFulfilled is called when/if "promise" resolves. onRejected is
         * called when/if "promise" rejects. Both are optional, if either/both
         * are omitted the next onFulfilled/onRejected in the chain is called.
         * Both callbacks have a single parameter , the fulfillment value or
         * rejection reason. "then" returns a new promise equivalent to the
         * value you return from onFulfilled/onRejected after being passed
         * through Promise.resolve. If an error is thrown in the callback, the
         * returned promise rejects with that error.
         *
         * @param onFulfilled called when/if "promise" resolves
         * @param onRejected called when/if "promise" rejects
         */
        public then <U>(onFulfilled?: (value: R) => U | IThenable<U>, onRejected?: (error: any) => U | IThenable<U>): Promise<U>;
        public then <U>(onFulfilled?: (value: R) => U | IThenable<U>, onRejected?: (error: any) => void): Promise<U>;

        /**
         * Sugar for promise.then(undefined, onRejected)
         *
         * @param onRejected called when/if "promise" rejects
         */
        public catch <U>(onRejected?: (error: any) => U | IThenable<U>): Promise<U>;

    }

    /**
     * The polyfill method will patch the global environment (in this case to the Promise name) when called.
     */
    export function polyfill(): void;
}

declare namespace Inquirer {

    export function restoreDefaultPrompts(): void;

    /**
     * Expose helper functions on the top level for easiest usage by common users
     * @param name
     * @param prompt
     */
    export function registerPrompt(name: string, prompt: IPromptModule): void;

    /**
     * Create a new self-contained prompt module.
     */
    export function createPromptModule(): IPromptModule;

    /**
     * Public CLI helper interface
     */
    export function prompt(questions: Questions): InquirerES6Promise.Promise<IAnswers>;

    export var prompts: Prompts;
    export var Separator: objects.ISeparatorStatic;

    export var ui: {
        BottomBar: UI.BottomBar;
        Prompt: UI.Prompt;
    };

    export type Prompts = { [name: string]: IPromptModule };
    export type ChoiceType = string | objects.IChoiceOption | objects.ISeparator;
    export type Questions = IQuestion | IQuestion[];

    export interface IPromptModule {
        (questions: Questions, cb: (answers: IAnswers) => any): UI.Prompt;
        /**
         * Register a prompt type
         * @param name Prompt type name
         * @param prompt Prompt constructor
         */
        registerPrompt (name: string, prompt: IPromptModule): UI.Prompt;
        /**
         * Register the defaults provider prompts
         */
        restoreDefaultPrompts(): void;
    }

    export interface IQuestion {

        /**
         * Type of the prompt. Possible values:
         *
         * - input
         * - confirm
         * - list
         * - rawlist
         * - password
         *
         * @defaults: 'input'
         */
        type?: string;

        /**
         * The name to use when storing the answer in the anwers hash.
         */
        name?: string;

        /**
         * The question to print. If defined as a function,
         * the first parameter will be the current inquirer session answers.
         */
        message?: string | ((answers: IAnswers) => string);

        /**
         * Default value(s) to use if nothing is entered, or a function that returns the default value(s).
         * If defined as a function, the first parameter will be the current inquirer session answers.
         */
        'default'?: any | ((answers: IAnswers) => any);

        /**
         * Choices array or a function returning a choices array. If defined as a function,
         * the first parameter will be the current inquirer session answers.
         * Array values can be simple strings, or objects containing a name (to display) and a value properties
         * (to save in the answers hash). Values can also be a Separator.
         */
        choices?: ChoiceType[] | ((answers: IAnswers) => ChoiceType[]);

        /**
         * Receive the user input and should return true if the value is valid, and an error message (String)
         * otherwise. If false is returned, a default error message is provided.
         */
        validate? (input: string): boolean | string;

        /**
         * Receive the user input and return the filtered value to be used inside the program.
         * The value returned will be added to the Answers hash.
         */
        filter? (input: string): string;

        /**
         * Receive the current user answers hash and should return true or false depending on whether or
         * not this question should be asked. The value can also be a simple boolean.
         */
        when?: boolean | ((answers: IAnswers) => boolean);

        paginated?: boolean;
    }

    /**
     * A key/value hash containing the client answers in each prompt.
     */
    export interface IAnswers {
        [key: string]: string|boolean;
    }

    export namespace UI {

        /**
         * Base interface class other can inherits from
         */
        export class Prompt extends BaseUI <Prompts> {

            constructor(promptModule: Prompts);

            /**
             * Once all prompt are over
             */
            public onCompletion(): void;

            public processQuestion(question: IQuestion): any;

            public fetchAnswer(question: IQuestion): any;

            public setDefaultType(question: IQuestion): any;

            public filterIfRunnable(question: IQuestion): any;

        }

        /**
         * Sticky bottom bar user interface
         */
        export class BottomBar extends BaseUI <IBottomBarOption> {

            constructor(opt?: IBottomBarOption);

            /**
             * Render the prompt to screen
             */
            public render(): this;

            /**
             * Update the bottom bar content and rerender
             * @param bottomBar Bottom bar content
             */
            public updateBottomBar(bottomBar: string): this;

            /**
             * Rerender the prompt
             */
            public writeLog(data: any): this;

            /**
             * Make sure line end on a line feed
             * @param str Input string
             * @return The input string with a final line feed
             */
            public enforceLF(str: string): string;

            /**
             * Helper for writing message in Prompt
             * @param message The message to be output
             */
            public write(message: string): void;

        }

        export interface IBottomBarOption {
            bottomBar?: string;
        }

        /**
         * Base interface class other can inherits from
         */
        export class BaseUI<TOpt> {
            constructor(opt: TOpt);

            /**
             * Handle the ^C exit
             * @return {null}
             */
            public onForceClose(): void;

            /**
             * Close the interface and cleanup listeners
             */
            public close(): void;

            /**
             * Handle and propagate keypress events
             */
            public onKeypress(s: string, key: IKey): void;

        }

        export interface IKey {

            sequence: string;

            name: string;

            meta: boolean;

            shift: boolean;

            ctrl: boolean;

        }
    }

    export namespace objects {

        /**
         * Choice object
         * Normalize input as choice object
         * @constructor
         * @param {String|Object} val  Choice value. If an object is passed, it should contains
         *                             at least one of `value` or `name` property
         */
        export interface IChoice {
            new (str: string): IChoice;
            new (separator: ISeparator): IChoice;
            new (option: IChoiceOption): IChoice;
        }

        export interface IChoiceOption {

            name?: string;

            value?: string;

            type?: string;

            extra?: any;

            checked?: boolean;

            disabled?: string | ((answers: IAnswers) => any);

        }

        export interface ISeparatorStatic {

            new (): ISeparator;

            /**
             * Helper function returning false if object is a separator
             * @param obj object to test against
             * @return `false` if object is a separator
             */
            exclude (obj: any): boolean;
        }

        /**
         * Separator object
         * Used to space/separate choices group
         * @constructor
         * @param {String} line   Separation line content (facultative)
         */
        export interface ISeparator {

            type: string;

            line: string;

            /**
             * Stringify separator
             * @return {String} the separator display string
             */
            toString(): string;

        }
    }
}

declare module 'inquirer' {

    export = Inquirer;

}
