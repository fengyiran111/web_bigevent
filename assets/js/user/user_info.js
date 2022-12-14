$(function() {
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间!'
            }
        }
    })
    initUserInfo()
    var layer = layui.layer;

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为 
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.ststus !== 0) {
                    return layer.msg('更新用户信息失败！')

                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })

})