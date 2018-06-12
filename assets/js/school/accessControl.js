

//高级搜索 分页可用(权限三的)
function advanceSearch02(){
    $('#innerWrap').html('')
    $('#loadgif').show()
    $('#floatLayer').show()//遮罩层
    var area = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
        eduSystem = ['0','0','0','0'],
        course = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
        // buildSchoolTime = $('#buildSchoolTime').val() =='' ? 0 : $('#buildSchoolTime').val()
        buildSchoolTime = ($('#buildSchoolTime').val() =='' ? 0 : $('#buildSchoolTime').val()).toString()
         console.log(buildSchoolTime)
        console.log(typeof (buildSchoolTime))
    $('#AdvanDivID01 input:checkbox:checked').each(function() {
        area[$(this).val()-1] = $(this).val()
    });
    $('#AdvanDivID02 input:checkbox:checked').each(function() {
        eduSystem[$(this).val()-1] = $(this).val()
    });
    $('#AdvanDivID03 input:checkbox:checked').each(function() {
        course[$(this).val()-1] = $(this).val()
    });
    $.ajax({
        type: 'get',//提交方式 post 或者get
        async:true,
        traditional :true,    //必须加上该句话来序列化
        dataType:'jsonp',
        data: {
            'area':area,
            'system':eduSystem,
            'course':course,
            'Founded_time':buildSchoolTime
        },//提交的参数
        jsonp:'Callback',
        url: "http://"+changeUrl.address+"/School_api?whereFrom=AdvancedSearchCount",//提交到那里 后他的服务
        success:function(msg){
            // alert("成功了");//弹出窗口，这里的msg 参数 就是访问aaaa.action 后 后台给的参数
            console.log(msg)
            var totalPages = Math.ceil((msg.countAllRS/20));
            //分页
            layui.use(['layer', 'laypage', 'element'],function () {
                var layer = layui.layer,laypage = layui.laypage,element = layui.element();
                laypage({
                    cont: 'pageDemo01', //分页容器的id
                    pages: totalPages,//总页数
                    skin: '#5FB878', //自定义选中色值
                    //,skip: true //开启跳页
                    jump: function(obj, first){
                        $('#innerWrap').html('')
                        $('#loadgif').show()
                        $('#floatLayer').show()//遮罩层
                        var data02 ={
                            'area':area,
                            'course':course,
                            'system':eduSystem,
                            'Founded_time':buildSchoolTime,
                            'pageNum': obj.curr,
                            'OnePageNum':20
                        }
                        myAjax(data02,"http://"+changeUrl.address+"/School_api?whereFrom=AdvancedSearch",accessControl02) //分页搜索
                    }
                });
            })
            $('.gengeralSearchNum').text(msg.countAllRS)
            $('.noData').css('display','none')
            $('.generalSearchResult').css('display','block')
        },
        error:function(){
            alert('请求数据失败')
        }
    });
};


//创建搜索列表，搜索20条
function accessControl02(msg) {
    for(var i=0;i<msg.length;i++){
        var imgSrc = msg[i].School_logo ? 'http://'+changeUrl.imgAddress+msg[i].School_logo : '../assets/img/schoolNoPic.png';
        $('#innerWrap').append(
            '<div class="thumbnail clearfix overInfo">'+
            '<img src="'+imgSrc+'" alt="新学说"  class="pull-left schoolPic" >'+
            '<div class="pull-left clearfix leftInfo">'+
            '<h4 class="h4 schoolName"><a href="./detail.html?School_name='+msg[i].Id+'&whereFrom=search">'+zeroToEmpty(msg[i].School_name)+'</a></h4>'+
            '<p><span>'+zeroToEmpty( msg[i].School_properties )+ '</span> | <span class="buildTime">建校时间：'+ zeroToEmpty( msg[i].Founded_time )+'</span></p>'+
            '<p class="mobieHidden"><span >学制：'+ zeroToEmpty(msg[i].School_system) +'</span> | <span>课程：'+zeroToEmpty( msg[i].Course )+'</span></p>'+
            '<p class="pcHidden">学制：'+zeroToEmpty(msg[i].School_system)+ '</p>'+
            '<p class="pcHidden">课程：'+zeroToEmpty(msg[i].Course)+'</p>'+
            '</div>'+
            '<div class="pull-right rightInfo">' +
            '<p class="clearfix"><span class="glyphicon glyphicon-globe"></span> <span class="schoolSite">'+zeroToEmpty(msg[i].Areas)+'</span></p>' +
            // '<p>提交用户：'+ msg[i].Load_People +'</p>' +
            '<p class="submitTime"><span class="glyphicon glyphicon-time"></span> 提交时间：'+zeroToEmpty( msg[i].Load_Time )+'</p>' +
            '</div>'+
            '</div>'
        )
    }
}

