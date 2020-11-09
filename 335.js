console.log("-----操作符------");

// 一元操作符
console.log("------1、一元操作符");
let age = 25;
let ageafter = --age + 2;
console.log(ageafter);// 26

let string = "5a";// 非完全数值字符串，会被++ 转成NaN
string++;
console.log(string);// NaN

let s1 = "2";console.log(++s1);// 3
let s2 = "z";console.log(++s2);// NaN
let b = false;console.log(++b);// 1
let f = 1.1;console.log(--f);// 0.1000000000
let o = {
  valueOf() {
    return -1;
  }
};console.log(--o);// -2
let os = {
  valueOf() {
    return "a"
  }
};console.log(--os);// NaN

// 一元加和减
console.log("------2、一元加和减");
let num = 25;
num = +num;
console.log(num);// 25
// 如果将一元应用到非数值，则会执行与使用Number()转型函数一样的类型转换：布尔值false和true转换为0和1，字符串根据特殊规则进行解析，对象会调用他们的valueOf()和/或toString()方法以得到可转换的值。
let ass1 = "01"; console.log(+ass1);// 1
let ass2 = "1.2"; console.log(+ass2);// 1.2
let ass3 = "z"; console.log(+ass3);// NaN
let asf = 1.1; console.log(+asf);// 1.1
let aso = {
  valueOf() {
    return -1;
  }
}; console.log(+aso)// -1
console.log(-aso)// 1    负负得正

// 位操作符
console.log("------3、位操作符");
let weinum = -18;
let weinum2 = 18;
console.log(weinum.toString(2));// -10010
console.log(weinum2.toString(2));// 10010

// 按位非  ~  对数值取反并且减1
let feinum1 = 25;// 00000000 00000000 00000000 00011001
let feinum2 = ~feinum1;// 11111111 11111111 11111111 11100110
console.log(feinum2);// -26

let jiannum1 = 25;
let jiannum2 = -jiannum1 - 1;
console.log(jiannum2); // -26 虽然与按位非~返回的结果一样，但是位操作的速度快很多，因为他是在数值的底层表示上完成的


// 按位与 &   同真为真，一假具假
let yunum = 25 & 3;
//25  00011001
//3   00000011
//1   00000001
console.log(yunum);// 1


// 按位或 |   一真具真，同假为假
let huonum = 25 | 3;
//25  00011001
//3   00000011
//27  00011011
console.log(huonum);// 27


// 按位异或 ^  两位都是1或者两位都是0 则返回0，其余返回1，同为假 异为真
let yihuonum = 25 ^ 3;
//25  00011001
//3   00000011
//26  00011010
console.log(yihuonum);// 26


// 有符号左移 << 按照指定的位数将数值的所有位向左移动,后面用0补齐。
let zynum = 2;
let zynewnum = zynum << 5;
// 00000010 << 5 = 01000000
console.log(zynewnum);// 64
// 左移会保留它所操作数值的符号。比如，如果-2左移5位，将得到-64，而不是正64

// 有符号右移 >> 会将数值的所有32位都向右移，同时保留符号。
let yynum = -64;
let yynewnum = yynum >> 5;
// 01000000 >> 5 = 00000010
console.log(yynewnum);// -2


// 无符号右移 >>> 对于正数，无符号右移与有符号右移结果相同
let wfhyynum = -64;
let wfhyynewnum = wfhyynum >>> 5;
console.log(wfhyynewnum);// 134217726

// 00000000 00000000 00000000 01000000
// 取负值
// 11111111 11111111 11111111 10111111
// 1
// 11111111 11111111 11111111 11000000
// 右移5位
// >>> 5
// 00000111 11111111 11111111 11111110


// 布尔操作符 !
console.log(!false);// true
console.log(!"blue");// false
console.log(!null);// true
console.log(!0);// true
console.log(!NaN);// true
console.log(!1234);// false

