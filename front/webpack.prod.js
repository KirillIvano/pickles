const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJs = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = require('./webpack.config');

const prodConfigs = {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserJs(),
            new OptimizeCssAssetsPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
            chunkFilename: '[id].css'
        }),
        new webpack.DefinePlugin({
            __SERVER_ORIGIN__: '"http://134.0.117.137:8000"',
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
        // new BundleAnalyzerPlugin(),
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },                    {
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


console.log( merge(commonConfig, prodConfigs))

module.exports = merge(commonConfig, prodConfigs);
