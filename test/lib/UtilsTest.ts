/**
 * @file
 * Documentation missing.
 */

import Utils = require('../../lib/Utils');
import chai = require('chai');

declare type StringReplaceCase = {

    msg: string;

    str: any;

    args: any;

    expected: string;

};

declare type PromptFilterComposerPackageNameCase = {

    msg: string;

    input: string;

    expected: string;

};

(function (assert: Chai.AssertStatic): void {

    describe('lib/Utils', function (): void {

        describe('::stringReplace()', function (): void {

            let cases: StringReplaceCase[] = [
                {
                    msg: 'Empty',
                    str: '',
                    args: {},
                    expected: ''
                },
                {
                    msg: 'Empty args',
                    str: 'foo',
                    args: {},
                    expected: 'foo'
                },
                {
                    msg: 'Empty string',
                    str: '',
                    args: {
                        foo: 'bar'
                    },
                    expected: ''
                },
                {
                    msg: 'Multi combo',
                    str: 'from1from2from1from2',
                    args: {
                        from1: 'from2',
                        from2: 'from1'
                    },
                    expected: 'from2from1from2from1'
                }
            ];

            cases.forEach(function (c: StringReplaceCase): void {
                it(c.msg, function (done: MochaDone): void {
                    assert.deepEqual(
                        Utils.stringReplace(c.str, c.args),
                        c.expected
                    );
                    done();
                });
            });

        });

        describe('::promptFilterComposerPackageName()', function (): void {

            let cases: PromptFilterComposerPackageNameCase[] = [
                {
                    msg: 'Empty',
                    input: '',
                    expected: ''
                },
                {
                    msg: 'Multi',
                    input: 'a()b[]c',
                    expected: 'a-b-c'
                }
            ];

            cases.forEach(function (c: PromptFilterComposerPackageNameCase): void {
                it(c.msg, function (done: MochaDone): void {
                    assert.deepEqual(
                        Utils.promptFilterComposerPackageName(c.input),
                        c.expected
                    );
                    done();
                });
            });

        });

        describe('::taskRunnerChoiceOptions()', function () : void {

            it('required', function (done: MochaDone) : void {
                let choiceOptions: Inquirer.objects.IChoiceOption[] = Utils.taskRunnerChoiceOptions(true);
                assert.deepEqual(choiceOptions[0].value, '');
                assert.isTrue(choiceOptions[0].disabled);

                done();
            });

            it('optional', function (done: MochaDone) : void {
                let choiceOptions: Inquirer.objects.IChoiceOption[] = Utils.taskRunnerChoiceOptions(false);
                assert.deepEqual(choiceOptions[0].value, '');
                assert.isFalse(choiceOptions[0].disabled);

                done();
            });

        });

    });

})(chai.assert);
