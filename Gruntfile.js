module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      continuous: {
        background: true,
        singleRun: false
      }
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'karma.conf.js',
        'app/scripts/**/*.js',
        'app/test/**/*.js'
      ],
      options: {
        strict: true,
        globals: {
          angular: true
        }
      }
    },

    watch: {
      files: [
        'Gruntfile.js',
        'karma.conf.js',
        'app/scripts/**/*.js',
        'app/test/**/*.js'
      ],
      tasks: [
        'karma:continuous:run',
        'jshint'
      ]
    }
  });

  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('check', ['karma:continuous:start','watch']);

};
