
import * as YoTest from 'yeoman-test';
import * as YoAssert from 'yeoman-assert';

(function (
    yoTest: YeomanTest.IStatic,
    yoAssert: YeomanAssert.IStatic
) : void {

    describe('drupal:typed with install', function () : void {

        before(function () : PromiseLike<any> {
            return yoTest
                .run(process.cwd() + '/generators/typed')
                .withPrompts({
                    moduleName: 'my_module_foo',
                    runInstall: true
                })
                .toPromise();
        });

        it('has the excepted files', function (done: MochaDone) : void {
            yoAssert.file([
                'source/my_module_foo.d.ts',
                'source/my_module_foo.t.ts',
                'source/tsconfig.json',
                '.editorconfig',
                '.gitignore',
                '.npmignore',
                'package.json',
                'README.md',
                'tslint.json',
                'typings.json'
            ]);

            done();
        });

    });

})(YoTest, YoAssert);
