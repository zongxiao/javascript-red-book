//-----typeof操作符---确定任意变量的数据类型
// console.log("silence:"+ typeof "silence");
// console.log("null的类型是：" + typeof null);

const { strict } = require("assert");
const { Console } = require("console");
const { type } = require("os");
const { parse } = require("path");

//-----null
if(typeof null === typeof {}){
  console.log("null和{}类型相同")
}

//-----Boolean
console.log(true)
console.log("true的布尔值："+Boolean(true))
console.log("非空字符串的布尔值："+Boolean("12"))
console.log("非零数值的布尔值："+Boolean(10))
console.log("任意对象{}的布尔值"+Boolean({}))
console.log(false)
console.log("false的布尔值"+Boolean(false))
console.log("\"\"的布尔值"+Boolean(""))
console.log("0的布尔值"+Boolean(0))
console.log("NaN的布尔值"+Boolean(NaN))
console.log("undefined的布尔值"+Boolean(undefined))

//-----Number 
let bjznum1 = 0o70;//0*8的0次方 + 7*8的一次方 = 56
console.log(bjznum1);
let sljznum1 = 0xA;//10*16的0次方 = 10
console.log(sljznum1);
let floatnum = 3.1234e-1;
console.log(floatnum);// 科学计数法计算3.1234*10的-1次方
console.log(Number.MIN_VALUE);// ECMAScript可以标识的最小数值：5e-324
console.log(Number.MAX_VALUE);// ECMAScript可以标识的最大数值：1.7976931318623157e+308
console.log(isFinite(Number.MAX_VALUE*2));// isFinite()如果返回false就是代表这个数值不是可计算的有限数值
console.log(Number.NEGATIVE_INFINITY);// NEGATIVE_INFINITY获取负无穷
console.log(Number.POSITIVE_INFINITY);// POSITIVE_INFINITY获取正无穷
console.log(isNaN(NaN));// true
console.log(isNaN(10));// false
console.log(isNaN("10"));// false
console.log(isNaN("blue"));// true
console.log(isNaN(true)); // false
// 有三个函数可以将非数值转化为数值，转化不成功他就变成NaN,Number() parseInt() parseFloat()
console.log(Number(true));// 1
console.log(Number("12"));// 12
console.log(Number(null));// 0
console.log(Number(""));// 0
console.log(Number("abc"));// NaN
console.log(Number(undefined));// NaN
console.log(Number("0o77"));// 八进制转为63
console.log(parseInt(""));// NaN
console.log(parseInt("1234abc"));// 1234
console.log(parseInt(1.23));// 1
console.log(parseInt(0o21));// 17
console.log(parseInt("AF",16));// 提供第二个参数表示字母是16进制

// 一个数字字符串 如何转成不同的数字
console.log(parseInt("10",2));// 2 按二进制解析
console.log(parseInt("10",8));// 8 按八进制解析
console.log(parseInt("10",10));// 10 按十进制解析
console.log(parseInt("10",16));// 16 按十六进制解析

console.log(parseFloat("1234abc"));// 1234
console.log(parseFloat("0xA"));// 0
console.log(parseFloat("22.5"));// 22.5
console.log(parseFloat("22.34.5"))// 22.34
console.log(parseFloat("0908.5"));// 908.5

// String
console.log("\n");// 换行
console.log("\t");// 制表
console.log("\r");// 回车
console.log("\\");// 反斜杠
console.log("\'");// 单引号
// toString()方法可以把几乎所有的值都转化为字符串,null,undefined没有toString()方法
let age = 11, found = true;
console.log(age.toString());// "11"
console.log(found.toString());// "true"
let num = 10; console.log(num.toString());     // "10" 
console.log(num.toString(2));    // "1010" 
console.log(num.toString(8));    // "12" 
console.log(num.toString(10));   // "10" 
console.log(num.toString(16));   // "a" 
//null 和 undefined虽然没有toString()方法，但是可以用String()读出他的字面文本
console.log(String(null));// "null"
console.log(String(undefined));// undefined
// 用加号操作符给一个值加上一个空字符串也可以将其转换为字符串
console.log(true+"");// "true"

