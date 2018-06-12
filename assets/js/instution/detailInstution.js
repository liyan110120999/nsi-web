// 获取cookie
var args = getQueryStringArgs();
var datailSchool = decodeURIComponent(args['School_name']) //机构Id

//过滤函数“其他”
function filter(str) {
    var result = null;
    return result = (str == "其他") ? '' : str
}


$(function() {
    getCookie();
    $.ajax({
        type: "get",
        async: false,
        traditional: true,
        data: {
            'Id': datailSchool
        }, //提交的参数
        url: 'http://' + changeUrl.address + '/Institution_api?whereFrom=detail',
        dataType :   "jsonp", //数据类型为jsonp  
        jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
        success :   function(msg) {
            console.log(msg)
                // var imgSrc = msg[0].Institution_logo ? 'http://'+changeUrl.imgAddress+msg[0].Institution_logo : '../assets/img/schoolNoPic.png';
            var imgSrc = msg[0].Institution_logo ? (msg[0].Institution_logo != 0 ? 'http://' + changeUrl.imgAddress + msg[0].Institution_logo : '../assets/img/schoolNoPic.png') : '../assets/img/schoolNoPic.png';

            $('#institutionLogo').attr('src', imgSrc)

            $('#Name').text(zeroToEmpty(msg[0].Name))
            $('#instutionLable').text(zeroToEmpty(msg[0].Label))
            $('#companyType').text(zeroToEmpty(msg[0].Type))

            $('#Address').text(filter(msg[0].Areas) + " " + filter(msg[0].Areas02) + " " + zeroToAddress(msg[0].Areas03))
            $('#Areas02').text(filter(msg[0].Areas02))
            $('#Areas03').text(zeroToAddress(msg[0].Areas03))
            $('#Website').text(zeroToEmpty(msg[0].Website))
            $('#Founded_time').text(zeroToEmpty(msg[0].Founded_time))
            $('#Service').text(zeroToEmpty(msg[0].Service))

            $('#ContactName').text(zeroToEmpty(msg[0].ContactName))
            $('#ContactPosition').text(zeroToEmpty(msg[0].ContactPosition))
            $('#ContactPhone').text(zeroToEmpty(msg[0].ContactPhone))
            $('#ContactMail').text(zeroToEmpty(msg[0].ContactMail))

            $('#Investment').text(zeroToEmpty(msg[0].Investment))
            $('#Remark').text(zeroToEmpty(msg[0].Remark))
            $('#ServedSchool').text(zeroToEmpty(msg[0].ServedSchool))
            $('#Introduction').text(zeroToEmpty(msg[0].Introduction))


            $('#Load_People').text(msg[0].Load_people)
            $('#Load_Time').text(msg[0].Load_time)

            // 机构名
            $('.instutionName').text(msg[0].Name)
                //机构网址(先判断是否只有http)
            website = msg[0].Website.substr(0, 7).toLowerCase() == "http://" ? msg[0].Website : "http://" + msg[0].Website;
            $('.Website').attr('href', website)
                //机构ID
            $('.everyInstutionID').val(msg[0].Id)
            $('.headerInstutionID').text(msg[0].Id)

            accsessControl()

            // 服务简介
            var Service = $("#Service")
            Service.siblings().height(Service.height()).css('lineHeight', Service.height() + "px")

            // 投资信息
            var Investment = $("#Investment")
            Investment.siblings().height(Investment.height()).css('lineHeight', Investment.height() + "px")

            // 过往服务学校
            var ServedSchool = $("#ServedSchool")
            ServedSchool.siblings().height(ServedSchool.height()).css('lineHeight', ServedSchool.height() + "px")

            // 详细介绍
            var Introduction = $("#Introduction")
            Introduction.siblings().height(Introduction.height()).css('lineHeight', Introduction.height() + "px")

            // 备注
            var Remark = $("#Remark")
            Remark.siblings().height(Remark.height()).css('lineHeight', Remark.height() + "px")
        },
        error: function() {
            alert('发生错误，请求数据失败！');
        }
    });
})

