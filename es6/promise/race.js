/*
 * Promise.race(),和Promise.all()一样用于多个Promise实例，包装成一个新的Promise实例
 * 接受一个数组作为参数，当p1，p2，p3中有一个实例的状态发生改变（变为fulfilled或者rejected），p的状态就跟着改变，并把第一个改变状态的promise的返回值传给p的回调函数
 */
 var p1 = new Promise(function(resolve, reject) {
 	setTimeout(() => {
 		console.log('p1已完成');
 		resolve('p1');
 	},2000)
 })

  var p2 = new Promise(function(resolve, reject) {
 	setTimeout(() => {
 		console.log('p2已完成');
 		resolve('p2');
 	},1000)
 })

   var p3 = new Promise(function(resolve, reject) {
 	setTimeout(() => {
 		console.log('p3已完成');
 		reject('p3');
 	}, 500)
 })

Promise.race([p1, p2, p3]).then((value) => {
	console.log('resolve:' + value);
}, (value) => {
	console.log('reject:' + value);
})