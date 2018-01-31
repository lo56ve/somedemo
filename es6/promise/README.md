### Promise对象

Promise对象代表一个未完成，但预计将会完成的操作，有以下三种状态：

- pending：初始值，不是fulfilled，也不是rejected，即新建promise对象实例时
- fulfilled：代表操作成功
- rejected: 代表操作失败

Promise有两种状态改变的方式，既可以从`pending转变为fulfilled`，也可以`从pending转变为rejected`。一旦状态改变，就「凝固」了，会一直保持这个状态，**不会再发生变化**。当状态发生变化，promise.then绑定的函数就会被调用。

- resolve函数的作用：在异步操作成功时调用，并将异步操作的结果，作为参数传递出去； 
- reject函数的作用：在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

> 注意：Promise一旦新建就会「立即执行」，无法取消。这也是它的缺点之一。

### 基本API

#### .then()

对promise添加onFulfilled和onRejected回调（即操作成功时和操作失败时的回调），并返回一个新的promise实例，只有前一个Promise对象状态发生变化时才会被调用

#### .catch()

该方法是.then(undefined, onreJected)的别名，用于指定发生错误时的回调函数

promise对象的错误，会一直向后传递，知道被捕获，即错误总会被下一个 catch所捕获，所以用通常.catch()作为回调函数最后的错误处理。不过这里需要注意：**promise状态一旦改变就会凝固，不会再改变，因此promise一旦fulfilled了，在原来的promise对象中再抛错，也不会变为rejected，不会被catch了。如下代码


	var promise = new Promise(function(resolve, reject) {
	  resolve();
	  throw 'error';
	});
	promise.catch(function(e) {
	   console.log(e);      //This is never called
	});

#### .all()

用法：Promise.all()。由Promise对象调用，接受的参数为一个数组，数组中的每个对象都为promise实例，只有数组中所有的对象状态都变为fulfilled，这个方法才会变为fulfilled（有点像‘与’）。参数中的promise实例并行处理。

#### .race()

用法：Promise.race()。和Promise.all()用法类似，竞速，只要有一个变为fulfilled或者rejected，方法的状态就会改变（有点像‘或’）。参数中的promise实例并行处理。

#### .resolve()

用法：

- Promise.resolve(value);
- Promise.resolve(promise);
- Promise.resolve(thenable);

可以看做是new Promise()的快捷方式，即新建的promise实例中不经过处理，直接触发onFulfilled回调。

#### .reject()

用法和resolve()类似

### 理解的过程：

- 新建一个promise实例，内含有执行的函数
- 然后通过触发onFulfilled或者onRejected
- 将promise实例的状态改变为fulfilled状态或者rejected状态
- 执行相应的resolve回调函数或者reject回调函数
- 返回一个新的promise实例

### 常见问题
	
- 如果是在onFulfilled发生的异常，reject函数是捕获不到的
- 只要是在then()发生的异常，都可以通过catch()捕获到（一般建议用这种）
- 如果是在then中抛错，而没有对错误进行处理（即catch），那么会一直保持reject状态，知道catch了错误
- 在异步回调中抛错，不会被catch到

	function taskA() {
	    console.log(x);
	    console.log("Task A");
	}
	function taskB() {
	    console.log("Task B");
	}
	function onRejected(error) {
	    console.log("Catch Error: A or B", error);
	}
	function finalTask() {
	    console.log("Final Task");
	}
	var promise = Promise.resolve();
	promise
	    .then(taskA)
	    .then(taskB)
	    .catch(onRejected)
	    .then(finalTask);

A抛错时，会按照 taskA → onRejected → finalTask这个流程来处理.


