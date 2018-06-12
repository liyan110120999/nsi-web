

// //////////////////////////////////////////////////////////////////////////
$(function () {
    getCookie();
})

$('#revise-WebsiteLogo').on('click',function () {
    $('#upLoad-WebsiteLogo').removeClass('hide')
    $('#upLoad-ResumeLogo02').addClass('hide')
    $('#myModal').modal('show')
})

$('#revise-ResumeLogo').on('click',function () {
    $('#upLoad-ResumeLogo02').removeClass('hide')
    $('#upLoad-WebsiteLogo').addClass('hide')
    $('#myModal').modal('show')
})

//修改基本信息
$(function () {
    var alertTip = '';

    $('#saveBaseInfo').on('click',function () {
        if(!$('#userTurename').val().toString().length){
            alertTip='请输入用户名'
        }else if(!$('#userOrganization').val().toString().length){
            alertTip='请输入公司或机构'
        }else if(!$('#userPosition').val().toString().length){
            alertTip='请输入职位'
        }else if(!$('#userPhone').val().toString().length){
            alertTip='请输入手机号'
        }else {
            alertTip='修改成功'
        }

        if(alertTip =='修改成功'){
           //  提交后台
            $.ajax({
                type:'post',
                url:'http://'+changeUrl.address+'/user/update_userInfo.do',
                data:{
                    userTurename:$('#userTurename').val(),
                    userOrganization:$('#userOrganization').val(),
                    userPosition:$('#userPosition').val(),
                    userPhone:$('#userPhone').val(),
                    id:$.cookie('userId')
                },
                success:function (msg) {
                    // console.log(msg)
                    alert('修改成功')
                    window.location.reload()
                },
                error:function (msg) {
                   alert('服务器发生错误，稍后再试')
                }
            })
        }else {
            alert(alertTip)
        }

    })
})


$(function () {
    //左边切换
    $('#ulWarp li').click(function () {
        $('#ulWarp li').removeClass('liActive')
        $(this).addClass('liActive')

        var _index = $(this).index()
        if( _index === 0 ){
            $('#tabRight-myResume').addClass('hide')
            $('#tabRight-myInfo').removeClass('hide')
            $('#tabLeft02').addClass('hide')
        }else if ( _index ===1 ){
            $('#tabRight-myInfo').addClass('hide')
            $('#tabRight-myResume').removeClass('hide')
            $('#tabLeft02').removeClass('hide')
        }
    })


    //我的基本信息
    $.ajax({
        type:"get",
        data: {
            userName:$.cookie('username')
        },//提交的参数
        url:'http://'+changeUrl.address+'/user/get_userInfo.do',
        success : function(msg){
            // console.log(msg)
            var userLogo = msg.data.userPortrait ? msg.data.userPortrait : 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
            $('#username01').text(msg.data.username)
            $('#userTurename01').text(msg.data.userTurename)
            $('#userOrganization01').text(msg.data.userOrganization)
            $('#userScore01').text(msg.data.userScore)
            $('#userPosition01').text(msg.data.userPosition)
             $('#userPhone01').text(msg.data.userPhone)
            $('#userLogo01,#userLogo02').attr('src',userLogo)
        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });

    //判断简历信息 是否上传
    $.ajax({
        type:'get',
        url:'http://'+changeUrl.address+'/manager/talent/check_upfile.do',
        data:{
            userMail:$.cookie('username')
        },
        success:function (msg) {
            console.log(msg)
            if(msg.code == 0 ){
                $('#noUploadResume').addClass('hide')
                $('#UploadResume').removeClass('hide')

               var resumeLogo = msg.data.image ? msg.data.image : 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
               var isPublic = msg.data.isPublic ==1 ? '是' : '否'


                $('#name').text(msg.data.name)
                $('#sex').text(msg.data.sex)
                $('#phone').text(msg.data.phone)
                $('#mail').text(msg.data.mail)
                $('#isPublic').text(isPublic)
                $('#resumeLogo').attr('src',resumeLogo)

                $('#major').text(msg.data.major)
                $('#expectWorkPlace').text(msg.data.expectWorkPlace)
                $('#workPlace').text(msg.data.workPlace)
                $('#workYear').text(msg.data.workYear)
                $('#education').text(msg.data.education)

                $('#expectWorkPlace').text(msg.data.expectWorkPlace)
                $('#expectWorkPosition').text(msg.data.expectWorkPosition)
                $('#expectSalary').text(msg.data.expectSalary)
                $('#entryTime').text(msg.data.entryTime)

                $('#workExperience').html(msg.data.workExperience)
                $('#educationBackground').html(msg.data.educationBackground)
                $('#trainingBackground').html(msg.data.trainingBackground)
                $('#other').html(msg.data.other)

                //判断是否上传简历附件
                if(msg.data.havaTalent){  //已上传
                    $('#noUploadResumeAffix').addClass('hide')
                    $('#UploadResumeAffix').removeClass('hide')
                    $('#affixSite').text(msg.data.havaTalent)
                }

            }
        },
        error:function () {
            alert('服务器繁忙。请稍后再试')
        }

    })


    //点击修改
    $('#doReviseBaseInfo').on('click',function () {
        $('.detailInfo').addClass('hide')
        $('.reviseBaseInfo').removeClass('hide')
        $(this).addClass('hide')
        $('#undoReviseBaseInfo').removeClass('hide')
        document.getElementById('userTurename').focus()
    })
    // 撤销修改
    $('#undoReviseBaseInfo').on('click',function () {
        $(this).addClass('hide')
        $('#doReviseBaseInfo').removeClass('hide')
        $('.reviseBaseInfo').addClass('hide')
        $('.detailInfo').removeClass('hide')
    })

    $('#affix-right').hover(function () {
        $('#resume-do').show()
    })
    $('#resume-do').hover(function () {
        $('#affix-right').css('color','#5FB878')
    },function () {
        $(this).hide()
        $('#affix-right').css('color','#ccc')
    })

})


layui.use(['upload','layer'],function () {
    var layer = layui.layer
        ,upload = layui.upload

    //上传附件
    upload.render({
        elem: '#addAffix'
        ,url: 'http://' + changeUrl.address + '/manager/talent/upfile.do'
        ,auto: true
        ,accept:'file'
        ,data:{
            userMail:$.cookie('username'),
            userTrueName:$.cookie('User_TureName')
        }
        //,multiple: true
        ,done: function(res){
            // console.log(res)
            layer.alert('上传成功')
            $('#noUploadResumeAffix').addClass('hide')
            $('#UploadResumeAffix').removeClass('hide')
            $('#affixSite').text(res.data.url)
            $.ajax({
                type:'post',
                url:'http://' + changeUrl.address + '/manager/talent/update.do',
                data:{
                    userMail:$.cookie('username'),
                    havaTalent:res.data.url
                },
                success:function (msg) {
                    // console.log(msg)
                }
            })
        }
    });

    // 删除附件
    $('#deleteAffix').on('click',function () {
        console.log($('#affixSite').text())
        $.ajax({
            type:'get',
            url:'http://' + changeUrl.address + '/manager/talent/delete_file.do',
            data:{
                userMail:$.cookie('username'),
                fileUrl:$('#affixSite').text()
            },
            success:function (msg) {
                console.log(msg)
                if(msg.code ==0){
                    layer.alert('删除成功')
                    $('#UploadResumeAffix').addClass('hide')
                    $('#noUploadResumeAffix').removeClass('hide')
                }

            },
            error:function () {
                layer.msg('服务器繁忙，请稍后再试')
            }
        })
    })

})



























