'use strict';
function pow(x, n) {
    x = x ?? 1;
    n = n ?? 0;
    return x ** n;
}

let value = pow(2, 2); //64
console.log(value);

//回调函数
function ask(a, funcOne, funcTwo) {
    a > 10 ? funcOne() : funcTwo();
}
ask(10, function () {
    console.log("yes a > 10");
}, function () {
    console.log("no a <= 10");
})

//箭头函数
let pow2 = (x, n) => x ** n;
let value2 = pow2(2, 4);
console.log(value2);//16
let addone = n => n + 1;
console.log(addone(2));//3

//对象
let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;
console.log(user);


//检查空对象
let userIsEmpty = isEmpty(user);
console.log(userIsEmpty);
function isEmpty(obj) {
    for (let key in obj) {
        //如果执行到循环证明有
        return false
    }
    return true;
}
//求对象里面工资总合
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
let sum = 0;
for (let key in salaries) {
    sum += salaries[key];
}
console.log(sum);

//number类型翻倍
let arrTest = {
    John: 100,
    Ann: 160,
    Pete: "hello"
}
multiplyNumeric(arrTest)
function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof obj[key] == 'number') {
            obj[key] *= 2;
        }
    }
}
console.log(arrTest)

//浅拷贝
let person = {
    name: 'xiaoming',
    sex: 'male',
    assets: ['house', 'car'],
    boy: {
        name: 'xiaomingming',
        sex: 'girl',
        assets: []
    }
}
let personClone = { ...person };// 展开运算符展开person对象
let personClone2 = Object.assign({}, person);
personClone.assets.boy = {
    name: 'xiaohong',
    sex: 'male',
    assets: []
}
console.log(personClone2);
console.log(person);//被改变了 因为拷贝了对象的引用，属于浅拷贝
console.log(personClone.assets.boy === person.assets.boy);//true

//深拷贝
function deepCopy(source) {
    let sourceCopy = source instanceof Array ? [] : {};
    for (const key in source) {
        sourceCopy[key] = typeof source[key] === "object" ? deepCopy(source[key]) : source[key];
    }
    return sourceCopy;
}
//深拷贝2
let personDeep = {
    name: 'xiaoming',
    sex: 'male',
    assets: ['house', 'car'],
    boy: {
        name: 'xiaomingming',
        sex: 'girl',
        assets: []
    }
}
let personDeepClone = JSON.parse(JSON.stringify(personDeep));
personDeepClone.boy = {}
console.log(personDeep);
console.log(personDeepClone);


//this指向之链式
let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep() {
        console.log(this.step);
        return this;
    }
}
ladder.up().up().down().showStep();

/* 可选链 ?. 语法有三种形式：

obj?.prop —— 如果 obj 存在则返回 obj.prop，否则返回 undefined。
obj?.[prop] —— 如果 obj 存在则返回 obj[prop]，否则返回 undefined。
obj.method?.() —— 如果 obj.method 存在则调用 obj.method()，否则返回 undefined。 */

/* Symbol 是唯一标识符的基本类型

Symbol 是使用带有可选描述（name）的 Symbol() 调用创建的。

Symbol 总是不同的值，即使它们有相同的名字。如果我们希望同名的 Symbol 相等，那么我们应该使用全局注册表：Symbol.for(key) 返回（如果需要的话则创建）一个以 key 作为名字的全局 Symbol。使用 Symbol.for 多次调用 key 相同的 Symbol 时，返回的就是同一个 Symbol。

Symbol 有两个主要的使用场景：

“隐藏” 对象属性。 如果我们想要向“属于”另一个脚本或者库的对象添加一个属性，我们可以创建一个 Symbol 并使用它作为属性的键。Symbol 属性不会出现在 for..in 中，因此它不会意外地被与其他属性一起处理。并且，它不会被直接访问，因为另一个脚本没有我们的 symbol。因此，该属性将受到保护，防止被意外使用或重写。

因此我们可以使用 Symbol 属性“秘密地”将一些东西隐藏到我们需要的对象中，但其他地方看不到它。

JavaScript 使用了许多系统 Symbol，这些 Symbol 可以作为 Symbol.* 访问。我们可以使用它们来改变一些内置行为。例如，在本教程的后面部分，我们将使用 Symbol.iterator 来进行 迭代 操作，使用 Symbol.toPrimitive 来设置 对象原始值的转换 等等。 */

/* 转换算法是：

调用 obj[Symbol.toPrimitive](hint) 如果这个方法存在，
否则，如果 hint 是 "string"
尝试 obj.toString() 和 obj.valueOf()，无论哪个存在。
否则，如果 hint 是 "number" 或者 "default"
尝试 obj.valueOf() 和 obj.toString()，无论哪个存在 */
let objTest = {
    "1": 12,
    "2": 13,
    "5": 5
}
let objToWhat = {
    name: '123',
    toString() {
        return "2";
    },
    valueOf() {
        return 1
    },
    [Symbol.toPrimitive](hint) {
        return 5;
    }
}
console.log(objTest?.[objToWhat]);//如果objTest被定义了，那么就读取他的属性，objToWhat作为属性值必须是字符串，所以会进行hint转化，优先[Symbol.toPrimitive](hint)，然后因为是字符串hint，所以之后是toString()，最后才是valueOf()。 如果是比较或者加减法，并且没有[Symbol.toPrimitive](hint)，那么就是优先valueOf()，其次是toString();

// 字符串 str 是一个原始值。因此，在访问其属性时，会创建一个包含字符串字面值的特殊对象，并且具有有用的方法，例如 toUpperCase()。
// 该方法运行并返回一个新的字符串（由 alert 显示）。
// 特殊对象被销毁，只留下原始值 str。
"use strict";
let str = "Hello";
let num = 1.23456;
console.log( str.toUpperCase() );
console.log( num.toFixed(2) );//返回字符串
//原始类型不是对象，它们不能存储额外的数据。

console.log(1000 === 1e3);
console.log(0.0000123 === 1.23e-5);
console.log(0xff === 255);
console.log(0o111 === 1*8**2 + 1*8**1 + 1*8**0);
console.log(0b1111 === 2**3 + 2**2 + 2**1 + 2**0);

{
    //num.toString(base);
    let num = 255;
    console.log( num.toString(2) );//11111111
    console.log( num.toString() );//255(默认)
    console.log( num.toString(16) );//ff
    console.log( 123456..toString() );//两个.，因为数字默认有小数点
}

{
    //toFixed(2) 取2位小数，并返回字符串
    let num = 12.34;
    console.log( +num.toFixed(1) );// 12.3
    let num2 = 12.36;
    console.log( +num2.toFixed(1) );// 12.4
}

{
    console.log( 0.1 + 0.2 == 0.3 ); // false
    console.log( 0.1 + 0.2 );
    console.log( Number((0.1 + 0.2).toFixed(2)) === 0.3 );// true
}

{
    console.log(typeof NaN);// "number"
    console.log(isNaN(NaN));// true
    console.log(isNaN("str"));// true
    console.log(isNaN("12"));// false
    console.log(NaN === NaN)// false
    console.log(isFinite("12"))// true
    console.log(isFinite(Infinity))// false
    console.log(isFinite("st")); //false
}

{
    console.log("-----------------parseInt---------------")
    //用加号 + 或 Number() 的数字转换是严格的。如果一个值不完全是一个数字，就会失败
    console.log( +"100px" ); // NaN
    console.log(parseInt("100px"));// 100
    console.log(parseFloat("12.4rem"));// 12.4
    console.log(parseInt("a123"))// NaN
    console.log(parseInt("0xff", 16));//255
    console.log(Math.random());
    console.log(Math.max(1,2,4,5,-1));// 5
    console.log(Math.min(1,2,3));// 1
    console.log(Math.pow(2,10));// 1024
}

{   
    //字符串
    let str1 = "\n";
    let str = `ab${str1}c`;
    console.log(str.length);// 4 换行也算一个字符
    console.log(str[0]);// a
    console.log(str.charAt(2));// \n
    //它们之间的唯一区别是，如果没有找到字符，[] 返回 undefined，而 charAt 返回一个空字符串：
    let str2 = "helloworld";
    for (let char of str2) {
        console.log(char)
    }
    console.log(str2.toUpperCase());//HELLOWORLD
    console.log('ASD'.toLowerCase());//asd
    //str.indexOf(substr, pos);
    //从给定位置 pos 开始，在 str 中查找 substr，如果没有找到，则返回 -1，否则返回匹配成功的位置
    let str3 = 'Widget with id';
    console.log(str3.indexOf("Widget"));// 0
    console.log(str3.indexOf("with"));// 7
    console.log(str3.indexOf("WIDGET"));// -1 因为大小写敏感
    //可选的第二个参数允许我们从给定的起始位置开始检索。
    console.log(str3.indexOf("i",5));// 8

    //if (~str.indexOf(...)) 读作 “if found”。
    let str4 = "or hello world or";
    console.log(str4.includes("or", 3));// true
    console.log( "Widget".startsWith("Wid") ); // true，"Widget" 以 "Wid" 开始
    console.log( "Widget".endsWith("get") ); // true，"Widget" 以 "get" 结束

    let str5 = "stringify";

    // 这些对于 substring 是相同的
    console.log( str5.substring(2, 6) ); // "ring"
    console.log( str5.substring(6, 2) ); // "ring"
    
    // ……但对 slice 是不同的：
    console.log( str5.slice(2, 6) ); // "ring"（一样）
    console.log( str5.slice(-6, -3) ); // ""（空字符串）
}

// 数组
{
    //Array.pop() 取出并返回数组的最后一个元素：
    let fruits = ["apple","pear","orange"];
    console.log(fruits.pop());// "orange"
    console.log(fruits);//[ 'apple', 'pear' ]
    fruits.push("peach");
    console.log(fruits);//[ 'apple', 'pear', 'peach' ]
    //arr.shift() 数组开头移除一个元素，并且返回移除的元素
    console.log(fruits.shift());//"apple"
    console.log(fruits);//[ 'pear', 'peach' ]
    //arr.unshift() 数组的开头插入一个或者多个元素
    fruits.unshift("a","b");
    console.log(fruits);//["a","b","pear","peach"]
    
    //数组是一个对象，通过引用复制
    let car = ["bmw","aodi"];
    let bus = car;
    bus.push("siyu");
    console.log(car);// [ 'bmw', 'aodi', 'siyu' ]

    //循环，for循环 或者for of  for in不建议，会遍历 所有属性，不仅仅是这些数字属性。
    for(let val of car){
        console.log(val);
    }
    //length 实际上不是数组里元素的个数，而是最大的数字索引值加一。
    fruits[12] = "abc";
    console.log(fruits.length);//13

    //length 属性的另一个有意思的点是它是可写的。如果我们减少它，数组就会被截断且不可恢复
    fruits.length = 1;
    console.log(fruits);// ['a']
    
    // 清空数组的方法最简单的就是：arr.length = 0;

    //多维数组

    //仅当两个对象引用的是同一个对象时，它们才相等 ==。
    //……null 和 undefined 相等 ==，且各自不等于任何其他的值。
    console.log( [] == [] ); // false
    console.log( [0] == [0] )// false
    console.log( 0 == [] ); // true []被转化成""
    console.log( '0' == [] );// false '0'布尔值是true 而[]的布尔值是false
    let styles = ["Jazz", "Blues"];
    styles.push("Rock-n-Roll");
    styles[Math.floor((styles.length - 1) / 2)] = 'Classics'
    console.log(styles);
    console.log(styles.shift());
    console.log(styles);
    styles.unshift("Rap","Reggae");
    console.log(styles);
    let arr22 = ["a", "b"];
    arr22.push(function() {
      console.log( this );
    })
    arr22[2]();//[ 'a', 'b', [Function (anonymous)] ]
}

