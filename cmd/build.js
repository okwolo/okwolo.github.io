const fs = require('fs');
const path = require('path');

const okwolo = require('okwolo/server');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// ignore sass file requires when building static pages
require.extensions['.scss'] = (module) => module.exports = '';
const pages = require('../src/data/pages');

const config = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: '../dist/index.js',
    },
    module: {
        rules: [{
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
        new ExtractTextPlugin('../dist/style.css'),
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

const template = fs.readFileSync('./src/template.html', 'utf8');

pages.forEach(({pathname, component}) => {
    const app = okwolo((content) => {
        const dir = path.join('dist', pathname);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(
            path.join(dir, 'index.html'),
            template.replace('{{content}}', content)
        );
    });

    app.setState({});

    app(component);
});
