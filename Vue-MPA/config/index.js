const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development' ? true : false;


const getFileNameList = path => {
    let fileList = [];
    let dirList = fs.readdirSync(path)
    dirList.forEach(item => {
        if (item.indexOf('html') > -1) {
            fileList.push(item.split('.')[0])
        }
    })
    return fileList
}

let HTMLDirs = getFileNameList('./src/template')


//待生成的HTML页面
let HTMLs = []
//入口文件列表
let Entries = {}

//处理入口文件和生成页的数据
HTMLDirs.forEach((page) => {
    const htmlPlugin = isDev ? new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, `../src/template/${page}.html`),
    }) : new HtmlWebpackPlugin({
        filename: `../dist/${page}.html`,
        template: path.resolve(__dirname, `../src/template/${page}.html`),
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    });
    HTMLs.push(htmlPlugin);
    Entries[page] = path.resolve(__dirname, `../src/views/${page}.js`);
})

module.exports = {
    entry: Entries,
    htmlPlugin: HTMLs,
    dev: {
        //devtool
        devtool: '#eval-source-map',

        //dev Server config
        host: '0.0.0.0',
        port: 8200,
        autoOpenBrowser: true,
        errorOverlay: true,
        proxyTable: {
            // "/api": {
            //   target: "http://localhost:3000",
            //   pathRewrite: {
            //     "^/api": ""
            //   } //->http://localhost:3000/posts/1。
            // }
        },
    },


    build: {
        devtool: '#source-map',

        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        distPath: path.resolve(__dirname, '../dist'),
        rootPath: path.resolve(__dirname, '..')
    }
}
