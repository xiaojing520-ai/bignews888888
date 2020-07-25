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
})