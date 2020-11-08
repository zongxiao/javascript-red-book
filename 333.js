// const 声明变量时必须初始化变量值，而且不可以修改，也不允许重复声明，作用域也是块
const name = 'silence37';
//const name = 'abs'; //报错

//但是const声明的限制只是适用于它指向的变量的引用，如果const变量引用的是一个对象，那么修改这个对象内部的属性不违反const的限制
const person = {};
person.name = 'silence37'; // ok

//JavaScript引擎会为for循环中的let声明分别创建独立的变量实例，虽然const变量跟let变量很相似，但是不能用const来声明迭代变量（因为迭代变量会自增）。不过，如果你只想用const声明一个不会被修改的for循环变量，那也是可以的。也就是说，每次迭代只是创建一个新变量。这对for-of和for-in循环特别有意义
let i = 0;
for (const j = 7; i < 5; ++i) {
  console.log(j);
}
for (const key in {a: 1, b: 2}) {
  console.log(key);
}
for (const value of [1,2,3]) {
  console.log(value);
}

// 总之const优先 其次是let