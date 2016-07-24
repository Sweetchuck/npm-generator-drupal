
import * as YoTest from 'yeoman-test';
import * as YoAssert from 'yeoman-assert';
import * as Path from 'path';

(function (
    yoTest: YeomanTest.IStatic,
    yoAssert: YeomanAssert.IStatic
) : void {

    describe('drupal:typed with NPM install', function () : void {

        before(function () : PromiseLike<any> {
            return yoTest
                .run(Path.join(__dirname, '../../../generators/typed'))
                .withPrompts({
                    moduleNameSnake: 'my_module_foo',
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

    describe('drupal:typed without NPM install', function () : void {

        before(function () : PromiseLike<any> {
            return yoTest
                .run(Path.join(__dirname, '../../../generators/typed'))
                .withPrompts({
                    moduleNameSnake: 'my_module_foo',
                    runInstall: false
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
