const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, './js/app/index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../public/js')
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    },
    resolve: {
        alias: {
            jquery: path.join(__dirname, 'js/lib/jquery-2.0.3.min'),
            mod: path.join(__dirname, 'js/mod'),
            sass: path.join(__dirname, 'css')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
};