//修改
// $('#modifyDetail').click(function () {
//     window.location.href = './alertCompany.html?School_name='+datailSchool
// })
// 权限管理
function accsessControl() {
    console.log($.cookie('usertitle'))
    var num = $.cookie('usertitle');
    if (num == undefined) {
        //详情页面删除按钮
        $('#deleteDetail').click(function() {
                $('#myModal').modal({
                    keyboard: true
                })
            })
            //详情页面修改按钮
        $('#modifyDetail').click(function() {
            $('#myModal').modal({
                keyboard: true
            })
        })
    } else if (num == 1) {
        //详情页面删除按钮
        $('#deleteDetail').click(function() {
                $('#myModal').modal({
                    keyboard: true
                })
            })
            //详情页面修改按钮
        $('#modifyDetail').click(function() {
            $('#myModal').modal({
                keyboard: true
            })
        })
    } else if (num == 2) {
        //详情页面删除按钮
        $('#deleteDetail').click(function() {
                $('#myModal').modal({
                    keyboard: true
                })
            })
            //详情页面修改按钮
        $('#modifyDetail').click(function() {
            $('#myModal').modal({
                keyboard: true
            })
        })
    } else if (num == 3) {
        //详情页面删除按钮
        $('#deleteDetail').click(function() {
                $('#myModal').modal({
                    keyboard: true
                })
            })
            //详情页面修改按钮
        $('#modifyDetail').click(function() {
            $('#myModal').modal({
                keyboard: true
            })
        })
    } else {
        //详情页面删除按钮
        $('#deleteDetail').click(function() {
                ConfirmDelete();
            })
            //修改
        $('#modifyDetail').click(function() {
            window.location.href = './alertCompany.html?School_name=' + datailSchool
        })
    }
}


//点击显示图片上传模态框（自制）
$('#upHeadImg').click(function() {
    $('#upImgModal').animate({
        top: 100
    }, 500)
    $('#modalBg').css({ 'background': 'rgba(0,0,0,.6)', 'position': 'fixed', 'z-index': 5 })
    uploadIMG() //图片上传
})
$('#closeUpImg').click(function() {
    $('#upImgModal').animate({
        top: -500
    }, 500)
    $('#modalBg').css({ 'background': '', 'position': '', 'z-index': '' })
})


//发表评论 (待审核)
function publishCommnent() {
    var commentContent = $('#textContent').val()
    var reviewer = $.cookie('username') ? $.cookie('username') : '匿名用户'
    var data = {
        Reviewer: reviewer,
        Classify: 'institution',
        SubjectId: datailSchool,
        Content: commentContent
    }
    var url = 'http://' + changeUrl.address + '/Comment_api?whereFrom=SendComment'

    if (commentContent != '') {
        $.ajax({
            type : "get",
            async: true,
            traditional: true,
            data: data, //提交的参数
            url: url,
            dataType: "jsonp", //数据类型为jsonp  
            jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
            success :   function(msg) {
                console.log(msg)
                alert("评论成功，管理员审核通过后显示！")
                $('#textContent').val('')
                window.location.reload()
            },
            error: function() {
                alert('发生错误，请求数据失败！');
            }
        });
    }
}

//页面初始加载显示评论
$(function() {
    var data = {
        SubjectId: datailSchool,
    }
    var url = 'http://' + changeUrl.address + '/Comment_api?whereFrom=CommentList'
    $.ajax({
        type : "get",
        async: true,
        traditional: true,
        data: data, //提交的参数
        url: url,
        dataType: "jsonp", //数据类型为jsonp  
        jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
        success :   function(msg) {
            console.log(msg)
            createComment(msg)
        },
        error: function() {
            alert('发生错误，请求数据失败！');
        }
    });
})


