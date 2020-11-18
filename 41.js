// 变量、作用域与内存
//  通过变量使用原始值与引用值
//  理解执行上下文
//  理解垃圾回收

const { type } = require("os");

// 4.1 原始值与引用值
console.log("--------4.1 原始值与引用值");
// 6种原始值: undefined null boolean number string symbol
// 引用值：保存在内存中的对象 在操作对象时，实际上操作的是对该对象的引用（reference）而非实际的对象本身。
// 动态属性
// 对于引用值而言，可以随时添加修改和删除其属性和方法
let person = new Object();
person.name = "Nicholas";
console.log(person.name); // Nicholas

// 原始值不能有属性，尽管尝试给原始值添加属性不会报错
let nameda = "dasd";
nameda.age = 27;
console.log(nameda.age); // undefined

// 原始类型的初始化可以只使用原始字面量形式，如果使用的是new关键字，则JavaScript会创建一个object类型的实例，其行为类似原始值
let namedd = "dd";
let nameee = new String("ee");
namedd.age = 27;
nameee.age = 26;
console.log(namedd.age); // undefined
console.log(nameee.age); // 26
console.log(namedd); // dd
console.log(nameee) // [String: 'ee'] { age: 26 }
console.log(nameee.toString()); // ee
console.log(typeof namedd); //string
console.log(typeof nameee); //object

// 4.1.2 复制值
console.log("--------4.1.2 复制值");
let numone = 5;
let numtwo = numone;
numone = 6;
console.log(numtwo) // 5
// 这里numone和numtwo是完全独立的，互不干扰

//在把引用值从一个变量赋给另一个变量时，存储在变量中的值也会被复制到新变量所在的位置。区别在于，这里复制的值实际上是一个指针，它指向存储在堆内存中的对象。操作完成后，两个变量实际上指向同一个对象，因此一个对象上面的变化会在另一个对象上反映出来，
let objone = new Object();
let objtwo = objone;
objone.name = "Nicholas";
console.log(objtwo.name); // Nicholas


// 4.1.3 传递参数
console.log("--------4.1.3 传递参数");
// ecmascript中所有函数的参数都是按值传递的。这意味着函数外的值会被复制到函数内部的参数中，就像一个变量复制到另一个变量一样。但是不会影响外部传入的
function addTen(num) {
  num += 10;
  return num;
}
let count = 20; //原始值赋值
let addTenResult = addTen(count);
console.log(count); // 20  没有发生改变
console.log(addTenResult); // 30

// 很多开发者错误的认为，当在局部作用于中修改对象而变化反映到全局时，就意味着参数是按引用传递的。为证明对象是按值传递的，看下面的例子
function setName(inputobj) {
  inputobj.name = "DA";
  inputobj = new Object();
  inputobj.name = "EQ";
  console.log(inputobj.name); // EQ
}
let dni = new Object();
setName(dni);
console.log(dni.name); // DA
//当dni传入setName()时，其name属性被设置为"DA"。然后变量obj被设置为一个新对象且name属性被设置为"EQ"。如果dni是按引用传递的，那么dni应该自动将指针改为指向name为"EQ"的对象。可是，当我们再次访问dni.name时，它的值是"DA"，这表明函数中参数的值改变之后，原始的引用仍然没变。当obj在函数内部被重写时，它变成了一个指向本地对象的指针。而那个本地对象在函数执行结束时就被销毁了。

//注意 ECMAScript中函数的参数就是局部变量。


// 4.1.4 确定类型
console.log("-------- 4.1.4 确定类型");
// 如果值为对象或者为null 那么typeof返回object
// typeof虽然对原始值很有用，但它对引用值的用处不大。我们通常不关心一个值是不是对象，而是想知道它是什么类型的对象。为了解决这个问题，ECMAScript提供【instanceof】操作符，语法如下

// result = variable instanceof constructor   如果变量是给定引用类型的实例，则返回true
let objca = new Object(), strdas = "121111";
let objdc = objca;
console.log(objca instanceof Object); // true
console.log(strdas instanceof Object); // false
console.log(objdc instanceof Object); // true

let arraa = [1, 2];
let arrbb = arraa; // arrbb变量存储指针，指针指向的是arraa的内存地址
arrbb[2] = 3;
console.log(arraa); // [1, 2, 3]
console.log(typeof arraa); // object
console.log(arraa instanceof Array); // true
console.log(arraa instanceof Object); // true      数组也是按引用复制的
//按照定义，所有引用值都是Object的实例，因此通过instanceof操作符检测任何引用值和Object构造函数都会返回true。类似地，如果用instanceof检测原始值，则始终会返回false，因为原始值不是对象。


