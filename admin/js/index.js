$(function () {
    $.ajax({
        type: "get",
        url: BigNew.user_info,
        success: function (res) {
            console.log(res);
            if (res.code === 200) {
                //注意html里面要用反引号   ES6的模板字符串
                $(".sider .user_info span").html(`欢迎&nbsp;&nbsp;${res.data.nickname}`);
                $(".sider .user_info img").attr("src", res.data.userPic);
                $(".header_bar img").attr("src", res.data.userPic);
            }
        }
    })

    //退出功能   给退出绑定点击事件
    $(".header_bar .logout").on("click", function () {
        window.localStorage.removeItem("token");
        window.location.href = "./login.html";
    })

    //文章管理中的子标签高亮   添加类   active
    //  实现左侧按钮的高亮显示功能
    //  给左侧所有的按钮注册事件 

    $(".menu .level01").on("click", function () {
        $(this).addClass("active").siblings("div").removeClass("active");
        if ($(this).index() == 1) {
            $(".menu .level02").slideToggle();

            //给小三角添加切换 类名
            $(".menu .level01:eq(1) b").toggleClass("rotate0");

            // 默认让子标签的第1个'文章列表'就高亮显示 触发器实现
            $(".menu .level02 li:eq(0)").click();
        }
    })
    // 给每一个li标签分别注册事件
    $(".menu .level02 li").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
    })

})