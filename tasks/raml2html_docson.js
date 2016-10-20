/*
 * grunt-raml2html-docson
 * https://github.com/ilonghi/grunt-raml2html-plugin
 *
 * Copyright (c) 2016 Ivan Longhi
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var raml2html = require('raml2html');

module.exports = function(grunt) {

  grunt.registerMultiTask('raml2html_docson', 'Grunt plugin to build html from raml using docson for rendering json-schemas', function() {

    this.requiresConfig('raml2html_docson.' + this.target + '.destinationDir');
    var destinationDir = this.data.destinationDir;
    if(grunt.util.kindOf(destinationDir) !== 'string') {
      grunt.fail.warn('Config raml2html_docson.' + this.target + '.destinationDir must be a string');
    }

    this.requiresConfig('raml2html_docson.' + this.target + '.ramlFilePath');
    var ramlFilePath = this.data.ramlFilePath;
    if(grunt.util.kindOf(ramlFilePath) !== 'string') {
      grunt.fail.warn('Config raml2html_docson.' + this.target + '.ramlFilePath must be a string');
    }

    this.requiresConfig('raml2html_docson.' + this.target + '.indexFileName');
    var indexFileName = this.data.indexFileName;
    if(grunt.util.kindOf(indexFileName) !== 'string') {
      grunt.fail.warn('Config raml2html_docson.' + this.target + '.indexFileName must be a string');
    }

    grunt.verbose.writeln('Creating destination dir ' + destinationDir);
    grunt.file.mkdir(destinationDir);

    grunt.file.recurse('lib/docson', function(abspath, rootdir, subdir, filename) {
      var destpath = path.join(destinationDir, 'docson', subdir||'', filename);
      grunt.verbose.writeln('Copying ' + abspath + ' to ' + destpath);
      grunt.file.copy(abspath, destpath);
    });

    var done = this.async();
    var config = raml2html.getDefaultConfig('template.nunjucks', 'lib/raml2html_templates');
    grunt.verbose.writeln('Rendering raml2html from ' + ramlFilePath);
    raml2html.render(ramlFilePath, config).then(function(result) {
      try {
        grunt.file.write(path.join(destinationDir, indexFileName), result);
      } catch (e) {
        done(e);
      }
      done(true);
    }, function(error) {
      done(new Error('Error rendering raml2html: ' + error.message));
    });

  });

};
