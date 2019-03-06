const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const genRules = require('./webpack-common.loader');
const buildPath = path.join(__dirname, "dist");
const { version } = require('./package.json');

const config = {

	// 入口文件所在的上下文
	context: path.join(__dirname, "src/"),

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

	// 以插件形式定制webpack构建过程
	plugins: [

        // 将样式文件 抽取至独立文件内
        new ExtractTextWebpackPlugin({
            // 生成文件的文件名
            filename: 'css/gm-vue.css',

            // 是否禁用插件
            disable: false,

            // 是否向所有额外的 chunk 提取（默认只提取初始加载模块）
            allChunks: true
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
        }),

		// 使用webpack内置插件压缩js
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: false // 是否生成map文件
		})
	],

	// 处理项目中的不同类型的模块。
	module: {
		rules: genRules('src', false)
	}
};

module.exports = config;
