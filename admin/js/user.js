$(function () {
    // 1
    //一跳转页面就发送ajax请求，响应数据渲染页面
    $.ajax({
        type: "get",
        url: BigNew.user_detail,
        success: function (res) {
            console.log(res);
            //对获取的res的data循环一遍，将里面的值加到相应的input中

            for (var key in res.data) {
                $(`#form .${key}`).val(res.data[key]);
            }
            $("#form .user_pic").attr("src", res.data.userPic);
        }
    })
    // 2
    // 图片预览
    $("#exampleInputFile").on("change", function () {
        var file = this.files[0];// 获取待上传的文件
        var url = URL.createObjectURL(file);  // URL.createObjectURL会将待上传的文件生成一个可浏览的地址
        $("#form .user_pic").attr("src", url);
    })

    //3
    // 更新个人中心
    $("#form").on("submit", function (e) {
        e.preventDefault();
        var data = new FormData(this);// 将form表单中的待上传数据转换成二进制的形式再进行上传
        // 先存
        $.ajax({
            type: "post",
            url: BigNew.user_edit,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.code === 200) {
                    // 取数据
                    $.ajax({
                        type: "get",
                        url: BigNew.user_info,
                        success: function (res) {
                            parent.$(".sider .user_info span").html(`欢迎&nbsp;&nbsp;${res.data.nickname}`);
                            parent.$(".sider .user_info img").attr("src", res.data.userPic);
                            parent.$(".header_bar img").attr("src", res.data.userPic);
                        }

                    })
                }
            }
        })
    })


})