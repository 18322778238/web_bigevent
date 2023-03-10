$(function () {
    var form = layui.form


    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name = oldpwd]').val()){
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if(value !== $('[name = newpwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 实现重置密码的功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success: function (res) {
                if(res.sratus !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                //重置表单
                $('.layui-form')[0].reset() 
                //[0]将jQuery元素转化为原生的js，再调用reset方法进行重置
            }
        })
    })
})