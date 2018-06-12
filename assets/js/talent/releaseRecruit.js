$(function() {
    $.ajax({
        type :   "get",
        async: true,
        traditional: true,
        data: {
            'member_sign': $.cookie('usertitle'),
            'username': $.cookie('username'),
            'UserVerifyCode': $.cookie('userVerifyCode')
        }, //提交的参数
        url: 'http://' + changeUrl.address + '/User_api?whereFrom=verify',
        dataType :   "jsonp", //数据类型为jsonp  
        jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
        success :   function(msg) {
            // alert('成功')
            // console.log(msg.verifyResult);
            if (msg.verifyResult < 0) {
                alert('您还没有登录，登录后即可发布招聘信息')
                window.location.href = "../user/login.html" //未登录，跳回登录页面
                console.log($.cookie('usertitle'))
                console.log($.cookie('username'))
                console.log($.cookie('userVerifyCode'))
                console.log($.cookie('User_TureName'))
            } else {
                $('.loginUser').text($.cookie('User_TureName'))
            }
        },
        error: function() {
            alert('发生错误，请求数据失败！');
        }
    });


    //监听用户输入字数
    $("#corporateProfile").keyup(function() {
        var wordTotal = 100,
            userWordCount = $("#corporateProfile").val().length,
            differences = wordTotal - userWordCount;
        $("#userWord").text(differences)
    })
})