// 模板字面量 ``(一对邪引号)
let innertxt = 123;
let pageHtml = `
<div class="abc">
  <span>${innertxt}</span>
</div>`;
console.log(pageHtml);

let a = 6;
let b = 9;
let c = 10;
//...是剩余操作符，将参数收集到一个数组中，下面是标签函数
function simpleTag(strings, ...expressions) {
  // strings存储了每个插值旁边的字符串，而...expressions则是接收了所有插值，形成一个数组，是在利用map将每个数组的值和插值旁边字符串的零散值利用join('')拼接起来
  console.log(strings)
  expressions.map((e,i) => {
    console.log(e)
  })
  return strings[0] + 
    expressions.map((e, i) => `${e}${strings[i + 1]}`).join('');
}
let taggedResult = simpleTag`"${ a }+${ b }-${c}=${ a + b - c }"`;
console.log(taggedResult)
// ['"', '+', '-', '=', '"']
// 6
// 9
// 10
// "6+9-10=5" 



// String.raw标签函数可以输出原始模板字面量内容
console.log(`shwo\nad`);
//shwo
//ad
console.log(String.raw`shwo \n ad`);// shwo \n ad
function printRaw(strings) {
  console.log('Actual characters:');
  for (const string of strings) {
    console.log(string);
  }
  console.log('Escaped characters:');
  for (const string of strings.raw) {
    console.log(string);
  }
}
printRaw`\u00A9${c}\n${b}c`;
// Actual characters:©
//
//c
//Escaped characters:\u00A9
//\n
//c

console.log('----------------Symbol');
// Symbol类型
let sym = Symbol();
console.log(typeof sym);// symbol

let value1Symbol = Symbol('foo');
let value2Symbol = Symbol('foo');
console.log(value1Symbol == value2Symbol);// false

let value3Symbol = Symbol();
console.log(value3Symbol);// Symbol()
let value4Symbol = Symbol('foo');
console.log(value4Symbol);// Symbol(foo)

//symbol()函数不能像new关键字一起作为构造函数使用
let myBoolean = new Boolean();
console.log(typeof myBoolean);// object
let myString = new String();
console.log(typeof myString);// object
//let  mySymbol = new Symbol(); 报错，symbol is not a constructor
//确实想使用符号包装对象，可以借用Object()函数：
let mysymb = Symbol();
let myWrappedSymbol = Object(mysymb);
console.log(typeof myWrappedSymbol);// object
console.log(myWrappedSymbol);// [Symbol: Symbol()]

// Symbol.for()方法，全局符号注册，可以重用符号
let fooGlobalSymbol =  Symbol.for('foo');
console.log(typeof fooGlobalSymbol);  // symbol
// 注册一个非全局的符号，结果他和全局那个不相等
let fooputongSymbol = Symbol('foo');
console.log(fooGlobalSymbol == fooputongSymbol);// false
// 注册全局重用foo符号，相等表示是重用的
let otherFooFlobalSymbol = Symbol.for('foo');
console.log(otherFooFlobalSymbol == fooGlobalSymbol);// true
//即使采用相同的符号描述，在全局注册表中定义的符号跟使用Symbol()定义的符号也并不等同

//全局注册表中的符号必须使用字符串键来创建，因此作为参数传给Symbol.for()的任何值都会被转换为字符串。此外，注册表中使用的键同时也会被用作符号描述
let emtsymbol = Symbol.for(1);
let emtsymbo1l = Symbol.for('1');
let emtsymbo2l = Symbol.for();
let noglobalsymbol = Symbol('absc');
let emtsymbo2l5 = Symbol.for();
console.log(emtsymbol)// Symbol(1)
console.log(emtsymbo1l)// Symbol(1)
console.log(emtsymbo2l);// Symbol(undefined)
console.log(emtsymbol==emtsymbo1l);// true
console.log(emtsymbo2l==emtsymbo2l5);// true
// Symbol.keyFor() 用来查询某个符号变量的描述（字符串键）
console.log(Symbol.keyFor(emtsymbo2l));// undefined字符串
console.log(Symbol.keyFor(emtsymbo1l));// 1
console.log(Symbol.keyFor(noglobalsymbol));// undefined

