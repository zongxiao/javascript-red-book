"use strict;"
{
    console.log("// 属性标志和属性描述符");
    // 属性标志
    // 除 value 外,还有三个特殊的特性（attributes）
    // writable — 如果为 true，则值可以被修改，否则它是只可读的。
    // enumerable — 如果为 true，则会被在循环中列出，否则不会被列出
    // configurable — 如果为 true，则此特性可以被删除，这些属性也可以被修改，否则不可以。
    // 当我们用“常用的方式”创建一个属性时，它们都为 true。

    // Object.getOwnPropertyDescriptor 方法允许查询有关属性的 完整 信息。
    // 语法是：
    {
        let obj = {
            name: 'lzx',
            age: 25
        }
        let descriptor = Object.getOwnPropertyDescriptor(obj, "age");
        console.log(descriptor); // { value: 25, writable: true, enumerable: true, configurable: true }
        console.log(JSON.stringify(descriptor, null, 2));
    }

    // 为了修改标志，我们可以使用 Object.defineProperty。
    // 语法是：Object.defineProperty(obj, propertyName, descriptor)
    {
        // obj，propertyName: 要应用描述符的对象及其属性。
        // descriptor: 要应用的属性描述符对象。
        // 如果该属性存在，defineProperty 会更新其标志。
        // 否则，它会使用给定的值和标志创建属性；在这种情况下，如果没有提供标志，则会假定它是 false。
        let user = {};
        Object.defineProperty(user, "sex", {
            value: 'male',
            // writable: true,
            // enumerable: true
        })
        user.sex = 'female';
        console.log(user); // {}    因为没有设置可枚举(enumerable)，所以无法枚举
        console.log(user.sex) // male  没有设置可写(writable)，所以上面对sex进行修改不生效

        let descriptor = Object.getOwnPropertyDescriptor(user, 'sex');
        console.log(JSON.stringify(descriptor, null, 2)); // 所有的标志除了value都是false
        // {
        //     "value": "male",
        //     "writable": false,
        //     "enumerable": false,
        //     "configurable": false
        // }
    }
    // 现在让我们通过示例来看看标志的影响。

    {
        let user = {
            name: 'lzx'
        }
        Object.defineProperty(user, 'name', {
            writable: false //不允许改写这个属性的值
        })
        user.name = 'zxl';
        console.log(user); // { name: 'lzx' }  严格模式下会报错
    }
    // 除非它们应用自己的 defineProperty 来覆盖我们的 user 的 name。

    // 对于新属性，我们需要明确地列出哪些是 true，否则就当做设置为false

    // 不可枚举
    // 通常，对象的内置 toString 是不可枚举的，它不会显示在 for..in 中。
    // 但是如果我们添加我们自己的 toString，那么默认情况下它将显示在 for..in 中，如下所示：
    {
        let user = {
            name: 'John',
            toString() {
                return this.name;
            }
        }

        for (const key in user) {
            if (Object.hasOwnProperty.call(user, key)) {
                console.log(key); // name toString  
            }
        }
        // 如果我们不喜欢它，那么我们可以设置 enumerable:false。
        // 之后它就不会出现在 for..in 循环中了，就像内建的 toString 一样：
        Object.defineProperty(user, 'toString', {
            enumerable: false // 设置为不可枚举
        })
        for (const key in user) {
            if (Object.hasOwnProperty.call(user, key)) {
                console.log(key); // name  没有枚举出toString属性
            }
        }
        // 不可枚举的属性也会被 Object.keys 排除：
        console.log(Object.keys(user)); // [ 'name' ]
    }
    // 不可配置 configurable 有时会预设在内建对象和属性中。
    // 不可配置的属性不能被删除。
    {
        // 例如，Math.PI 是只读的、不可枚举和不可配置的：
        console.log(Math.PI); // 3.141592653589793
        let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
        console.log(descriptor);
        // {
        //     value: 3.141592653589793,
        //     writable: false,
        //     enumerable: false,
        //     configurable: false
        // }

        // 因此，开发人员无法修改 Math.PI 的值或覆盖它。
        Math.PI = 3;
        console.log(Math.PI); // 3.141592653589793

        // 注意 使属性变成不可配置是一条单行道。我们无法使用 defineProperty 把它改回去。
        // 确切地说，不可配置性对 defineProperty 施加了一些限制：

        // 不能修改 configurable 标志。
        // 不能修改 enumerable 标志。
        // 不能将 writable: false 修改为 true（反过来则可以）。
        // 不能修改访问者属性的 get/set（但是如果没有可以分配它们）。

        // "configurable: false" 的用途是防止更改和删除属性标志，但是允许更改对象的值。
        {
            let user = {
                name: 'John'
            };
            Object.defineProperty(user, 'name', {
                configurable: false, // 防止更改和删除属性标志。
            })

            delete user.name;
            console.log(user); // { name: 'John' }  不允许删除属性
            user.name = 'lzx';
            console.log(user); // { name: 'lzx' }   允许更改属性值
        }
        // 现在，我们将 user.name 设置为一个“永不可改”的常量：
        {
            let user = {
                name: "John"
            };

            Object.defineProperty(user, "name", {
                writable: false,
                configurable: false
            });

            // 不能修改 user.name 或它的标志
            // 下面的所有操作都不起作用：
            // user.name = "Pete";
            // delete user.name;
            // Object.defineProperty(user, "name", { value: "Pete" });
        }
    }

    // Object.defineProperties
    // 有一个方法 Object.defineProperties(obj, descriptors)，允许一次定义多个属性。
    // 语法如下
    {
        // Object.defineProperties(obj, {
        //     prop1: descriptor1,
        //     prop2: descriptor2
        //     // ...
        // });
    }
    // Object.getOwnPropertyDescriptors
    let user = {};
    Object.defineProperties(user, {
        name: { value: 'lzx', writable: false, enumerable: true },
        age: { value: 25, writable: true, enumerable: true }
    }); // 设置了user的name属性是不可以重写的，而age属性可以重写，并且都可枚举

    // 紧接着，克隆所有user的属性和标志
    let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));

    console.log(clone); // { name: 'lzx', age: 25 }

    clone.name = 'zxl';
    clone.age = 30;

    console.log(clone); // { name: 'lzx', age: 30 }

    // 通常，当我们克隆一个对象时，我们使用赋值的方式来复制属性，像这样：
    {
        let clone2 = {};
        for (let key in user) {
            clone2[key] = user[key]
        }
        console.log(clone2); // { name: 'lzx', age: 25 }
    }

    // 所以如果我们想要一个“更好”的克隆，那么 Object.defineProperties 是首选。
    let clone3 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));

    // 另一个区别是 for..in 会忽略 symbol 类型的属性，
    // 但是 Object.getOwnPropertyDescriptors 返回包含 symbol 类型的属性在内的 所有 属性描述符。
}

