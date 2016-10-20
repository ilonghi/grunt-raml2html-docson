/*
 * grunt-raml2html-docson
 * https://github.com/ilonghi/grunt-raml2html-plugin
 *
 * Copyright (c) 2016 Ivan Longhi
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask('raml2html_docson', 'Grunt plugin to build html from raml using docson for rendering json-schemas', function() {

    var that = this;

    this.requiresConfig('raml2html_docson.' + this.target + '.destination_dir');

    grunt.verbose.writeln('Creating destination dir ' + this.data.destination_dir);

    grunt.file.mkdir(this.data.destination_dir);

    grunt.file.recurse('lib/docson', function(abspath, rootdir, subdir, filename) {
//      grunt.log.writeln(': abspath: ' + abspath);
//      grunt.log.writeln(': rootdir: ' + rootdir);
//      grunt.log.writeln(': subdir: ' + subdir);
//      grunt.log.writeln(': filename: ' + filename);
      var destpath = path.join(that.data.destination_dir, 'docson', subdir||'', filename);
      grunt.verbose.writeln('Copying ' + abspath + ' to ' + destpath);
      grunt.file.copy(abspath, destpath);
    });
    /*
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
    */

  });

};
