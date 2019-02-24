const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: path.resolve(__dirname, './js/app/index.js'),
    output: {
        filename: 'js/index.js',
        path: path.resolve(__dirname, '../public')
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    resolve: {
        alias: {
            jquery: path.join(__dirname, 'js/lib/jquery-2.0.3.min'),
            mod: path.join(__dirname, 'js/mod'),
            sass: path.join(__dirname, 'sass')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new ExtractTextPlugin('css/index.css'),
    ]
};