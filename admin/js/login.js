// 1. 写入口函数
$(function () {
    // 2. 给form表单注册submit事件
    $(".login_form").on("submit", function (e) {
        // 3. 阻止默认提交行为

        e.preventDefault();
        //4.获取用户名和密码
        var username = $('.input_txt').val().trim();
        var password = $('.input_pass').val().trim();

        // 6. 发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.user_login,
            data: $(this).serialize(),
            //发送请求之前验证用户名或密码是否为空
            beforeSend: function () {
                //5.非空判断   
                if (username == '' || password == '') {
                    $("#myModal").modal("show");
                    $("#myModal .modal-body p").text("输入的用户名和密码不能为空");

                }
            },
            success: function (res) {
                console.log(res);
                $("#myModal").modal("show");
                $("#myModal .modal-body p").text(res.msg);
                if (res.code === 200) {
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        // 将服务器端响应回来的token字符串，存储到本地存储当中 
                        //  localStorage.setItem(key,value)：将value存储到key字段
                        localStorage.setItem("token", res.token)
                        location.href = './index.html'
                    })
                }

            },



        })
    })
})