const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./webpack.config.base')
const Config = require('../config')
const env = require('../config/prod.env')


module.exports = merge(baseConfig, {
    devtool: Config.build.devtool,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader', fallback: 'vue-style-loader', publicPath:'../',
                        }),
                        scss: ExtractTextPlugin.extract({
                            use: 'css-loader!sass-loader', fallback: 'vue-style-loader',publicPath:'../',
                        }),
                        sass: ExtractTextPlugin.extract({
                            use: 'css-loader!sass-loader?indentedSyntax', fallback: 'vue-style-loader', publicPath:'../',
                        }),
                    },
                    transformToRequire: {
                        'audio': 'src',
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                    }, {
                        loader: 'postcss-loader',
                    },{
                        loader: 'sass-loader',
                    }],
                    fallback:'style-loader',
                }),
            }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new CleanWebpackPlugin(['dist/*.*.js'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }),
        new ExtractTextPlugin({
            filename: '/css/[name].[hash:8].css',
            allChunks:true,
        }),
        // 压缩提取出来的 css
        // 可以删除来自不同组件的冗余代码
        // new OptimizeCSSPlugin(
        //     { safe: true, map: { inline: false }}
        // ),
        // 将所有从node_modules中引入的js提取到vendor.js，即抽取库文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks (module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        //上面虽然已经分离了第三方库,每次修改编译都会改变vendor的hash值，导致浏览器缓存失效。
        // 原因是vendor包含了webpack在打包过程中会产生一些运行时代码，运行时代码中实际上保存了打包后的文件名。
        // 当修改业务代码时,业务代码的js文件的hash值必然会改变。一旦改变必然会导致vendor变化。vendor变化会导致其hash值变化。
        //下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false, // 最紧凑的输出
            comments: false, // 删除所有的注释
            compress: {
                warnings: false, // 在 UglifyJs 删除没有用到的代码时不输出警告
                drop_console: true, // 删除所有的 `console` 语句
                collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // new HtmlWebpackPlugin({
        //     filename: '../dist/index.html',
        //     template: './src/template/index.html',
        //     inject: true,
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //         removeAttributeQuotes: true
        //         // more options:
        //         // https://github.com/kangax/html-minifier#options-quick-reference
        //     },
        //     // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        //     chunksSortMode: 'dependency'
        // }),
        ...Config.htmlPlugin,
    ]
})