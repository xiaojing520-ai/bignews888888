$(function () {
    // 1、向后台请求数据渲染到分类列表上
    $.ajax({
        type: "get",
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                var htmlStr = template("categoryList", res);
                $("#selCategory").html(htmlStr);
            }

        }

    });
    //2、向后台请求数据渲染到文章列表的第一页
    $.ajax({
        type: "get",
        url: BigNew.article_query,
        success: function (res) {
            if (res.code == 200) {
                var htmlStr = template("articleList", res.data);
                $("tbody").html(htmlStr);


                // 要根据响应回来的数据来确定是否启用分页

                if (res.data.totalcount == 0) {
                    $("#pagination-demo").hide().next().show();
                } else {
                    $("#pagination-demo").show().next().hide();
                    pagination(res);
                }
            }


        }

    });


    // 3. 启用分页功能
    // 3.1 分页插件的代码比较多，可以封装到一个函数当中
    var currentPage = 1
    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            // totalPages: 35,
            totalPages: res.data.totalPage,
            visiblePages: 7, // 每页显示的最多页码值
            first: '首页',
            last: '尾页',
            prev: '上一页',
            next: '下一页',
            initiateStartPageClick: false,
            onPageClick: function (event, page) {
                // $('#page-content').text('Page ' + page)
                // console.log(event); // 事件对象
                // console.log(page); // 当前的页码值
                currentPage = page
                // 4. 实现分页功能
                // 4.1 要根据当前页码来发送ajax请求 
                $.ajax({
                    type: 'get',
                    url: BigNew.article_query,
                    // data不能为空，应该是将参数提交 给服务器  当前页码 文章分类  文章状态 关键词  因为后面做筛选功能的时候，也是需要分页的
                    data: {
                        key: $('#form input[name=key]').val(), // 搜索关键词
                        // type:$('#selCategory').val()
                        type: $('#form select[name=type]').val(), // 文章分类
                        state: $('#form select[name=state]').val(), // 文章状态  草稿或已发布
                        page: page,  // 当前单击的页码
                        perpage: 6  // 当前默认显示的条数
                    },
                    success: function (res) {
                        // console.log(res);
                        if (res.code == 200) {
                            // 4.2 当数据响应回来之后还是要使用模板渲染到页面上
                            var htmlStr = template('articleList', res.data)
                            $('tbody').html(htmlStr)

                        }
                    }
                })

            }
        })
    };

    //4、给筛选按钮绑定点击事件  发送请求 渲染返回的数据到页面

    // 5. 实现筛选功能
    // 5.1 给筛选按钮注册事件
    $('#btnSearch').on('click', function (e) {
        // 5.2 阻止默认请求行为
        e.preventDefault()
        // // 5.3 根据条件进行数据的请求
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#form input[name=key]').val(), // 关键词
                type: $('#form select[name=type]').val(), // 文章类型
                state: $('#form select[name=state]').val(),
                page: 1, // 默认显示第1页
                perpage: 6 // 当前页面的数据量
            },
            success: function (res) {
                // 5.3 将获取到的数据使用模板渲染到页面上
                var htmlStr = template('articleList', res.data)
                $('tbody').html(htmlStr)

                // 5.5 筛选按钮的特殊情况判断 
                if (res.data.totalCount == 0) {
                    // 此时说明没有查到对应条件的数据，应该让分页插件隐藏起来
                    $('#pagination-demo').hide().next().show()
                } else {
                    $('#pagination-demo').show().next().hide()

                    // 5.4 根据条件筛选出来的数据,可能没有原来那么多，所以分页插件需要重绘
                    // 改变页码显示
                    // 第1个参数是当总页码改变的时候  相当于是一个事件名称
                    // 第2个参数是现在的总页码值   最新的总页码值
                    // 第3个参数是默认显示的页码值  就是说默认是从第1页开始显示
                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
                }


            }
        })
    });



    //根据删除按钮的id 删除对应id的文章    获取id

    // 6.5 获取删除按钮中的id 根据文章id来删除数据
    $('#delModal').on('shown.bs.modal', function (e) {
        window.articleId = $(e.relatedTarget).data("id")
    })


    //给模态框的确定按钮绑定点击事件， 向后端发送请求  携带id

    $("#delModal .btn-sure-del").on("click", function () {
        $.ajax({
            type: "post",
            url: BigNew.article_delete,
            data: {
                id: window.articleId
            },
            success: function (res) {
                if (res.code == 204) {
                    console.log(res);
                    $("#delModal").modal("hide");

                    $.ajax({
                        type: "get",
                        url: BigNew.article_query,
                        data: {
                            key: $("#form input[name=key]").val(),
                            type: $("#form select[name=type]").val(),
                            state: $("#form select[name=state]").val(),
                            page: currentPage,
                            perpage: 6
                        },
                        success: function (res) {
                            if (res.code == 200) {
                                var htmlStr = template("articleList", res.data);
                                $("tbody").html(htmlStr);

                                if (res.data.totalCount !== 0 && res.data.data.length == 0) {
                                    currentPage -= 1

                                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage)
                                } else if(res.data.totalCount == 0) {
                                    $('#pagination-demo').hide().next().show()
                                }
                            }
                        }
                    })
                }
            }
        })
    });


    $("#release_btn").on("click",function() {
        parent.$(".menu .level02 li:eq(1)").click();
    })









})