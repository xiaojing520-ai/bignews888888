$(function () {
    // 1 渲染文章类别数据
    function render() {
        $.ajax({
            type: "get",
            url: BigNew.category_list,
            success: function (res) {
                console.log(res);
                if (res.code === 200) {
                    var htmlStr = template("tpl", res);
                    $("#tbody").html(htmlStr);
                }
            }
        })
    }
    render();
    // 删除分类 
    //模态框显示会触发的事件
    $('#delModal').on('shown.bs.modal', function (e) {
        //获取每一项文章类别的id
        window.categoryId = $(e.relatedTarget).data("id");
        console.log(window.categoryId);

    })
    // 对模态框的确定按钮绑定点击事件
    $("#delModal .sureBtn").on("click", function () {
        $.ajax({
            type: "post",
            url: BigNew.category_delete,
            data: {
                id: window.categoryId
            },
            success: function (res) {
                console.log(res);
                if (res.code === 204) {
                    $('#delModal').modal("hide");
                    render();
                }
            }
        })
    })

    //添加分类
    //模态框显示会触发的事件
    $('#myModal').on('shown.bs.modal', function (e) {
        console.log(e.relatedTarget.id);
        if (e.relatedTarget.id == "xinzengfenlei") {
            $("#myModal .modal-title").text("新增分类");
            $("#myForm")[0].reset();
        } else {
            $("#myModal .modal-title").text("更新分类");
            $.ajax({
                type: "get",
                url: BigNew.category_search,
                data: {
                    id: $(e.relatedTarget).data("id")
                },
                success: function (res) {
                    console.log(res);
                    $("#myForm input[name=id]").val(res.data[0].id);
                    $("#myForm input[name=name]").val(res.data[0].name);
                    $("#myForm input[name=slug]").val(res.data[0].slug);

                }
            })
        }



    })

    // 对模态框的确定按钮绑定点击事件
    $('.btn-sure').on('click', function () {
        //获取id
        var id = $("#myModal input[name=id]").val();
        $.ajax({
            type: 'post',
            url: id ? BigNew.category_edit : BigNew.category_add,
            data: $('#myForm').serialize(),
            success: function (res) {
                console.log(res)
                if (res.code == 201||res.code===200) {
                    // 2.3 隐藏模态框 并刷新页面
                    $('#myModal').modal('hide')

                    // 2.4 重新刷新表格
                    render()
                }
            }
        })
    })

})