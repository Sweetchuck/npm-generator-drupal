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
                .toPromise();
        });

        it('It works', function (done: MochaDone) : void {
            yoAssert.file([
                'tslint.json'
            ]);

            done();
        });

    });

})(YoTest, YoAssert);
