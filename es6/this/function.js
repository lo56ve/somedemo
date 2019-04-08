
/*
 * 在普通函数中，this指向它的直接调用者，如果找不到直接调用者，则是window
 * 此例中test()是一个全局函数
 */
function test() {
	console.log(this);		// window
}


/*
 * 匿名函数，定时器函数，没有宿主对象，this指向window
 */
var obj1 = {
	say: function() {
		setTimeout(function () {
			console.log(this);		// window
		})
	}
}


/*
 * 匿名函数可以通过bind()来绑定宿主对象，此中的_this在不严格模式下等于window，严格模式下为undefined
 */
var obj2 = {
	say: function () {
		var _this = this;
		console.log(this);
		setTimeout(function(){
			console.log(this);
		}.bind(this));
	}
}

/*
 * this的一道面试题
 */
window.val = 1;
var obj = {
	val: 2,
	dbl: function() {
		this.val *= 2;
		val *= 2;
		console.log(val);
		console.log(this.val);
	}
}
// 说出下面的输出结果
obj.dbl();
var func = obj.dbl;
func();		// 全局函数，this指向window
// 2 4 8 8


/*
 * 箭头函数，默认指向定义时，它所处的对象（宿主对象）而不是执行时的对象，定义时，可能是window
 * fn定义时所处的函数中的this是指obj3，，所以不管有多层嵌套，都是obj3
 */
var obj3 = {
	say: function () {
		var fn = () => {
			console.log(this);	// obj3
			setTimeout(() => {
				console.log(this);	// obj3
			});
		}
		fn();
		var f1 = function() {
			console.log(this);		// window
				setTimeout(() => {
				console.log(this);	// window
			});
		}
		f1();
	}
}