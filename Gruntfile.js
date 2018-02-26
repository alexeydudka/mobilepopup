module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'mobilepopup/src/assembled.css': 'mobilepopup/src/mobilepopup.scss'
                }
            }
        },
        uglify: {
            options: {
                sourceMap: false,
                roundingPrecision: -1
            }, 
            js: {
                files: {          
                    'mobilepopup/src/mobilepopup.min.js': 'mobilepopup/src/mobilepopup.js',
                }
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: false,
                shorthandCompacting: false,
                sourceMap: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'mobilepopup/src/mobilepopup.min.css': 'mobilepopup/src/assembled.css'
                }
            }
        },
        
        clean: {
            css: ['mobilepopup/src/assembled.css']
        },

        watch: {
            all: {
                files: ['mobilepopup/src/mobilepopup.scss', 'mobilepopup/src/mobilepopup.js'],
                tasks: ['update']
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('update', ['sass', 'cssmin', 'clean:css', 'uglify:js']);
    grunt.registerTask('watchall', ['watch:all']);
}