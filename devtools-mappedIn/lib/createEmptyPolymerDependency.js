/*global module*/
var path = require('path');
'use strict';
module.exports = function (grunt) {
  var webpackagePath = grunt.config.get('param.src');
  var polymerDirPath = path.join(webpackagePath, 'polymer');
  if (grunt.file.exists(polymerDirPath)) {
    grunt.file.delete(polymerDirPath, {force: true});
  }
  grunt.file.write(path.join(polymerDirPath, 'polymer.html'), '');
};