{
    console.log("-----------数组方法-------------");
    //arr.push()  末端插入元素
    //arr.pop()   末端移除元素 并且返回移除的那个
    //arr.shift() 首端移除元素
    //arr.unshift() 首端插入一个或者多个元素
    let arr1 = ["a", "b"];
    delete arr1[0];
    console.log(arr1 + arr1.length);// ,b2  因为虽然移除了，但是还占位 
    //arr.splice 方法可以说是处理数组的瑞士军刀。它可以做所有事情：添加，删除和插入元素。
    let arr2 = ["a", "b", "c"];
    console.log(arr2.splice(1,1,"0"));//['b'] 返回移除的元素数组
    console.log(arr2);//['a', '0', 'c']
    //我们可以将 deleteCount 设置为 0，splice 方法就能够插入元素而不用删除任何元素：
    let arr3 = ["a", "b", "c"];
    arr3.splice(1, 0, "0", "1");
    console.log(arr3);//[ 'a', '0', '1', 'b', 'c' ]
    //arr.splice()允许负方向索引
    let arr4 = [1, 2, 5];
    arr4.splice(-1, 0, 3, 4);
    console.log(arr4);//[ 1, 2, 3, 4, 5 ]
    let arr5 = [1, 2, 3];
    let arr6 = arr5.slice(0, 1);
    console.log(arr6);// [1]  返回一个数组，从位置0开始到1（不包含）
    console.log(arr5);// [ 1, 2, 3 ]  原数组不变
    //arr.concat(arg1, arg2);创建一个新数组，其中包含来自于其他数组和其他项的值
    let arr7 = ["a", "b"];
    let arr8 = arr7.concat(arr6);
    console.log(arr8);//['a', 'b', 1]
    //通常，它只复制数组中的元素。其他对象，即使它们看起来像数组一样，但仍然会被作为一个整体添加：
    let arr9 = [1, 2];
    let arrLike = {
        0: "something",
        length: 1
    }
    console.log(arr9.concat(arrLike));//[ 1, 2, { '0': 'something', length: 1 } ]
    //但是，如果类似数组的对象具有 Symbol.isConcatSpreadable 属性，那么它就会被 concat 当作一个数组来处理：此对象中的元素将被添加：
    let arrLike2 = {
        0: "something",
        1: "else",
        [Symbol.isConcatSpreadable]: true,
        length: 2
    }
    console.log(arr9.concat(arrLike2));//[ 1, 2, 'something', 'else' ]
}

{
    console.log("-----------数组遍历------------");
    //arr.forEach( function(item, index, array) { dosomething } ) 方法允许为数组的每个元素都运行一个函数
    [1, 2, 4].forEach(console.log);//每个元素都输出值、下标、元素所在的数组
    // 1 0 [ 1, 2, 4 ]
    // 2 1 [ 1, 2, 4 ]
    // 4 2 [ 1, 2, 4 ]
    ["a", "b", "c"].forEach((item, index, array) => console.log(`${item} is at index ${index} in ${array}`));
    console.log("-----------数组中搜索------------");
    let arr = [1, 0, false, NaN];
    console.log(arr.indexOf(false));//2
    console.log(arr.lastIndexOf(2));//-1
    console.log(arr.indexOf(NaN));//-1 无法正确识别NaN，所以这里用arr.includes()比较好
    console.log(arr.includes(NaN));//true

    //arr.find((item, index, arr) => {
        // 如果返回 true，则返回 item 并停止迭代
        // 对于假值（false）的情况，则返回 undefined
    //})
    let arr2 = [
        {id:1, name:"a"},
        {id:2, name:"b"},
        {id:3, name:"c"}
    ];
    console.log(arr2.find((item, index, array) => {
        if (item.id === 1) {
            return array[index];
        }
    }));//{id:1, name:"a"}
    console.log(arr2.find(item => item.id === 1));//同上
    //arr.findIndex 方法（与 arr.find 方法）基本上是一样的，但它返回找到元素的索引，而不是元素本身。并且在未找到任何内容时返回 -1。
    console.log(arr2.findIndex(item => item.id === 1));// 0
    console.log(arr2.findIndex(item => item.id === 4));// -1
    //find 方法搜索的是使函数返回 true 的第一个（单个）元素。
    //如果需要匹配的有很多，我们可以使用 arr.filter(fn)。
    let results = arr.filter(function(item, index, array) {
        // 如果 true item 被 push 到 results，迭代继续
        // 如果什么都没找到，则返回空数组
    });

    let users = [
        {id:1, name:'lzx'},
        {id:2, name:'lzx2'},
        {id:3, name:'lzx3'},
    ]
    let arrs = users.filter(item => item.id < 1);
    console.log(arrs);// 没查到返回空数组

    let arrs2 = users.filter(item => item.id < 3);
    console.log(arrs2);//返回符合条件的条目组成的数组
    //[ { id: 1, name: 'lzx' }, { id: 2, name: 'lzx2' } ]

    let arr3 = ["", "0", null, 0, 1, -2].filter(Boolean);
    console.log(arr3);//['0', 1, -2]

    //arr.map 方法是最有用和经常使用的方法之一。
    //该方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
    //题目：求下方数组中每个元素的平方根
    let numbers = [1, 4, 9];
    let roots = numbers.map(Math.sqrt);
    console.log(roots);//[1, 2, 3];

    var numbers2 = [1, 3, 6];
    let doublenumsarr = numbers2.map(function(value) {
        return value * 2;
    })
    console.log(doublenumsarr);//[2, 6, 12]
    console.log(numbers2);// 原数组不变

    //如何在一个 String  上使用 map 方法获取字符串中每个字符所对应的 ASCII 码组成的数组：
    let map = Array.prototype.map;
    let aaa = map.call("hi", function(x) {
        return x.charCodeAt();
    })
    console.log(aaa);//[104, 105]

    //将元素转化为他的字符串长度
    let lengths = ["Bilo", "Ali", "Mobya"].map(item => item.length);
    console.log(lengths);//[4, 3, 5]
}

{
    //arr.sort()
    let arr1 = [1, 2, 15];
    console.log(arr1.sort());// [1, 15, 2] 这些元素默认情况下被按字符串进行排序

    function compareNumeric(a, b) {
        return a - b;
    }
    //按照自己的排序提供函数即可
    console.log(arr1.sort(compareNumeric))// [1, 2, 15]
    console.log(arr1.sort((a, b) => b - a));// [15, 2, 1]

    //arr.reverse() 用于颠倒数组中元素的顺序
    let arr2  = [1, 2, 3, 4];
    arr2.reverse();
    console.log(arr2)// [4, 3, 2, 1]  返回颠倒的原数组

    //将字符串分割成数组或者将数组元素组合成字符串str.split(delim)
    let str1 = "John,Tom,Bob";
    let arr3 = str1.split(",");
    console.log(arr3);//[ 'John', 'Tom', 'Bob' ]

    let str2 = arr3.join("-");
    console.log(str2);//John-Tom-Bob

    //将字符串拆分成字母
    let str3 = "hello";
    console.log(str3.split(""));//[ 'h', 'e', 'l', 'l', 'o' ]

    let urlpara = "name=abc&pwd=1234&source=baidu";
    let arr4 = urlpara.split("&");
    console.log(arr4);//[ 'name=abc', 'pwd=1234', 'source=baidu' ]
    let obj5 = {};
    arr4.forEach(function(item, index){
        let arr = item.split("=");
        obj5[arr[0]] = arr[1]
    })
    console.log(obj5);//{ name: 'abc', pwd: '1234', source: 'baidu' }
    console.log(arr4);//[ 'name=abc', 'pwd=1234', 'source=baidu' ]
    console.log(arr4.join("-"));// name=abc-pwd=1234-source=baidu

    
    //let value = arr.reduce(function(accumulator, item, index, array) {...}, [initial]);
    //计算从1+2+...+6;
    let arr6 = [1, 2, 3, 4, 5, 6];
    let sums = arr6.reduce(function(accumulator, item, index, array){
        //accumulator就是第数组前一个元素返回的结果，如果没有初始值100，那么 reduce 会将数组的第一个元素作为初始值，并从第二个元素开始迭代。但是这里函数之后设置了100，所以一开始accumulator默认等于100
        return accumulator + item;
    }, 100);
    console.log(sums);//121


    //数组是基于对象的，不构成单独的语言类型
    console.log(typeof {} === typeof []);//true
    //所以如何区分数组Array.isArray()
    console.log(Array.isArray({}) === Array.isArray([]));//false

    // arr.find(func, thisArg);
    // arr.filter(func, thisArg);
    // arr.map(func, thisArg);
    // ...
    // thisArg 是可选的最后一个参数
    // thisArg 参数的值在 func 中变为 this。

    //在参军的用户中，筛选出年龄符合条件的
    let users = [
        { name: 'a', age: 16 },
        { name: 'b', age: 19 },
        { name: 'c', age: 24 },
        { name: 'd', age: 30 }
    ]
    let army = {
        minAge: 18,
        maxAge: 27,
        canJoin(user) {
            return user.age >= this.minAge && user.age <= this.maxAge;
        }
    }
    let userCanJoinArr = users.filter(army.canJoin, army);
    console.log(userCanJoinArr);//[ { name: 'b', age: 19 }, { name: 'c', age: 24 } ]
    
    //写函数将list-style-image变成listStyleImage
    function camelize(str) {
        return str
            .split("-")
            .map((item, index) => {
                return index == 0 ? item : item[0].toUpperCase() + item.slice(1);
            })
            .join("");
    }
    console.log(camelize("list-style-image"));

    //写一个函数 filterRange(arr, a, b)，该函数获取一个数组 arr，在其中查找数值大于或等于 a，且小于或等于 b 的元素，并将结果以数组的形式返回。该函数不应该修改原数组。它应该返回新的数组
    let arrsource = [1, 3, 5, 7, 9]
    let finalArr = filterRange(arrsource, 2, 8);
    function filterRange(arr, a, b) {
        return arr.filter(function(item) {
            return item >= a && item <= b
        })
    }
    console.log(finalArr);//[3,5,7]
    console.log(arrsource);//[1,3,5,7,9]

    //写一个函数 filterRangeInPlace(arr, a, b)，该函数获取一个数组 arr，并删除其中介于 a 和 b 区间以外的所有值。检查：a ≤ arr[i] ≤ b。该函数应该只修改数组。它不应该返回任何东西。
    let arrsource2 = [1, 3, 5, 7, 9];
    filterRangeInPlace(arrsource2, 4, 8);
    function filterRangeInPlace(arr, a, b) {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element < a || element > b) {
                arr.splice(i,1);
            }
        }
    }
    console.log(arrsource2);
}

