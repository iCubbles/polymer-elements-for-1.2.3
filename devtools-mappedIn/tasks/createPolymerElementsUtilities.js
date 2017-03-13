/*global module,require*/
'use strict';
var fakePolymerDep = require('../lib/createEmptyPolymerDependency');
var installBowerDep = require('../lib/installBowerDependencies');
var del = require('del');
var utils = require('cubx-grunt-webpackage-scaffold/lib/utils');
var path = require('path');
module.exports = function (grunt) {
  grunt.registerTask('createPolymerElementsUtilities', 'Scaffold an utility for each polymer element in manifest.webpackage',
    function () {
      var webpackagePath = grunt.config.get('param.src');
      installBowerDep(grunt);
      del.sync([
        webpackagePath + '/app-layout/site',
        webpackagePath + '/app-layout/templates',
        webpackagePath + '/app-layout/patterns'
      ], {force: true});
      var polymerElements = grunt.file.readJSON(webpackagePath + '/bower.json').dependencies || [];
      var manifestWebpackagePath = grunt.config.get('manifestWebpackagePath');
      var manifest = grunt.file.readJSON(manifestWebpackagePath);
      var notFoundElements = '';
      var countReplaced = 0;
      var countPushed = 0;
      var countLightEndpoints = 0;
      var countFailures = 0;
      var countBehaviors = 0;
      for (var key in polymerElements) {
        if (grunt.file.exists(path.join(webpackagePath, key, key + '.html'))) {
          var artifactObject = {
            artifactId: key,
            description: 'Utility to use the ' + key + ' polymer element as dependency within a Cubbles component',
            endpoints: [
              {
                endpointId: 'main',
                resources: [
                  key + '.html'
                ],
                dependencies: [
                  'polymer-1.2.3@1.0.2/polymer/main'
                ]
              }
            ]
          };

          var lightElementPath = path.join(webpackagePath, key, key + '-light.html');
          try {
            grunt.file.read(lightElementPath);
            var lightEndpoint = {
              endpointId: 'light',
              resources: [
                key + '-light.html'
              ],
              dependencies: [
                'polymer-1.2.3@1.0.2/polymer/main'
              ]
            };
            artifactObject.endpoints.push(lightEndpoint);
            countLightEndpoints++;
          } catch (e) {}

          // make sure the artifact-type section does exist
          if (!manifest.artifacts.utilities) {
            manifest.artifacts.utilities = [];
          }

          // add or replace the artifact
          var index = utils.arrayObjectIndexOf(manifest.artifacts.utilities, 'artifactId',
            artifactObject.artifactId);
          if (key.includes('behavior')) {
            countBehaviors++;
          } else if (index < 0) {
            manifest.artifacts.utilities.push(artifactObject);
            countPushed++;
          } else {
            manifest.artifacts.utilities.splice(index, 1, artifactObject);
            countReplaced++;
          }
          grunt.file.write(manifestWebpackagePath, JSON.stringify(manifest, null, 2));
        } else {
          countFailures++;
          notFoundElements += '\t' + key + '\n';
        }
      }
      fakePolymerDep(grunt);
      grunt.log.subhead('Successful operations:');
      grunt.log.ok('Polymer empty html file was created (faked dependency).');
      if (countPushed > 0) {
        grunt.log.ok(countPushed + ' polymer elements were pushed as utilities within manifest.webpackage.');
      }
      if (countReplaced > 0) {
        grunt.log.ok(countReplaced + ' polymer elements utilities were replaced within manifest.webpackage.');
      }
      if (countLightEndpoints > 0) {
        grunt.log.ok(countLightEndpoints + ' polymer light elements were pushed as light endpoints within manifest.webpackage.');
      }
      if (countBehaviors > 0) {
        grunt.log.ok(countBehaviors + ' polymer behaviors were pushed as utilities within manifest.webpackage.');
      }
      grunt.log.subhead('Failed operations:');
      if (countFailures > 0) {
        grunt.log.error('The following ' + countFailures + ' elements could not be pushed as utilities within' +
          ' manifest.webpackage. Since a html file with the same name were not found.');
        grunt.log.writeln(notFoundElements);
      }
    });
};
