/*global module*/
var execSync = require('child_process').execSync;
var path = require('path');
'use strict';
module.exports = function (grunt) {
  var webpackagePath = grunt.config.get('param.src');
  grunt.log.writeln('Installing dependencies defined in ', path.join(webpackagePath + '/bower.json ...'));

  execSync('bower install', {cwd: webpackagePath});
};
