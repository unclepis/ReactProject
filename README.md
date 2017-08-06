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