//创建评论
function createComment(msg) {
    for (var i = 0; i < msg.length; i++) {
        $('#outerWrap').prepend(
            '<div class="wrapComment">' +
            '<div class="clearfix headerComment">' +
            '<img src="../assets/img/userLogo.jpg" width="60" height="60" class="pull-left userLogo"/>' +
            '<div class="pull-left userInfo">' +
            '<p class="nickName">' + msg[i].Reviewer + '</p>' +
            '<p class="userSign">新学说国际学校多边平台</p>' +
            '</div>' +
            '</div>' +
            '<div class="commentContent">' + msg[i].Content + '</div>' +
            '<div  class="clearfix bottomComment">' +
            // '<p class="pull-left">&nbsp;&nbsp;<span id="thumbUp">赞</span><span id="leftBracket">(</span><span id="thumbUpNum">0</span><span id="rightBracket">)</span>&nbsp;<span class="glyphicon glyphicon-thumbs-up" onclick="thumbUp()"></span> <span class="verticalLine">|</span> <span id="thumbDown">踩</span><span id="leftDownBracket">(</span><span id="thumbDownNum">0</span><span id="rightDownBracket">)</span>&nbsp;<span class="glyphicon glyphicon-thumbs-down"></span> </p>' +
            '<p class="pull-right">发表于：' + msg[i].ReleaseTimeSecond + '</p>' +
            '<p class="commentId" style="display: none;">' + msg[i].Id + '</p>' +
            '</div>' +
            '</div>')
    }
}

//点赞
var thumbUpOnOff = true;
$('#outerWrap').delegate('.glyphicon-thumbs-up', 'click', thumbUp)
    //踩
var thumbDownOnOff = true;
$('#outerWrap').delegate('.glyphicon-thumbs-down', 'click', thumbDown)
    //点赞函数

function thumbUp() {
    var thumbUpNum = $('#thumbUpNum').text()
    if (thumbUpOnOff) {
        ++thumbUpNum;
        $(this).siblings('#thumbUpNum').text(thumbUpNum).css('color', 'blue')
        $(this).siblings('#thumbUp').text('已赞').css('color', 'blue')
        $(this).siblings('#leftBracket ,#rightBracket').css('color', 'blue')
        $(this).css('color', 'blue')
        thumbUpOnOff = false
    } else {
        --thumbUpNum;
        $(this).siblings('#thumbUpNum').text(thumbUpNum).css('color', '#999')
        $(this).siblings('#thumbUp').text('赞').css('color', '#999')
        $(this).siblings('#leftBracket ,#rightBracket').css('color', '#999')
        $(this).css('color', '#999')
        thumbUpOnOff = true
    }
}

//点踩函数
function thumbDown() {
    var thumbDownUnm = $('#thumbDownNum').text()
    console.log(thumbDownUnm)
    if (thumbDownOnOff) {
        thumbDownUnm++;
        $('#thumbDownNum').text(thumbDownUnm).css('color', 'blue')
        $('#thumbDown').text('已踩').css('color', 'blue')
        $('#leftDownBracket ,#rightDownBracket').css('color', 'blue')
        $('.glyphicon-thumbs-down').css('color', 'blue')
        thumbDownOnOff = false
    } else {
        thumbDownUnm--;
        $('#thumbDownNum').text(thumbDownUnm).css('color', '#999')
        $('#thumbDown').text('踩').css('color', '#999')
        $('#leftDownBracket ,#rightDownBracket').css('color', '#999')
        $('.glyphicon-thumbs-down').css('color', '#999')
        thumbDownOnOff = true
    }
}


//匹配中文字节长度(如果是中文字符，使其长度为二)
function getLength(str) {
    return String(str).replace(/[^\x00-\xff]/g, 'aa').length
}

//输入的文字个数
function getInputNum() {
    var num = Math.ceil(getLength($('#textContent').val()) / 2)
    console.log(num)
    $('.characterNum').text(num)

    if ($('#textContent').val() == '' || num < 20) {
        $('#commentSubmitBtn').addClass('noPass')
    } else {
        $('#commentSubmitBtn').removeClass('noPass')
    }
}

var ie = !-[1, ] //判断是ie浏览器
var oT = document.getElementById('textContent')

if (ie) {
    oT.onpropertychange = getInputNum
} else {
    oT.oninput = getInputNum
}

var timer = null;
var iNum = 0
$('#commentSubmitBtn').click(function() {
    if ($(this).hasClass('noPass')) {
        clearInterval(timer)
        timer = setInterval(function() {
            if (iNum == 3) {
                clearInterval(timer)
                iNum = 0;
            } else {
                iNum++;
            }

            if (iNum % 2) {
                oT.style.background = '#FF9933';
            } else {
                oT.style.background = '';
            }
        }, 300)
    } else {
        publishCommnent()
    }
})