// 将任意值两次取反 便可以 将该值转化为布尔值类型
console.log(!!false);// false
console.log(!!0);// false
console.log(!!NaN)// false
console.log(!!" ");// true
console.log(!!12345);// true

// 逻辑与  &&
let found = true;
//let result = (found && someUndeclaredVariable); 注释掉，否则会报错，因为第二个值未定义
let result = (!found && someUndeclaredVariable);// 这里不报错是因为根本没有执行逻辑与符号后的内容
console.log(result);

//逻辑或 ||
let resulthuo = (found || someUndeclaredVariable)
console.log(resulthuo);// 逻辑或 只要第一个是true 就不会执行后面的内容，利用这个行为，可以避免给变量赋值null或者undefined

// 逻辑或 || 防止赋上null  这种模式在ECMAScript代码中经常用于变量赋值
let preferredObject = null;
let backupObject = {
  "name":"1"
}
let myObject = preferredObject || backupObject;
console.log(myObject);

//乘法操作符 (*)
//如果有任一操作数是NaN，则返回NaN。
console.log(10 * NaN); // NaN
//Infinity乘以0 则返回NaN
console.log(Infinity * 0);// NaN
//Infinity乘非0，要么得到Infinity要么得到-Infinity
console.log(Infinity * -2);// -Infinity
//如果是Infinity乘以Infinity，则返回Infinity。
console.log(Infinity * Infinity);// Infinity

//除法操作符 (/)
console.log(5/2);//2.5
//如果有任一操作数是NaN 则返回NaN
console.log("abc"/2);// NaN
//Infinity除Infinity，返回NaN
console.log(Infinity/Infinity);// NaN
//0除以0返回NaN
console.log(0/0);// NaN
//非0除以0，返回Infinity或者-Infinity
console.log(-12/0);// -Infinity
//如果有不是数值的操作数，则先在后台用Number()函数将其转换为数值，然后再应用上述规则。

//取模（余数）操作符 （%）
console.log(26 % 5); // 1
//如果被除数是有限值，除数是无限值，则返回被除数。
console.log(25 % Infinity); //25
//如果被除数是无限值，除数是有限值，则返回NaN
console.log(Infinity % 25); // NaN
//如果是Infinity除以Infinity，则返回NaN
console.log(Infinity % Infinity); //NaN

//指数操作符（**） ES7新增，与Math.pow()效果一样
console.log(3 ** 2); //9
console.log(Math.pow(3, 2)); //9
console.log(16 ** 0.5); //4
//不仅如此，指数操作符也有自己的指数赋值操作符**=，该操作符执行指数运算和结果的赋值操作：
let squared = 3;
squared **= 3;
console.log(squared); //27  3的3次方

// 加性操作符
//如果有任一操作数是NaN，则返回NaN；
console.log(1 + NaN); //NaN
console.log(Infinity + Infinity); //Infinity
console.log(-Infinity + -Infinity); //-Infinity
console.log(Infinity - Infinity); //NaN
console.log(-0 + -0); //-0
console.log(0 === -0); //true

// 如果有一个操作数是字符串,则都转为字符串
let result1 = 5 + 5;
console.log(result1); //10
let result2 = 5 + "5";
console.log(result2); //55
// 如果是加号操作符，有任意一个是对象数值或者布尔值，就会调用toString()方法获取字符串
let objdqw = {
  toString() {
    return typeof this.values
  },
  values: 1 
};
console.log(objdqw.toString())
console.log(2 + objdqw); 

//减法操作符
// 如果有任意一个操作数是对象，则调用valueOf()
let obj12 = {
  valueOf() {
    return 100
  },
  value: 10,
}
let result12 = 2 - obj12;
console.log(obj12.value);
console.log(result12);



//关系操作符 (<、>、<=、>=)
//如果操作数都是数值，则执行数值比较。
//如果操作数都是字符串，则逐个比较字符串中对应字符的编码
//如果有任一操作数是数值，则将另一个操作数转换为数值，执行数值比较
console.log(66 >= "50");
