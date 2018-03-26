const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const Config = require('../config')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


module.exports = merge(baseConfig, {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                    },
                    // extractCSS: true
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }]
    },
    devtool: Config.dev.devtool,
    devServer: {
        hot: true,
        historyApiFallback: true,
        noInfo: true,
        overlay: true, // 当出现编译器错误或警告时，在浏览器中显示全屏叠加层。默认情况下禁用
        // https: true,
        compress: true, // 开启gzip压缩
        host: HOST || Config.dev.host,
        port: PORT || Config.dev.port,
        open: Config.dev.autoOpenBrowser,
        overlay: Config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        // publicPath: config.dev.assetsPublicPath,
        proxy: Config.dev.proxyTable,
        // watchOptions: {
        //     poll: config.dev.poll,
        // }
    },

    performance: {
        hints: false
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: './src/template/index.html',
        //     inject: true,
        // }),
        ...Config.htmlPlugin,
    ]
})
