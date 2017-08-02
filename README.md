# ReactProject
webpack+react-rounter+react+es6

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
- npm start 运行package.json中写好的script脚本，使用webpack-dev-server在8000端口其的服务 
