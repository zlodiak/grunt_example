module.exports = function(grunt) {

  // 1. Вся настройка находится здесь
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'js/jquery/jquery.2.min.js', 
          'js/project/*.js'
        ],
        dest: 'js/production.js',
      },        
    },

    uglify: {
        build: {
            src: 'js/production.js',
            dest: 'js/production.min.js'
        }
    },

    imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: 'images/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'images/production/'
            }]
        }
    },

    watch: {
        scripts: {
            files: [
              'js/jquery/jquery.2.min.js', 
              'js/project/*.js',
              'css/style.less'
            ],
            tasks: ['concat', 'uglify', 'less'],
            options: {
                spawn: false,
            },
        }
    },

    less: {
        // production config is also available
        development: {
            options: {
                // Specifies directories to scan for @import directives when parsing. 
                // Default value is the directory of the source, which is probably what you want.
                paths: ["css"],
            },
            files: {
                // compilation.css  :  source.less
                "css/style.css": "css/style.less"
            }
        },
    }               

  });

  // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
  grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'less', 'watch']);

};