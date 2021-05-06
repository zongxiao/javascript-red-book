// 函数定义与调用
function sayHi(name, message) {
  console.log("Hello " + name + ", " + message);
}
sayHi("silence37", "I love you!"); // Hello silence, I love you!

//ECMAScript中的函数不需要指定是否返回值。任何函数在任何时间都可以使用return语句来返回函数的值，用法是后跟要返回的值
function sum(num1, num2) {
  return num1 + num2;
}
let sums = sum(2, 5);
console.log(sums); // 7


// 只要碰到return语句，函数就会立即停止执行并且退出，因此，return语句后面的代码不会被执行
function funuzqn(num1, num2) {
  return num1 * num2;
  console.log("我不会被输出"); // 不会执行
}
console.log(funuzqn(12, 2)); // 24

//一个函数里也可以有多个return语句
function diff(num1, num2) {
  if (num1 < num2) {
    return num2 - num1;
  } else {
    return num1 - num2;
  }
}
console.log(diff(2,10)); // 8


// return语句也可以不带返回值，这时候，函数会立即停止执行并且返回undefined，这种用法常常用于提前终止函数执行
function noreturnval(name) {
  return;
  console.log("hello " + name);
}
console.log(noreturnval("asd")); // undefind


// 注意，严格模式，函数不能以eval或arguments作为名称
// 函数的参数不能叫eval或者arguments
// 两个命名参数不能拥有同一个名称


// 3.8小结
//ECMAScript中的基本数据类型包括Undefined、Null、Boolean、Number、String和Symbol。
//与其他语言不同，ECMAScript不区分整数和浮点值，只有Number一种数值数据类型。
//Object是一种复杂数据类型，它是这门语言中所有对象的基类。
//严格模式为这门语言中某些容易出错的部分施加了限制
//ECMAScript提供了C语言和类C语言中常见的很多基本操作符，包括数学操作符、布尔操作符、关系操作符、相等操作符和赋值操作符等。
//这门语言中的流控制语句大多是从其他语言中借鉴而来的，比如if语句、for语句和switch语句等。
//ECMAScript中的函数与其他语言中的函数不一样。 不需要指定函数的返回值，因为任何函数可以在任何时候返回任何值。不指定返回值的函数实际上会返回特殊值undefined。