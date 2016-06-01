/*global module*/
var execSync = require('child_process').execSync;
var del = require('del');
'use strict';
module.exports = function (grunt) {
  var webpackagePath = grunt.config.get('param.src');
  grunt.log.writeln('Installing dependencies defined in' + webpackagePath + '/bower.json ...');
  execSync('bower install', {cwd: webpackagePath});
  del.sync([
    webpackagePath + '/**/demo',
    webpackagePath + '/**/test',
    webpackagePath + '/**/demos',
    webpackagePath + '/**/tests'],
    {force: true});
};