{
    //降序排列
    let arr = [5, 2, 1, -10, 8];
    arr.sort((a, b) => {
        return b - a;
    })
    console.log( arr ); // 8, 5, 2, 1, -10
}

{
    //我们可以使用 slice() 来创建一个副本并对其进行排序：
    let arr = ["HTML","CSS","JS"]
    function copySort(arr) {
        return arr.slice().sort()
    }
    console.log(copySort(arr));[ 'CSS', 'HTML', 'JS' ]
    console.log(arr);[ 'HTML', 'CSS', 'JS' ]
}

{
    let john = { name: "John", surname: "Smith", id: 1 };
    let pete = { name: "Pete", surname: "Hunt", id: 2 };
    let mary = { name: "Mary", surname: "Key", id: 3 };
    let users = [ john, pete, mary ];
    let usersMapped = users.map(item => {
        return {
            fullName: item.name + item.surname,
            id: item.id
        }
    });
    console.log( usersMapped[0].id );
    console.log( usersMapped[0].fullName );
}
{
    //sortByAge(users) 获得对象数组的 age 属性，并根据 age 对这些对象数组进行排序。
    let john = { name: "John", age: 25 };
    let pete = { name: "Bete", age: 30 };
    let mary = { name: "Mary", age: 28 };
    let arr = [ pete, john, mary ];
    let arrSort = sortByAge(arr);
    function sortByAge(arr) {
        return arr.sort((a, b) => a.age - b.age)
    }
    console.log(arrSort);
}

{
    //编写函数 shuffle(array) 来随机排列数组的元素。
    function shuffle(arr) {
        return arr.sort( () => Math.random() - 0.5 )
    }
    let arr = [1, 3, 2];
    console.log(shuffle(arr));
}

{
    //编写 getAverageAge(users) 函数，该函数获取一个具有 age 属性的对象数组，并返回平均年龄。
    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 29 };
    
    let arr = [ john, pete, mary ];

    function getAverageAge(users) {
        let ageSum = users.reduce((acc, item) => {
            return acc + item.age;
        }, 0)
        return ageSum / users.length;
    }
    
    let aveAge = getAverageAge(arr);
    console.log(aveAge);//28
}

{
    // 数组去重1，利用arr.filter() return true的item的集合
    function unique(arr) {
        let obj = {};
        return arr.filter(item => {
            return obj.hasOwnProperty(typeof item + item) 
                ? false 
                : obj[typeof item + item] = true
        })
    }

    function uniqueByEs6(arr) {
        return [...new Set(arr)];
    }

    let strings = ["Hare", "Krishna", "Hare", "Krishna","Krishna", "Krishna", "Hare", "Hare", ":-O", 0];
    console.log(unique(strings));//[ 'Hare', 'Krishna', ':-O', 0 ]

    //数组去重2  new Set(arr); 和展开运算符...  （es6的知识，推荐）
    let arr2 = new Set(strings);
    console.log(arr2);//Set(3) { 'Hare', 'Krishna', ':-O' }
    let arr3 = [...arr2]
    console.log(arr3);
    //可以简写为
    let arr4 = [...new Set(strings)];
    console.log(arr4);//[ 'Hare', 'Krishna', ':-O', 0 ]

    //数组去重3 循环数组并且比对（不推荐，只适用小型数组）
    function unique3(arr) {
        let result = [];
        for (const str of arr) {
            if (!result.includes(str)) {
                result.push(str);
            }
        }
        return result;
    }
    console.log(unique3(strings));//[ 'Hare', 'Krishna', ':-O', 0 ]
}

{
    //从数组创建键值对象
    let users = [
        {id: 'john', name: "John Smith", age: 20},
        {id: 'ann', name: "Ann Smith", age: 24},
        {id: 'pete', name: "Pete Peterson", age: 31},
    ];
      
    let usersById = groupById(users);
    
    function groupById(users) {
        return users.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {});
    }

    console.log(usersById);

    // {
    // john: { id: 'john', name: 'John Smith', age: 20 },
    // ann: { id: 'ann', name: 'Ann Smith', age: 24 },
    // pete: { id: 'pete', name: 'Pete Peterson', age: 31 }
    // }
}

{
    console.log("-----------------------Iterable object（可迭代对象）--------------------");
    // 为了让 range 对象可迭代（也就让 for..of 可以运行）我们需要为对象添加一个名为 Symbol.iterator 的方法（一个专门用于使对象可迭代的内置 symbol）。

    // 当 for..of 循环启动时，它会调用这个方法（如果没找到，就会报错）。这个方法必须返回一个 迭代器（iterator） —— 一个有 next 方法的对象。
    // 从此开始，for..of 仅适用于这个被返回的对象。
    // 当 for..of 循环希望取得下一个数值，它就调用这个对象的 next() 方法。
    // next() 方法返回的结果的格式必须是 {done: Boolean, value: any}，当 done=true 时，表示迭代结束，否则 value 是下一个值。
    
    let range = {
        from: 1,
        to: 5
    };
    range[Symbol.iterator] = function() {
        return {
            curvalue : this.from,
            endvalue : this.to,
            next() {
                if (this.curvalue <= this.endvalue) {
                    return {
                        done: false,
                        value: this.curvalue++
                    }
                } else {
                    return {
                        done: true
                    }
                }
            }
        }
    }

    for (const iterator of range) {
        console.log(iterator);
    }
    // 1 2 3 4 5
}

{
    //字符串是可迭代的
    for (const char of "te𝒳😂st") {
        console.log(char);
    }
    //显示调用迭代器
    let str = "hello";
    let iterator = str[Symbol.iterator]();
    while(true) {
        let result = iterator.next();
        if (result.done) break;
        console.log(result.value);
    }

    //可迭代（iterable）和类数组（array-like）

    let arrayLike = { // 有索引和 length 属性 => 类数组对象
        0: "Hello",
        1: "World",
        length: 2
    };
    //Array.from() 可以把类数组对象转为数组，因此可以迭代也可以执行数组的方法
    let arr = Array.from(arrayLike);
    for (let item of arr) {
        console.log(item)
        //Hello
        //World
    }

    //Array.from(obj[, mapFn, thisArg])
    let arr2 = Array.from(arrayLike, item => item + "对象的数据处理完在给数组");
    for (const item of arr2) {
        console.log(item);
        //Hello对象的数据处理完在给数组
        //World对象的数据处理完在给数组
    }
}

{
    console.log("--------------------Map and Set（映射和集合）-----------------")
    //Map 是一个带键的数据项的集合，就像一个 Object 一样。 但是它们最大的差别是 Map 允许任何类型的键（key）。
    //new Map() —— 创建 map。
    //map.set(key, value) —— 根据键存储值。
    // map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
    // map.has(key) —— 如果 key 存在则返回 true，否则返回 false。
    // map.delete(key) —— 删除指定键的值。
    // map.clear() —— 清空 map。
    // map.size —— 返回当前元素个数。
    let map = new Map();
    map.set(1, 'num1');
    map.set("1", 'str1');
    map.set(true, "bool1");
    console.log(map); //Map(3) { 1 => 'num1', '1' => 'str1', true => 'bool1' }
    console.log(map.has(1)); //true
    console.log(map.size); //3
    map.delete("1");
    console.log(map); //Map(2) { 1 => 'num1', true => 'bool1' }
    console.log(map.get(1)); //num1

    //Map 还可以使用对象作为键。
    let john = { name: 'John' };
    let mapUser = new Map();
    mapUser.set(john, 123);
    console.log(mapUser.get(john)); //123
    console.log(mapUser); //Map(1) { { name: 'John' } => 123 }
}

{
    //使用对象作为键是 Map 最值得注意和重要的功能之一。毕竟如果在普通对象里面使用对象键，则会有下面的例子
    let john = { name: 'John' };
    let obj = {};
    obj[john] = 123;
    console.log(obj); //{ '[object Object]': 123 }  会把对象键转为字符串[object Object]
    console.log(obj["[object Object]"]); //123

    //链式调用 每一次 map.set 调用都会返回 map 本身，所以我们可以进行“链式”调用：
    let map = new Map();
    map.set('1', '1').set(1, 1);
    console.log(map); //Map(2) { '1' => '1', 1 => 1 }
}

{
    // Map 迭代
    // 如果要在 map 里使用循环，可以使用以下三个方法：
    // map.keys() —— 遍历并返回所有的键（returns an iterable for keys），
    // map.values() —— 遍历并返回所有的值（returns an iterable for values），
    // map.entries() —— 遍历并返回所有的实体（returns an iterable for entries）[key, value]，for..of 在默认情况下使用的就是这个。
    let map = new Map();
    map.set(1, 'num1').set('1', 'str1').set(true, 'bool1').set({name : 'john'}, 'obj_John');

    for (const key of map.keys()) {
        console.log(key);
        // 1
        // '1'
        // true
        // { name: 'john' }
    }

    for (const value of map.values()) {
        console.log(value);
        // num1
        // str1
        // bool1
        // obj_John
    }

    for (const item of map.entries()) {
        console.log(item);
        // [ 1, 'num1' ]
        // [ '1', 'str1' ]
        // [ true, 'bool1' ]
        // [ { name: 'john' }, 'obj_John' ]
    }

    //迭代的顺序与插入值的顺序相同。与普通的 Object 不同，Map 保留了此顺序。
    //除此之外，Map 有内置的 forEach 方法，与 Array 类似：
    map.forEach((value, key, map) => {
        console.log(`${key} : ${value}`);
        console.log(map.get(key));
    })
}

{
    //Object.entries：从对象创建 Map
    //当创建一个 Map 后，我们可以传入一个带有键值对的数组（或其它可迭代对象）来进行初始化
    let mapCreate = new Map([
        [1, 'num1'],
        ['1', 'str1'],
        [true, 'bool1']
    ])
    console.log(mapCreate); // Map(3) { 1 => 'num1', '1' => 'str1', true => 'bool1' }
    console.log(mapCreate.get(1)); // num1

    // 如果我们想从一个已有的普通对象（plain object）来创建一个 Map，那么我们可以使用内建方法 Object.entries(obj)，该方法返回对象的键/值对数组，该数组格式完全按照 Map 所需的格式。
    let obj = {
        name: 'john',
        age: 20
    }
    let objToArr = Object.entries(obj)
    console.log(objToArr); // [ [ 'name', 'john' ], [ 'age', 20 ] ]  
    let objToMap = new Map(objToArr);
    console.log(objToMap); // Map(2) { 'name' => 'john', 'age' => 20 }
    //这里，Object.entries 返回键/值对数组：[ ["name","John"], ["age", 30] ]。这就是 Map 所需要的格式。

    //Object.fromEntries：从 Map 创建对象
    let obj2 = Object.fromEntries(objToArr);
    console.log(obj2); // { name: 'john', age: 20 }

    //例如，我们在 Map 中存储了一些数据，但是我们需要把这些数据传给需要普通对象（plain object）的第三方代码。
    let map = new Map();
    map.set('1', 'str1');
    map.set(1, 'num1').set(2, "str2");
    const obj3 = Object.fromEntries(map.entries());// entries()可以被省略
    console.log(obj3); // { '1': 'num1', '2': 'str2' }   因为1会被转为字符串'1' 重写了

    //调用 map.entries() 将返回一个可迭代的键/值对，这刚好是 Object.fromEntries 所需要的格式。
}

