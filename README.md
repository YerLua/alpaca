# alpaca

## 简介
  前端技术练手项目
  alpaca是一个用adonisjs框架搭建的后端API服务，adonis是一个nodejs的webMVC框架。作为了解使用adonis,本项目来源于[Build a Twitter Clone With Adonis and Vue](https://scotch.io/courses/build-a-twitter-clone-with-adonis-and-vue)。
  
#### 主要技术与框架
  * [node](https:nodejs.org)
  * [adonis](https://adonisjs.com)
  * [vue](https://vuejs.org)
  * [semanticUI](https://semantic-ui.com)
  
#### 引用与参考
  1. [lession](https://scotch.io/courses/build-a-twitter-clone-with-adonis-and-vue)
  2. [image-upload](https://github.com/dai-siki/vue-image-crop-upload)
  
### run Project 

  1. 安装依赖
  > npm install
  2. 配置环境变量
    修改 .env.example 文件为.env
    更改host、port以及数据库配置
    
  > HOST=127.0.0.1                                                                                                           
  > PORT=3333
    
  > DB_CONNECTION=sqlite                                                                                                     
  > DB_HOST=127.0.0.1                                                                                                         
  > DB_PORT=3306                                                                                                             
  > DB_USER=root                                                                                                             
  > DB_PASSWORD=                                                                                                             
  > DB_DATABASE=adonis                                                                                                       
  
  3. 生成数据库表
  
  > adonis migration:run
  
  4. 启动服务
  
  > adonis serve --dev
  
  5. 启动完成后即可访问[http://[your_host]:[your_port]](http://[your_host]:[your_port])
