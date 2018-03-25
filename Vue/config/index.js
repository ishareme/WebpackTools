const path = require('path')



module.exports = {
    dev: {
        //devtool
        devtool: '#eval-source-map',

        //dev Server config
        host: '0.0.0.0',
        port: 8225,
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
