module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.initConfig({
    server: {
      port: 4000
    },
    clean: ["public/js"],
    uglify: {
      my_target: {
        options: {
          mangle: false
        },
        files: {
          'public/js/app.js': ['js/app.js'],
          'public/js/services.js': ['js/services.js'],
          'public/js/angular-loadscript.js': ['js/angular-loadscript.js']
        } //files
      } //my_target
    }, //uglify
    copy: {
      files: {
            expand : true,
            dest   : 'public/js',
            cwd    : 'js',
            src    : [
              '**/*.js'
            ]
      }
    },
    compass: {
      dev: {
        options: {
          config: 'compass_config.rb'
        } //options
      }, //dev
      foundation: {
        options: {
          config: 'compass_foundation_config.rb'
        } //options
      } //foundation

    }, //compass
    watch: {
      options: { livereload: true },
      scripts: {
        files: ['js/*.js'],
        //tasks: ['clean','uglify'],
        tasks: ['copy']
      }, //script
      sass: {
        files: ['sass/*.scss'],
        tasks: ['compass:dev','compass:foundation']
      }, //sass
      sass_foundation: {
        files: ['public/foundation/scss/foundation.scss','public/foundation/scss/foundation/*.scss','public/foundation/scss/foundation/components/*.scss'],
        tasks: ['compass:foundation']
      }, //sass_foundation
      html: {
        files: ['public/*.html', 'public/partials/*.html']
      }
    }, //watch
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
  }
  }) //initConfig
  grunt.registerTask('default', ['express:dev', 'watch']);
} //exports
