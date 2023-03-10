// 入口函数
$(function () {
    getUserInfo()

    var layer = layui.layer
    // 实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新将页面退回到登陆页面
            location.href = '/login.html'
            layer.close(index);
          });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type:'GET',
        url: '/my/userinfo',
        //headers 就是请求头对象
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if(res.status !== 0 ) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar 函数来渲染用户头像
            renderAvatar(res.data)
        },
        // 无论成功还是失败最终都会调用complete回调函数 归总在baseAPI.js中
    })
}

//


//渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
    // 3.按需渲染用户的头像
    if(user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').prop('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}