/*global module*/
var path = require('path');
var fs = require('fs');
'use strict';
module.exports = function (grunt) {
  grunt.registerTask('createEmptyPolymerDependency', 'Create an empty directory with and empty html file to fake Polymer dependency',
    function () {
      var webpackagePath = grunt.config.get('param.src');
      var polymerPath = path.join(webpackagePath, 'polymer');
      fs.mkdirSync(polymerPath, function (err) {
        if (err) grunt.log.error(err);
      });
      fs.writeFile(path.join(polymerPath, 'polymer.html'), '', function (err) {
        if (err) grunt.log.error(err);
      });
    });
};