{
    console.log('--------------------------Set---------------------------')
    // Set 是一个特殊的类型集合 —— “值的集合”（没有键），它的每一个值只能出现一次。
    // new Set(iterable) —— 创建一个 set，如果提供了一个 iterable 对象（通常是数组），将会从数组里面复制值到 set 中。
    // set.add(value) —— 添加一个值，返回 set 本身
    // set.delete(value) —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
    // set.has(value) —— 如果 value 在 set 中，返回 true，否则返回 false。
    // set.clear() —— 清空 set。
    // set.size —— 返回元素个数。

    // 它的主要特点是，重复使用同一个值调用 set.add(value) 并不会发生什么改变。这就是 Set 里面的每一个值只出现一次的原因。
    // 例如，我们有客人来访，我们想记住他们每一个人。但是已经来访过的客人再次来访，不应造成重复记录。每个访客必须只被“计数”一次。
    let set = new Set();
    let john = { name: "John" };
    let pete = { name: "Pete" };
    let mary = { name: "Mary" };
    set.add(john).add(pete).add(mary).add(john).add(mary);
    console.log(set); // Set(3) { { name: 'John' }, { name: 'Pete' }, { name: 'Mary' } }

    for (const item of set) {
        console.log(item.name);
        // John
        // Pete
        // Mary
    }
}

{
    // Set 迭代（iteration）
    let set = new Set(["orange", "apples", "bananas"]);
    for (const value of set) {
        console.log(value);
    }
    let obj = {
        name: 'lzx',
        age: 26
    }
    let set2 = new Set(Object.entries(obj));
    console.log(set2); // Set(2) { [ 'name', 'lzx' ], [ 'age', 26 ] }
    for (const value of set2) {
        console.log(value);
        // [ 'name', 'lzx' ]
        // [ 'age', 26 ]
    }

    // 注意一件有趣的事儿。forEach 的回调函数有三个参数：一个 value，然后是 同一个值 valueAgain，最后是目标对象。没错，同一个值在参数里出现了两次。
    set2.forEach((value, valueAgain, set) => {
        console.log(value);
        console.log(valueAgain);
        // [ 'name', 'lzx' ]
        // [ 'name', 'lzx' ]
        // [ 'age', 26 ]
        // [ 'age', 26 ]
    })

    // Map 中用于迭代的方法在 Set 中也同样支持：

    // set.keys() —— 遍历并返回所有的值（returns an iterable object for values），
    // set.values() —— 与 set.keys() 作用相同，这是为了兼容 Map，
    // set.entries() —— 遍历并返回所有的实体（returns an iterable object for entries）[value, value]，它的存在也是为了兼容 Map。

    for (const item of set2.keys()) {
        console.log(item);
    }
    // 等价于下面的
    for (const item of set2.values()) {
        console.log(item);
    }
    // 不等于下面
    for (const item of set2.entries()) {
        console.log(item);
        // [ [ 'name', 'lzx' ], [ 'name', 'lzx' ] ]
        // [ [ 'age', 26 ], [ 'age', 26 ] ]
    }
}

{
    // 过滤数组中的唯一元素

    function unique(arr) {
        return Array.from(new Set(arr));
    }
      
    let values = ["Hare", "Krishna", "Hare", "Krishna", "Krishna", "Krishna", "Hare", "Hare", ":-O"];

    console.log( unique(values) ); // Hare, Krishna, :-O
}

{
    // 过滤字谜（Anagrams） 指的是具有相同数量相同字母但是顺序不同的单词。

    function aclean(arr) {
        let map = new Map();

        for (const value of arr) {
            let sorted = value.toLowerCase().split("").sort().join("");
            map.set(sorted, value);
        }

        return Array.from(map.values());
    }

    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
    console.log( aclean(arr) ); // [ 'PAN', 'hectares', 'era' ]
}

{
    // 我们期望使用 map.keys() 得到一个数组，然后使用特定的方法例如 .push 等，对其进行处理。
    let map = new Map();
    map.set("name", "John");
    console.log(map); // [ 'PAN', 'hectares', 'era' ]
    let keys = Array.from(map.keys());
    keys.push('more');
    console.log(keys); // [ 'name', 'more' ]
}


{
    // 对象拷贝
    let person = {
        name: 'John',
        age: 24,
        hobby: [ 'play basketball', 'play computer game' ],
        child: {
            name: 'Bob',
            age: 2,
            hobby: "none"
        }
    }
    
    // 浅拷贝
    let personCopy = Object.assign({}, person);
    console.log(personCopy === person); // false   拷贝了person
    console.log(personCopy.child === person.child); // true  子对象没拷贝到，还是同个引用，不是深拷贝

    // 深拷贝
    function deepCopy(obj) {
        let copy = Array.isArray(obj) ? [] : {}
        
        for (const key in obj) {
           copy[key] = obj[key] instanceof Object ? deepCopy(obj[key]) : obj[key];
        }

        return copy;
    }

    let personDeepCopy = deepCopy(person)
    console.log(personDeepCopy === person); // false 拷贝了person
    console.log(personDeepCopy.child === person.child); // false  递归拷贝子对象，子对象不再是同个引用
}

{
    // WeakMap and WeakSet（弱映射和弱集合）
    let john = { name: "John" };
    let array = [ john ];
    john = null; // 覆盖引用
    // 前面由 john 所引用的那个对象被存储在了 array 中
    // 所以它不会被垃圾回收机制回收
    console.log(array); // [ { name: 'John' } ]

    // 类似的，如果我们使用对象作为常规 Map 的键，那么当 Map 存在时，该对象也将存在。它会占用内存，并且应该不会被（垃圾回收机制）回收。
    let john2 = { name: 'john2' };
    let map = new Map();
    map.set(john2, '...');
    john2 = null;
    console.log([...map.keys()]); // [ { name: 'john2' } ]
}

{
    // WeakMap 和 Map 的第一个不同点就是，WeakMap 的键必须是对象，不能是原始值：
    let weakMap = new WeakMap();
    let obj = { name: 'Jogn' };
    weakMap.set(obj, 'ok');
    // weakMap.set("test", "fail"); // Error，因为 "test" 不是一个对象

    // WeakMap 只有以下的方法：
    // weakMap.get(key)
    // weakMap.set(key, value)
    // weakMap.delete(key)
    // weakMap.has(key)
    console.log(weakMap.get(obj)); // ok
    obj = null;
    console.log(weakMap.get(obj)); // undefined

    // WeakMap 的主要应用场景是 额外数据的存储。如上方的obj被清除，那么ok也被清除了。
}

{
    // 例如，我们有用于处理用户访问计数的代码。收集到的信息被存储在 
    // map 中：一个用户对象作为键，其访问次数为值。当一个用户离开时
    //（该用户对象将被垃圾回收机制回收），这时我们就不再需要他的访问次数了。
    
    let visitCountWeakMap = new WeakMap();

    function addCount(user) {
        let currentCount = visitCountWeakMap.get(user) || 0;
        visitCountWeakMap.set(user, ++currentCount);
    }

    let John = { name: 'John' };
    addCount(John);
    console.log(visitCountWeakMap.get(John)); // 1
    John = null;
    console.log(visitCountWeakMap); // WeakMap { <items unknown> }

    // 现在我们不需要去清理 visitCountWeakMap 了。当 John 对象变成不可访问时，
    // 即便它是 WeakMap 里的一个键，它也会连同它作为 WeakMap 里的键所对应的信息一同被从内存中删除。
}

{
    // WeakSet 与 Set 类似，但是我们只能向 WeakSet 添加对象（而不能是原始值）。
    // 跟 Set 一样，WeakSet 支持 add，has 和 delete 方法，但不支持 size 和 keys()，并且不可迭代。
    // WeakMap 和 WeakSet 最明显的局限性就是不能迭代，并且无法获取所有当前内容。那样可能会造成不便，但是并不会阻止 WeakMap/WeakSet 完成其主要工作 — 成为在其它地方管理/存储“额外”的对象数据。
}

{
    // 追踪访问过我们的用户
    let visitSet = new WeakSet();
    let John = { name: 'John' };
    let Mary = { name: 'Mary' };

    visitSet.add(John);
    visitSet.add(Mary);
    
    if(visitSet.has(John)) {
        console.log(JSON.stringify(John) + " has visited;");
    }

    if(visitSet.has(Mary)) {
        console.log(JSON.stringify(Mary) + " has visited;");
    }

    John = Mary = null;
    console.log(visitSet); // WeakSet { <items unknown> }
    // visitSet 将被自动清理
}

{
    // 存储已读消息
    let messages = [
        {text: "Hello", from: "John"},
        {text: "How goes?", from: "John"},
        {text: "See you soon", from: "Alice"}
    ];

    let unread = new WeakSet();

    unread.add(messages[0]); // 第一条消息已读
    unread.add(messages[2]); // 第三条消息已读
    unread.add(messages[0]); // 再读第一条消息

    console.log("Read message 0: " + unread.has(messages[0])); // true
    console.log("Read message 1: " + unread.has(messages[1])); // false

    messages.shift();
    console.log("Read message 0: " + unread.has(messages[0])); // false
}

{
    // 记录已读时间
    let messages = [
        {text: "Hello", from: "John"},
        {text: "How goes?", from: "John"},
        {text: "See you soon", from: "Alice"}
    ];
    let readTimeMap = new WeakMap();
    
    function recordTime(msg) {
        let time = readTimeMap.get(msg) || new Date();
        readTimeMap.set(msg, time);
    }

    recordTime(messages[0]);
    console.log(readTimeMap.get(messages[0]));
    recordTime(messages[2]);
    recordTime(messages[0]);
    console.log(readTimeMap.get(messages[0]));
}
{
    let obj = {
        name: 'hello',
        age: 28
    }
    console.log(Object.keys(obj)); // [ 'name', 'age' ]
    console.log(Object.values(obj)); // [ 'hello', 28 ]
    console.log(Object.entries(obj)); // [ [ 'name', 'hello' ], [ 'age', 28 ] ]

    //               Map	                        Object
    //  调用语法	map.keys()	        Object.keys(obj)，而不是 obj.keys()
    //  返回值	    可迭代项	            “真正的”数组

    // 这里有一个使用 Object.values 来遍历属性值的例子：
    let usr = {
        name: 'John',
        age: 30
    }

    for (const value of Object.values(usr)) {
        console.log(`value is ${value}`)
    }

    // Object.keys/values/entries 会忽略 symbol 属性

    // 通常这很方便。但是，如果我们也想要 Symbol 类型的键，那么这儿有一个单独的方法 Object.getOwnPropertySymbols，它会返回一个只包含 Symbol 类型的键的数组。另外，还有一种方法 Reflect.ownKeys(obj)，它会返回 所有 键。
}

{
    // 转换对象
    // 对象缺少数组存在的许多方法，例如 map 和 filter 等。
    // 如果我们想应用它们，那么我们可以使用 Object.entries，然后使用 Object.fromEntries：
}
{
    // 使对象转为数组，利用完数组的一些方法后又转回对象
    // 我们有一个带有价格的对象，并想将它们加倍：
    let prices = {
        banana: 1,
        orange: 2,
        meat: 4,
    };
    let doublePrices = Object.fromEntries(
        Object.entries(prices).map(([key, value]) => [key, value * 2])
    )

    console.log(doublePrices); // { banana: 2, orange: 4, meat: 8 }
}

