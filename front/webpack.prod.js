const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJs = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const commonConfig = require('./webpack.config');


const prodConfigs = {
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/](react|react-dom)/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
        minimizer: [
            new TerserJs(),
            new OptimizeCssAssetsPlugin(),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),
        new webpack.DefinePlugin({
            __SERVER_ORIGIN__: '"https://aglobell.ru"',
        }),
        new ImageminPlugin({
            cache: true,
            imageminOptions: {
                plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                    [
                        "svgo",
                        {
                            plugins: [
                                {
                                    removeViewBox: false
                                }
                            ]
                        }
                    ]
                ]
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /flexboxgrid/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer'),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                    }
                ],
            }, 
            {
                test: /\.css$/,
                include: /flexboxgrid/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|ico|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/',
                            name: '[name]_[hash].[ext]'
                        }
                    },
                ],
            },
        ],
    },
};


module.exports = merge(commonConfig, prodConfigs);
