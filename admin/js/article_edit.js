$(function () {
    //1、一跳转，渲染文章类别
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

    // 2、时间插件 调用方法实现日期插件的显示
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        onCloae: false,
        isToday: true, // 是否显示本月或今天
        minDate: "2014-09-19 00:00:00"
    });


    // 3、富文本框插件
    // 调用方法实现富文本编辑器的显示
    var E = window.wangEditor
    var editor = new E('#editor');
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();


    // 4、获取对应编辑的id，先获取URL地址当中的参数

    var search = location.search.slice(1);
    console.log(search);

    var id = utils.converToObj(search).id;
    console.log(id);
    //发送请求获取数据回显
    $.ajax({
        type: "get",
        url: BigNew.article_search,
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                $("#form input[name=id]").val(res.data.id);
                $("#form input[name=title]").val(res.data.title);
                $("#form input[name=categoryId]").val(res.data.categoryId);
                $("#form .article_cover").attr("src", res.data.cover);
                $("#form input[name=date]").val(res.data.date);
                editor.txt.html(res.data.content)
            }
        }
    });

    //5、预编辑前的图片预览
    $("#inputCover").on("change", function () {
        var file = this.files[0]; // 获取待上传的文件 
        // URL.createObjectURL会将待上传的文件生成一个可浏览的地址
        var url = URL.createObjectURL(file);
        $(".article_cover").attr("src", url);
    });


    //6、将表单里的数据提交到后端，更新文章

    ///6.1给form表单注册点击事件 ,由子元素来触发，事件委托，冒泡

    $("#form").on("click", ".btn", function (e) {
        e.preventDefault();//阻止表单的默认行为

        //6.2准备数据

        var data = new FormData($("#form")[0]); //将form表单的数据转成二进制

        data.append("content",editor.txt.html()); //富文本框的内容添加到数据里

        // 6.3判断是哪个按钮触发的事件  e.target 事件源 DOM对象  hasClass是jq的用法

        if($(e.target).hasClass("btn-edit")) {
          data.append("state","已发布")
        }else{
            data.append("state","草稿")
        }

        //6.4 发送post请求，将数据传到后端

        $.ajax({
            type:"post",
            url:BigNew.article_edit,
            data:data,
            contentType:false,
            processData:false,
            success:function(res) {
                console.log(res);
                if(res.code==200) {
                    location.href = './article_list.html'
                }
            }
        })



    })





})