var path = require('path');
var webpack = require('webpack');
var ExtractText = require('extract-text-webpack-plugin');

module.exports = (function(env) {

    if (!env)
        env = 'development';

    console.log('webpack started in ' + env + ' environment');


    var jsBase = './src/';

    var config = {
        entry: {
            main: jsBase + 'main.js'
        },
        output: {
            path: path.join(__dirname + '/dist/'),
            filename: '[name].bundle.js'
        },
        plugins: [
            new ExtractText('styles.min.css', {
                allChunks: true
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ],
        resolve: {
            extensions: ['', '.js', '.es6']
        },
        module: {
            preLoaders: [{
                test: /\.js$/,
                loader: 'source-map-loader'
            }],
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'stage-0']
                    }
                },
                {
                    test: /\.(scss|sass)$/,
                    loader: ExtractText.extract('style', 'css!sass')
                }, {
                    test: /\.(png|jpg|svg)$/,
                    loader: 'url?limit=100000'
                }, {
                    test: /\.svg(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'svg-loader'
                }, {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url?limit=100&minetype=application/font-woff'
                }, {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader'
                }]
        }
    };

    if (env === 'development') {
        config.cache = true;
        config.debug = true;
        config.devtool = 'eval-source-map';
    }

    if (env === 'production')
        config.devtool = 'source-map';

    return config;
})('production')