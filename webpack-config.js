const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const getRules = require('./webpack-common.loader');
const buildPath = path.join(__dirname, './dist');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const { version } = require('./package.json');

const srcDir = path.join(__dirname, './src');

const config = {
    mode: 'production',

    // 入口文件所在的上下文
    context: srcDir,

	// 入口文件配置
	entry: {
		js: './js/index.js'
	},

    // 文件导出的配置
    // http://www.css88.com/doc/webpack2/configuration/output/
    output:{
        path: buildPath ,
        filename: "js/gm-vue.js",
        library: 'GridManager',
        libraryTarget: "umd"
    },

	// 配置模块如何解析
	resolve:{
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
		extensions: [".js"] //当requrie的模块找不到时,添加这些后缀
	},

	// 自动补全loader
	resolveLoader: {
		moduleExtensions: ['-loader']
	},

    // 防止将某些 import 包(package)打包到 bundle 中
    externals: {
        'vue': {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },

    // 优化代码
    optimization: {
        minimizer: [
            // 压缩js
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {
                    warnings: false,
                    ie8: false,
                    output: {
                        comments: false
                    }
                }
            }),

            // 压缩css
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {removeAll: true},
                    minifyGradients: true
                },
                canPrint: true
            })
        ]
    },
	// 以插件形式定制webpack构建过程
	plugins: [
        new CleanPlugin([buildPath]),
        // 将样式文件 抽取至独立文件内
        new MiniCssExtractPlugin({
            filename: 'css/gm-angular.css',
            chunkFilename: '[id].css'
        }),

        // 将文件复制到构建目录
        // CopyWebpackPlugin-> https://github.com/webpack-contrib/copy-webpack-plugin
        new CopyWebpackPlugin([
            {from: path.join(__dirname, '/package.json'), to: '', toType: 'file'},
            {from: path.join(__dirname, '/README.md'), to: '', toType: 'file'}
        ]),

        // 配置环境变量
        new webpack.DefinePlugin({
            'process.env': {
                VERSION: JSON.stringify(version)
            }
        })
	],

	// 处理项目中的不同类型的模块。
	module: {
		rules: getRules()
	}
};

module.exports = config;
