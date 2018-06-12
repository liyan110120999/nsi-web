$(function () {
    getCookie()
})

function autoChangeStyle( obj ) {
    var val = $(obj).val()
    var reg = new RegExp('\n','g');
    val = val.replace(reg,'</p><p>')
    return val = '<p>' + val + '</p>'
}
layui.use(['form', 'layedit', 'laydate','layer','upload'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate
        ,layer = layui.layer
        ,upload = layui.upload

    form.render();
    //日期
    laydate.render({
        elem: '#entryTime'
        ,type: 'month'
        ,range: '~'
        ,format: 'yyyy-MM'
    });

    //自定义验证规则
    form.verify({
        title: function(value){
            if(value.length < 5){
                return '标题至少得5个字符啊';
            }
        }
        ,pass: [/(.+){6,12}$/, '密码必须6到12位']
        ,content: function(value){
            layedit.sync(editIndex);
        }
    });


    //监听指定开关  1公开，0不公开
    var isPublic = 1
    form.on('switch(onoffSwitch)', function(data){
        this.checked ? isPublic=1 : isPublic=0;
    });


    //选完文件后不自动上传
   document.getElementById('addAffix').addEventListener('click',function (e) {
       // console.log(e.target.nextSibling)
       $(e.target.nextSibling).change(function () {
           $('#upAffix').removeClass('hide')
       })
   })
    upload.render({
        elem: '#addAffix'
        ,url: 'http://' + changeUrl.address + '/manager/talent/upfile.do'
        ,auto: false
        ,accept:'file'
        ,data:{
            userMail:$.cookie('username'),
            userTrueName:$.cookie('User_TureName')
        }
        //,multiple: true
        ,bindAction: '#upAffix'
        ,done: function(res){
            console.log(res)
            layer.msg('上传成功')
            $('#upAffix').addClass('hide')
            $('#resumeSite').text(res.data.url).attr('src',res.data.url)
            $('#havaTalent').val(res.data.url)
        }
    });

    //监听第一步
    form.on('submit(step01)', function(data){
        isBaseInfoFinished = true;
        $('#tabRight-baseInfo').addClass('hide') ;
        $('#tabRight-jobInfo').removeClass('hide')

        $('#ulWarp li:eq(0)').removeClass('liActive');
        $('#ulWarp li:eq(1)').addClass('liActive');
        return false;
    });
    //监听第二步
    form.on('submit(step02)', function(data){

        $('#tabRight-jobInfo').addClass('hide') ;
        $('#tabRight-otherInfo').removeClass('hide')

        $('#ulWarp li:eq(1)').removeClass('liActive');
        $('#ulWarp li:eq(2)').addClass('liActive');

        return false;
    });
    //监听第三步  （提交）
    form.on('submit(confirmSubmit)', function(data){
        var addData = {
            name:$('#name').val(),
            sex:$('#sex input:radio:checked').val(),
            phone:$('#phone').val(),
            mail:$('#mail').val(),
            education:$('#education').val(),
            major:$('#major').val(),
            workPlace:$('#workPlace').val(),
            workYear:$('#workYear').val(),
            isPublic:isPublic,

            expectWorkPlace:$('#expectWorkPlace').val(),
            expectWorkPosition:$('#expectWorkPosition').val(),
            expectSalary:$('#expectSalary').val(),
            entryTime:$('#entryTime').val(),

            workExperience:autoChangeStyle('#workExperience'),
            educationBackground:autoChangeStyle('#educationBackground'),
            trainingBackground:autoChangeStyle('#trainingBackground'),
            other:autoChangeStyle('#other'),

            image:$('#ResumeImage').val(),
            havaTalent:$('#havaTalent').val(),

            userMail:$.cookie('username')
        }
        $.ajax({
            type:'post',
            url: 'http://' + changeUrl.address + '/manager/talent/add.do',
            data:addData,
            success:function (msg) {

                if(msg.code ==0){
                    layer.open({
                        type: 1,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['400px', '240px'], //宽高
                        closeBtn:false,
                        content: $('#successAlert')
                    });
                }
            },
            error:function () {
                alert('服务器繁忙，请稍后再试')
            }
        })
        return false;
    });


    //左侧切换
    var isBaseInfoFinished = false;
    $('#ulWarp li').on('click',function () {

        var _index = $(this).index()
        if(!isBaseInfoFinished){
            layer.msg('请先填写基本信息')
        }else {
            $('#tabRight-baseInfo,#tabRight-jobInfo,#tabRight-otherInfo').addClass('hide')
            $('#ulWarp li').removeClass('liActive')
            $(this).addClass('liActive')
        }

        if( _index === 0){
            $('#tabRight-baseInfo').removeClass('hide')
        }else if (_index ===1 && isBaseInfoFinished){
            $('#tabRight-jobInfo').removeClass('hide')
        }else if (_index ===2 && isBaseInfoFinished){
            $('#tabRight-otherInfo').removeClass('hide')
        }
    })


});


