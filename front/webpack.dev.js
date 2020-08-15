const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.config');

const dev = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        hotOnly: true,
        contentBase: path.resolve(__dirname, 'dist'),
        port: '8080',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization, Cache-Control',
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __SERVER_ORIGIN__: '"http://134.0.117.137:8000"',
            __CLIENT_ORIGIN__: '"http://localhost:8080"'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                exclude: /flexboxgrid/,
                use: [
                    {
                        loader: 'style-loader',

                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            exportOnlyLocals: true,
                        },
                    }, {
                        loader: 'sass-loader',
                    }
                ],
            }, {
                test: /\.css$/,
                include: /flexboxgrid/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            }, {
                test: /\.(png|svg|jpg|ico|ttf|woff)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false
                    }
                }
            },
        ],
    },
};

module.exports = merge(common, dev);
