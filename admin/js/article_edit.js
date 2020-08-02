$(function() {
    //一跳转，渲染文章类别
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



})