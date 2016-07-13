/**
 * @file
 * Documentation missing.
 */

import * as YoTest from 'yeoman-test';
import * as YoAssert from 'yeoman-assert';

(function (
    yoTest: YeomanTest.IStatic,
    yoAssert: YeomanAssert.IStatic
) : void {

    describe('drupal:typings-package', function () : void {

        before(function () : PromiseLike<any> {
            return yoTest
                .run(process.cwd() + '/generators/typings-package')
                .withPrompts({
                    moduleName: 'my_module'
                })
                .toPromise();
        });

        it('has the excepted files', function (done: MochaDone) : void {
            yoAssert.file([
                'source/my_module.d.ts',
                'source/my_module.t.ts',
                'source/tsconfig.json',
                '.editorconfig',
                '.gitignore',
                'package.json',
                'README.md',
                'tslint.json',
                'typings.json'
            ]);

            done();
        });

    });

})(YoTest, YoAssert);
