//封装ajax
function myAjax( data,url,success) {
    $.ajax({
        type : "get",
        async:true,
        traditional :true,
        data: data,//提交的参数
        url:url,
        dataType : "jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(msg){
            // console.log(msg)
            success(msg);
            $('#loadgif').hide()
            $('#floatLayer').hide()//遮罩层
            $("html,body").animate({scrollTop:0}, 0);
        },
        error:function(){
            alert('发生错误，请求数据失败！');
        }
    });
}


//创建搜索列表，搜索20条
function createProject(msg) {
    for(var i=0;i<msg.length;i++){
        var SubjectIntroduction = msg[i].SubjectIntroduction.length > 50 ? msg[i].SubjectIntroduction.substring(0,50)+'...' : msg[i].SubjectIntroduction;
        var imgSrc = msg[i].School_logo ? 'http://'+changeUrl.imgAddress+msg[i].School_logo : '../assets/img/schoolNoPic.png';
        $('#outerWrap').append(
        '<div class="col-sm-6 col-md-4 col-lg-4">'+
            '<div class="thumbnail">'+
               '<a href="./detailProject.html?School_name='+msg[i].Id+'&whereFrom=search" class="linkHref"><img src="../assets/img/project.jpg" alt="新学说"></a>'+
               '<div class="caption">'+
               '<h3 class="projectName">'+msg[i].SubjectName+'</h3>'+
               '<p class="content"><a href="./detailProject.html?School_name='+msg[i].Id+'&whereFrom=search" class="linkHref">'+SubjectIntroduction+'</a></p>'+
               '<div class="clearfix publishCompany"><p class="pull-right">发布单位：<span>'+msg[i].Company+'</span></p></div>'+
               '</div>'+
           '</div>'+
        '</div>'
        )
    }
}

//三级权限，搜索20条,分页可用
function generalSearch() {
    var passVal = $('#searchContent').val()
    $.ajax({
        type : "get",
        async:true,
        traditional :true,
        data: {
            'SearchKey':passVal,
            'pageNum':1,
            'OnePageNum':20
        },//提交的参数
        url:"http://"+changeUrl.address+"/Subject_api?whereFrom=count",//获取搜索的总条数
        dataType:"jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(data){
            console.log(data.countAllRS)
            var totalPages = Math.ceil((data.countAllRS/20));
            //分页
            layui.use(['layer', 'laypage', 'element'],function () {
                var layer = layui.layer,laypage = layui.laypage,element = layui.element();
                laypage({
                    cont: 'pageDemo01', //分页容器的id
                    pages: totalPages,//总页数
                    skin: '#5FB878', //自定义选中色值
                    //,skip: true //开启跳页
                    jump: function(obj, first){
                        $('#outerWrap').html('')
                        $('#loadgif').show()
                        $('#floatLayer').show()//遮罩层
                        var passVal = $('#searchContent').val()
                        var data01 ={
                            'SearchKey':passVal ,
                            'pageNum': obj.curr,
                            'OnePageNum':20
                        }
                        if(data.countAllRS != 0){
                            myAjax(data01,"http://"+changeUrl.address+"/Subject_api?whereFrom=search",createProject)
                        }else {
                            $('#loadgif').hide()
                            $('#floatLayer').hide()//遮罩层
                        }
                    }
                });
            })
            $('.gengeralSearchNum').text(data.countAllRS)
            $('.noData').css('display','none')
            $('.generalSearchResult').css('display','block')
        },
        error:function(){
            alert('请求数据失败！');
        }
    });
}

$('#searchBtn').click(function () {
    generalSearch();
    return false;
})
$('#searchContent').keydown(function (e) {
    var curKey = e.which; //兼容火狐
    if( curKey == 13){
        generalSearch();
    }
})


function accessData( fn) {
    var args =getQueryStringArgs();
    if(jQuery.isEmptyObject(args)){
        var data02 ={
            'SearchKey':'',
            'pageNum': 1,
            'OnePageNum':20
        }
        myAjax(data02,'http://'+changeUrl.address+'/Subject_api?whereFrom=search',fn)
        $('#generalSearchResult').css('display','none')
    }else{
        var datailSchool = decodeURIComponent(args['whereFrom'])
        var data01 = {
            'SearchKey':datailSchool,
            'pageNum': 1,
            'OnePageNum':20
        }
        $('#searchContent').val(datailSchool)
        $('#outerWrap').html('')
        myAjax(data01,'http://'+changeUrl.address+'/Subject_api?whereFrom=search',fn)
    }
}

//初始加载数据
$(function () {
    accessData(generalSearch)
})

