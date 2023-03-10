$(function () {
    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })

    $('#link_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数来自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd的验证规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            var pwd = $('.reg_box [name = password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault(); // 阻止表单的默认行为
        var data = {
            username: $('#form_reg [name =username ]').val(),
            password: $('#form_reg [name = password ]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if(res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录')
            //模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登陆表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault(); 
        $.ajax({
            url:'/api/login',
            type:'POST',
            // 快速获取表单数据
            data:$(this).serialize(),
            success: function (res) {
                if(res.status !== 0 ) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')
                // 将登录成功的token字符串，保存到当地的localStorage中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})