{
    // 属性求和
    let salaries = {
        "John": 100,
        "Pete": 300,
        "Mary": 250
    };

    function sumSalaries(obj) {
        return Object.values(obj).reduce((acc, item) => {
            return acc + item
        })
    }

    console.log(sumSalaries(salaries));
}

{
    // 解构赋值
    // 交换变量值
    let guest = 'Jane';
    let admin = 'Pete';
    [guest, admin] = [admin, guest];
    console.log(guest); // Pete
    console.log(admin); // Jane

    // 剩余的...
    let [name, age, ...other] = ['lzx', 26, 'male', 'poor'];
    console.log(other); // ['male', 'poor'];

    // 我们可以通过指定空对象 {} 为整个参数对象的默认值：
    function showMenu({ title = 'Menu', width = 100, height = 200 } = {}) {
        console.log(`${title} ${width} ${height}`); // tit 120 240
    }
    let obj = {
        title: 'tit',
        width: 120,
        height: 240,
    }
    showMenu(obj);

    // 解构赋值可以立即将一个对象或数组映射到多个变量上。

    // 解构对象的完整语法：
    // let {prop : varName = default, ...rest} = object
    // 这表示属性 prop 会被赋值给变量 varName，如果没有这个属性的话，就会使用默认值 default。

    // 解构数组的完整语法：
    // let [item1 = default, item2, ...rest] = array
}

{
    // 这儿有一个 salaries 对象：
    let salaries = {
        "John": 100,
        "Pete": 300,
        "Mary": 250,
        "Lian": 300
    };

    // 新建一个函数 topSalary(salaries)，返回收入最高的人的姓名。
    // 如果 salaries 是空的，函数应该返回 null。
    // 如果有多个收入最高的人，返回其中任意一个即可。

    function topSalary(users = {}) {
        let ascSorted = Object.entries(users).sort((a, b) => a[1] - b[1]);
        return ascSorted.length ? ascSorted[ascSorted.length - 1][0] : null;
    }

    console.log(topSalary(salaries)); // Lian
}

{
    // 日期和时间
    // new Date()
    // 不带参数 —— 创建一个表示当前日期和时间的 Date 对象：
    let now = new Date();
    console.log(now);

    let date1970 = new Date(0);
    console.log(date1970); // 1970-01-01T00:00:00.000Z

    let date1970s = new Date( 24 * 3600 * 1000 );
    console.log(date1970s); // 1970-01-02T00:00:00.000Z
    //传入的整数参数代表的是自 1970-01-01 00:00:00 以来经过的毫秒数，该整数被称为 时间戳。

    // 在 01.01.1970 之前的日期带有负的时间戳，例如：
    let date1970bf = new Date( -24 * 3600 * 1000);
    console.log(date1970bf); // 1969-12-31T00:00:00.000Z

    // new Date(datestring)
    // 如果只有一个参数，并且是字符串，那么它会被自动解析。该算法与 Date.parse 所使用的算法相同，我们将在下文中进行介绍。
    {
        let date = new Date("2020-05-20");
        console.log(date); // 2020-05-20T00:00:00.000Z
    }

    // new Date(year, month, date, hours, minutes, seconds, ms)
    // 使用当前时区中的给定组件创建日期。只有前两个参数是必须的。
    
    // year 必须是四位数：2013 是合法的，98 是不合法的。
    // month 计数从 0（一月）开始，到 11（十二月）结束。
    // date 是当月的具体某一天，如果缺失，则为默认值 1。
    // 如果 hours/minutes/seconds/ms 缺失，则均为默认值 0。
    {
        let date = new Date(2019, 9, 7, 20, 20, 20, 500);
        console.log(date); // 2019-10-07T12:20:20.500Z

        let dateMain = new Date(2020, 4, 20);
        console.log(dateMain); // 2020-05-19T16:00:00.000Z
    }

    // 访问日期组件
    // getFullYear()
    // 获取年份（4 位数）
    // getMonth()
    // 获取月份，从 0 到 11。
    // getDate()
    // 获取当月的具体日期，从 1 到 31，这个方法名称可能看起来有些令人疑惑。
    // getHours()，getMinutes()，getSeconds()，getMilliseconds()
    // getDay()
    // 获取一周中的第几天，从 0（星期日）到 6（星期六）。第一天始终是星期日，在某些国家可能不是这样的习惯，但是这不能被改变。
    {
        let date = new Date(); //current time
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let minisecond = date.getMilliseconds();
        let weakday = date.getDay();
        console.log(`${year}-${month + 1}-${day} ${hour}:${minute}:${second} Z${minisecond}-星期${weakday}`);
    }
    // 以上的所有方法返回的组件都是基于当地时区的
    // 当然，也有与当地时区的 UTC 对应项，它们会返回基于 UTC+0 时区的日、月、年等：getUTCFullYear()，getUTCMonth()，getUTCDay()。只需要在 "get" 之后插入 "UTC" 即可。
    {
        // 在 UTC+0 时区的小时数（非夏令时的伦敦时间）
        let date = new Date();
        let year = date.getUTCFullYear();
        let month = date.getUTCMonth();
        let day = date.getUTCDate();
        let hour = date.getUTCHours();
        let minute = date.getUTCMinutes();
        console.log(`${year}-${month + 1}-${day} ${hour}:${minute}`);
    }

    // 除了上述给定的方法，还有两个没有 UTC 变体的特殊方法：

    // getTime()
    // 返回日期的时间戳 —— 从 1970-1-1 00:00:00 UTC+0 开始到现在所经过的毫秒数

    // getTimezoneOffset()
    // 返回 UTC 与本地时区之间的时差，以分钟为单位：
    
    {
        let timeOffset = new Date().getTimezoneOffset(); 
        console.log(timeOffset); // -480
    }
    // 自动校准 是 Date 对象的一个非常方便的特性。我们可以设置超范围的数值，它会自动校准。
    {
        let date = new Date(2013, 0, 33);;
        console.log(date); // 2013-01-31T16:00:00.000Z
    }

    // 超出范围的日期组件将会被自动分配。
    {
        let date = new Date(2016, 1, 28);
        date.setDate(date.getDate() + 5);
        console.log(date); // 2016-03-03T16:00:00.000Z
    }

    // 这个特性经常被用来获取给定时间段后的日期。例如，我们想获取“现在 70 秒后”的日期：
    {
        let date = new Date();
        console.log(date); // 2021-04-06T15:21:01.101Z
        date.setSeconds(date.getSeconds() + 70);
        console.log(date); // 2021-04-06T15:22:11.101Z
    }

    // 当 Date 对象被转化为数字时，得到的是对应的时间戳，与使用 date.getTime() 的结果相同：
    {
        let date  = new Date();
        console.log(+date); // 1617722660440

        let dateAfterOneMonth = new Date().setMonth(new Date().getMonth() + 1);
        let dateNow = new Date();

        let reduceTimeStamp = +dateAfterOneMonth - (+dateNow);
        let reduceDays = reduceTimeStamp / (1000 * 3600 * 24);
        console.log(reduceDays); // 30
    }

    //有一个重要的副作用：日期可以相减，相减的结果是以毫秒为单位时间差。
    {
        let start = new Date();
        for (let i = 0; i < 100000; i++) {
            let dosomething = i * i * i;
        }
        let end = new Date();

        console.log(`${end - start}ms`);
    }

    // 如果我们仅仅想要测量时间间隔，我们不需要 Date 对象。

    // 有一个特殊的方法 Date.now()，它会返回当前的时间戳。
    
    // 它相当于 new Date().getTime()，但它不会创建中间的 Date 对象。因此它更快，而且不会对垃圾处理造成额外的压力。

    {
        let start = Date.now();
        for (let i = 0; i < 100000; i++) {
            let dosomething = i * i * i;
        }
        let end = Date.now();
        console.log(`${end - start}ms`);
    }
    // 创建一个 Date 对象，日期是：Feb 20, 2012, 3:12am。时区是当地时区。
    {
        let date = new Date(2012, 1, 20, 3, 12);
        console.log(date);
    }
    // 编写一个函数 getWeekDay(date) 以短格式来显示一个日期的星期数：‘MO’，‘TU’，‘WE’，‘TH’，‘FR’，‘SA’，‘SU’。
    {
        console.log(getWeekDay(new Date(2021, 3, 5)));
        function getWeekDay(date) {
            let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
            return days[date.getDay()];
        }
    }

    // 写一个函数 getDateAgo(date, days)，返回特定日期 date 往前 days 天是哪个月的哪一天
    // P.S. 函数不应该修改给定的 date 值。
    let date = new Date();
    function getDateAgo(date, days) {
        let dateCopy = date;
        dateCopy.setDate(date.getDate() - days);
        return dateCopy
    }
    console.log(getDateAgo(date, -100));
    
    // 写一个函数 getLastDayOfMonth(year, month) 返回 month 月的最后一天。有时候是 30，有时是 31，甚至在二月的时候会是 28/29。
    {
        function getLastDayOfMonth(year, month) {
            let date = new Date(year, month + 1, 1);
            let dateCopy = date;
            dateCopy.setDate(date.getDate() - 1);
            return dateCopy.getDate();
        }
          
        console.log( getLastDayOfMonth(2012, 0) ); // 31
        console.log( getLastDayOfMonth(2012, 1) ); // 29
        console.log( getLastDayOfMonth(2013, 1) ); // 28
    }

    // 写一个函数 getSecondsToday()，返回今天已经过去了多少秒？
    {
        console.log(getSecondsToday());
        function getSecondsToday(){
            let start = new Date();
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);
            start.setMilliseconds(0);
            let now = new Date();
            return Math.round(((now.getTime() - start.getTime())) / 1000) + 's';
        }
    }
}

{
    // 返回距离明天的秒数。

    function getSecondsToTomorrow(){
        let start = new Date();
        let now = new Date();
        start.setDate(start.getDate() + 1);
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        return Math.round(((start.getTime() - now.getTime())) / 1000) + 's';
    }

    console.log(getSecondsToTomorrow());
}

