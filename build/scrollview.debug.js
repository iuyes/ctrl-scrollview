;(function (win, lib, ctrl) {
var doc = win.document;
var ua = win.navigator.userAgent;
var Firefox = !!ua.match(/Firefox/i);
var IEMobile = !!ua.match(/IEMobile/i);
var cssPrefix = Firefox?'-moz-':IEMobile?'-ms-':'-webkit-';
var stylePrefix = Firefox?'Moz':IEMobile?'ms':'webkit';


function setHTMLElement(parent, child) {
    if (typeof child === 'string') {
        parent.innerHTML = child;
    } else if (child instanceof HTMLElement) {
        parent.innerHTML = '';
        parent.appendChild(child);
    } else if (child instanceof Array || child instanceof NodeList) {
        var fragment = doc.createDocumentFragment();
        Array.prototype.slice.call(child).forEach(function(node) {
            fragment.appendChild(node);
        });
        parent.appendChild(fragment);
    }
}

var incId = 0;
function ScrollView(root, options) {

    function fireEvent(name, extra) {
        var ev = doc.createEvent('HTMLEvents');
        ev.initEvent(name, false, false);
        if (extra) {
            for (var key in extra) {
                ev[key] = extra[key];
            }
        }
        root.dispatchEvent(ev);
    }

    var that = this;
    var id = Date.now() + '-' + (++incId);

    if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
        options = arguments[0];
        root = null;
    }

    options = options || {};
    if (!root) {
        root = doc.createElement('div');
    }
    var scrollWrap = root.firstElementChild || doc.createElement('div');
    var scrollElement = scrollWrap.firstElementChild || doc.createElement('div');
    
    if (!scrollWrap.parentNode) {
        root.appendChild(scrollWrap);
    }

    if (!scrollElement.parentNode) {
        scrollWrap.appendChild(scrollElement);
    }
    
    root.setAttribute('data-ctrl-name', 'scrollview');
    root.setAttribute('data-ctrl-id', id);
    root.setAttribute('data-direction', options.direction !== 'x'?'vertical':'horizontal');
    if (scrollWrap.className.indexOf('scroll-wrap') < 0) {
        scrollWrap.className = scrollWrap.className.split(' ').concat('scroll-wrap').join(' ').replace(/^\s+/, '');    
    }
    if (scrollElement.className.indexOf('scroll-content') < 0) {
        scrollElement.className = scrollElement.className.split(' ').concat('scroll-content').join(' ').replace(/^\s+/, '');    
    }
    
    options.scrollElement = scrollElement;
    options.scrollWrap = scrollWrap;

    var scroll = new lib.scroll(options);

    this.scrollWrap = scrollWrap;
    this.scrollElement = scrollElement;
    this.scroll = scroll;
    this.root = this.element = root;   

    for (var name in scroll) {
        void function(name) {
            if (typeof scroll[name] === 'function') {
                that[name] = function() {
                    return scroll[name].apply(scroll, arguments);
                }
            } else {
                Object.defineProperty(that, name, {
                    get: function() {
                        return scroll[name];
                    },
                    set: function(v) {
                        scroll[name] = v;
                    }
                })
            }
        }(name);
    }

    Object.defineProperty(this, 'forceRepaint', {
        value: new ForceRepaint(this)
    });

    Object.defineProperty(this, 'fixed', {
        value: new Fixed(this)
    });

    Object.defineProperty(this, 'lazyload', {
        value: new Lazyload(this)
    });

    /*
    Object.defineProperty(this, 'plugin', {
        get: function() {
            return plugins;
        }
    });

    Object.defineProperty(plugins, 'forceRepaint', {
        set: function(v) {
            if (!!v) {
                scroll.enablePlugin('force-repaint');
            }
        }
    });
    
    Object.defineProperty(plugins, 'fixed', {
        set: function(v) {
            if (!v) return;

            var opt = {};

            if (v instanceof HTMLElement || typeof v === 'string') {
                scroll.enablePlugin('fixed', {
                    topElement: v
                });
            } else if (typeof v === 'object') {
                var name = ['top', 'bottom', 'left', 'right'].filter(function(n) {
                    return v[n] != null;
                })[0];
                if (name) {
                    opt[name + 'Offset'] = v[name];
                    opt[name + 'Element'] = v.element;
                } else {
                    opt = v;
                }
                scroll.enablePlugin('fixed', opt);
            }
        }
    });

    Object.defineProperty(plugins, 'lazyload', {
        set: function(v) {
            if (!v) return;

            scroll.enablePlugin('lazyload', {
                realTimeLoad: v===true?true:!!v.realTimeLoad,
                onlazyload: function() {
                    fireEvent('plugin:lazyload');
                    v.onlazyload && v.onlazyload.apply(v, arguments);
                }
            });

            if (v.onlazyload) {
                that.addEventListener('plugin:lazyload', v.onlazyload);
            }
        }
    });

    Object.defineProperty(plugins, 'sticky', {
        set: function(v) {
            if (!v) return;

            if (v === true) {
                scroll.enablePlugin('sticky');
            } else if (!!v && typeof v === 'object'){
                scroll.enablePlugin('sticky', v);
            }
        }
    });

    Object.defineProperty(plugins, 'refresh', {
        set: function(v) {
            if (!v) return;

            var height = win.rem?3 * win.rem:60;
            var pullingText = '下拉即可刷新...';
            var processingText = '正在刷新...';
            var refreshLoading;
            var element;

            if (!!v && typeof v === 'object') {
                height = v.height || height;
                element = v.element || element;
                pullingText = (v.text || [])[0] || v.pullingText || pullingText;
                processingText = (v.text || [])[1] || v.processingText || processingText;
            }

            if (!element) {
                refreshLoading = new ctrl.loading();
                refreshLoading.arrowDirection = 'down';
                refreshLoading.mode = 'draw';
                refreshLoading.text = pullingText;
                element = refreshLoading.element;
            }

            scroll.enablePlugin('refresh', {
                height: height,
                element: element,
                onpull: function(top) {
                    if (refreshLoading) {
                        refreshLoading.per = Math.round(top/height * 100);
                    }
                    fireEvent('plugin:refresh:pull');
                    v.onpull && v.onpull.apply(v, arguments);
                },
                onrefresh: function(done) {
                    var isDone = false;
                    function _done() {
                        if (isDone) return;
                        isDone = true;

                        done();
                        if (refreshLoading) {
                            refreshLoading.text = pullingText;
                            refreshLoading.mode = 'draw';
                        }
                    }

                    if (refreshLoading) {
                        refreshLoading.text = processingText;
                        refreshLoading.mode = 'spin';
                    }

                    fireEvent('plugin:refresh', {
                        done: _done
                    });
                    v.onrefresh && v.onrefresh(_done);
                }
            });
        }
    });

    Object.defineProperty(plugins, 'update', {
        set: function(v) {
            if (!v) return;

            var height = win.rem?3 * win.rem:60;
            var pullingText = '上拉加载更多...';
            var processingText = '正在加载...';
            var updateLoading;
            var element;

            if (!!v && typeof v === 'object') {
                height = v.height || height;
                element = v.element || element;
                pullingText = (v.text || [])[0] || v.pullingText || pullingText;
                processingText = (v.text || [])[1] || v.processingText || processingText;
            }

            if (!element) {
                var updateLoading = new ctrl.loading();
                updateLoading.arrowDirection = 'up';
                updateLoading.mode = 'draw';
                updateLoading.text = pullingText;
                element = updateLoading.element;
            }

            scroll.enablePlugin('update', {
                height: height,
                element: element,
                onupdate: function(done) {
                    var isDone = false;
                    function _done() {
                        if (isDone) return;
                        isDone = true;
                        
                        done();
                        if (updateLoading) {
                            updateLoading.text = pullingText;
                            updateLoading.mode = 'draw';
                        }
                    }

                    if (updateLoading) {
                        updateLoading.text = processingText;
                        updateLoading.mode = 'spin';
                    }
                    fireEvent('plugin:update', {
                        done: _done
                    });
                    v.onupdate && v.onupdate(_done);
                }
            });
        }
    });
    */

    Object.defineProperty(this, 'content', {
        get: function() {
            return Array.prototype.slice.call(element.childNodes);
        },
        set: function(content) {
            setHTMLElement(scrollElement, content);
        }
    });
}

function ForceRepaint(view) {
    var scroll = view.scroll;
    var forceRepaintElement = doc.createElement('div');
    forceRepaintElement.className = 'force-repaint';
    forceRepaintElement.style.cssText = 'position: absolute; top: 0; left: 0; width: 0; height: 0; font-size: 0; opacity: 1;';
    view.root.appendChild(forceRepaintElement);

    var enable = false;
    Object.defineProperty(this, 'enable', {
        get: function() {
            return enable;
        },
        set: function(v) {
            enable = v;
        }
    }, false);

    Object.defineProperty(this, 'element', {
        value: forceRepaintElement
    });

    scroll.addScrollingHandler(function () {
        if (!enable) return;
        forceRepaintElement.style.opacity = Math.abs(parseInt(forceRepaintElement.style.opacity) - 1) + '';
    });
}

function Fixed(view) {
    var that = this;
    var scroll = view.scroll;
    var fragment = doc.createDocumentFragment();
    var topFixedElement;
    var bottomFixedElement;
    var leftFixedElement;
    var rightFixedElement;

    var enable = false;
    Object.defineProperty(that, 'enable', {
        get: function() {
            return enable;
        },
        set: function(v) {
            enable = v;
            if (!!enable) {
                if (topFixedElement) {
                    if (!topFixedElement.parentNode) {
                        view.root.insertBefore(topFixedElement, view.scrollWrap);
                    }
                    topFixedElement.style.display = 'block';   
                }
                if (bottomFixedElement) {
                    if (!bottomFixedElement.parentNode) {
                        view.root.appendChild(bottomFixedElement);
                    }
                    bottomFixedElement.style.display = 'block';   
                }
                if (leftFixedElement) {
                    if (!leftFixedElement.parentNode) {
                        view.root.insertBefore(leftFixedElement, view.scrollWrap);
                    }
                    leftFixedElement.style.display = 'block';   
                }
                if (rightFixedElement) {
                    if (!rightFixedElement.parentNode) {
                        view.root.appendChild(rightFixedElement);
                    }
                    rightFixedElement.style.display = 'block';   
                }
            } else {
                topFiexElement && (topFixedElement.style.display = 'none');
                bottomFixedElement && (bottomFixedElement.style.display = 'none');
                leftFixedElement && (leftFixedElement.style.display = 'none');
                rightFixedElement && (rightFixedElement.style.display = 'none');
            }
        }
    });

    if (scroll.axis === 'y') {
        topFixedElement =  doc.createElement('div');
        topFixedElement.className = 'top-fixed';
        topFixedElement.style.cssText = 'left: 0; top: 0; width: 100%;';
        Object.defineProperty(that, 'topElement', {
            get: function() {
                return topFixedElement;
            },
            set: function(v) {
                setHTMLElement(topFixedElement, v);
            }
        });
        Object.defineProperty(that, 'topOffset', {
            set: function(v) {
                topFixedElement.style.top = v + 'px';
            }
        });

        bottomFixedElement = this.bottomFixedElement = doc.createElement('div');
        bottomFixedElement.className = 'bottom-fxied';
        bottomFixedElement.style.cssText = 'left: 0; bottom: 0; width: 100%;';
        Object.defineProperty(that, 'bottomElement', {
            get: function() {
                return bottomFixedElement;
            },
            set: function(v) {
                setHTMLElement(bottomFixedElement, v);
            }
        });
        Object.defineProperty(that, 'bottomOffset', {
            set: function(v) {
                bottomFixedElement.style.top = v + 'px';
            }
        });

    } else {
        leftFixedElement = this.leftFixedElement = doc.createElement('div');
        leftFixedElement.className = 'left-fixed';
        leftFixedElement.style.cssText = 'top: 0; left: 0; height: 100%;';
        Object.defineProperty(that, 'leftElement', {
            get: function() {
                return leftFixedElement;
            },
            set: function(v) {
                setHTMLElement(leftFixedElement, v);
            }
        });
        Object.defineProperty(that, 'leftOffset', {
            set: function(v) {
                leftFixedElement.style.left = v + 'px';
            }
        });

        rightFixedElement = this.rightFixedElement = doc.createElement('div');
        rightFixedElement.className = 'right-fxied';
        rightFixedElement.style.cssText = 'top: 0; right: 0; height: 100%;';
        Object.defineProperty(that, 'rightElement', {
            get: function() {
                return rightFixedElement;
            },
            set: function(v) {
                setHTMLElement(rightFixedElement, v);
            }
        });
        Object.defineProperty(that, 'rightOffset', {
            set: function(v) {
                rightFixedElement.style.right = v + 'px';
            }
        });
    }
}

function Lazyload(view) {
    var that = this;
    var scroll = view.scroll;
    var limit = 4;
    var waitingQueue = [];
    var loadingCount = 0;
    var loaded = {};

    var isRunningLoadingQueue = false;
    function runLoadingQueue() {
        if (isRunningLoadingQueue) return;
        isRunningLoadingQueue = true;

        if (loadingCount < limit && waitingQueue.length > 0) {
            var url = waitingQueue.shift();
            loadingCount++;

            var img = new Image();
            img.src = url;
            img.onload = img.onreadystatechange = function() {
                if (loaded[url] !== true) {
                    loaded[url].forEach(function(cb) {
                        cb && cb(url);
                    });
                    loaded[url] = true;
                    loadingCount--;
                }
                runLoadingQueue();
            }
            runLoadingQueue();
        }

        isRunningLoadingQueue = false;
    }

    function load(url, callback) {
        if (loaded[url] ===  true) {
            return callback(url);
        } else if (loaded[url]) {
            loaded[url].push(callback);
        } else {
            loaded[url] = [callback];
            waitingQueue.push(url);
        }
        runLoadingQueue();
    }

    function checkLazyload(){
        if (!enable) return;

        var elements = Array.prototype.slice.call(scroll.element.querySelectorAll('.lazy'));

        elements.filter(function(el){
            return scroll.isInView(el);
        }).forEach(function(el){
            var imglist;
            var bglist;

            if (el.tagName.toUpperCase() === 'IMG') {
                imglist = [el];
                bglist = [];
            } else {
                imglist = Array.prototype.slice.call(el.querySelectorAll('img[data-src]'));
                bglist = Array.prototype.slice.call(el.querySelectorAll('*[data-image], *[data-background-image]'));
                if (el.hasAttribute('data-image') || el.hasAttribute('data-background-image')) {
                    bglist.push(el);
                }
            }

            imglist.forEach(function(img) {
                var src = img.getAttribute('data-src');
                if (src) {
                    img.removeAttribute('data-src');
                    load(src, function() {
                        img.src = src;
                    });
                }
            });

            bglist.forEach(function(bg) {
                var attr = bg.hasAttribute('data-image')?'data-image':'data-background-image';
                var image = bg.getAttribute(attr);
                if (image) {
                    bg.removeAttribute(attr);
                    load(image, function() {
                        bg.style.backgroundImage = 'url(' + image + ')';    
                    });
                }
            });

            lazyloadHandler && lazyloadHandler(el);

            el.className = el.className.split(' ').filter(function(c) {
                return c !== 'lazy';
            }).join(' ');
        });
    }

    var enable;
    Object.defineProperty(that, 'enable', {
        get: function() {
            return enable;
        },
        set: function(v) {
            enable = v;
        }
    });


    var lazyloadHandler;
    Object.defineProperty(that, 'handler', {
        get: function() {
            return lazyloadHandler;
        },
        set: function(v) {
            lazyloadHandler = v;
        }
    });

    var realtime;
    Object.defineProperty(that, 'realtime', {
        get: function() {
            return realtime;
        },
        set: function(v) {
            realtime = !!v;
            if (realtime) {
                view.forceRepaint.enable = true;
            }
        }
    });

    scroll.addScrollingHandler(function(){
        if (realtime) {
            checkLazyload();    
        }
    });

    scroll.addScrollendHandler(function(){
        checkLazyload();
    });

    scroll.addContentrenfreshHandler(function() {
        checkLazyload();
    });

    lib.animation.requestFrame(function(){
        checkLazyload();
    });

    view.checkLazyload = checkLazyload;
}

ctrl.scrollview = ScrollView;
})(window, window['lib'], window['ctrl'] || (window['ctrl'] = {}));