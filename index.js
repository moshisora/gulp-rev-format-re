'use strict';

const through = require('through2');
const modifyFilename = require('modify-filename');
const util = require('gulp-util');

module.exports = (option) => {
  return through.obj(transform, flush);

  function transform(file, encoding, callback) {
    if (file.isNull()) {
      callback(null, file);
      return;
    }

    if ((file.revOrigPath === undefined) || (file.revHash === undefined)) {
      callback(new util.PluginError('gulp-rev-format-re', 'File was not passed through "gulp-rev"'));
      return;
    }

    if (typeof (option) !== 'string') {
      callback(new util.PluginError('gulp-rev-format-re', 'option should be string with accepted values.'));
      return;
    }

    file.path = modifyFilename(file.revOrigPath, function (originalName, ext) {
      let filename = option;

      filename = filename.replace(/\[\%\s*?filename\s*?\%\]/, originalName);
      filename = filename.replace(/\[\%\s*?rev\s*?\%\]/, file.revHash);

      return filename + ext;
    });

    callback(null, file);
  }

  function flush(callback) {
    callback();
  }
};
