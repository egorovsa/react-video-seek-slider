const path = require('path');
const copyPluging = require('copy-webpack-plugin');

module.exports = {
	mode: "development",
	entry: {
		app: './src/ts/app.ts'
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/"
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 3000
	},
	resolve: {
		extensions: [
			'.js',
			'.ts',
			'.tsx',
			'.jsx',
			'.styl'
		]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			},
			{
				test: /\.styl?$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'stylus-loader',
						options: {}
					}
				]
			},
			{
				test: /\.(jpe?g|png)$/,
				loader: "file-loader"
			}
		]
	},
	plugins: [
		new copyPluging([
			{
				from: "./src/index.html"
			}
		])
	]
};