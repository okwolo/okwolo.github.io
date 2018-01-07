const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: '../dist/index.js',
    },
    module: {
        rules: [{
            test: /\.html?$/,
            loader: 'file-loader?name=../dist/[name].html',
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
            use: ExtractTextPlugin.extract({
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
        new CopyWebpackPlugin([{
            context: './src/res/',
            from: '**/*',
            to: '../dist/res/',
        }]),
        new UglifyJSPlugin(),
        new ExtractTextPlugin('../dist/styles.css'),
    ],
};

const compiler = webpack(config);

compiler.run((err, stats) => {
    if (err) {
        console.error(err);
    } else {
        console.log(stats.toString('minimal'));
    }
});
