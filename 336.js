// 3.6.1 if 语句
let i = 2020 - 1995;
if (i > 25)
  console.log("bigger than 25");
else {
  console.log("smaller than 25");
  console.log("hah");
}

// if(condition1){} else if(condition2){} else{}

// 3.6.2 do-while语句
// 这种语句先执行后循环测试，至少会执行一遍循环体
let i2 = 0;
do {
  i2 += 3;
} while (i2 < 11);
console.log(i2) //12

// 3.6.3 while语句
// 先检测退出条件，再执行循环体内的代码
let i3 = 2;
while(i3 < 6) {
  i3 += 3;
}
console.log(i3); //8


// 3.6.4 for语句
//for (initialization; expression; post-loop-expression) statement

// 3.6.5 for-in语句
// for-in 语句是一种严格的迭代语句，用于枚举对象中非符号键属性 语法如下
//for (property in expression) statement   
let arr1 = {
  name: 'lzx',
  age: "25",
  [Symbol.for('boo')]: 'boo val'
}
//这里控制语句中的const也不是必需的。但为了确保这个局部变量不被修改，推荐使用const
for (const propName in arr1) {
  console.log(propName);
}// name age
console.log(arr1[Symbol.for('boo')]) //boo val


// 3.6.6 for-of 语句
// for-of语句是一种严格的迭代语句，用于遍历可迭代对象的元素，语法如下
// for (property of expression) statement
for (const el of [2, 4, 6, 8]) {
  console.log(el);
}
// 2 4 6 8


// 3.6.7 标签语句  用于给语句加标签，语法如下
console.log("标签语句");
// label: statement
//在这个例子中，outermost是一个标签，可以在后面通过break或continue语句引用。标签语句的典型应用场景是嵌套循环
let numdasdd = 0;
outermost:
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 4; j++) {
    if (i == 3 && j == 3) {
      break outermost;
    }
    numdasdd++;
  }
}
console.log(numdasdd) //15 直接跳出两层循环，所以后面两层都不会再继续执行，如果不跳到标签语句那里，将会执行6*4-1=23

// 3.6.8 break 和 continue 语句
console.log("break 和 continue 语句")
// break 用于立即退出循环  强制执行循环后的下一条语句  而continue也用于立即退出循环，但会再次从顶部开始执行
let numas = 0;
for (let i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break;
  }
  numas++;
}
console.log(numas); //4

let numdas = 0;
for (let i = 0; i < 10; i++) {
  if (i % 5 == 0) {
    continue;
  }
  numdas++;
}
console.log(numdas); //8  循环被完整执行了8次,2次if语句判断成立 跳过了下面的numdas++

// 3.6.9 with 语句
console.log("with 语句");
//with语句的用途是将代码作用域设置为特定的对象，其语法是with (expression) statement;
//使用with语句的主要场景是针对一个对象反复操作，这时候将代码作用域设置为该对象能提供便利，如下面的例子所示：
let locations = {
  hostname: 'test',
  url: 'http://www.baidu.com',
  description: 'baidu'
};
let hostName = locations.hostname;
let hostUrl = locations.url;
let hostDes = locations.description;
console.log(hostName);
console.log(hostUrl);
console.log(hostDes);
// test
// http://www.baidu.com
// baidu
//上面连续三个变量调用了locations对象 太麻烦了，不如用with () statement;注意下面，会先搜索with语句段里面的局部变量。找不到就以with括号中的对象为基准
with (locations) {
  let hostname = 2
  hostName = hostname;
  hostUrl = url;
  hostDes = description;
}
console.log(hostName);
console.log(hostUrl);
console.log(hostDes);
// 2
// http://www.baidu.com
// baidu

