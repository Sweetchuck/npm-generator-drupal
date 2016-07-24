
import * as Inquirer from 'inquirer';

class Utils {

    public static stringReplace(
        str: string,
        args: {[from: string]: string},
        keys?: string[]
    ): string {
        if (str.length === 0) {
            return str;
        }

        // If the array of keys is not passed then collect the keys from the args.
        if (!Array.isArray(keys)) {
            keys = [];
            for (var k in args) {
                if (args.hasOwnProperty(k)) {
                    keys.push(k);
                }
            }

            // Order the keys by the character length. The shortest one is the first.
            keys.sort(function (a: string, b: string): number {
                return a.length - b.length;
            });
        }

        if (keys.length === 0) {
            return str;
        }

        // Take next longest one from the end.
        var key: string = keys.pop();
        var fragments: string[] = str.split(key);

        if (keys.length) {
            for (let i: number = 0; i < fragments.length; i++) {
                // Process each fragment with a copy of remaining keys.
                fragments[i] = this.stringReplace(fragments[i], args, keys.slice(0));
            }
        }

        return fragments.join(args[key]);
    }

    public static upperFirst(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    public static promptFilterComposerPackageName(input: string): string {
        return input
            .toLowerCase()
            .replace(/[\W_-]+/g, '-');
    }

    public static taskRunnerChoiceOptions(required: boolean = false): Inquirer.objects.IChoiceOption[] {
        return [
            {
                name: '(None)',
                value: '',
                disabled: required
            },
            {
                name: 'Robo',
                value: 'robo'
            },
            {
                name: 'Gulp',
                value: 'gulp',
                disabled: true
            },
            {
                name: 'Grunt',
                value: 'grunt',
                disabled: true
            }
        ];
    }

}

export = Utils;