//三级权限，搜索20条,分页可用
function generalSearch03() {
    var passVal = $('#searchContent').val()
    // console.log(passVal)
    $.ajax({
        type : "get",
        async:true,
        traditional :true,
        data: {
            'School_searchKey':passVal,
            'pageNum':1,
            'OnePageNum':20
        },//提交的参数
        url:"http://"+changeUrl.address+"/School_api?whereFrom=count",//获取搜索的总条数
        dataType:"jsonp",//数据类型为jsonp  
        jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
        success : function(data){
            // console.log(data.countAllRS)
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
                        $('#innerWrap').html('')
                        $('#loadgif').show()
                        $('#floatLayer').show()//遮罩层
                        var passVal = $('#searchContent').val()
                        var data01 ={
                            'School_searchKey':passVal ,
                            'pageNum': obj.curr,
                            'OnePageNum':20
                        }
                        if(data.countAllRS != 0){
                            myAjax(data01,"http://"+changeUrl.address+"/School_api?whereFrom=search",accessControl02)
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


//普通搜索加分页 + 权限管理
$(function () {
    console.log( $.cookie('usertitle'))
    var num = $.cookie('usertitle');
    if(num == undefined){
      //导航条登录显示控制
      $('.rightNav li').eq(1).css('display','block')
      $('.rightNav li').eq(2).css('display','block')
      $('.rightNav li').eq(3).css('display','none')
      $('.rightNav li').eq(4).css('display','none')
        //普通搜索
        $('#searchBtn').click(function () {
            generalSearch03();
            return false;
        })
        $('#searchContent').keydown(function (e) {
            var curKey = e.which; //兼容火狐
            if( curKey == 13){
                generalSearch03();
            }
        })
        //高级搜索权限
        $("#AdvanceSubmitID").click(function(){
            $('#myModal02').modal({
                keyboard: true
            })
            return false; //阻止默认的表单提交
        })
        accessData(generalSearch03)  //不同权限初始加载数据
    }else{
        $('#searchBtn').click(function () {
            generalSearch03();
            return false;
        })
        $('#searchContent').keydown(function (e) {
            var curKey = e.which; //兼容火狐
            if( curKey == 13){
                generalSearch03();
            }
        })
        //高级搜索权限
        $("#AdvanceSubmitID").click(function(){
            advanceSearch02();
            return false;  //阻止默认的表单提交
        })
        accessData(generalSearch03)  //不同权限初始加载数据
    }
})

function accessData( fn) {
    var args =getQueryStringArgs();
    if(jQuery.isEmptyObject(args)){
        var data02 ={
            'School_searchKey':'',
            'pageNum': 1,
            'OnePageNum':10
        }
        myAjax(data02,'http://'+changeUrl.address+'/School_api?whereFrom=search',fn)
        $('#generalSearchResult').css('display','none')
    }else{
        var datailSchool = decodeURIComponent(args['whereFrom'])
        var advanceSearch = decodeURIComponent(args['advanceSearch'])
        // console.log(datailSchool,advanceSearch)
            var data01 = {
                'School_searchKey':datailSchool,
                'pageNum': 1,
                'OnePageNum':10
            }
            $('#searchContent').val(datailSchool)
            $('#innerWrap').html('')
            myAjax(data01,'http://'+changeUrl.address+'/School_api?whereFrom=search',fn)
          if(advanceSearch == 500){
              $('#AdvancedSearchID').toggle(500)
                  window.onload = function () {
                      $(window).scrollTop(350)
                  }
          }
    }
}



