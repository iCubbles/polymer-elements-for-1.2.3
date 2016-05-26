/*global module*/
var execSync = require('child_process').execSync;
var path = require('path');
'use strict';
module.exports = function (grunt) {
  grunt.registerTask('installBowerDependencies', 'Install bower dependencies of the active webpackage',
    function () {
      var webpackagePath = grunt.config.get('param.src');
      grunt.verbose.log('Installing dependencies defined in ', path.join(webpackagePath + '/bower.json ...'));

      execSync('bower install', {cwd: webpackagePath});
    });
};
