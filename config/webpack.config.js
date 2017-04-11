const path = require('path');
const webpack = require('webpack');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');

module.exports = {
    context: path.join(__dirname, "../app"),
    entry: "../app/app.js",
    output: {
        path: path.join(__dirname, "../public/js"),
        publicPath: "/public/js/", // relative path for github pages
        filename: "main.js", // no hash in main.js because index.html is a static page
        chunkFilename: "[hash]/js/[id].js",
        hotUpdateMainFilename: "[hash]/update.json",
        hotUpdateChunkFilename: "[hash]/js/[id].update.js"
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js',
            'app': path.resolve(__dirname, '../app'),
            'components': path.resolve(__dirname, '../app/components'),
            'data' : path.resolve(__dirname, '../config/data'),
            'views': path.resolve(__dirname, '../app/views'),
            'js': path.resolve(__dirname, '../public/js'),
            'css': path.resolve(__dirname, '../public/styles'),
            'img': path.resolve(__dirname, '../public/images'),
        }
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CleanObsoleteChunks()
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    }
};