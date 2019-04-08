/*
 * 用法：Promise.all()方法接受一个数组作为参数，数组中的对象均为promise实例，如果不是一个promise，该项会被用Promise.resolve转换为一个promise
 * 当p1,p2,p3状态都变为fulfilled，Promise.all()才会变成fulfilled，并将三个promise返回的结果，按照参数的顺序（而不是resolve的顺序）存入数组，传给回调暗回调函数
 * 当p1,p2,p3其中之一状态变为rejected，Promise.all()状态也会变为rejected，并把第一个被reject的promise的返回值，传给Promise.all()的回调函数
 * 这多个promise是同时开始，并行执行的，而不是顺序执行
 */

var timeBegin = new Date().getTime();

var p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('p1')
		console.log((new Date().getTime() - timeBegin)/1000);
		resolve('p1');
	}, 2000);
})

var p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('p2')
		console.log((new Date().getTime() - timeBegin)/1000);
		resolve('p2');
	}, 1000);
})

var p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('p3')
		console.log((new Date().getTime() - timeBegin)/1000);
		resolve('p3');
	}, 3000);
})

Promise.all([p1, p2, p3]).then((p) => {
	console.log(p + (new Date().getTime() - timeBegin)/1000);
})

