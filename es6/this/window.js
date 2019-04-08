/*
 * 全局变量默认挂载在window对象下，无论是不是立即执行函数
 */
 
var a = 2;
console.log(window.a);
(function() {
	a =3;
})();
console.log(window.a);