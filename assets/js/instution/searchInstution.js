

//动态创建数据
function createMsg(msg) {
    var imgSrc = null;
    // var imgSrc = msg.School_logo ? changeUrl.address+msg.School_logo : '../assets/img/schoolNoPic.png';
    console.log(imgSrc)
    for(var i=0;i<msg.length;i++){
        // var imgSrc = msg[i].School_logo ? 'http://'+changeUrl.address.substring(0,13)+msg[i].School_logo : '../assets/img/schoolNoPic.png';
        var imgSrc = msg[i].Institution_logo ? (msg[i].Institution_logo !=0 ? 'http://'+changeUrl.imgAddress+msg[i].Institution_logo : '../assets/img/schoolNoPic.png') : '../assets/img/schoolNoPic.png';
        $('#innerWrap').append(
            '<div class="thumbnail clearfix overInfo">'+
            '<img src="'+imgSrc+'" alt="新学说"  class="pull-left schoolPic" >'+
            '<div class="pull-left clearfix leftInfo">'+
            '<h4 class="h4 schoolName"><a href="./detailCompany.html?School_name='+msg[i].Id+'&whereFrom=search">'+zeroToEmpty(msg[i].Name)+'</a></h4>'+
            '<p>标签：<span>'+ zeroToEmpty(msg[i].Label) + '</span></p>'+
            '<p class="mobieHidden"><span >类型：'+ zeroToEmpty(msg[i].Type) +'</span> | <span>成立时间：'+ zeroToEmpty(msg[i].Founded_time) +'</span></p>'+
            '<p class="pcHidden">类型：'+zeroToEmpty(msg[i].Type)+ '</p>'+
            '<p class="pcHidden">成立时间：'+zeroToEmpty(msg[i].Founded_time)+'</p>'+
            '</div>'+
            '<div class="pull-right rightInfo mobieHidden">' +
            '<p class="clearfix"><span class="glyphicon glyphicon-globe"></span> <span class="schoolSite">'+zeroToEmpty(msg[i].Areas)+'</span></p>' +
            // '<p>提交用户：'+ msg[i].Load_people +'</p>' +
            '<p class="submitTime"><span class="glyphicon glyphicon-time"></span> 提交时间：'+zeroToEmpty( msg[i].Load_time )+'</p>' +
            '</div>'+
            '<div class="text-center pcHidden" style="padding-left:5px;padding-right:5px;">'+
            '<p style="height:117px;"></p>'+
            '<span class="glyphicon glyphicon-globe"></span><span class="schoolSite">'+zeroToEmpty(msg[i].Areas)+'</span>'+
            '<p style="margin-top:2px;"><span class="pull-right"><span class="glyphicon glyphicon-time"></span>&nbsp;<span class="foundedTime">提交时间：'+ zeroToEmpty(msg[i].Load_time)+'</span></span></p>'+
            '</div>'+
            '</div>'
        )
    }
}


//普通搜索
function instutionSearch() {
    var passVal = $('#searchContent').val()
    $.ajax({
        type:"get",
        async:true,
        traditional :true,
        data: {
            'Institution_searchKey':passVal,
            'pageNum':1,
            'OnePageNum':20
        },//提交的参数
        url:"http://"+changeUrl.address+"/Institution_api?whereFrom=count",//获取搜索的总条数
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
                        $('#floatLayer').show()//遮罩层
                        $('#loadgif').show()
                        var passVal = $('#searchContent').val()
                        var data01 ={
                            'Institution_searchKey':passVal ,
                            'pageNum': obj.curr,
                            'OnePageNum':20
                        }
                        if(data.countAllRS != 0){
                            myAjax(data01,"http://"+changeUrl.address+"/Institution_api?whereFrom=search",createMsg)
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
//普通搜索
$('#searchBtn').click(function () {
    instutionSearch()
})
$('#searchContent').keydown(function (e) {
    var curKey = e.which
    if( curKey == 13){
        instutionSearch()
    }
})

function accessData(fn) {
    var args =getQueryStringArgs();
    if(jQuery.isEmptyObject(args)){
        var data02 ={
            'Institution_searchKey':'',
            'pageNum': 1,
            'OnePageNum':10
        }
        myAjax(data02,'http://'+changeUrl.address+'/Institution_api?whereFrom=search',fn)
        $('#generalSearchResult').css('display','none')
    }else{
        var datailSchool = decodeURIComponent(args['whereFrom'])
        var data01 = {
            'Institution_searchKey':datailSchool,
            'pageNum': 1,
            'OnePageNum':10
        }
        $('#searchContent').val(datailSchool) //赋值搜索内容
        $('#innerWrap').html('')
        myAjax(data01,'http://'+changeUrl.address+'/Institution_api?whereFrom=search',fn)
    }
}
$(function () {
    accessData(instutionSearch)
})





