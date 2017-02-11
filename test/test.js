'use strict';

const assert = require('assert');
const concatStream = require('concat-stream');
const format = require('../index.js');
const gulp = require('gulp');
const rev = require('gulp-rev');

const util = require('gulp-util');

const expectHash = {
    file1: 'e4cf7b05be',
    file2: 'd504754096'
}

describe('run test', () => {
    it('success', (callback) => {
        gulp.src('./test/src/*.js')
            .pipe(rev())
            .pipe(format('[%rev%].[%filename%]'))
            .pipe(concatStream((buf) => {
                const filename1 = buf[0].path.replace(/.*\//g, '');
                const filename2 = buf[1].path.replace(/.*\//g, '');

                assert.equal(filename1, expectHash.file1 + '.1.js');
                assert.equal(filename2, expectHash.file2 + '.2.js');
                callback();
            }));
    });

    it('success: with space', (callback) => {
        gulp.src('./test/src/*.js')
            .pipe(rev())
            .pipe(format('[% rev %].[% filename %]'))
            .pipe(concatStream((buf) => {
                const filename1 = buf[0].path.replace(/.*\//g, '');
                const filename2 = buf[1].path.replace(/.*\//g, '');

                assert.equal(filename1, expectHash.file1 + '.1.js');
                assert.equal(filename2, expectHash.file2 + '.2.js');
                callback();
            }));
    });

    it('success: with prefix', (callback) => {
        gulp.src('./test/src/*.js')
            .pipe(rev())
            .pipe(format('rev-[% rev %]-name-[% filename %]'))
            .pipe(concatStream((buf) => {
                const filename1 = buf[0].path.replace(/.*\//g, '');
                const filename2 = buf[1].path.replace(/.*\//g, '');

                assert.equal(filename1, 'rev-' + expectHash.file1 + '-name-1.js');
                assert.equal(filename2, 'rev-' + expectHash.file2 + '-name-2.js');
                callback();
            }));
    });
});
