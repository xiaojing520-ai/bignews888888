$(function () {
    // 发送get请求，渲染页面
    $.ajax({
        type: "get",
        url: BigNew.comment_list,
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                var htmlStr = template("commentList", res.data);
                $("tbody").html(htmlStr);

                if (res.data.data.totalCount == 0) {
                    $("#pagination-demo").hide().next().show();
                } else {
                    $("#pagination-demo").show().next().hide();
                }

                pagination(res);
            }
        }
    });


    // 2. 定义一个分页的函数 渲染渲染完毕的时候，要启用
    var currentPage = 1
    function pagination(res, visiblePages) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage, // 总页数
            visiblePages: visiblePages || 7, // 可见最大上限页码值
            first: '首页',
            last: '最后一页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick: false, // 不要默认点击 
            onPageClick: function (event, page) {
                //  console.log(event,page);
                // page是当前页码

                currentPage = page;
                //3、实现分页的功能

                $.ajax({
                    type: "get",
                    url: BigNew.comment_list,
                    data: {
                        page: currentPage
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.code == 200) {
                            var htmlStr = template("commentList", res.data);
                            $("tbody").html(htmlStr);
                        }
                    }

                })

            }
        })
    };

    //给通过按钮注册点击事件    因为按钮是模板动态添加的，所以需要用到事件委托来注册

    $("tbody").on("click", ".btn-pass", function () {
        var _this = this;
        $.ajax({
            type: "post",
            url: BigNew.comment_pass,
            data: {
                id: $(this).data("id")
            },
            success: function (res) {
                console.log(res);
                if(res.code==200) {
                    $(_this).parent().prev().text(res.msg);
                }
            }
        })
    });



 //给拒绝按钮注册点击事件    因为按钮是模板动态添加的，所以需要用到事件委托来注册


    $("tbody").on("click", ".btn-reject", function () {
        var _this = this;
        $.ajax({
            type: "post",
            url: BigNew.comment_reject,
            data: {
                id: $(this).data("id")
            },
            success: function (res) {
                console.log(res);
                if(res.code==200) {
                    $(_this).parent().prev().text(res.msg);
                }
            }
        })
    });


 //给删除按钮注册点击事件    因为按钮是模板动态添加的，所以需要用到事件委托来注册 

    $("tbody").on("click", ".btn-del", function () {
        var _this = this;
        $.ajax({
            type: "post",
            url: BigNew.comment_delete,
            data: {
                id: $(this).data("id")
            },
            success: function (res) {
                console.log(res);
                if(res.code==200) {
                    //收到后端删除成功的消息后，再次发送get请求，让当前页渲染出来

                    $.ajax({
                        type:"get",
                        url:BigNew.comment_list,
                        data:{
                            page:currentPage
                        },
                        success:function(res) {
                            var htmlStr=template("commentList",res.data);
                            $("tbody").html(htmlStr);
                        }

                    })
                }
              
            }
        })
    });








})