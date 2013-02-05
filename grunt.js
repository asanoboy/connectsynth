module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-exec');
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
            complie_js: {
                command: 'compileclosure.sh'
            },
            compile_less: {
                command: 'compileless.sh'
            }
        }
    });
};