{
    // JSON 方法，toJSON
    {
        let user = {
            name: 'John',
            age: 34,
            toString() {
                return `{name: "${this.name}", age: ${this.age}}`;
            }
        }
        console.log(user + "");
        // 上面这种方法，如果针对对象比较复杂，处理起来会非常麻烦，但是有JSON.stringfy()让问题变得简单
    }

    {
        // JSON.stringify 将对象转换为 JSON。
        // JSON.parse 将 JSON 转换回对象。
        let student = {
            name: 'John',
            age: 30,
            isAdmin: false,
            courses: ['html', 'css', 'js', 2],
            wife: null
        };
        let studentJSON = JSON.stringify(student);
        console.log(studentJSON); // {"name":"John","age":30,"isAdmin":false,"courses":["html","css","js"],"wife":null}
    }

    // 请注意，JSON 编码的对象与对象字面量有几个重要的区别：
    // 字符串使用双引号。JSON 中没有单引号或反引号。所以 'John' 被转换为 "John"。
    // 对象属性名称也是双引号的。这是强制性的。所以 age:30 被转换成 "age":30。
    {
        // JSON.stringify 也可以应用于原始（primitive）数据类型。
        console.log(JSON.stringify(1)); // 1
        console.log(JSON.stringify('test')); // "test"
        console.log(JSON.stringify(false)); // false
        console.log(JSON.stringify([1, 2, 4])); // [1,2,4]
    }

    // JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过。
    {
        // 函数属性（方法）。
        // Symbol 类型的属性。
        // 存储 undefined 的属性。
        let user = {
            sayHi() {
                console.log("hi");
            }, // 方法 会被忽略
            [Symbol("abc")]: "abc", // symbol 会被忽略
            something: undefined   // 未定义属性  会被忽略
        };
        let userJSON = JSON.stringify(user);
        console.log(userJSON); // {}
    }
    // 重要的限制：不得有循环引用。
    {
        let room = {
            number: 23
        };
          
        let meetup = {
            title: "Conference",
            participants: ["john", "ann"]
        };

        meetup.place = room;
        room.occupiedBy = meetup;
        // 两个对象循环引用了，所以不能使用JSON.stringfy()
    }

    // JSON.stringify 的完整语法是：
    // let json = JSON.stringify(value [, replacer, space]);
    // replacer可选参指的是JSON要转化的特定属性名数组，sapce可选参数指的是转化的格式
    {
        let room = {
            number: 23
        };
        let meetup = {
            title: "Conference",
            participants: [{name: "John"}, {name: "Alice"}],
            place: room // meetup 引用了 room
        };
        room.occupiedBy = meetup; // room 引用了 meetup

        let replacer = JSON.stringify(meetup, ['title', 'participants']);
        console.log(replacer);
        // {"title":"Conference","participants":[{},{}]}
    }

    // let json = JSON.stringfy(value, null, 2)
    // 代表两个空格缩进
    {
        let user = {
            name: 'yohan',
            age: 25,
            child: [
                { name: 'boy', age: 3 },
                { name: 'girl', age: 5 },
            ]
        };

        console.log( JSON.stringify(user, null, 2) );
        // {
        //     "name": "yohan",
        //     "age": 25,
        //     "child": [
        //       {
        //         "name": "boy",
        //         "age": 3
        //       },
        //       {
        //         "name": "girl",
        //         "age": 5
        //       }
        //     ]
        // }
    }

    // 像 toString 进行字符串转换，对象也可以提供 toJSON 方法来进行 JSON 转换。如果可用，JSON.stringify 会自动调用它。
    {
        let room = {
            width: 100,
            height: 110,
            toJSON() {
                return this.height;
            }
        }

        console.log( JSON.stringify(room) ); // 110
    }
    // 此外，JSON 不支持注释。向 JSON 添加注释无效。

    // 
    {
        let obj = {
            title: "Conference",
            date: new Date(2021, 4, 20)
        }

        let str = JSON.stringify(obj, ['title', 'date'], 2);
        console.log(str);
        // {
        //     "title": "Conference",
        //     "date": "2021-05-19T16:00:00.000Z"
        // }

        let obj2 = JSON.parse(str);
        console.log(obj2); // { title: 'Conference', date: '2021-05-19T16:00:00.000Z' }
        
        // 第二个参数传一个接收键值对的函数，处理键为date的值，改为日期对象
        let obj3 = JSON.parse(str, (key, value) => {
            if(key === "date") {
                return new Date(value);
            }
            return value;
        });
        console.log(obj3); // { title: 'Conference', date: 2021-05-19T16:00:00.000Z }
        // 顺便说一下，这也适用于嵌套对象：
    }
    // 将 user 转换为 JSON，然后将其转换回到另一个变量。
    {
        let user = {
            name: "John Smith",
            age: 35
        };

        let userCopy = JSON.parse(JSON.stringify(user, null, 0));
        console.log(userCopy);
    }

    {
        // 编写 replacer 函数，移除引用 meetup 的属性，并将其他所有属性序列化：
        let room = {
            number: 23
        };
        let meetup = {
            title: 'Conference',
            occupiedBy: [
                {name: "John"},
                {name: "Alice"}
            ],
            place: room
        };

        // 循环引用
        room.occupiedBy = meetup;
        meetup.self = meetup;

        let meetupJson = JSON.stringify(meetup, function(key, value) {
            return key != "" && value === meetup ? undefined : value;
        }, "")
        console.log(meetupJson);
        // {"title":"Conference","occupiedBy":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}
    }
}
console.log("--------------递归和堆栈-----------------");
{
    // 现在，如果我们需要一个函数来获取公司所有不同部门员工的薪资的总数。我们该怎么做？
    let companyJson = '{"sales":[{"name":"John","salary":1000},{"name":"Alice","salary":1600}],"development":{"sites":[{"name":"Peter","salary":2000},{"name":"Alex","salary":1800}],"internals":[{"name":"Jack","salary":1300}]}}';

    // 第一步先把json转为对象
    let company = JSON.parse(companyJson);
    
    // 创建函数遍历对象 遇到数组就累加各项的salary，遇到对象就把对象的值循环调用递归函数处理
    function sumSalaries(dep) {
        if (Array.isArray(dep)) {
            return dep.reduce((acc, item) => {
                return acc + item.salary
            }, 0)
        } else {
            let sum = 0;
            
            for (let subDep of Object.values(dep)) {
                sum += sumSalaries(subDep);
            }

            return sum;
        }
    }

    console.log(sumSalaries(company)); // 7700
}

{
    // 编写一个函数 sumTo(n) 计算 1 + 2 + ... + n 的和。

    // 循环法
    function sumToByCicle(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum = sum + i
        }
        return sum;
    }
    console.log(sumToByCicle(100)); // 5050

    // 递归法   
    function sumToBydigui(n) {
        if(n === 1) {
            return 1;
        }
        return n + sumToBydigui(n - 1);
    }
    console.log(sumToBydigui(100));

    // 数学大法
    function sumToByMath(n) {
        return n * (n + 1) / 2;
    }
    console.log(sumToByMath(100));

    {
        // 斐波那契数
        // 前两个数字是 1，然后是 2(1+1)，然后 3(1+2)，5(2+3) 等：1, 1, 2, 3, 5, 8, 13, 21...
        function fib(n) {
            if (n <= 2) {
                return 1;
            } else {
                return fib(n - 1) + fib(n - 2);
            }
        }

        console.log( fib(10) ); // 55  如果传入函数太大 递归十分费时。下方循环法可解决

        function loopfib(n) {
            let a = 1;
            let b = 1;
            
            for (let i = 3; i <= n; i++) {
                let c = a + b; // 声明变量c暂存一会要返回出去的值 假设n == 3，c == 2
                a = b;
                b = c;
            }

            return b;
        }

        console.log(loopfib(60)); // 1548008755920   可瞬间计算出来，比递归快很多
    }
}

{
    console.log("-------------Rest 参数与 Spread 语法------------");
    // Rest 参数可以通过使用三个点 ... 并在后面跟着包含剩余参数的数组名称，来将它们包含在函数定义中。
    // 这些点的字面意思是“将剩余参数收集到一个数组中”。
    function sumAll(arg1, ...args) {
        return args.reduce((acc, item) => acc + item, arg1);
    }
    console.log( sumAll(1, 2, 3) ); // 6
    console.log( sumAll(1, 2, 3, 4) ); // 10
    // 上面的函数，接收2个参数，第一个接收的是单个，第二个接收的是剩余的所有参数的数组

    {
        // “arguments” 变量
        // 有一个名为 arguments 的特殊的类数组对象，该对象按参数索引包含所有参数。
        function showRest() {
            // arguments是类数组对象，需要通过Array.from()转为数组才能用map()等函数
            Array.from(arguments).map(item => console.log(item));
        }
        showRest(1, 2, "hello"); // 1 2 "hello"
    }

    // 箭头函数是没有 "arguments" 也没有自己的this

    // Spread 语法
    {
        // 利用Math对象求某个数组的最大值，数组很长 不能一个个复制进去，显得很丑
        let arrNums = [1, -2, 0, 13, 5, 20, -10, 33, 18, 99, -32, 2];
        // 利用... 将数组转为参数列表
        console.log( Math.max(...arrNums) ); // 99
        // 还可以插入额外的数
        console.log( Math.max(...arrNums, 102) ); // 102

        // 并且，我们还可以使用 spread 语法来合并数组：
        let arrStrs = ["h", "e", "l", "l", "o"];

        let arrSum = [...arrNums, ...arrStrs];
        console.log(...arrSum); // 1 -2 0 13 5 20 -10 33 18 99 -32 2 h e l l o

        // 任何可迭代对象都可以使用...(spread)
        let str = "java";
        let arrstr = [...str];
        console.log(arrstr); // [ 'j', 'a', 'v', 'a' ]

        // Array.from 适用于类数组对象也适用于可迭代对象。
        // Spread 语法只适用于可迭代对象。
        // 因此，对于将一些“东西”转换为数组的任务，Array.from 往往更通用。
    }
}

{
    console.log("-------------变量作用域，闭包-----------------");
    // 当代码要访问一个变量时 —— 首先会搜索内部词法环境，然后搜索外部环境，然后搜索更外部的环境，以此类推，直到全局词法环境。
    // 在每次 makeCounter() 调用的开始，都会创建一个新的词法环境对象，以存储该 makeCounter 运行时的变量。
    // 所有的函数在“诞生”时都会记住创建它们的词法环境。从技术上讲，这里没有什么魔法：所有函数都有名为 [[Environment]] 的隐藏属性，该属性保存了对创建该函数的词法环境的引用。
    {
        function makeCounter() {
            let count = 0;
          
            return function() {
              return count++;
            };
        }

        let counter = makeCounter(); // 调用函数，创建了环境对象counter.[[Environment]]
        console.log(counter()); // 0
        console.log(counter()); // 1
        console.log(counter()); // 2

        let counter2 = makeCounter(); // 再调用函数，创建了新的环境对象counter2.[[Environment]]
        console.log(counter2()); // 0;
    }

    // 闭包
    // 是指 “内部函数总是可以访问其所在的外部函数中声明的变量和参数” 即使在其外部函数被返回（寿命终结）了之后。

    function f() {
        let value = 123;
        
        return function() {
            console.log(value);
        }
    }

    let g = f();
    console.log(g()); // 123

    {
        function f() {
            let value = Math.random();
          
            return function() { console.log(value); };
          }
          
          // 数组中的 3 个函数，每个都与来自对应的 f() 的词法环境相关联
          let arr = [f(), f(), f()];
          // 所以调用各个函数输出的是不一样的
          console.log(arr[0]());
          console.log(arr[1]());
    }
    {
        function Counter() {
            // this = {}; 隐式创建
            let count = 0;

            this.up = function() {
                return ++count;
            };

            this.down = function() {
                return --count;
            };
            // return this; 隐式返回
        }

        let counter = new Counter();
        // 这两个嵌套函数都是在同一个词法环境中创建的，所以它们可以共享对同一个 count 变量的访问：
        console.log( counter.up() ); // 1
        console.log( counter.up() ); // 2
        console.log( counter.down() ); // 1
        
        let counter2 = new Counter();
        console.log( counter2.down() ); // -1
    }

    {
        // 编写一个像 sum(a)(b) = a+b 这样工作的 sum 函数。
        function sum(a) {
            return function(b) {
                return a + b;
            }
        }

        console.log(sum(5)(-1));
    }
    {
        let x = 1;
        function func() {
            console.log(x); // 因为x被提升到函数顶部，所以只声明没复制，报错，改成var可以输出undefined
            let x = 2; // let x 会被提升到函数顶部
        }

        // func(); 变量暂时无法使用的区域（从代码块的开始到 let）有时被称为“死区”。
    }
    {
        // 通过函数筛选
        function inBetween(a, b) {
            return function(n) {
                return (n >= a && n <=b) ? true : false;
            }
        }

        function inArray(arr) {
            return function(n) {
                return arr.includes(n);
            }

        }

        let arr = [1, 2, 3, 4, 5, 6, 7];
        console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
        console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2
    }

    {
        function byField(sortby) {
            return function(a, b) {
                return a[sortby] > b[sortby] ? 1 : -1;
            }
        }
        let users = [
            { name: "John", age: 20, surname: "Johnson" },
            { name: "Pete", age: 18, surname: "Peterson" },
            { name: "Ann", age: 19, surname: "Hathaway" }
        ];

        console.log(users.sort(byField('name')));
        console.log(users.sort(byField('age')));
    }

    {
        function makeArmy() {
            let shooters = [];
            console.log(i+"----")
            for(var i = 0; i < 10; i++) {
                let shooter = function() { // 创建一个 shooter 函数，
                    console.log( i ); // 应该显示其编号
                  };
                shooters.push(shooter);
            }
          
            // ……返回 shooters 数组
            return shooters;
          }
          
          let army = makeArmy();
          
          // ……所有的 shooter 显示的都是 10，而不是它们的编号 0, 1, 2, 3...
          army[0](); // 编号为 0 的 shooter 显示的是 10
          army[1](); // 编号为 1 的 shooter 显示的是 10
          army[2](); // 10，其他的也是这样。

          // 因为闭包的关系，“内部函数总是可以访问其所在的外部函数中声明的变量和参数”，for循环中，var i 会被提升到外部函数顶部成为所有内部函数都可以访问的变量，经过for循环之后，大家访问到的都是10；
          // 如果要解决闭包这个问题，那么在for循环中要使用let声明，这样每个i不会被提升到外部函数成为大家共享到变量
    }
}

