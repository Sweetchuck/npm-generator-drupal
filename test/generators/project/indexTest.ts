
import * as YoTest from 'yeoman-test';
import * as YoAssert from 'yeoman-assert';
import * as Path from 'path';

(function (
    yoTest: YeomanTest.IStatic,
    yoAssert: YeomanAssert.IStatic
) : void {

    describe('drupal:project without composer install', function () : void {

        before(function () : PromiseLike<any> {
            return yoTest
                .run(Path.join(__dirname, '../../../generators/project'))
                .withPrompts(<GeneratorDrupal.Project.IAnswers>{
                    vendorDash: 'foo-bar',
                    nameDash: 'ted-zed',
                    taskRunner: 'robo',
                    sitesSubDir: 'default',
                    drupalRoot: 'drupal_root',
                    publicHtml: 'public_html',
                    runComposerInstall: false
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

        it('composer.json contains the required packages', function (done: MochaDone) : void {
            yoAssert.fileContent('composer.json', /\n\s+"drupal\/core":/);
            yoAssert.fileContent('composer.json', /\n\s+"consolidation\/robo":/);

            done();
        });

    });

    describe('drupal:project with composer install', function () : void {

        before(function () : PromiseLike<any> {
            return yoTest
                .run(Path.join(__dirname, '../../../generators/project'))
                .withPrompts(<GeneratorDrupal.Project.IAnswers>{
                    vendorDash: 'foo-bar',
                    nameDash: 'ted-zed',
                    taskRunner: '',
                    sitesSubDir: 'default',
                    drupalRoot: 'drupal_root',
                    publicHtml: 'public_html',
                    runComposerInstall: true
                })
                .toPromise();
        });

        it('has the excepted files', function (done: MochaDone) : void {
            yoAssert.file([
                'src/Composer/Scripts.php',
                '.editorconfig',
                '.gitignore',
                'composer.json',
                'README.md'
            ]);

            done();
        });

        it('has no Robo related files', function (done: MochaDone) : void {
            yoAssert.noFile([
                '.git-hooks',
                'RoboFile.php'
            ]);

            done();
        });

        it('composer.json contains the required packages', function (done: MochaDone) : void {
            yoAssert.fileContent('composer.json', /\n\s+"drupal\/core":/);
            yoAssert.noFileContent('composer.json', /\n\s+"consolidation\/robo":/);

            done();
        });

    });

})(YoTest, YoAssert);
