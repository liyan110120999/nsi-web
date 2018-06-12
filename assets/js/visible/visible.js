//导航条登录状态显示
$(function () {
    var username = $.cookie('User_TureName')
    if( username == undefined) {
        $('.rightNav li').eq(1).css('display','block')
        $('.rightNav li').eq(2).css('display','block')
        $('.rightNav li').eq(3).css('display','none')
        $('.rightNav li').eq(4).css('display','none')
    }else{
        $('.loginUser').text(username)
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

//退回登录删除cookie
$('#exitLogin02').click(function () {
    exitLogin()
})

//阻止图片轮播
$('.carousel').carousel({
    interval: false
})

//返回顶部
$(function () {
    $('#backToTop').hide()
    $(window).scroll(function () {
        if($(this).scrollTop()>54){
            $('#backToTop').fadeIn()
        }else {
            $('#backToTop').fadeOut()
        }
    })
    $('#backToTop').click(function () {
        $('html , body').animate({scrollTop: 0},'slow');
    })
})

//意见反馈移动端消失
$(function () {
    var screenWidth = $(window).width()
    if(screenWidth < 768 ){
        $('#advice').hide()
        //页脚样式
        $('#mobileFooter').addClass('text-center')
    }
})

//用户等级显示
$(function () {
    $('#userLevel').text('Lv'+$.cookie('usertitle'))
})







