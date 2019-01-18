const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        index: './src/ts/index.tsx'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "lib"),
        publicPath: "/",
        libraryTarget: "commonjs2"
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
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                query: {
                    declaration: true,
                }
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
            }
        ]
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new UglifyJSPlugin({
            sourceMap: false,
            uglifyOptions: {
                warnings: false
            }
        }),
    ]
};
