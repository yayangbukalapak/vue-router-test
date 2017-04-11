var webpackConfig = require("./config/webpack.config");

module.exports = function (grunt) {
    var rewrite = require('connect-modrewrite');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({ watch: true }, webpackConfig)
        },
        connect: {
            server: {
                options: {
                    port: 9900,
                    base: {
                        path: ".",
                        options: {
                            index: "/app/index.html"
                        }
                    },
                    keepalive: true,
                    middleware: function(connect, options, middlewares) {

                        var rules = [
                            '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /app/index.html'
                        ];
                        middlewares.unshift(rewrite(rules));
                        return middlewares;

                    }
                }
            }
        }
    });

    ['grunt-webpack', 'grunt-contrib-connect'].forEach(function (v) {
        grunt.loadNpmTasks(v);
    });

    grunt.registerTask('default', 'connect:server');
};