const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new VueLoaderPlugin()
    ],
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        proxy: {
            '/api': {
                target: 'https://localhost:7172',
                secure: false
            },
            '/socket': {
                target: 'wss://localhost:7172',
                ws: true,
                secure: false
            }
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']/*,
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js'
        }*/
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.less$/i,
            use: [
                "style-loader",
                "css-loader",
                "less-loader"
            ]
        }]
    },
    devtool: "source-map"
};