module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-express-server');

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

    protractor: {
      options: {
        configFile: "protractor_conf.js",
        noColor: false,
        args: { }
      },
      e2e: {
        options: {
          keepAlive: false
        }
      }
    },

    express: {
      app: {
        options: {
          script: 'app.js'
        }
      }
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'karma.conf.js',
        'app/scripts/**/*.js',
        'test/**/*.js'
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
        'test/**/*.js'
      ],
      tasks: [
        'karma:continuous:run',
        'jshint'
      ]
    }
  });

  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('e2e', ['express:app','protractor:e2e']);
  grunt.registerTask('check', ['karma:continuous:start','watch']);

};
