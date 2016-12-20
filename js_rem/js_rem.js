//	控制rem Js代码：
//	设计稿为1080px,除以100换算成rem单位 

(function (doc, win) {
    var  docEl = doc.documentElement
        ,resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
        ,recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 1080) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);