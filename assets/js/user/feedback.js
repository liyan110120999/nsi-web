$(document).ready(function(){
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%' // optional
    });
});

console.log($.cookie('username'))
var username = $.cookie('username') == undefined ? 'undefinedUser' : $.cookie('username')

function feedBackSubmit() {
    var feedBackContent = []
    var contactChannel = $('#contactChannel').val()
    $('#checkBoxWrap input:checkbox:checked').each(function () {
        feedBackContent.push($(this).val())
    })
    feedBackContent.push($('#myAdvice').val())
    feedBackContent = JSON.stringify(feedBackContent)

    $.ajax({
        type : "get",
        async:false,
        traditional :true,
        data: {
            'UserName': username,
            'content':feedBackContent,
            'Contact':contactChannel
        },//提交的参数
        url:'http://'+changeUrl.address+'/User_api?whereFrom=feedback',
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            alert('反馈成功，我们将会及时通知您问题处理的进展')
            console.log(msg)
            window.location.href ='../other/index.html'
        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
}

$('#feedBackSubmit').click(function () {
    feedBackSubmit()
})

