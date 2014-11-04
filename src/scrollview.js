;(function (win, lib, ctrl) {
var doc = win.document;
var isIEMobile = win.navigator.userAgent.match(/IEMobile\/([\d\.]+)/);
var stylePrefix = !!isIEMobile?'ms':'webkit';

var incId = 0;
function ScrollView(scrollWrap, options) {

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
    var views = [];
    var pages = {};
    var id = Date.now() + '-' + (++incId);
    var root;
    var element;

    if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
        options = arguments[0];
        scrollWrap = null;
    }

    options = options || {};
    root = scrollWrap || options.scrollWrap || doc.createElement('div');
    element = options.scrollElement || root.firstElementChild || doc.createElement('div');
    
    if (!element.parentNode) {
        root.appendChild(element);
    }

    if (root !== element.parentNode) {
        console.error(element, ' is not the child of ', root);
        return;
    }    
    
    var rootStyle = getComputedStyle(root);
    if (!rootStyle.width || !rootStyle.height || rootStyle.overflow !== 'hidden') {
        console.warn('必须设置滚动元素的（scrollElement）父级元素（scrollWrap）的width/height/overflow(hidden)');
    }

    root.setAttribute('data-ctrl-name', 'scrollview');
    root.setAttribute('data-ctrl-id', id);
    if (root.className.indexOf('scroll-wrap') < 0) {
        root.className = root.className.split(' ').concat('scroll-wrap').join(' ').replace(/^\s+/, '');    
    }
    if (element.className.indexOf('scroll-view') < 0) {
        element.className = element.className.split(' ').concat('scroll-view').join(' ').replace(/^\s+/, '');    
    }
    

    options.scrollElement = element;
    options.scrollWrap = root;
    var scroll = new lib.scroll(options);

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

    scroll.init();

    var plugins = {};
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


    Object.defineProperty(this, 'content', {
        get: function() {
            return Array.prototype.slice.call(element.childNodes);
        },
        set: function(content) {
            if (typeof content === 'string') {
                element.innerHTML = content;
            } else if (content instanceof HTMLElement) {
                element.innerHTML = '';
                element.appendChild(content);
            } else if (content instanceof Array || content instanceof NodeList) {
                var fragment = doc.createDocumentFragment();
                Array.prototype.slice.call(content).forEach(function(node) {
                    fragment.appendChild(node);
                });
                element.appendChild(fragment);
            }
        }
    });

    this.addEventListener = function(name, handler) {
        this.root.addEventListener(name, handler, false);
    }

    this.removeEventListener = function(name, handler) {
        this.root.removeEventListener(name, handler, false);
    }

    this.scrollWrap = this.root = root;
    this.scrollElement = this.element = element;
    this.scroll = scroll;
}

ctrl.scrollview = ScrollView;
})(window, window['lib'], window['ctrl'] || (window['ctrl'] = {}));