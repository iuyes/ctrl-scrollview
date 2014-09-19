;
(function(win, ctrl) {


    var incId = 0;

    function Scrollview(element, options) {
        var that = this;
        var id = Date.now() + '-' + (++incId);
        var root = document.createDocumentFragment();

        if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
            options = arguments[0];
            element = null;
        }
        if (!element) {
            element = document.createElement('h1');
            root.appendChild(element);
        }
        options = options || {};

        element.setAttribute('data-ctrl-name', 'scrollview');
        element.setAttribute('data-ctrl-id', id);

        var viewModel = {};
        Object.defineProperty(this, 'viewModel', {
            get: function() {
                return viewModel;
            },
            set: function(v) {
                if (!v) {
                    throw new Error('Non expected value');
                } else {
                    viewModel = v;
                    that.syncViewModel();
                }
            }
        });

        this.syncViewModel = function() {
            // TODO
            element.innerHTML = 'ctrl.<span>scrollview</span>'
        }

        this.addEventListener = function() {
            element.addEventListener.apply(element, arguments);
        }

        this.removeEventListener = function() {
            element.removeEventListener.apply(element, arguments);
        }

        this.remove = function() {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }

        this.element = element;
        this.root = root;
    }

    ctrl.scrollview = Scrollview


})(window, window['ctrl'] || (window['ctrl'] = {}));