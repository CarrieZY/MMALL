const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 获取html-webpack-plugin参数的方法 
const getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        favicon     :'./favicon.ico',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};
module.exports = {
    mode:'development',
    entry:{
        'common'    : ['page/common/index.js'],
        'index'     : ['page/index/index.js'],
        'list'      : ['page/list/index.js'],
        'detail'    : ['page/detail/index.js'],
        'result'    : ['page/result/index.js'],
        'cart'      : ['page/cart/index.js'],
        'user-login': ['page/user-login/index.js'],
        'user-content' : ['page/user-content/index.js'],
        'user-register' : ['page/user-register/index.js'],
        'user-pass-update'  : ['page/user-pass-update/index.js'],
        'user-pass-reset'   : ['page/user-pass-reset/index.js']
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    //webpack对js的共用模块的打包
    optimization: {
        splitChunks: {
          cacheGroups: {
            // 注意: priority属性
            // 其次: 打包业务中公共代码
            common: {
                name: "commons",
                chunks: "initial",
                minChunks: 2
            },
            // 首先: 打包node_modules中的文件
            vendor: {
              name: "vendor",
              test: /[\\/]node_modules[\\/]/,
              chunks: "all",
              priority: 10
            }
          }
        }
    },
    devServer: {
        contentBase: './dist'
    },
    resolve:{
        //在项目中配置别名  减少引用路径
        alias:{
            node_modules    : path.join(__dirname, '/node_modules'),
            util            : path.join(__dirname,'src','util'),
            page            : path.join(__dirname,'src','page'),
            service         : path.join(__dirname,'src','service'),
            image           : path.join(__dirname,'src','image'),
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                     MiniCssExtractPlugin.loader,{
                        loader:'css-loader',
                        options: {
                            minimize: true
                          }      
                    }
                ]
            },
            //打包css的图片，图片大小小于limit设置的8192B的会转化成base字符串引入，减少请求
        {
         test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
         loader: 'url-loader?limit=100&name=resource/[name].[ext]' 
        }
    ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-content','用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码'))
    ]
}