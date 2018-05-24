/**
 * @author  https://github.com/silence717
 * @date on 2017/12/12
 */
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = (srcCodeDir, idDev) => {
    return [
        {
            test: /\.js?$/,
            loaders: ['babel-loader?{"presets":["es2015"]}'],
            exclude: /(node_modules|bower_components)/,
            include: [path.join(__dirname, srcCodeDir)]
        },
        {
            test: /\.(sc|c)ss$/,
            use: ExtractTextWebpackPlugin.extract({
                use: [{
                        loader: 'css-loader',
                }]
            })
        }
    ]
};
