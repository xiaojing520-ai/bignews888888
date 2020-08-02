$(function () {
    //1、一跳转到当页，就会渲染文章类别

    $.ajax({
        type: "get",
        url: BigNew.category_list,
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                var htmlStr = template("categoryList", res);
                $("#categoryId").html(htmlStr);
            }
        }
    })

    //2、实现图片预览
    $("#form #inputCover").on("change", function () {
        $("#form .article_cover").attr("src", URL.createObjectURL(this.files[0]));
    });


    //时间插件
    // 3、 调用方法实现日期插件的显示
    jeDate("#testico", {
        zIndex: 99999,
        format: "YYYY-MM-DD",
        isTime: false,
        onClose: false,
        isToday: true, // 是否显示本月或今天
        minDate: "2014-09-19 00:00:00"
    })


    //4、富文本插件
    // 4. 调用方法实现富文本编辑器的显示
    var E = window.wangEditor;
    var editor = new E('#editor');
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();


    //5.给发布或是存为草稿按钮注册事件，发布文章
    //给form表单注册点击事件，由btn按钮触发事件
    $("#form").on("click", ".btn", function (e) {
        e.preventDefault(); //阻止表单的默认行为

        //准备数据
        var data = new FormData($("#form")[0]);

        //将富文本里的内容追加到data里

        data.append("content", editor.txt.html());

        //判断是点击哪一个按钮，并将state的状态存到数组里
        console.log(e.target);
        if ($(e.target).hasClass("btn-release")) {
            data.append("state", "已发布");
        } else {
            data.append("state", "草稿");
        }


        $.ajax({
            type: "post",
            url: BigNew.article_publish,
            data: data,
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res);
                if(res.code==200) {
                    window.location.href="./article_list.html"
                }
            }
        });

    })
    //




})