
import * as YoTest from 'yeoman-test';
import * as YoAssert from 'yeoman-assert';
import * as Path from 'path';

(function (
    yoTest: YeomanTest.IStatic,
    yoAssert: YeomanAssert.IStatic
) : void {

    describe('drupal:project without install', function () : void {

        before(function () : PromiseLike<any> {
            return yoTest
                .run(Path.join(__dirname, '../../../generators/project'))
                .withPrompts({
                    vendorDash: 'foo-bar',
                    nameDash: 'ted-zed',
                    taskRunner: 'robo'

                })
                .toPromise();
        });

        it('has the excepted files', function (done: MochaDone) : void {
            yoAssert.file([
                'src/Composer/Scripts.php',
                '.editorconfig',
                '.git-hooks',
                '.gitignore',
                'composer.json',
                'README.md',
                'RoboFile.php'
            ]);

            done();
        });

    });

})(YoTest, YoAssert);