{
    console.log("");
    console.log("--------------------------------------- 属性的 getter 和 setter");
    console.log("");
    // 有两种类型的对象属性。
    // 第一种是 数据属性。第二种类型的属性是新东西。它是 访问器属性（accessor properties）
    // 本质上是用于获取和设置值的函数，但从外部代码来看就像常规属性。

    // Getter 和 setter
    // 访问器属性由 “getter” 和 “setter” 方法表示。在对象字面量中，它们用 get 和 set 表示：
    {
        let obj = {
            get name() {
                // 当读取name属性的时候，getter起作用
                return '属性name被读取';
            },
            set name(value) {
                // 当属性name被重新赋值，setter起作用
                return value;
            }
        }
        console.log(obj.name); // 属性name被读取
        obj.name = 'lzx'; // lzx
    }

    // 现在我们想添加一个 fullName 属性，该属性值应该为 "John Smith"。
    // 当然，我们不想复制粘贴已有的信息，因此我们可以使用访问器来实现：
    {
        let user = {
            name: "John",
            surname: "Smith",
            get fullName() {
                return `${this.name} ${this.surname}`;
            },
            set fullName(value) {
                [this.name, this.surname] = value.split(' ');
            }
        };
        console.log(user.fullName); // John Smith
        // 我们不以函数的方式 调用 user.fullName，我们正常 读取 它：getter 在幕后运行。
        user.fullName = "Yohan Simith";
        console.log(user.fullName); // Yohan Simith
    }

    // 访问器描述符
    // 对于访问器属性，没有 value 和 writable，但是有 get 和 set 函数。
    // get —— 一个没有参数的函数，在读取属性时工作，
    // set —— 带有一个参数的函数，当属性被设置时调用，
    // enumerable —— 与数据属性的相同，
    // configurable —— 与数据属性的相同。

    // 使用 defineProperty 创建一个 fullName 访问器，我们可以使用 get 和 set 来传递描述符
    {
        let user = {
            name: "John",
            surname: "Smish"
        };
        Object.defineProperty(user, 'fullName', {
            get() {
                return `${this.name} ${this.surname}`;
            },
            set(value) {
                [this.name, this.surname] = value.split(" ");
            },
            enumerable: true, // 设置多一个可枚举
            // value: "abc"  不可以同时设置数据属性value，因为已经有访问器属性了
        })

        user.fullName = "xiao ming"; // setter访问器生效，触发set
        console.log(user.fullName); // xiao ming
        for (const key in user) {
            if (Object.hasOwnProperty.call(user, key)) {
                console.log(key); // name, surname, fullName
            }
        }
    }
    // 更聪明的 getter/setter
    // Getter/setter 可以用作“真实”属性值的包装器，以便对它们进行更多的控制。
    {
        let user = {
            get name() {
                return this._name;
            },
            set name(value) {
                if (value.length < 4) {
                    console.log('输入的字符太短了');
                    return;
                }
                this._name = value;
            }
        }

        user.name = "1234" // 设置属性的时候，会执行判断
        console.log(user._name); // 1234
    }
    // 从技术上讲，外部代码可以使用 user._name 直接访问 name。
    // 但是，这儿有一个众所周知的约定，即以下划线 "_" 开头的属性是内部属性，不应该从对象外部进行访问。

    // 兼容性
    // 访问器的一大用途是，它们允许随时通过使用 getter 和 setter 替换“正常的”数据属性，来控制和调整这些属性的行为。
    // 想象一下，我们开始使用数据属性 name 和 age 来实现 user 对象：
    {
        function User(name, age) {
            // 隐式生成this
            this.name = name;
            this.age = age;
            // 隐式return this
        }

        let user = new User("lzx", 26);
        console.log(user); // User { name: 'lzx', age: 26 }
    }
    // ……但迟早，情况可能会发生变化。我们可能会决定存储 birthday，而不是 age，因为它更精确，更方便：
    {
        function User(name, birthday) {
            this.name = name;
            this.birthday = birthday;
        }

        let user = new User('lzx', new Date(1995, 8, 16));
        console.log(user); // User { name: 'lzx', birthday: 1995-09-15T16:00:00.000Z }
    }
    // 现在应该如何处理仍使用 age 属性的旧代码呢？
    // 为 age 添加一个 getter 来解决这个问题：
    {
        function User(name, birthday) {
            this.name = name;
            this.birthday = birthday;
            Object.defineProperty(this, 'age', {
                get() {
                    return new Date().getFullYear() - this.birthday.getFullYear();
                }
            })
        }
        let user = new User('lzx', new Date(1995, 8, 16));
        console.log(`${user.name} is ${user.age} years old`); // lzx is 26 years old
    }
}

