var fs = require("fs"),
    path = require("path");

var getDirs = function(dir, opt_suffix){
    var dirs = [], suffix = opt_suffix ? opt_suffix : '';

    fs.readdirSync(dir).forEach(function(item){
        var stat = fs.statSync(path.join(dir, item));
        if( stat.isDirectory() ){
            dirs.push(path.join(dir, item, suffix));
        }
    });

    return dirs;
}, getDirsR = function(dir, opt_suffix){
    var children = getDirs(dir);
    var dirs = [];
    var suffix = opt_suffix ? opt_suffix : '';
    for( var i=0; i<children.length; i++ ){
        dirs = dirs.concat(getDirsR(children[i], suffix));
    }
    dirs.push(dir + suffix);
    return dirs;
};

module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-exec');
    grunt.initConfig({
        concat: {
            'all.js' : [
                getDirsR('static/develop/synthjs', '\\*.js')
            ]
        },
        watch: {
            js: {
                files: getDirsR('static/develop/synthjs', '\\*.js'),
                tasks: 'exec:writedeps'
            },
            less: {
                files: getDirsR('static/less', '\\*.less'),
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

