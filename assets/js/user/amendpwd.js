$(function () {
    getCookie()  //没有登录，返回登录页面
})

var checkPsdLengthResult = null;
var checkSamePsdResult = null;
//判断密码长度必须大于等于6位
function checkPsdLength() {
    if($('#newPsd').val().length <6 ){
        $('.newPsdErr').css('visibility','visible')
        checkPsdLengthResult = false;
    }else {
        $('.newPsdErr').css('visibility','hidden')
        checkPsdLengthResult = true;
    }
}
function checkSamePsd() {
    var pwdValue01 = $('#newPsd').val()
    var pwdValue02 = $('#confirmPsd').val()
    if( pwdValue01 == pwdValue02 ){
        $('.confirmPsdErr').css('visibility','hidden')
        checkSamePsdResult = true;
    }else {
        $('.confirmPsdErr').css('visibility','visible')
        checkSamePsdResult = false;
    }
}

$('#amendPsd').click(function () {
    checkPsdLength()
    checkSamePsd()
    // console.log(checkPsdLengthResult)
    // console.log(checkSamePsdResult)
    if(checkPsdLengthResult == true && checkSamePsdResult == true){
        var userEmail = $.cookie('username')
        var newPsd = $('#confirmPsd').val()
        $.ajax({
            type:"get",
            async:true,
            traditional :true,
            data: {
                UserName:userEmail,
                NewPassword:newPsd
            },//提交的参数
            url:'http://'+changeUrl.address+'/User_api?whereFrom=ModifyPW',
            dataType : "jsonp",//数据类型为jsonp  
            jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
            success : function(msg){
                console.log(msg)
                if(msg.msg ==1){
                    alert('密码修改成功，请重新登录')
                    window.location.href ='./login.html'
                }
            },
            error:function(){
                alert('发生错误，请求数据失败！');
            }
        });
    }else {
        alert('密码输入错误，请重新输入')
    }
})






