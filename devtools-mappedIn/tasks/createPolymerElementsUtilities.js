/*global module,require*/
'use strict';
var utils = require('cubx-grunt-webpackage-scaffold/lib/utils');
module.exports = function (grunt) {
  grunt.registerTask('createPolymerElementsUtilities', 'Scaffold an utility for each polymer element in manifest.webpackage', function () {
    var webpackagePath = grunt.config.get('param.src');
    var polymerElements = grunt.file.readJSON(webpackagePath + '/bower.json').dependencies || [];
    var manifestWebpackagePath = grunt.config.get('manifestWebpackagePath');
    var manifest = grunt.file.readJSON(manifestWebpackagePath);
    var errorMessages = '';
    for (var key in polymerElements) {
      var elementPath = webpackagePath + '/' + key + '/' + key + '.html';
      try {
        grunt.file.read(elementPath);
        var artifactObject = {
          artifactId: key,
          description: 'Utility to use the ' + key + ' polymer element as dependency within a Cubbles component',
          endpoints: [
            {
              endpointId: 'main',
              resources: [
                key + '/' + key + '.html'
              ],
              dependencies: [
                'polymer-1.2.3@1.0.2/polymer/main'
              ]
            }
          ]
        };

        var lightElementPath = webpackagePath + '/' + key + '/' + key + '-light.html';
        try {
          grunt.file.read(lightElementPath);
          var lightEndpoint = {
            endpointId: 'light',
            resources: [
              key + '/' + key + '-light.html'
            ],
            dependencies: [
              'polymer-1.2.3@1.0.2/polymer/main'
            ]
          };
          artifactObject.endpoints.push(lightEndpoint);
        } catch (e) {}

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
        console.log('Added ' + key + ' utility');
      } catch (e) {
        errorMessages += e.message + '\n';
      }
    }
    console.warn(errorMessages);
  });
};
