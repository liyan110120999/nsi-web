//登录后的导航条状态
$(function () {
    // alert(0)
    console.log($.cookie('usertitle'))
    console.log($.cookie('username'))
    if($.cookie('usertitle') && $.cookie('username') ){
        //导航条登录显示控制
        // alert(1)
        $('.rightNav li').eq(1).css('display','none')
        $('.rightNav li').eq(2).css('display','none')
        $('.rightNav li').eq(3).css('display','block')
        $('.rightNav li').eq(4).css('display','block')
        $('.loginUser').text($.cookie('User_TureName'))
        $('#userLevel').text('Lv'+$.cookie('usertitle'))
    }else {
        // alert(2)
        $('.rightNav li').eq(1).css('display','block')
        $('.rightNav li').eq(2).css('display','block')
        $('.rightNav li').eq(3).css('display','none')
        $('.rightNav li').eq(4).css('display','none')
    }
})

//退出登录，删除cookie
function exitLogin() {
    $.cookie('usertitle', null , { expires: -1, path: '/'  });
    $.cookie('username',null , { expires: -1 ,path: '/'});
    $.cookie('User_TureName', null , { expires: -1 ,path: '/'});
    $.cookie('userVerifyCode', null , { expires: -1 ,path: '/'});
    window.location.href = '../user/login.html'
}

$('#exitLogin01').click(function () {
    exitLogin()
})
