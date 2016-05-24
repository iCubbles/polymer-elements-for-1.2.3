/*global module,require*/
'use strict';
var utils = require('cubx-grunt-webpackage-scaffold/lib/utils');
module.exports = function (grunt) {
  grunt.registerTask('createPolymerElementsUtilities', 'Scaffold an utility for each polymer element in manifest.webpackage', function () {
    var webpackagePath = grunt.config.get('param.src');
    var polymerElements = grunt.file.readJSON(webpackagePath + '/bower.json').dependencies || [];
    var manifestWebpackagePath = grunt.config.get('manifestWebpackagePath');
    var manifest = grunt.file.readJSON(manifestWebpackagePath);
    for (var key in polymerElements) {
      console.log('Adding ' + key + ' utility');
      var elementName = key;
      var artifactObject = {
        artifactId: elementName,
        description: 'Utility to use the ' + elementName + ' polymer element as dependency within a Cubbles component',
        endpoints: [
          {
            endpointId: 'main',
            resources: [
              elementName + '/' + elementName + '.html'
            ],
            dependencies: [
              'polymer-1.2.3@1.0.2/polymer/main'
            ]
          }
        ]
      };

      // make sure the artifact-type section does exist
      if (!manifest.artifacts.utilities) {
        manifest.artifacts.utilities = [];
      }

      // add or replace the artifact
      var index = utils.arrayObjectIndexOf(manifest.artifacts.utilities, 'artifactId',
        artifactObject.artifactId);
      if (index < 0) {
        grunt.verbose.writeln(
          'Pushing the new artifact into manifest.webpackage: ' + artifactObject.artifactId);
        manifest.artifacts.utilities.push(artifactObject);
      } else {
        grunt.verbose.writeln(
          'Replacing the artifact within manifest.webpackage: ' + artifactObject.artifactId);
        manifest.artifacts.utilities.splice(index, 1, artifactObject);
      }
      grunt.file.write(manifestWebpackagePath, JSON.stringify(manifest, null, 2));
    }
  });
};
