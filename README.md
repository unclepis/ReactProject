# ReactProject
webpack+react-rounter+react+es6

# 目录索引
- [项目说明](#项目说明)
- [项目运行](#项目运行)
- [关于路由](#关于路由)
- [关于webpack](#关于webpack)

# 项目说明：
- 根目录下的index.js是项目的入口文件
- 会在根目录下生成一个bundle.js文件
- 跟目录下的index.html会在srcipt标签中加载bundle.js
- package.json加载的依赖主要包括三类：
  1.写react项目需要的react，react-dom和react-router库
  2.编译jsx需要的babel库
  3.项目打包工具webpack
- 项目的node_modules包需要使用npm install安装，会自动加载package.json中的依赖 
# 项目运行：
- 先npm install 加载package.json中的依赖
- npm start 运行package.json中写好的script脚本，使用webpack-dev-server在3000端口起的服务 
# 关于路由
- 如果在routeMap文件夹下的routes.js路由组件中使用react-router的hashHistory路由方式，就会在url通过Hash进行路由跳转
- 如果在routeMap文件夹下的routes.js路由组件中使用react-router的browserHistory路由方式，需要在package.json的script脚本的webpack-dev-server后面加入加入如下命令参数：
~~~
   --history-api-fallback
~~~

或者浏览器的History API路由browserHistory需要在服务器端进行改造，否则当用户请求服务器的某个子路由会报404找不到网页错误

# 关于webpack
- webpack简单的说就是前端构建系统，类似Grunt和Gulp
- 它可以用于模块打包，类似于Browserify,但是可以做更多的事情
- 如何使用webpack:

~~~
npm i -g webpack webpack-dev-server 在全局环境下安装webpack和webpack-dev-server
~~~

- webpack的常用命令:
    1.webpack 用于编译一次开发工程
    2.webpack -p 用于编译产品，会做压缩处理
    3.webpack --watch 用于持续性的对新增内容进行编译
    4.webpack -d 用于声称source map
    5.webpack －－color 用于CLI集成环境更好看

- 通常都会在项目的根目录下生成一个webpack.config.js的文件用来配置webpack的初始化参数，以下说明实力都适用js作为说明，也可以使用jsx等，然后通过babel－loader进行转码编译称js文件。

- 事实上我的理解，因为webpack需要使用babel－loader对js或者jsx文件进行转码，css－loader对css，sass或者less文件进行转码，图片通过image－loader，然后把这些文件打包到一个output的文件中，例如bundle.js，然后在指定的html入口文件中通过script标签进行引用

## 项目的入口文件entry file
    1. 入口文件就是一个文件用于webpack读取并生成bundle.js

    ~~~
        module.exports={
            entry:'./index.js' // 单个入口文件传入字符串
            output:{
                filename:'bundle.js'
            }
        };
    ~~~
    2.可以给webpack指定多个文件入口

    ~~~
         module.exports={
            entry:{
                bundle1:'./index1.js', // 多个入口文件使用对象，并且key值就是文件的名称
                bundle2:'./index2.js',
            }// 单个入口文件传入字符串
            output:{
                filename:'[name].js' // name就指代bundle1，bundle2
            }
        };
    ~~~

## babel-loader
- loaders就是一个与处理器，用来把应用中的源文件进行转换。

~~~
    module.exports={
        entry:'./index.js',
        output:{
            filename:bundle.js
        },
        module:{
            loaders:[
                {
                    test:/\.js[x]?$/,
                    exclude:/node_modules/,
                    loader:'babel-loader?preset[]=es2015&presets[]=react'
                }
            ]
        }
    };
~~~
- 在webpack.config.js文件中，module.loaders这个字段就是一个数组，它用来配置所有的加载器loader，上面例子中的babe-preset-es2015和babel-preset-react就是用babel把源文件转译成es2015和react。

## css-loader
- webpack允许你使用commonjs的方式，通过require把css文件引入到js文件中，然后使用css－loader对css文件进行预处理

~~~
    //index.css
    h1{
        color:red;
    }
    // index.js
    require(./index.css);
    //index.html
    <script src='bundle.js'></script>
    //webpack.config.js
    module.exports={
        entry:'./index.js',
        output:{
            filename:'bundle.js'
        },
        module:{
            loaders:[
                {
                    test:/\.css$/,
                    loader:'style-loader!css-loader'
                    //loaders:['style-loader','css-loader']这样的方式也可以
                }
            ]
        }
    }
~~~

- 需要使用两个loader来转化css文件
    1.css－loader用来读区css文件
    2.style－loader用来插入style标签到html页面中
    3.不同的loader需要通过！叹号符号进行连接，通过loaders:['style-loader','css-loader']的方式也可以
    4.css文件中的样式会通过internal style sheet的方式内联样式出现在html文件中
## image loader
- webpack也允许require图片到js文件中
- url-loader用于转换图片文件，增加了limit参数，如果图片的大小比limit的值小，图片被转换成数据url，否则被转化成一般的url
- 和url一样，通过？来传递参数
## css module
- css-loader?modules这个问号后面的查询变量modules触发css modules
- 默认你定义在css文件中的样式都是局部作用域，可以通过：global()切换成全局作用域

~~~
    //index.css
    .test{
        color:red;
    }
    :global(.test){
        color:green;
    }

    //index.js
    import style from './index.css'

    <h1 className={test}>global h1 with red color</h1>
    <h1 className={style.test}> local h1 with red color</h1>

~~~
- 简单的说css模块化就是：
    1.默认css文件都是全局的，如果想要局部的样式，需要定义class
    2.在css文件中默认定义的局部变量，全局变量需要加:global()
    3.在js文件中引用css module，如果直接使用就是使用的全局变量，否则需要引入css的类，通过类访问的属性为局部的
    4. 在css modules中可以一个选择器即成另一个,js文件的使用还是一样

    ~~~
        // 在App.css中，让.title继承.className 
        .className {
            background-color: blue;
        }

        .title {
            composes: className;// 即成同文件的样式
            color: red;
        }
        
         .title1{
            composes: className1 from ‘some/path’;// 从别的文件继承样式
            color: red;
        }
    ~~~
    5. 安装PostCSS和postcss-modules-values就可以在css module中输入变量了
        1）npm install postcss-loader postcss-modules-value --save
        2)配置webpack

    ~~~
        var values = require('postcss-modules-values');

        module.exports = {
        entry: __dirname + '/index.js',
        output: {
            publicPath: '/',
            filename: './bundle.js'
        },
        module: {
            loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules!postcss-loader"
            },
            ]
        },
        postcss: [
            values
        ]
        };
    ~~~
         3）在define.css文件中定义变量 @value red : red;
         4) 在需要使用的css文件中引入define.css
            @value test :'./define.css'
            @value red from test;
            .title{
                color:colors;
            }

