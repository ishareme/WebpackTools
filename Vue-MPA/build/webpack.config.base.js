const path = require('path');

const Config = require('../config')


const isDev = process.env.NODE_ENV === 'development' ? true : false;


function resolve (dir) {
    return path.join(__dirname, '..', dir)
}


var baseConfig = {
    // context: path.resolve(__dirname, '../'),
    entry: Config.entry,
    output: {
        path: Config.build.distPath,
        filename: 'js/[name].[hash:8].js',
        publicPath: isDev ? '' : '../dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.json$/,
                use: ['json-loader'],
            }
        ]
    },
    plugins: [


    ],
    resolve: {
        extensions: [
            '.js', '.vue', '.json','.scss', '.css','.es6',
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
};

module.exports = baseConfig;