module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        watch: {
            js: {
                files: ['static/develop/synthjs/**/*.js'],
                tasks: 'exec:writedeps'
            },
            less: {
                files: ['static/develop/synthjs/**/*.js'],
                tasks: 'exec:compile_less'
            }
        },
        exec: {
            writedeps: {
                command: 'writedeps.sh'
            },
            compile_js: {
                command: 'compileclosure.sh'
            },
            compile_less: {
                command: 'compileless.sh'
            },
            notify_ok: {
                command: 'growlnotify -t "grunt.js" -m "OK"'
            }
        }
    });
};

