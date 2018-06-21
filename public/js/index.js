$(function () {
    var $loginBox = $('#loginBox')
    var $registerBox = $('#registerBox')
    // 注册登录切换
    $loginBox.find('a').on('click', function () {
        $loginBox.hide()
        $registerBox.show()
    })
    $registerBox.find('a').on('click', function () {
        $loginBox.show()
        $registerBox.hide()
    })
    // 注册按钮点击效果
    $registerBox.find('button').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $registerBox.find('[name = "username"]').val(),
                password: $registerBox.find('[name = "password"]').val(),
                repassword: $registerBox.find('[name = "repassword"]').val()
            },
            dataType: 'json',
            success: function (res) {
                // alert(res.message)
                $registerBox.find('.colWarning').html(res.message)
                if (res.code == 200) {
                    setTimeout(() => {
                        alert('注册成功')    
                    }, 100);
                    $loginBox.show()
                    $registerBox.hide()
                }
            }
        })
    })
    // 登录
    $loginBox.find('button').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $loginBox.find('[name = "username"]').val(),
                password: $loginBox.find('[name = "password"]').val()
            },
            dataType: 'json',
            success: function (res) {
                // alert(res.message)
                $registerBox.find('.colWarning').html(res.message)
                if (res.code == 200) {
                    setTimeout(() => {
                        alert('注册成功')    
                    }, 100);
                    $loginBox.show()
                    $registerBox.hide()
                }
            }
        })
    })
})