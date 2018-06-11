const webpack = require('webpack')
const path = require('path')
const rootPath = path.resolve(__dirname, './')

module.exports = {
    mode: 'production',
    entry: path.resolve(rootPath, '../src', 'index.js'),
    output: {
        filename: 'ssutils.min.js',
        path: path.resolve(rootPath, '../dist'),
        library: 'ssutils',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: require('eslint-friendly-formatter'),
                            eslintPath: require.resolve('eslint'),
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: path.join(__dirname, '../src')
            }
        ]
    },
    resolve: {
        modules: [ // 优化模块查找路径
            path.join(__dirname, '../src'),
            path.join(__dirname, '../node_modules') // 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
        ],
        // 自动解析文件扩展名(补全文件后缀)(从左->右)
        // import hello from './hello'  （!hello.js? -> !hello.css? -> !hello.pug? -> !hello.json）
        extensions: ['.js'],
    }
};
