for (let i = 0; i < 5; i++) {
    setTimeout(
        () => console.log(i)
  , 0);
}
// var-----------for循环瞬间完成遍历 所以执行了超时逻辑时，var是函数作用域所以所有的i都是同一个变量 所以输出的是55555
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}