{
    console.log("");
    console.log("--------------------------------------原型继承");
    // 我们有一个 user 对象及其属性和方法，并希望将 admin 和 guest 作为基于 user 稍加修改的变体。
    // 我们想重用 user 中的内容，而不是复制/重新实现它的方法，而只是在其之上构建一个新的对象。

    // [[Prototype]]
    // 在 JavaScript 中，对象有一个特殊的隐藏属性 [[Prototype]]（如规范中所命名的
    // 它要么为 null，要么就是对另一个对象的引用。该对象被称为“原型”：

    // 当我们从 object 中读取一个缺失的属性时，JavaScript 会自动从原型中获取该属性。
    // 属性 [[Prototype]] 是内部的而且是隐藏的，但是这儿有很多设置它的方式。
    // 其中之一就是使用特殊的名字 __proto__
    {
        let animals = {
            eats: true
        };
        let rabbits = {
            jumps: true
        };
        rabbits.__proto__ = animals;
        console.log(rabbits.eats); // true
    }
    // 在这儿我们可以说 "animal 是 rabbit 的原型"，或者说 "rabbit 的原型是从 animal 继承而来的"。
    // 如果 animal 有许多有用的属性和方法，那么它们将自动地变为在 rabbit 中可用。这种属性被称为“继承”。
    {
        let animals = {
            eats: true,
            walk() {
                console.log('Animals walk');
            }
        };
        let rabbits = {
            jumps: true,
            __proto__: animals
        };
        rabbits.walk(); // Animals walk
    }

    // 原型链可以很长：
    {
        let animals = {
            eats: true,
            walk() {
                console.log('Animals walk');
            }
        };
        let rabbits = {
            jumps: true,
            __proto__: animals
        };
        let longEar = {
            earLength: '20cm',
            __proto__: rabbits
        }

        console.log(longEar.jumps); // true  通过原型获得（继承）
        longEar.walk(); // Animals walk  通过原型链获得（继承）
    }
    // 现在，如果我们从 longEar 中读取一些它不存在的内容，JavaScript 会先在 rabbit 中查找，然后在 animal 中查找。

    // 注意
    // 引用不能形成闭环。如果我们试图在一个闭环中分配 __proto__，JavaScript 会抛出错误。
    // __proto__ 的值可以是对象，也可以是 null。而其他的类型都会被忽略。
    // 只能有一个 [[Prototype]]。一个对象不能从其他两个对象获得继承。
    {
        // __proto__ 是 [[Prototype]] 的 getter/setter。
        // 由于 __proto__ 标记在观感上更加明显，所以我们在后面的示例中将使用它。
    }

    // 写入不使用原型
    // 原型仅用于读取属性。对于写入/删除操作可以直接在对象上进行。
    {
        let animals = {
            eats: true,
            walk() {
                console.log('animals walk');
            }
        };
        let rabbit = {
            jumps: true,
            __proto__: animals
        };
        rabbit.walk = function () {
            console.log('rabbit walk');
        }

        rabbit.walk(); // rabbit walk   无需使用原型
    }
    // 访问器（accessor）属性是一个例外，因为分配（assignment）操作是由 setter 函数处理的。
    // 因此，写入此类属性实际上与调用函数相同。
    // 下面这段代码中的 admin.fullName 能够正常运行：
    {
        let user = {
            name: "John",
            surname: "Smith",
            get fullName() {
                return `${this.name} ${this.surname}`;
            },
            set fullName(value) {
                [this.name, this.surname] = value.split(" ");
            }
        };
        let admin = {
            isadmin: true,
            __proto__: user
        };

        console.log(admin.fullName); // John Smith
        admin.fullName = "abc de";
        console.log(admin.fullName); // abc de
        console.log(user.fullName); // John Smith
    }

    // “this” 的值 
    // this 根本不受原型的影响。
    {
        // 无论在哪里找到方法：在一个对象还是在原型中。在一个方法调用中，this 始终是点符号 . 前面的对象。
        // animal 有一些方法
        let animal = {
            walk() {
                if (!this.isSleeping) {
                    console.log(`I walk`);
                }
            },
            sleep() {
                this.isSleeping = true;
            }
        };

        let rabbit = {
            jumps: true,
            __proto__: animal
        };

        rabbit.sleep();
        console.log(rabbit.isSleeping); // true
        console.log(animal.isSleeping); // undefined  （原型中没有此属性）
    }

    // for..in 循环也会迭代继承的属性。
    {
        let animals = {
            eats: true,
            walk() {
                console.log('walk');
            }
        };
        let rabbit = {
            __proto__: animals,
            jumps: true
        }
        // for..in 会遍历自己以及继承的键
        for (const key in rabbit) {
            console.log(key); // jump eats walk    原型中的属性也会被迭代
        }

        // Object.keys 只返回自己的 key
        console.log(Object.keys(rabbit)); // ['jump']

        // 有一个内建方法 obj.hasOwnProperty(key)：如果 obj 具有自己的（非继承的）名为 key 的属性，则返回 true。
        for (const key in rabbit) {
            if (rabbit.hasOwnProperty(key)) {
                console.log(key);
            }
            // 等价于下面的，因为rabbit的hasOwnProperty继承于Object.prototype，
            // 再利用call把上下文设置为rabbit，传入key参数
            if (Object.prototype.hasOwnProperty.call(rabbit, key)) {
                console.log(key); // jumps
            }
        }

        // 这里我们有以下继承链：rabbit 从 animal 中继承，
        // animal 从 Object.prototype 中继承（因为 animal 是对象字面量 {...}，所以这是默认的继承）
        // 然后再向上是 null：

        // 有一件很有趣的事儿。方法 rabbit.hasOwnProperty 来自哪儿？我们并没有定义它。
        // 从上图中的原型链我们可以看到，该方法是 Object.prototype.hasOwnProperty 提供的。换句话说，它是继承的。

        // 几乎所有其他键/值获取方法都忽略继承的属性
        // 例如 Object.keys 和 Object.values 等，都会忽略继承的属性。
        // 它们只会对对象自身进行操作。不考虑 继承自原型的属性。
    }

    {

        // 我们有两只仓鼠：speedy 和 lazy 都继承自普通的 hamster 对象。
        // 当我们喂其中一只的时候，如何确保另一只不会共享同一个胃
        let hamster = {
            stomach: [],
            eat(food) {
                this.stomach += food + " "; // 写入不会继承原型hamster的stomach属性
            }
        };

        let speedy = {
            __proto__: hamster
        };

        let lazy = {
            __proto__: hamster
        };

        speedy.eat("apple");
        lazy.eat("pear");

        // 这只speedy仓鼠找到了食物
        console.log(speedy.stomach); // apple
        // 这只lazy仓鼠也找到了食物
        console.log(lazy.stomach); // pear
        
    }
}

