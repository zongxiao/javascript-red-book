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


// 按位异或 ^  两位都是1或者两位都是0 则返回0，其余返回1
let yihuonum = 25 ^ 3;
//25  00011001
//3   00000011
//26  00011010
console.log(yihuonum);// 26


// 左移 << 按照指定的位数将数值的所有位向左移动,后面用0补齐。
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

let preferredObject = null;
let backupObject = {
  "name":"1"
}
let myObject = preferredObject || backupObject;
console.log(myObject);





