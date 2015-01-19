# ctrl.scrollview

## 最新版本

**0.2.1**

## 依赖库

* [lib-motion](http://gitlab.alibaba-inc.com/mtb/lib-motion/tree/master)  
* [lib-animation](http://gitlab.alibaba-inc.com/mtb/lib-animation/tree/master) 
* [lib-cubicbezier](http://gitlab.alibaba-inc.com/mtb/lib-cubicbezier/tree/master)
* [lib-gesture](http://gitlab.alibaba-inc.com/mtb/lib-gesture/tree/master)  
* [lib-scroll](http://gitlab.alibaba-inc.com/mtb/lib-scroll/tree/master) 
* [ctrl-loading](http://gitlab.alibaba-inc.com/mtb/ctrl-loading/tree/master)


完整引用举例：

    <script src="http://g.tbcdn.cn/mtb/ctrl-scrollview/{{version}}/??scrollview_css.js, combo.js,scrollview.js"></script>

## 用Grunt打包

运行 `npm install`，来安装所需的依赖模块。关于NPM的知识，请参见[nodejs](http://nodejs.org/);

运行 `grunt`，来对项目进行打包。关于Grunt的知识，请参见[gruntjs](http://gruntjs.com/);

## 初始化

    var scrollView = new ctrl.scrollview(scrollOptions);
    document.body.appendChild(scrollView.root);

### 参数

请参考[lib.scroll](http://gitlab.alibaba-inc.com/mtb/lib-scroll/blob/master/README.md)的初始化参数。

### DOM结构

	<div data-ctrl-name="scrollview">
		<div class="scroll-wrap">
			<div class="scroll-content">
			</div>
		</div>
	</div>

### 代码示例

[代码片段](http://gitlab.alibaba-inc.com/mtb/ctrl-scrollview/snippets/1040)

## 高级功能

### 顶部/底部固定元素

    scrollView.fixed.enable = true;
	scrollView.fixed.topElement = '<head>I\'m header</head>';
    scrollView.fixed.bottomElement = '<footer>I\'m footer</footer>';

### 懒加载

被懒加载识别的元素，其特征为：

  - lazyload属性为true（推荐），或者拥有`lazy`类名
  - img元素的data-src属性不为空（对应img元素的src属性）
  - 非img元素的data-image属性不为空（对应非img元素的background-image属性）

```
    scrollView.lazyload.enable = true;
    scrollView.lazyload.realtime = false; // 是否在滚动的时候执行
    scrollView.lazyload.handler = function(el) {
        // TODO 可以处理一些特殊的功能
    }
```

### 吸顶元素（sticky）

被吸顶的元素，其特征为：

 - sticky属性为true（推荐），或者拥有`sticky`类名
 - 必须有固定高度
 - 其所有子元素会作为吸顶的元素来使用

```
	scrollView.sticky.enable = true;
```

### 下拉刷新（pullRefresh）

    scrollView.pullRefresh.enable = true;
	scrollView.pullRefresh.handler = function(done) {
        // 做一些刷新操作，完成后回调done方法。
		done();
    }


### 上拉更新（pullUpdate）

    scrollView.pullUpdate.enable = true;
	scrollView.pullUpdate.handler = function(done) {
        // 做一些更新操作，完成后回调done方法。
		done();
    }
    

