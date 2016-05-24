/*global module*/
'use strict';
module.exports = function (grunt) {
  grunt.registerTask('installBowerDependencies', 'Install bower dependencies of the active webpackage', function () {
    var webpackagePath = grunt.config.get('param.src');
    console.log('Installing dependencies defined in ' + webpackagePath + '/bower.json ...');
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('bower install', {cwd: webpackagePath}, function (err, stdout, stderr) {
      console.log(stdout);
      cb();
    });
  });
};
