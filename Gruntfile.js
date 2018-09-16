// Load Grunt
module.exports = function (grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  
      // Tasks
      sass: { // Begin Sass Plugin
        dist: {
          options: {
            sourcemap: 'none'
          },
          files: {
              'css/style.css': 'scss/style.scss'
          }
        }
      },
      postcss: { // Begin Post CSS Plugin
        options: {
          map: false,
          processors: [
              require('autoprefixer')({
                  browsers: ['last 3 versions']
              })
          ]
        },
        dist: {
          src: 'css/style.css'
        }
      },
      cssmin: { // Begin CSS Minify Plugin
        target: {
          files: {
              'dist/style.min.css': 'css/style.css'	
          }
        }
      },
      uglify: { // Begin JS Uglify Plugin
        build: {
          src: ['dist/script.concat.js'],
          dest: 'dist/script.min.js'
        }
      },
      concat: {
        options: {
          // define a string to put between each file in the concatenated output
          separator: ';'
        },
        dist: {
          // the files to concatenate
          src: ['js/filters.js', 'js/tables.js', 'js/graphs.js', 'js/script.js'],
          // the location of the resulting JS file
          dest: 'dist/script.concat.js'
        }
      },
      watch: { // Compile everything into one task with Watch Plugin
        css: {
          files: '**/*.scss',
          tasks: ['sass', 'postcss', 'cssmin']
        },
        concat: {
          files: 'js/*.js',
          tasks: ['concat', 'uglify']
        }
      }
    });
    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Register Grunt tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', ['sass', 'postcss', 'cssmin', 'concat', 'uglify']);
  };