//使用符号作为属性
let sym1 = Symbol('foo'),
    sym2 = Symbol('bar'),
    sym3 = Symbol('baz');
let o = {
  [sym1]: 'foo val',
  [sym3]: 'baz val'
};
console.log(o[sym1]);
console.log(o[sym3]);
o[sym2] = 'bar foo';
console.log(o);
// foo val
// baz val
// {
//   [Symbol(foo)]: 'foo val',
//   [Symbol(baz)]: 'baz val',
//   [Symbol(bar)]: 'bar foo'
// }

// 定义一个对象，用Object.defineProperty() 给对象定义属性的值和是否可改写
let Person = {};
Object.defineProperty(Person, 'name',{
  value: 'jack',
  writable: false
})
Person.name = 'hah';
console.log(Person.name);
// 输出jack  因为设置了name属性不可写入

// 定义一个对象，用Object.defineProperties() 给对象定义多个属性
let Cars = {};
let p_sym1 = Symbol('name');
let p_sym2 = Symbol('color');
Object.defineProperties(Cars, {
  [p_sym1]: {value: 'bwm',writable: false},
  [p_sym2]: {value: 'red', writable: true}
});
Cars[p_sym1] = 'aodi';
Cars[p_sym2] = 'green';
console.log(Cars[p_sym1]);
console.log(Cars[p_sym2]);
// bwm
// green

// 返回对象实例的  [常规]  属性数组
console.log(Object.getOwnPropertyNames(Person));
console.log(Object.getOwnPropertyNames(Cars));
// ['name']
// []

// 返回对象实例的  [符号]  属性数组
console.log(Object.getOwnPropertySymbols(Person));
console.log(Object.getOwnPropertySymbols(Cars));
// []
// [Symbol(name), Symbol(color)]

// 返回对象实例   【所有】  属性数组 getOwnPropertyDescriptors()
console.log(Object.getOwnPropertyDescriptors(Person));
console.log(Object.getOwnPropertyDescriptors(Cars));
// {
//   name: {
//     value: 'jack',
//     writable: false,
//     enumerable: false,
//     configurable: false
//   }
// }
// {
//   [Symbol(name)]: {
//     value: 'bwm',
//     writable: false,
//     enumerable: false,
//     configurable: false
//   },
//   [Symbol(color)]: {
//     value: 'green',
//     writable: true,
//     enumerable: false,
//     configurable: false
//   }
// }


// Reflect.ownKeys() 会返回两种类型的键
console.log(Reflect.ownKeys(Cars));
console.log(Reflect.ownKeys(Person));
// [ Symbol(name), Symbol(color) ]
// [ 'name' ]


let ooo = {
  [Symbol('foo')]: 'foo val',
  [Symbol('bar')]: 'bar val'
}
console.log(ooo);
// { [Symbol(foo)]: 'foo val', [Symbol(bar)]: 'bar val' }


// 循环检索找出符号
let barSymbol = Object.getOwnPropertySymbols(ooo).find((value) => value.toString().match(/bar/));
console.log(barSymbol);
// Symbol(bar)


//72-80页比较难，symbol的高级内容，完全看不懂啊！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
//！！！！！！！！！！！！！！！！！！！！！！！！！！先暂时搁置



//Object类型

let Persons = new Object();
Object.defineProperties(Persons, {
  'name':{
    value: 'lzx',
    writable: true
  },
  'weight':{
    value: 55,
    writable: true
  }
})
console.log(Persons.constructor)// [function:object]
console.log(Persons.hasOwnProperty('name'))// true
//以Person为原型，利用Object.create()方法创建对象xiaoming
let xiaoming = Object.create(Persons);
console.log(Persons.isPrototypeOf(xiaoming));// true
console.log(xiaoming.name);// 'lzx'
console.log(xiaoming.hasOwnProperty('name'))// false  这里因为是继承来的 所以不是自己的，于是返回false
xiaoming.name="aaa";
console.log(xiaoming.hasOwnProperty('name'))// true  这里因为上面设置了name属性，所以返回true
console.log(xiaoming.toLocaleString());// [object Object]
console.log(xiaoming.toString());// [object Object]
console.log(xiaoming.valueOf());