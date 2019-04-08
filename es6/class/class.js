class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	sayHello() {
		console.log('hello')
	}

	sayHi() {
		console.log('hi')
	}
}


/* 上述类与es5原型等同
Point.prototype = {
	sayHello (){
		console.log('hello')
	},
	sayHi () {
		console.log('hi')
	}
}
*/

/*
 * class只是一个语法糖，绝大部分功能，ES5原型都可以做到
 * 类内部的方法是不可枚举的，但是在ES5中的方法是可以枚举的
 * 类默认执行在严格模式下，所以不用'use strict'
 */

console.log(typeof Point)		// 'function'，类的数据类型是函数
console.log(Point === Point.prototype.constructor)		// true，类本身指向构造函数

var b = new Point()
b.sayHello()	// 'hello'，必须通过new来调用实例，和es5构造函数不一致，es5构造函数可以直接执行构造函数不会报错。在类的实例上调用方法，其实就是调用原型上的方法


/*
 * 一个类必须有construction方法，一个construction方法会被默认添加
 */
class Foo() {
}

// 等同于
class Foo() {
	constructor() {}	// construction方法默认返回实例对象（即this），完成可以指向返回另外一个对象
}

// 改变指向的实例对象
class Foo() {
	constructor() {
		return Object.create(null)
	}
}
new Foo() instanceof Foo	// false，指向了一个全新的对象

/*
 * 实例的属性除非显式地定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上），和ES5一样
 */
var point = new Point(2, 3)
point.hasOwnPrototype('x')	// true
point.hasOwnPrototype('y')	// true
point.hasOwnPrototype('sayHello') // false
point._proto_.hasOwnPrototype('sayHello')	// true

var p1 = new Point();
var p2 = new Point();
console.log(p1._proto_ ==== p2._proto_)	// true，实例共享同一个原型
// _proto_并不是语言本身的特性，这是各大厂商具体实现添加的私有属性，不建议使用，如果需要可以使用Object.getPrototypeOf方法来获取实例对象的原型，然后再添加方法和属性

// 类不会函数提升
new Rab() {}	// 报错
class Rab{}	

// 类的方法内部如果含有this，它默认指向类的实例，如果单独拿方法出来用，需要小心this的指向
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
// 上述中单独把printName()方法拿出来使用，其中的this指向了window，window中没有print()方法，所以报错
// 可以在construction中改变方法的this指向
class Logger {
	constructor() {
		this.printName = this.printName.bind(this)		// 这就是react中组件采用的方法，还有其他两种详见http://es6.ruanyifeng.com/#docs/class
	}
}

// 取值函数getter和存值函数setter，对某个属性设置存值函数和取值函数，拦截属性的存取行为。。和ES5一样
class MyClass {
	constructor() {}

	get prop () {
		return 'getter'
	}

	set prop (value) {
		console.log('setter: ' + value)
	}
}
let inst = new.MyClass()
inst.prop = 111		// setter: 111
inst.prop 			// 'getter'
// 上述代码，给prop属性设置属性值为111，然后再通过取值函数拿出来


/*
 * 如果在一个方法前加上static关键字，表示该方法不会被实例继承，而是直接通过类来调用，这个称谓“静态方法”
 * 静态方法的this指向的是类，而不是实例
 * 静态方法的属性和方法名可以与非静态方法重名
 */
class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function


/*
 * 子类没有construction函数会被默认添加，同时默认调用super方法继承父类this对象，
 * 子类的构造函数只有调用super之后，才可以使用this关键字，否则会报错，因为子类实例的构建，是基于对父类实例的加工，只有super方法才能返回父类实例
 * 子类会继承父类的静态方法
 */
class ColorPoint extends Point {
}
// 等同于
class ColorPoint extends Point {
	constructor(...args) {
		super(...args)
	}
}

// super，第一种情况作为函数调用，代表父类的构造函数，子类的构造函数必须执行一次super函数
// 下列代码中的super()，代表调用父类的构造函数，但是super()内部的this指的是B，这里的super()相当于  A.prototype.constructor.call(this)
class A {}
class B extends A {
	constructor() {
		super();
	}
}

// super，第二种情况作为对象，在普通函数中，指向父类的原型对象，在静态方法中，指向父类
class A {
	constructor () {
		this.a = 2;
	}
	p() {
		return 2
	}
}
class B extends A {
	constructor() {
		super()
		console.log(super.p())	// 2
		console.log(super.a)	// undefined
	}
}
let b = new B()
// super.p()，就是将super当做一个对象使用，super在普通方法之中，指向A.protortype，所以super.p()相当于 A.prototype.p()
// super.a，获取的是父类原型对象上面的a属性，不是父类A的属性，所以无法通过super调用到