{
    console.log(`---------------------------F.prototype---------------------`);
    // new F() 这样的构造函数可以创建一个新对象。
    // 如果 F.prototype 是一个对象，那么 new 操作符会使用它为新对象设置 [[Prototype]]。

    {
        let animal = {
            eat() {
                console.log('eat');
            }
        };

        function Rabbit(color) {
            this.color = color;
        }

        let redRabbit = new Rabbit('red');
        console.log(redRabbit); // Rabbit { color: 'red' }
        console.log(redRabbit.__proto__); // {}

        Rabbit.prototype = animal; // 设置构造函数的原型对象
        let blackRabbit = new Rabbit('black');
        console.log(blackRabbit.__proto__); // { eat: [Function: eat] }
        blackRabbit.eat(); // eat

        // Rabbit.prototype = animal “当创建了一个 new Rabbit 时，把它的 [[Prototype]] 赋值为 animal”。

        // F.prototype 仅用在 new F 时
    }
    
    // 默认的 F.prototype，构造器属性
    // 默认的 "prototype" 是一个只有属性 constructor 的对象，属性 constructor 指向函数自身。
    {
        function Rabbit(name) {
            this.name = name;
        }

        /* default prototype
        Rabbit.prototype = { constructor: Rabbit };
        */

        console.log(Rabbit.prototype.constructor === Rabbit); // true

        let redRabbit = new Rabbit('red');
        console.log(redRabbit.constructor); // [Function: Rabbit]
        // 自己没有constructor这个属性 自动往原型找 找到默认prototype也就是{ constructor: Rabbit }

        // 我们可以使用 constructor 属性来创建一个新对象，该对象使用与现有对象相同的构造器。
        let blackRabbit = new redRabbit.constructor('black');
        console.log(blackRabbit); // Rabbit { name: 'black' }

        // 当我们有一个对象，但不知道它使用了哪个构造器（例如它来自第三方库），
        // 并且我们需要创建另一个类似的对象时，用这种方法就很方便。
    }

    // ……JavaScript 自身并不能确保正确的 "constructor" 函数值。
    {
        // 如果我们将整个默认 prototype 替换掉，那么其中就不会有 "constructor" 了。
        function Rabbit(name) {
            this.name = name;
        }
        Rabbit.prototype = {
            jump: true
        }; // 设置构造函数的原型对象
        let redRabbit = new Rabbit('red');
        for (const key in redRabbit) {
            console.log(key); // name  jump
            // for in可以迭代继承来的属性jump
        }
        console.log(redRabbit.constructor === Rabbit); // false

        // 因此，为了确保正确的 "constructor"，我们可以选择添加/删除属性
        // 到默认 "prototype"，而不是将其整个覆盖：
        {
            function Rabbit(name) {
                this.name = name;
            }
            Rabbit.prototype.jump = true; // 保留默认的原型，并添加jump属性{ constructor: Rabbit ,jump: true}
            let redRabbit = new Rabbit('red');
            for (const key in redRabbit) {
                console.log(key); // name  jump
                // for in可以迭代继承来的属性jump
            }
            console.log(redRabbit.constructor === Rabbit); // true
        }
    }
    // 在常规对象上，prototype 没什么特别的：
    {
        let user = {
            name: "John",
            prototype: "Bla-bla" // 这里只是普通的属性
        };
    }
}

{
    // 如果 F.prototype 是一个对象，那么 new 操作符会使用它为新对象设置 [[Prototype]]
    // F.prototype如果没有设置为一个新对象，那么默认为F.prototype === { constructor: F }
    // 因此，为了确保正确的 "constructor"，我们可以选择添加/删除属性
    // 到默认 "prototype"，而不是将其整个覆盖：
    {
        function Rabbit(name) {
            this.name = name;
        }
        Rabbit.prototype.jump = true; // 保留默认的原型，并添加jump属性{ constructor: Rabbit ,jump: true}
        let redRabbit = new Rabbit('red');
        for (const key in redRabbit) {
            console.log(key); // name  jump
            // for...in 可以迭代继承来的属性jump
        }
        console.log(redRabbit.constructor === Rabbit); // true

        // 当我们有一个对象，但不知道它使用了哪个构造器，也可以这样做
        let blackRabbit = new redRabbit.constructor('black');
        console.log(blackRabbit); // Rabbit { name: 'black' }
    }
}