const fs = require('fs');
const path = require('path');
const readline = require('readline');

const okwolo = require('okwolo/server');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// ignore sass file requires when building static pages
require.extensions['.scss'] = (module) => module.exports = '';

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

const generateTemplates = () => {
    const template = fs.readFileSync('./src/template.html', 'utf8');

    // require every time so that contents are updated
    require('../src/pages').forEach(({title, pathname, description, component}) => {
        const app = okwolo((content) => {
            const dir = path.join('dist', pathname);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            const context = {
                title,
                description,
                content,
            };
            fs.writeFileSync(
                path.join(dir, 'index.html'),
                template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
                    if (!key in context) {
                        console.warn(`build: "${key}" was not found`);
                        return '';
                    }
                    return String(context[key]);
                })
            );
        });

        app.setState({});

        app(component);
    });
};

const once = process.argv.indexOf('--once') !== -1;

const compiler = webpack(config);

const watching = compiler.watch({}, (err, stats) => {
    if (err) {
        console.error(err);
    } else {
        console.log(stats.toString('minimal'));
        generateTemplates();
        if (once) {
            process.exit(0);
        }
    }
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        watching.close();
        console.log('exit build');
        process.exit(0);
    }
});
