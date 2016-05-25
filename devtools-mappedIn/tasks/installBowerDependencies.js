/*global module*/
var execSync = require('child_process').execSync;
'use strict';
module.exports = function (grunt) {
  grunt.registerTask('installBowerDependencies', 'Install bower dependencies of the active webpackage', function () {
    var webpackagePath = grunt.config.get('param.src');
    console.log('Installing dependencies defined in ' + webpackagePath + '/bower.json ...');

    execSync('bower install', {cwd: webpackagePath});
  });
};
