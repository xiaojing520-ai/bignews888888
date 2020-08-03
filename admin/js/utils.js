// 这是一个工具函数，与项目无关
// 就是其它项目也可以使用这个功能函数

// 沙箱的表现形式就是一个自执行函数 相当于是一个独立的作用域
(function (w) {
    var utils = {
        // 可以将这个功能函数放在对象当中，避免受到污染
        converToObj: function (search) {
            var arr = search.split('&')
            console.log(arr);
            // 3.2 循环遍历这个数组
            var obj = {}

            for (var i = 0; i < arr.length; i++) {
                // 3.3 继续以=进行切割  var temp = ['id','10']
                var temp = arr[i].split('=')
                // 3.4 可以将数组的第1项做为对象的属性 将数组的第2项做为对象的值 {temp[0]:temp[1]}
                obj[temp[0]] = temp[1]
            }
            return obj
        }
    }

    // 向外暴露 utils对象
    w.utils = utils
})(window)