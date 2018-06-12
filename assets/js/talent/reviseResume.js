$(function () {
    getCookie()
})

function autoChangeStyle( obj ) {
    var val = $(obj).val()
    var reg = new RegExp('\n','g');
    val = val.replace(reg,'</p><p>')
    return val = '<p>' + val + '</p>'
}

function closeChangeStyle( obj ) {
    if(obj){
        var reg = new RegExp('</p><p>','g')
        var newObj = obj.replace(reg,'\n')
        return newObj.slice(3,newObj.length-4)
    }else {
        return obj
    }
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


    //监听指定开关
    var isPublic = 1 // 1 公开 ，0 不公开
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
        $.ajax({
            type:'post',
            url: 'http://' + changeUrl.address + '/manager/talent/update.do',
            data:{
                name:$('#name').val(),
                sex:$('#sex input:radio:checked').val(),
                phone:$('#phone').val(),
                mail:$('#mail').val(),
                education:$('#education').val(),
                major:$('#major').val(),
                workPlace:$('#workPlace').val(),
                workYear:$('#workYear').val(),
                isPublic:isPublic,

                userMail:$.cookie('username')
            },
            success:function (msg) {
               console.log(msg)
                layer.msg('修改成功,可在个人中心查看')
            },
            error:function () {

            }
        })
        return false;
    });
    //监听第二步
    form.on('submit(step02)', function(data){
        $.ajax({
            type:'post',
            url: 'http://' + changeUrl.address + '/manager/talent/update.do',
            data:{
                expectWorkPlace:$('#expectWorkPlace').val(),
                expectWorkPosition:$('#expectWorkPosition').val(),
                expectSalary:$('#expectSalary').val(),
                entryTime:$('#entryTime').val(),

                userMail:$.cookie('username')
            },
            success:function (msg) {
                console.log(msg)
                layer.msg('修改成功,可在个人中心查看')
            },
            error:function () {

            }
        })
        return false;
    });
    //监听第三步  （提交）
    form.on('submit(confirmSubmit)', function(data){

        var addData = {
            workExperience:autoChangeStyle('#workExperience'),
            educationBackground:autoChangeStyle('#educationBackground'),
            trainingBackground:autoChangeStyle('#trainingBackground'),
            other:autoChangeStyle('#other'),

            userMail:$.cookie('username')
        }
        $.ajax({
            type:'post',
            url: 'http://' + changeUrl.address + '/manager/talent/update.do',
            data:addData,
            success:function (msg) {
                console.log(msg)
               layer.msg('修改成功,可在个人中心查看')
            },
            error:function () {

            }
        })
        return false;
    });


    //左侧切换
    $('#ulWarp li').on('click',function () {
        var _index = $(this).index()
            $('#tabRight-baseInfo,#tabRight-jobInfo,#tabRight-otherInfo').addClass('hide')
            $('#ulWarp li').removeClass('liActive')
            $(this).addClass('liActive')
        if( _index === 0){
            $('#tabRight-baseInfo').removeClass('hide')
        }else if (_index ===1 ){
            $('#tabRight-jobInfo').removeClass('hide')
        }else if (_index ===2 ){
            $('#tabRight-otherInfo').removeClass('hide')
        }
    })


   //获取已填信息
   $.ajax({
       type:'get',
       url:'http://'+changeUrl.address+'/manager/talent/check_upfile.do',
       data:{
           userMail:$.cookie('username')
       },
       success:function (msg) {
          console.log(msg)
           var userLogo = msg.data.image ? msg.data.image : 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
           $('#resumeLogo').attr('src',userLogo)

           $('#name').val(msg.data.name)
           $('#sex input[type=radio][value='+msg.data.sex+']').attr('checked',true)
           $('#phone').val(msg.data.phone)
           $('#mail').val(msg.data.mail)
           $('#education').val(msg.data.education)
           $('#major').val(msg.data.major)
           $('#workPlace').val(msg.data.workPlace)
           $('#workYear').val(msg.data.workYear)
           msg.data.isPublic == 1 ? $('#isPublic').attr('checked',true):$('#isPublic').attr('checked',false)


           $('#expectWorkPlace').val(msg.data.expectWorkPlace)
           $('#expectWorkPosition').val(msg.data.expectWorkPosition)
           $('#expectSalary').val(msg.data.expectSalary)
           $('#entryTime').val(msg.data.entryTime)


           $('#workExperience').val(closeChangeStyle(msg.data.workExperience))
           $('#educationBackground').val(closeChangeStyle(msg.data.educationBackground))
           $('#trainingBackground').val(closeChangeStyle(msg.data.trainingBackground))
           $('#other').val(closeChangeStyle(msg.data.other))
           form.render()
       }

   })




});


