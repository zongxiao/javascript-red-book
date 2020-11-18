const { url } = require("inspector");

console.log("--------------------------4.2  执行上下文与作用域");
// 变量或函数的上下文决定了他们可以访问哪些数据。全局上下文就是最外层的上下文，根据ECMAScript实现的宿主环境，表示全局上下文的对象可能不一样。浏览器中，全局上下文也就是window对象。所有通过var定义的全局变量和函数都会成为window对象的属性和方法。使用let 和 const的顶级声明不会再全局上下文中。但是再作用域链解析上效果是一样的

var color = "blue";
function changeColor() {
  if (color === "blue") {
    color = "red";
  } else {
    color = "blue";
  }
}
changeColor();
console.log(color); // red
//函数changeColor()的作用域链包含两个对象：一个是它自己的变量对象（就是定义arguments对象的那个），另一个是全局上下文的变量对象。这个函数内部之所以能够访问变量color，就是因为可以在作用域链中找到它。

var color2 = "blue";
function changeColor2() {
  let anotherColor = "red";

  function swapColors() {
    let tempColor = anotherColor;
    anotherColor = color2;
    color2 = tempColor;
    //这里可以访问color2、anotherColor和tempColor
  }
  // 这里可以访问color2、anotherColor但是访问不到tempColor
  swapColors();
}
// 这里只能访问color2
changeColor2();
console.log(color2); // red

//局部上下文的作用域链中有3个对象：swapColors()的变量对象、changeColor()的变量对象和全局变量对象。swapColors()的局部上下文首先从自己的变量对象开始搜索变量和函数，搜不到就去搜索上一级变量对象。changeColor()上下文的作用域链中只有2个对象：它自己的变量对象和全局变量对象。因此，它不能访问swapColors()的上下文。

var myname = "lzx";
function changeName(myname = "abc"){
  console.log(myname);
}
changeName("ufo");
console.log(myname); // lzx  并不是ufo，原因很简单，函数参数被认为是当前上下文中的变量，因此也跟上下文中的其他变量遵循相同的访问规则

console.log("--------------------------4.2.1  作用域链增强");
//某些语句会导致在作用域链前端临时添加一个上下文，这个上下文会在代码执行后被删除，下面2钟情况
// try/catch 语句的catch块
// with语句

let location = {
  href: "www.baidu.com",
}
function buildUrl() {
  let qs = "?debug=true";
  with(location) {
    let url = href + qs;
  }
  return url;
}
console.log(buildUrl()); // [Function: url]  因为用let声明了url 所以只能在with块里面使用，所以url没有被赋上语句的值，如果改为var声明url  那么url被提升到函数最近的上下文，也就是函数当前上下文，会返回被赋上拼接语句的值


let toBeRich = Math.random()*1000 > 900 ? "easy" : "difficult";
if (toBeRich === "difficult") {
  console
  
  .log("I wish you peace");
}

console.log("--------------------------4.2.2  变量声明");
// var 在使用var声明变量时，变量会自动被添加到最接近的上下文。在函数中，也最接近的上下文也就是函数的局部上下文。  如果变量未经声明就被初始化了，那他会自动被添加到全局上下文

function add1(num1, num2) {
  var sum1 = num1 + num2;
  return sum1;
}
console.log(add1(1,2)); // 3
//console.log(sum1); // 会报错，因为sum1在add1函数的局部上下文里,如果省略上面例子中的关键字var，那么sum1在add()被调用之后就变成可以访问

{
  let add1 = function (num1, num2) {
    sum1 = num1 + num2;
    return sum1;
  }
  console.log(add1(1,2)); // 3
  console.log(sum1);  // 3
}
//未经声明而初始化变量是JavaScript编程中一个非常常见的错误，会导致很多问题。初始化变量之前一定要先声明变量。在严格模式下，未经声明就初始化变量会报错。

// var声明会被拿到函数或全局作用域的顶部，位于作用域所有代码之前，这个叫做 “提升”
// var name = "Jaje"; 等价于  name="Jaje"; var name;
// 通过在声明之前打印变量，可以验证变量是否是被提升的。输出undefined代表提升。


// let 块级作用域声明
// var and let 区别1就是let是块级别的  {}   花括号外的访问不到花括号内的
if (true) {
  let cfa;
}
//console.log(cfa) // ReferenceError
if (true) {
  var cfaa;
}
//console.log(cfaa); // undefined

// var 和 let的另一个不同之处就是，同一作用域内，let不能声明2次
// {
//   var aa;
//   var aa; //不报错
//   let bb;
//   let bb; //报错
// }

//严格来讲，let在JavaScript运行时也会被提升，但是由于暂时性死区的缘故，实际上不允许在声明之前使用let变量。因此let的提升和var是不一样的


// const 常量声明
//const a;  syntaxError  常量声明时必须初始化
{
  const b = 5;
  console.log(b); // 5
  //b = 4 // typeError报错  不能重新给常量赋值
}
//console.log(b) // b is not defined  const 声明的是块内变量