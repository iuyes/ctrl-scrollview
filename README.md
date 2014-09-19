# ctrl.scrollview

## 最新版本

**0.1.0**

## 依赖库

* [lib-motion](http://gitlab.alibaba-inc.com/mtb/lib-motion/tree/master)  
* [lib-gesture](http://gitlab.alibaba-inc.com/mtb/lib-gesture/tree/master)  
* [lib-scroll](http://gitlab.alibaba-inc.com/mtb/lib-scroll/tree/master)  


完整引用举例：

    <link href="http://g.tbcdn.cn/mtb/??ctrl-scrollview/0.1.0/scrollview.css" rel="stylesheet" type="text/css" />
    <script src="http://g.tbcdn.cn/mtb/??lib-motion/1.0.1/motion.js,lib-gesture/1.1.7/gesture.js,lib-scroll/2.3.7/scroll.js,ctrl-scrollview/0.1.0/scrollview.js"></script>

## 用Grunt打包

运行 `npm install`，来安装所需的依赖模块。关于NPM的知识，请参见[nodejs](http://nodejs.org/);

运行 `grunt`，来对项目进行打包。关于Grunt的知识，请参见[gruntjs](http://gruntjs.com/);

## 如何使用

### 初始化

    var Scrollview = ctrl.scrollview;
    var instance = new Scrollview({
        //此处声明参数
        a: 'a',
        b: 1
    });
    document.body.appendChild(instance.root);

### 标准初始化参数

**a**

参数a的作用描述

**b**

参数b的作用描述