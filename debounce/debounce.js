// 防抖：无论怎么触发事件，一定在事件触发n秒之后才执行，如果在一个事件触发的n秒内又触发事件，则以
// 新的时间的时间为准，n秒后才执行，总之，就是要等触发完事件n秒内不再触发事件

var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};


function debounce(func, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait);
    }
}

container.onmousemove = debounce(getUserAction, 1000);