const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: 'dist/style.css',
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'dist/index.js',
    },
    module: {
        rules: [{
            test: /\.html?$/,
            loader: 'file-loader?name=dist/[name].html',
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                },
            },
        }, {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: 'css-loader',
                }, {
                    loader: 'postcss-loader',
                }, {
                    loader: 'sass-loader',
                    options: {
                        outputStyle: 'compressed',
                    },
                }],
            }),
        }],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                context: './src/res/',
                from: '**/*',
                to: './dist/res/',
            },
        ]),
        new UglifyJSPlugin(),
        extractSass,
    ],
};
