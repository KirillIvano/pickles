const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const common = require('./webpack.config');

const dev = {
    mode: 'development',
    devtool: 'inline-cheap-source-map',
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
            __SERVER_ORIGIN__: '"http://localhost:5000"',
            __CLIENT_ORIGIN__: '"http://localhost:8080"'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /\.tailwind.global.css$/,
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
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('tailwindcss'),
                                require('postcss-nested'),
                                require('autoprefixer'),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                    }
                ],
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-import'),
                                require('tailwindcss'),
                                require('postcss-nested'),
                                require('autoprefixer'),
                            ],
                        },
                    },
                ]
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
