# ReactProject
webpack+react-rounter+react+es6

# 目录索引
- [项目说明](#项目说明)
- [项目运行](#项目运行)
- [关于路由](#关于路由)

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
