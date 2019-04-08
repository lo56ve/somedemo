/*
 * resolve和reject的语法：(可以看做是new Promise()的快捷方式)
 * Promise.resolve(value)
 * Promise.resolve(promise)
 * Promise.resolve(thenable)
 */

 Promise.resolve('Success');
// 等同于
new Promise(function(resolve){
	resolve('Success');
})
// 1.这段代码会让这个promise对象立即进入resolved状态，并将结果success传递给then指定的onFulfilled回调函数，由于Promise.resolve()也会返回Promise对象，因此可以用.then()处理其返回值
Promise.resolve([1,2,3]).then(function(value) {
  console.log(value[0]);    // => 1
});


// 2.Promise.resolve()另一个作用就是将thenable对象（即带有then方法的对象）转换为promise对象
var p1 = Promise.resolve({ 
    then: function (resolve, reject) { 
        resolve("this is an thenable object!");
    }
});
console.log(p1 instanceof Promise);     // => true

// 无论是在什么时候抛出异常，只要promise状态变为resolved和rejected，状态不会再改变，和新建promise是一样的
// reject()同resolve()