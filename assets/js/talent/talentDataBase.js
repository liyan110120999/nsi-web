// 点击跳转查询
$(function () { 
    $("#search").click(function () { 
        var val=$("#searchKey").val()
        if($("#rck").is(".active")){
            window.location.href = "./searchTalent.html?whereFrom=" + val;
        }else{
            window.location.href = "./searchRecruitmentInfo.html?whereFrom=" + val;
        }
     })

    $("#searchKey").keydown(function (e) { 
        var val=$("#searchKey").val(),
        curKey=e.which
        if(curKey===13){
            if($("#rck").is(".active")){
                window.location.href = "./searchTalent.html?whereFrom=" + val;
            }else{
                window.location.href = "./searchRecruitmentInfo.html?whereFrom=" + val;
            }
        }
     })
 })


//是否可以进入人才库
$.ajax({
    type:'get',
    url:'http://'+changeUrl.address+'/manager/talent/check_upfile.do',
    data:{
        userMail:$.cookie('username')
    },
    success:function (msg) {
        console.log(msg)
        if(msg.code == 0){
            $('#join').on('click',function () {
                alert('您已提交简历，可在个人中心查看')
                return false;
            })
        }else {
            $('#join').on('click',function () {
                window.location.href='./createresume.html'
            })
        }
    }
})