## UglifyJs plugin
- webpack有第三方插件的扩展系统
UglifyJs plguin将会对生成的bundle.js文件进行压缩
- 首先在webpack.config.js文件中require引入webpack

~~~
    var webpack = require('webpack');
    var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

    module.exports={
        plugins:[
            new uglifyJsPlugin({
                compress:{
                    warning:false
                }
            })
        ]
    }
~~~

## html webpack plugin
- html-webpack-plugin可以生成index.html
- var htmls = require('html-webpack-plugin')
- 使用了html－webpack－plugin就不需要自己些index.html文件了

## open browser webpack plugin
- open－browser－plugin可以自动打开一个新的浏览器窗口当webpack加载
- var browser = require(open-browser-plugin)
- 当运行npm脚本运行webpack的使用会自动在指定的端口打开浏览器

~~~
    module.exports ={
        plugins:[
            new htmls({
                title:'webpack-demos',
                filename:'index.html'
            }),
            new browser({
                url:'http://localhost:8080'
            })
        ]
    }
~~~

## hot module repalcement
- 在应用运行中，当替换新增或者删除模块都不需要重载整个页面
- webpack-dev-server --hot --inline
    1.--hot:增加HotModuleReplacementPlugin并将服务器切换成热加载模式
    2.--inline 嵌入webpack－dev－server的运行时间显示

## 代码分割
- 在大型的应用中代码放倒一个文件中事不高效的方式，webpack允许将文件打包成小捆chunk，特别事一部分代码需要在特定场景下引入
- 首先需要指定代码切分的点

~~~
    // index.js
    requre.ensure(['./enter'],function(require){
        var content = require('./enter');// enter.js为切分点
        document.open();
        document.write('<h1>content</h1>');
        document.close();
    };
~~~
- require.ensure告诉webpack在./test.js要从bundle.js文件中切分出来称为独立的捆chunk
- 从表面上看，感觉不出来分开大包了，但是事实上，webpack生成了output定义的输出文件和a.js文件到不同的捆中bundle.js和1.bundle.js，当需要的时候就从bundle.js中加载1.bundle.js

## 公共捆包 common chunk
- 当多个script脚本有共有的chunk，就可以使用CommonsChunkPlugin把他们提出来

~~~
    // main1.jsx
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById('a')
);

    // main2.jsx
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h2>Hello Webpack</h2>,
  document.getElementById('b')
);
    //index.html
<html>
  <body>
    <div id="a"></div>
    <div id="b"></div>
    <script src="init.js"></script>
    <script src="bundle1.js"></script>
    <script src="bundle2.js"></script>
  </body>
</html>
    // webpack.config.js
    var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
    module.exports = {
  entry: {
    bundle1: './main1.jsx',
    bundle2: './main2.jsx'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  plugins: [
    new CommonsChunkPlugin('init.js')
  ]
}
~~~

## 第三方库捆包 venor chunk

~~~
    // main.js
    var $ = require('jquery');
    $('h1').text('Hello World');

    // index.html
    <html>
    <body>
        <h1></h1>
        <script src="vendor.js"></script>
        <script src="bundle.js"></script>
    </body>
    </html>

    // webpack.config.js
    var webpack = require('webpack');
    module.exports = {
    entry: {
        app: './main.js',
        vendor: ['jquery'],
    },
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js')
    ]
    };
~~~
- 如果想要引入的三方库在任意模块中都可以使用而且不需要使用require引入到指定的模块中，就需要使用ProvidePlugin

~~~
    // main.js
    $('h1').text('Hello World');


    // webpack.config.js
    var webpack = require('webpack');

    module.exports = {
    entry: {
        app: './main.js'
    },
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
        })
    ]
    };
~~~
