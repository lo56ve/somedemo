/*
 * promise对象代表一个未完成，但预计将来会完成的操作，有以下三种操作
 * pending: 初始值，不是fulfilled，也不是rejecteded
 * fulfilled: 代表操作成功
 * rejected: 代表操作失败
 */

 var promise = new Promise((resolve, reject) => {
 	console.log('before resolve');
 	resolve();
 	console.log('after resolve');
 })

 promise.then(() => {
 	console.log('resolve');
 })

console.log('outer');
// then()指定的回调函数，将在当前脚本所有同步任务执行完才会执行

/*
 * then(),对promise添加onFulfilled和onRejected回调，并返回的是一个Promise实例，且返回值将作为参数传入这个新的promise的resolve函数
 */
