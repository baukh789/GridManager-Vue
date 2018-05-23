/**
 * @author  https://github.com/silence717
 * @date on 2017/12/12
 */
const path = require('path');

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
			use: [
				{ loader: "style-loader" },
				{ loader: "css-loader" }
			]
		}
	]
};