{
    // 旧时的var
    // 用 var 声明的变量，不是函数作用域就是全局作用域。它们在代码块外也是可见的（译注：也就是说，var 声明的变量只有函数作用域和全局作用域，没有块级作用域）。
    {
        function sayHi(){
            console.log(phrase);
            var phrase = "hello"; // var phrase被提升到函数最顶部。赋值不会，所以输出undefined
        }
        sayHi();
    }

    // var 声明的变量没有块级作用域，它们仅在当前函数内可见，或者全局可见（如果变量是在函数外声明的）。
    // var 变量声明在函数开头就会被处理（脚本启动对应全局变量）。
}
{
    // 全局对象
    // globalThis 被作为全局对象的标准名称加入到了 JavaScript 中，所有环境都应该支持该名称。所有主流浏览器都支持它。

    // 如果一个值非常重要，以至于你想使它在全局范围内可用，那么可以直接将其作为属性写入：
    globalThis.currentUser = {
        name: 'lzx',
        age: 25
    }
    {
        {
            console.log( globalThis.currentUser ); // { name: 'lzx', age: 25 }
        }
    }
    
}

{
    console.log("---------------函数对象，NFE Named Function Expression-----------------")
    // 在 JavaScript 中，函数就是对象。 可被调用的“行为对象（action object）
    // 属性name
    {
        function sayHi() {
            console.log("Hi!");
        }
        console.log(sayHi.name); // sayHi
    }
    // 对象方法也有名字：
    {
        let user = {
            name: 'kzx',
            sayHi() {

            },
            sayBye: function() {
                console.log('bye');
            }
        }
        console.log( user.sayHi.name ); // sayHi
        console.log( user.sayBye.name ); // sayBye
    }
    // 属性length（返回函数入参的个数）
    function f1(a) {}
    function f2(a, b) {}
    function f3(a, b, ...more) {}

    console.log(f1.length); // 1
    console.log(f2.length); // 2
    console.log(f3.length); // 2
    // 可以看到，rest 参数不参与计数。
    {
        function sayHi(...handlers) {
            for (const handler of handlers) {
                if (handler.length === 0) {
                    handler();
                } else {
                    handler('hi')
                }
            }
        }

        sayHi(() => console.log('say nothing'), argument => {
            console.log(argument);
        })
    }
    // 自定义属性
    {
        function sayHi() {
            console.log('Hi');
            sayHi.counter++;
        }

        sayHi.counter = 0;

        sayHi();
        sayHi();

        console.log(sayHi.counter); // 2
        // 属性不是变量，比如 sayHi.counter = 0，不会 在函数内定义一个局部变量 counter。换句话说，属性 counter 和变量 let counter 是毫不相关的两个东西。    
        // 现在 count 被直接存储在函数里，而不是它外部的词法环境。
        // 两者最大的不同就是如果 count 的值位于外层（函数）变量中，那么外部的代码无法访问到它，只有嵌套的函数可以修改它。而如果它是绑定到函数的，那么就很容易：
        {
            function makeCounter() {
                function counter() {
                    return ++counter.count;
                }
                counter.count = 0;
                return counter;
            }

            let counter = makeCounter();
            counter.count = 10;
            console.log(counter()); // 11
        }
        // 关于名字 func 有两个特殊的地方，这就是添加它的原因：

        // 它允许函数在内部引用自己。
        // 它在函数外是不可见的。
        {
            let sayHi = function func(who) {
                if (who) {
                    console.log(`hello,${who}`);
                } else {
                    func('Guest');
                }
            }
            
            sayHi(); // hello,Guest;
            //func(); // error func is not defined 它在函数外是不可见的。
        }
        {
            // 我们为什么使用 func 呢？为什么不直接使用 sayHi 进行嵌套调用？
            let sayHi = function func(who) {
                if (who) {
                  console.log(`Hello, ${who}`);
                } else {
                  func("Guest"); // Error: sayHi is not a function
                }
              };
              
              let welcome = sayHi;
              sayHi = null;
              console.log(welcome()); // 如果在函数里面使用sayHi()进行嵌套调用 此时会找不到而报错
        }
    }
    {
        // 为 counter 添加 set 和 decrease 方法
        // 修改 makeCounter() 代码，使得 counter 可以进行减一和设置值的操作：
        // counter() 应该返回下一个数字（与之前的逻辑相同）。
        // counter.set(value) 应该将 count 设置为 value。
        // counter.decrease(value) 应该把 count 减 1。

        function makeCounter() {
            let count = 0;
            function counter() {
                return ++count;
            }
            counter.set = function(value) {
                return count = value;
            }
            counter.decrease = function() {
                return --count;
            }
            return counter;
        }

        let counter = makeCounter();
        console.log(counter()); // 1
        console.log(counter.set(10)); // 10
        console.log(counter.decrease()); // 9
    }
    {
        function sum(a) {
            let currentNum = a;
            
            function f(b) {
                currentNum = currentNum + b;
                return f;
            }
            f.toString = function() {
                return currentNum;
            }

            return f;
        }

        console.log(sum(1)(2)(3).toString()); // 6
    }
}
// -----------------------------------上面代码复习于2021年4月14日--------------------------------------------
{
    // "new Function" 语法
    console.log(`"new Function" 语法`);
    
    // 语法
    // let func = new Function ([arg1, arg2, ...argN], functionBody);

    let sum = new Function ('a', 'b', 'return a + b');
    console.log( sum(1, 3) ); // 4

    let sayHi = new Function ('console.log("hi")');
    sayHi();

    // new Function 允许我们将任意字符串变为函数。例如，我们可以从服务器接收一个新的函数并执行它：

    // let str = ... 动态地接收来自服务器的代码 ...
    // let func = new Function(str);
    // func();

    // 通常，闭包是指使用一个特殊的属性 [[Environment]] 来记录函数自身的创建时的环境的函数。
    // 它具体指向了函数创建时的词法环境。

    // 但是如果我们使用 new Function 创建一个函数，那么
    // 该函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境。

    // 因此，此类函数无法访问外部（outer）变量，只能访问全局变量。
    function getFunc() {
        let value = "test";

        let func = new Function ('console.log(value)');

        return func;
    }

    // getFunc()(); // value is not defined;

    // 而使用常规的创建函数方法，结果就会大不相同
    function getFunc2() {
        let value = "test";

        let func = function() {
            console.log( value );
        }

        return func;
    }
    // getFunc2()(); // test
}

{
    // 调度：setTimeout 和 setInterval
    console.log(`-----------调度：setTimeout 和 setInterval-----------`);

    // setTimeout 允许我们将函数推迟到一段时间间隔之后再执行。
    // setInterval 允许我们重复运行一个函数，从一段时间间隔之后开始运行，之后以该时间间隔连续重复运行该函数。

    // setTimeout语法
    // let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

    // func|code 想要执行的函数或代码字符串。 一般传入的都是函数
    // delay 执行前的延时，以毫秒为单位（1000 毫秒 = 1 秒），默认值是 0；
    // arg1，arg2… 要传入被执行函数（或代码字符串）的参数列表（IE9 以下不支持）
    {
        // function sayHi() {
        //     console.log('1秒过去了');
        // }
        // setTimeout(sayHi, 1000);
    }

    // 带参数
    // function sayWhat(name, age) {
    //     console.log(`my name is ${name} and my age is ${age}`);
    // }
    // setTimeout(sayWhat, 1000, 'lzx', 25);

    // 用箭头函数
    // setTimeout(() => console.log('Hello'), 1000);

    // 用 clearTimeout 来取消调度
    // setTimeout 在调用时会返回一个“定时器标识符（timer identifier）”，
    // 在我们的例子中是 timerId，我们可以使用它来取消执行。
    {   
        // let timeHandle = setTimeout(sayWhat, 2000, 'zx', 19);
        // clearTimeout(timeHandle); // 清掉了定时器
        // console.log(timeHandle);
    }

    // setInterval
    // setInterval 方法和 setTimeout 的语法相同：
    // let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)

    // 所有参数的意义也是相同的。不过与 setTimeout 只执行一次不同，setInterval 是每间隔给定的时间周期性执行。
    // 想要阻止后续调用，我们需要调用 clearInterval(timerId)。
    {
        // let timeid = setInterval( () => { console.log('1') }, 2000); // 每两秒打印一次
        // setTimeout( () => { clearInterval(timeid); console.log('stop') }, 5000 ); // 5秒后终止
    }
    
    // 嵌套的 setTimeout
    {
        // let timeid = setTimeout( () => {
        //     console.log(2);
        //     timeid = setTimeout( () => {
        //         console.log(2);
        //     }, 2000)
        // }, 2000)
    }

    {
        // 我们要实现一个服务（server），每间隔 2 秒向服务器发送一个数据请求，
        // 但如果服务器过载了，那么就要降低请求频率，一旦请求成功，立马重新2秒一个请求
        // let delay = 2000;

        // let timeid = setTimeout( function request() {
        //     console.log('request...')

        //     if (Math.round(Math.random())) {
        //         console.log('请求成功')
        //         delay = 2000;
        //     } else {
        //         console.log('请求失败')
        //         delay += 2000;
        //     }

        //     timeid = setTimeout(request, delay);
        // }, delay);
    }

    {
        // 写一个函数依次输出整数from到to之间到值
        let funcSetInterval = function(from, to) {
            let current = from;
            let timeid = setInterval(function() {
                console.log(current);
                if (current >= to) {
                    clearInterval(timeid);
                }
                current++;
            }, 1000);
        }
        
        // funcSetInterval(5, 10);

        let funcSetTimeout = function(from, to) {
            let timeid = setTimeout(function func(){
                if (from >= to) {
                    clearTimeout(timeid);
                } else {
                    setTimeout(func, 1000);
                }
                console.log(from);
                from++;
            }, 1000)
        }

        // funcSetTimeout(5, 10);
    }
}

