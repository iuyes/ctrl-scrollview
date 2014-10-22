(function () {
    // scrollview.css
    var cssText = "" +
"[data-ctrl-name=scrollview]{width:100%;height:100%;overflow:hidden;position:relative}[data-ctrl-name=scrollview] .scroll-view{width:100%;position:absolute}";
    // cssText end

    var styleEl = document.createElement("style");
    document.getElementsByTagName("head")[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText
        } catch(e) {
            styleEl.innerText = cssText;
        }
    }
}());
