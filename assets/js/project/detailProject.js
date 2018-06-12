
// 获取url参数
var args =getQueryStringArgs();
var datailSchool = decodeURIComponent(args['School_name'])

//过滤函数（如果为零，自动补空，地址用）
function zeroToAddress( str ) {
    var strFilter = null;
    return strFilter = (str == 0)? '' : str;
}
//过滤函数（如果为零，自动补暂无）
function zeroToEmpty( str ) {
    var strFilter = null;
    return strFilter = (str == 0)? '暂无' : str;
}

$(function () {
    $.ajax({
        type:"get",
        async:false,
        traditional :true,
        data: {
            'Id': datailSchool
        },//提交的参数
        url:'http://'+changeUrl.address+'/Subject_api?whereFrom=detail',
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            console.log(msg)
            var imgSrc = msg[0].School_logo ? 'http://'+changeUrl.imgAddress+msg[0].School_logo : '../assets/img/schoolNoPic.png';
            $('.projectName').text(zeroToEmpty(msg[0].SubjectName))
            $('.SubjectIntroduction').text(zeroToEmpty(msg[0].SubjectIntroduction))
            $('.SubjectLabel').text(zeroToEmpty(msg[0].SubjectLabel))

            $('.Areas').text(zeroToEmpty(msg[0].Areas))
            $('.Areas02').text(zeroToAddress(msg[0].Areas02))
            $('.Areas03').text(zeroToAddress(msg[0].Areas03))

            $('.Company').text(zeroToEmpty(msg[0].Company))
            $('.Requirement').text(zeroToEmpty(msg[0].Requirement))
            $('.DetailInstitution').text(zeroToEmpty(msg[0].DetailInstitution))
            $('.Name').text(zeroToEmpty(msg[0].Name))
            $('.Phone').text(zeroToEmpty(msg[0].Phone))
            $('.Mail').text(zeroToEmpty(msg[0].Mail))

        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
})