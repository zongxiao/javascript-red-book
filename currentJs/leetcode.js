{
    // 给定一个数组，数组的值为每天的股价，求股票的最高利润（只能买一份或者空仓）
    function maximumProfit(prices) {
        let profit = 0;

        for (let i = 0; i < prices.length; i++) {
            if (prices[i] < prices[i + 1]) {
                profit += prices[i + 1] - prices[i];
            }   
        }

        return profit;
    }

    let prices = [1, 4, 1, 2, 5]; // 这是某一周的股价
    console.log( maximumProfit(prices) ); // 7  计算得最高利润是7元
}

{
    // 旋转数组
    // 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
    // [1, 2, 3, 4, 5, 6, 7] => [5, 6, 7, 1, 2, 3, 4]

    var rotate = function(nums, k) {

        nums = reverse(nums, 0, nums.length - 1); // 第一次翻转，完全翻转
        let slice = k % nums.length; // 分割线，k或者k的倍数都设置为k的值传给分割线slice
        nums = reverse(nums, 0, slice - 1); // 前半部分的翻转
        nums = reverse(nums, slice, nums.length - 1); // 后半部分的翻转
        
        return nums;
    };

    function reverse(arr, start, end) {

        while(start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]] // 解构交换值
            start++;
            end--;
        }

        return arr;
    }

    let arr = [1, 2, 3, 4, 5, 6, 7];
    console.log( rotate(arr, 3) ); // [5, 6, 7, 1, 2, 3, 4]
}

{
    // 旋转数组二
    var rotate = function(nums, k) {
        let arrlen = nums.length;
        let arrtemp = [];

        for (let i = 0; i < arrlen; i++) {
            arrtemp[i] = nums[i]
        }

        for (let i = 0; i < arrlen; i++) {
            nums[(i + k) % arrlen] = arrtemp[i]
        }

        return nums;
    }

    let arr = [1, 2, 3, 4, 5, 6, 7];
    console.log( rotate(arr, 4) ); // [4, 5, 6, 7, 1, 2, 3]
}

{
    // 只出现一次的数字
    // 给定一个非空整数数组，除了某个元素只出现一次以外
    // 其余每个元素均出现两次。找出那个只出现了一次的元素。
    // 任何数和 0 做异或运算，结果仍然是原来的数，
    // 任何数和其自身做异或运算，结果是 0

    var singleNumber = function(nums) {
        let num = 0;
        for (let i = 0; i < nums.length; i++) {
            num  ^= nums[i]
        }
        return num;
    };

    console.log( singleNumber([1, 1, 2, 2, 7, 3, 3]) ); // 7
}

{
    // 两个数组的交集 II
    // 输入：nums1 = [1,2,2,1], nums2 = [2,2]
    // 输出：[2,2]
    var intersect = function(nums1, nums2) {
        nums1.sort((a, b) => a > b ? 1 : -1 );
        nums2.sort((a, b) => a > b ? 1 : -1 );
        let nums = [], i = j = 0;
        while(i < nums1.length && j < nums2.length) {
            if (nums1[i] < nums2[j]) {
                i++;
            } else if (nums1[i] > nums2[j]) {
                j++;
            } else {
                nums.push(nums1[i]);
                i++;
                j++;
            }
        }
        return nums;
    };

    console.log( intersect([1,2,2,1,3], [2,2,3]) );
}

{
    // 加一
    // 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
    // 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
    // [9] ==> [1,0];  例子：[1,2,3] ==> [1,2,4]
    var plusOne = function(digits) {
        let i = digits.length - 1, flag = 0;
        while(i >= 0) {
            if (digits[i] === 9) {
                digits[i] = 0;
                i--;
                flag++;
            } else {
                digits[i] = digits[i] + 1;
                break;
            }
        }
        if (flag === digits.length) {
            digits.unshift(1);
        }
        return digits;
    };

    console.log( plusOne([9,9,9])) // [1, 0, 0, 0];
}

{
    // 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
    var moveZeroes = function(nums) {
        let flag = 1;
        let length = nums.length;
        for (let i = 0; i < nums.length; i++) {
            if(nums[i] === 0) {
                nums.splice(i, 1);
                nums.push(0);
                i--;
            }
            flag++;
            if (flag > length) {
                break;
            }
        }
        return nums;
    };
    console.log( moveZeroes([0,1,0,3,12])); // [1, 3, 12, 0, 0];
}

{
    // 反转字符串
    // 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
    // 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题
    var reverseString = function(s) {
        for (let i = 0; i < s.length / 2; i++) {
            if (i !== s.length - 1 - i) {
                [s[i], s[s.length - 1 - i]] = [s[s.length - 1 - i], s[i]];
            } else {
                break;
            }
        }
        return s;
    };

    console.log( reverseString(['h','e','l','l','o']) );
    // [ 'o', 'l', 'l', 'e', 'h' ]
}

{
    // 整数反转
    // 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
    // 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。
    var reverse = function(x) {
        let flag = false;
        if (x < 0) {
            x = -x;
            flag = true;
        }
        const xArray = x.toString().split("");
        let result = 0;
        for (let i = xArray.length - 1; i >= 0; i--) {
            result = result * 10 + parseInt(xArray[i]);
        }
        if (result > 2 ** 31 - 1) return 0;
        return flag ? ~result + 1 : result;
    };
    console.log( reverse(-1234) ); // -4321
}

{
    // 字符串中的第一个唯一字符
    var firstUniqChar = function(s) {
        for (let i = 0; i < s.length; i++) {
            if (s.indexOf(s[i]) === s.lastIndexOf(s[i])){
                return i;
            }
            return -1;
        }
    };
    console.log(firstUniqChar("babb"));
}

{
    // 验证回文串
    // 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
    // 输入: "A man, a plan, a canal: Panama"
    // 输出: true
    var isPalindrome = function(s) {
        let arrowLowerStr = s.toLowerCase().replace(/[^a-z0-9]/g, "");
        let left = 0, right = arrowLowerStr.length - 1;
        while(left < right) {
            if (arrowLowerStr[left] === arrowLowerStr[right]) {
                left++;
                right--;
            } else {
                return false;
            }
        }
        return true;
    };

    let str = "A man, a plan, a canal: Panama";
    console.log(isPalindrome(str)); // true
}


{
    // 数组的度
    // 给定一个非空且只包含非负数的整数数组 nums，数组的度的定义是指数组里任一元素出现频数的最大值。
    // 任务是在 nums 中找到与 nums 拥有相同大小的度的最短连续子数组，返回其长度。 输入[1,2,1,3,4,2] 输出3
    var getShortLength = function(nums) {

        let obj = {},
            maxDu = 0,
            maxDuLengthArr = [];

        for (let i = 0; i < nums.length; i++) {
            if (obj[nums[i]]) {
                obj[nums[i]][0]++;
                obj[nums[i]][2] = i;
            } else {
                obj[nums[i]] = [1, i, i]
            }
        }
    
        for (const arr of Object.values(obj)) {
            maxDu = Math.max(maxDu, arr[0]);
        }
        
        for (const [du, start, end] of Object.values(obj)) {
            if (du === maxDu) maxDuLengthArr.push(end - start);
        }

        return Math.min(...maxDuLengthArr) + 1;
    };
}