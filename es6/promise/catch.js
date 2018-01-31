/*
 * catch()，是then(undefined, onRejected)的别名，用于指定发生错误时的回调函数
 * catch()常用于抓取错误，无论是resolve()中的错误还是reject()中的错误
 * 最好用catch()来替代reject()
 */
var promise = new Promise((resolve, reject) => {
	console.log(begin);
})

 promise.then((resolve, reject) => {
 	console.log('resolve')
 }).catch((error) => {
 	console.log(error);
 })