{
    // 装饰器模式和转发，call/apply
    console.log(`---------装饰器模式和转发，call/apply------------`)
    {
        // 假设我们有一个 CPU 重负载的函数 slow(x)，但它的结果是稳定的。换句话说，对于相同的 x，它总是返回相同的结果。
        // 如果经常调用该函数，我们可能希望将结果缓存（记住）下来，以避免在重新计算上花费额外的时间。

        function slow(x) {
            let start = new Date();
            for (let i = 0; i <100000000; i++) {
                let something = i * i * i * x;
            }
            let end = Date.now();
            console.log(`${end - start}ms后打印出下面数字`);
            return x // 1286ms后才能返回处理后的结果
        }

        console.log( slow(2) ); // 1286ms之后打印传入参数2
        console.log( slow(2) ); // 1286ms之后打印传入参数2，重复计算浪费时间
        // 执行了五次，每次都需要经历重灾难运算

        // 可以创建一个包装器（wrapper）函数，该函数增加了缓存功能。
        function cachingDecorator(func) {
            let cache = new Map();

            return function(x) {
                if (cache.has(x)) {
                    return cache.get(x);
                }
                let result = func(x);
                cache.set(x, result);
                return result;
            }
        }
        
        slow = cachingDecorator(slow); // 附带缓存的包装器函数对函数进行包装并且返回新的函数
        console.log( slow(2) ); // 1286ms之后打印传入参数2
        console.log( slow(2) ); // 有缓存快速返回值
        console.log( slow(3) ); // 新值经历灾难计算
        console.log( slow(3) ); // 有缓存快速返回
    }
    // func.call(context, ...args)
    // 有一个特殊的内置函数方法 func.call(context, …args)，它允许调用一个显式设置 this 的函数
    // 我们也可以使用 func.apply(this, arguments) 代替 func.call(this, ...arguments)。
    // 传递多个参数  缓存多参数 worker.slow 方法
    {
        let worker = {
            num: 1,
            slow(min, max) {
                // 超级耗时的计算
                return min + max + this.num;
            }
        }
        function cachingDecorator(func, hash) {
            let cache = new Map();
            return function() {
                let key = hash(arguments);
                if (cache.has(key)) {
                    return cache.get(key);
                }
                let result = func.apply(this, arguments);
                cache.set(key, result);
                return result;
            }
        }
        function hash(argus) {
            return [].join.call(argus); // 方法借用
        }
        worker.slow = cachingDecorator(worker.slow, hash);
        console.log(worker.slow(2,9)); // 参数2,9首次调用，没有缓存记录，耗时
        console.log(worker.slow(2,9)); // 参数2,9再次调用，调用缓存记录，不耗时
        console.log(worker.slow(2,5)); // 参数2,5首次调用，没有缓存记录，耗时
    }

    // 通用的 呼叫转移（call forwarding） 通常是使用 apply 完成的：
    // let wrapper = function() {
    //     return original.apply(this, arguments);
    // };

    {
        // 间谍装饰器
        // 创建一个装饰器 spy(func)，它应该返回一个包装器，该包装器将所有对函数的调用保存在其 calls 属性中。
        function work(a, b) {
            console.log(a + b);
        }

        function spy(func) {
            function wrapper() {
                wrapper.calls.push(Array.from(arguments));
                func.apply(this, arguments);
            }
            wrapper.calls = [];
            return wrapper;
        }
        work = spy(work);

        work(1, 2); // 3
        work(4, 5); // 9
        for (let args of work.calls) {
            console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
        }
    }
    {
        // 延时装饰器
        // 创建一个装饰器 delay(f, ms)，该装饰器将 f 的每次调用延时 ms 毫秒。
        function f(x) {
            console.log(x);
        }
        f(2); // 立马执行
        
        function delay(f, ms) {
            function wrapper() {
                setTimeout(() => {
                    // 箭头函数没有自己的this，所以能从包装器获得this和arguments
                    f.apply(this, arguments);
                }, ms);
            }
            return wrapper;
        }
        
        // create wrappers
        let f1000 = delay(f, 0);
        let f1500 = delay(f, 0);
        f1000("test"); // 在 1000ms 后显示 "test"
        f1500("test"); // 在 1500ms 后显示 "test"
    }
    {
        // 防抖装饰器
        function f(x) {
            console.log(x);
        }
        function debounce(func, ms) {
            let timeid = null;
            return function wrapper() {
                clearTimeout(timeid)
                timeid = setTimeout(() => {
                    func.apply(this, arguments);
                }, ms)
            }
        }

        f = debounce(f, 1000) // 设置等待的时间为1000ms 后调用函数f
        // f("a");
        // setTimeout( () => f("b"), 200); // 200ms后执行f函数，会清除掉a的定时器
        // setTimeout( () => f("c"), 500); // 500ms后执行f函数，会清除掉b的定时器
        // 最后只输出一个c
    }

    // 节流太难了没弄明白，先搁着
}

{
    // 函数绑定
    // 当将对象方法作为回调进行传递，例如传递给 setTimeout，这儿会存在一个常见的问题：“丢失 this”。
    let user = {
        firstName: "John",
        sayHi() {
          console.log(`Hello, ${this.firstName}!`);
        }
    };

    setTimeout(user.sayHi, 0); // Hello, undefined    this丢失导致


    // 解决方案 1：包装器
    setTimeout(() => {
        user.sayHi();
    }, 10); // Hello, John! 现在它可以正常工作了，因为它从外部词法环境中获取到了 user，就可以正常地调用方法了。

    // 如果在 setTimeout 触发之前（有延迟！）user 的值改变了怎么办？那么，突然间，它将调用错误的对象！

    

    // 解决方案 2：bind
    // 基本语法 let boundFunc = func.bind(context);
    // func.bind(context) 的结果是一个特殊的类似于函数的“外来对象（exotic object）”，
    // 它可以像函数一样被调用，并且透明地（transparently）将调用传递给 func 并设定 this=context。
    setTimeout(user.sayHi.bind(user), 10);

    user = {
        sayHi() { console.log("Another"); }
    };  // 方法一，箭头函数有10ms的延迟，迅速改掉原来对象，定时器调用了更改后的对象
    // 但是方法2:bind，绑定了user的上下文之后，不会因为更改对象而调用更改后的对象


    // 如果一个对象有很多方法，并且我们都打算将它们都传递出去，那么我们可以在一个循环中完成所有方法的绑定：
    {
        console.log("-------------------------------------------->")
        let person = {
            name: 'lzx',
            sayHi() {
                console.log(`Hi, my name is ${this.name}`)
            },
            coding() {
                console.log(`javascript`);
            }
        }
        // bindAll...
        // for in 遍历对象，并且给每个方法都绑定好this指向   
        for (const key in person) {
            if (Object.hasOwnProperty.call(person, key)) {
                if (typeof person[key] === 'function') {
                    person[key] = person[key].bind(person);
                }
            }
        }
        person.sayHi(); // Hi, my name is lzx

        setTimeout(person.sayHi, 10); // Hi, my name is lzx  虽然10ms之间对象被改变，但是不影响

        // 改写对象，测试前面使用调度器调用对象的方法结果否发生改变
        person = {
            name: 'lzx',
            sayHi() {
                console.log(`my name is ${this.name}`)
            },
            coding() {
                console.log(`javascript`);
            }
        }

        // 偏函数（Partial functions）
        // 我们不仅可以绑定 this，还可以绑定参数（arguments）。虽然很少这么做，但有时它可以派上用场。
        // 完整语法：
        // let bound = func.bind(context, [arg1], [arg2], ...);
        // 它允许将上下文绑定为 this，以及绑定函数的起始参数。

        {
            function mul(a, b) {
                return a * b;
            }
              
            let double = mul.bind(null, 2);
              
            console.log( double(3) ); // = mul(2, 3) = 6
            console.log( double(4) ); // = mul(2, 4) = 8
            console.log( double(5) ); // = mul(2, 5) = 10
        }

        {
            // 一个函数不能被重绑定（re-bound）。
            function f(x) {
                console.log(this?.name + "-" + x);
            }
            f("1"); // undefined-1
            let user1 = { name: 'user1' };
            let user2 = { name: 'user2' };
            // bind绑定this指向，还有参数
            let g = f.bind(user1, "argu").bind(user2, "argu");
            g(); // user1
        }
    }
}

{
    // 深入理解箭头函数
    // JavaScript 充满了我们需要编写在其他地方执行的小函数的情况。
    // arr.forEach(func) —— forEach 对每个数组元素都执行 func。
    console.log('------------------->深入理解箭头函数<-----------------')
    // 箭头函数没有 “this”
    // 箭头函数没有 this。如果访问 this，则会从外部获取。
    {
        let group = {
            title: "Our Group",
            students: ["John", "Pete", "Alice"],
            
            showList() {
                this.students.forEach(
                    item => console.log(
                        `${this.title}: ${item}`
                    )
                )
            }
        }
        group.showList();
    }

    // 不能对箭头函数进行 new 操作
    // 不具有 this 自然也就意味着另一个限制：箭头函数不能用作构造器（constructor）。不能用 new 调用它们。

    // 箭头函数 VS bind
    // .bind(this) 创建了一个该函数的“绑定版本”。
    // 箭头函数 => 没有创建任何绑定。箭头函数只是没有 this。
    // this 的查找与常规变量的搜索方式完全相同：在外部词法环境中查找。

    // 箭头函数没有 “arguments”
    {
        // 装饰器延时调用
        let obj = {
            name: 'obj',
            f(x, y) {
                console.log(`${this.name} - ${x} - ${y}`);
            }
        }
        let defer = function(func, ms) {
            return function() {
                setTimeout(() => {
                    func.apply(this, arguments);
                }, ms);
            }
        }
        obj.f = defer(obj.f, 1000);
        obj.f("1", "2"); // obj - 1 - 2
    }
    //如果不用箭头函数，那么上面的defer函数该这么写
    {
        let defer = function(func, ms) {
            return function() {
                let ctx = this;
                let args = arguments;
                setTimeout(function() {
                    func.apply(ctx, args);
                }, ms);
            }
        }
    }
    {
        // 延时装饰器箭头函数写法：
        let arrowDefer = function(func, ms) {
            return function() {
                setTimeout(() => {
                    func.apply(this, arguments);
                }, ms);
            }
        }
        // 非箭头函数写法
        let defer = function(func, ms) {
            return function() {
                let ctx = this;
                let args = arguments;
                setTimeout(function() {
                    func.apply(ctx, args);
                }, ms);
            }
        }
    }
    console.log('------------------->深入理解箭头函数<-----------------')
}