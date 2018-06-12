//封装ajax
function myAjax(data, url, success) {
    $.ajax({
        type: "get",
        async: true,
        data: data, //提交的参数
        url: url,
        success :   function(msg) {
            // console.log(msg);
            success(msg);
            $('#loadgif').hide()
            $('#floatLayer').hide() //遮罩层
            $("html,body").animate({ scrollTop: 0 }, 0);
        },
        error: function() {
            alert('发生错误，请求数据失败！');
        }
    });
}

function filterFn(para) {
    return para == 0 ? '未填写': para;
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

// 解析url
function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : "");
    var args = {};
    var items = qs.length ? qs.split("&") : [];
    var item = null;
    var name = null;
    var value = null;
    len = items.length;
    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

//创建列表
function createList(msg) {
    for (var i = 0; i < msg.data.length; i++) {
        var sex = msg.data[i].sex ==1 ? 'icon-nan' : 'icon-nv'
        var img = msg.data[i].sex ==1 ? 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png' :'http://img.zcool.cn/community/01a29158b69c22a801219c774b4b0b.png@1280w_1l_2o_100sh.png'
        $("#result").append(
        '<div class="talent-list row">'+
            '<div class="col-md-8 ">'+
                   '<div class="talent-list_left01">'+
                      '<span>'+filterFn(msg.data[i].expectWorkPlace)+'</span> &nbsp;&nbsp;|&nbsp;&nbsp;'+
                      '工作经验：<span>'+msg.data[i].workYear+'年</span> &nbsp;&nbsp;|&nbsp;&nbsp;'+
                      '<span>'+msg.data[i].education+'</span> &nbsp;&nbsp;|&nbsp;&nbsp;'+
                      ' <span>入职时间：'+filterFn(msg.data[i].entryTime)+'</span>'+
                   '</div>'+
                  '<div class="clearfix talent-list_left02">'+
                     '<div class="pull-left text-center talent-list_left02Bottom">'+
                         '<img src="' +img+ '" alt="" class="talent-list_logo">'+
                         '<span class="iconfont '+ sex +' " id=""></span>'+
                         '<p class=" text-center"> <span class="expect-salary">期望年薪：<span>'+filterFn(msg.data[i].expectSalary)+'</span></span></p>'+
                     '</div>'+
                     '<div class="pull-left talent-list_left02Right">'+
                         '<p>  <span class="talent-name"><a class="talent-name" href="./detailTalent.html?ID='+msg.data[i].id+'">'+ msg.data[i].name+'</a> </span> &nbsp;&nbsp;  期望职位：<span>'+filterFn(msg.data[i].expectWorkPosition)+'</span>     </p>'+
                         '<p class="talent-nowWorkplace">   现工作地点：<span> '+msg.data[i].workPlace+'</span>  </p>'+
                         '<p class="talent-educationBackground">  <span> '+closeChangeStyle(filterFn(msg.data[i].educationBackground))+'  </span></p>'+
                     '</div>'+
                  '</div>'+
           '</div>'+
            '<div class="col-md-4 clearfix">'+
                '<h3 class="talent-list_workTitle">工作经历</h3>'+
                '<p class="talent-list_workExperience">'+closeChangeStyle(filterFn(msg.data[i].workExperience))+'</p>'+
                '<div class="pull-right forMore">'+
                     '<a href="./detailTalent.html?ID='+msg.data[i].id+'">查看更多</a>'+
                '</div>'+
            '</div>'+
      '</div>'
        )
    }
}

 $("#search").on("click", function() {
    generalSearch()
 })
 $("#searchKey").keydown(function(e) {
        var curKey = e.which;
        if (curKey === 13) {
            generalSearch();
            return false;
        }
    })


//搜索20条
function generalSearch() {
    var passVal = $('#searchKey').val()
    // console.log(passVal);
    $.ajax({
        type: "get",
        async: true,
        data: {
            'talent_searchKey': passVal,
        }, //提交的参数
        url: "http://" + changeUrl.address + "/manager/talent/list.do", //获取搜索的总条数
        success :   function(data) {
            console.log(data)
            var totalPages = Math.ceil((data.count / 20));
            //分页
            layui.use(['layer', 'laypage', 'element'], function() {
                var layer = layui.layer,
                    laypage = layui.laypage,
                    element = layui.element();
                laypage({
                    cont: 'pageDemo01', //分页容器的id
                    pages: totalPages, //总页数
                    skin: '#5FB878', //自定义选中色值
                    //,skip: true //开启跳页
                    jump: function(obj, first) {
                        $('#result').html('')
                        $('#loadgif').show()
                        $('#floatLayer').show() //遮罩层
                        var passVal = $('#searchKey').val()
                        var data01 = {
                            'talent_searchKey': passVal,
                            'pageNum': obj.curr,
                            'pageSize': 20
                        }
                        if (data.count != 0) {
                            myAjax(data01, "http://" + changeUrl.address + "/manager/talent/list.do", createList)
                        } else {
                            $('#loadgif').hide()
                            $('#floatLayer').hide() //遮罩层
                        }
                    }
                });
            })
            $('.gengeralSearchNum').text(data.count)
        },
        error: function() {
            alert('请求数据失败！');
        }
    });
}

//外部页面跳转过来，如果为空，执行空搜，否则执行一次带参数的搜索
function initLoad(fn) {
    var args = getQueryStringArgs();
    if (jQuery.isEmptyObject(args)) {
        var data02 = {
            'talent_searchKey': '',
            'pageNum': 1,
            'pageSize': 20
        }
        myAjax(data02, 'http://' + changeUrl.address + '/manager/talent/list.do', fn)
    } else {
        var datailSchool = decodeURIComponent(args['whereFrom'])
        var data01 = {
            'talent_searchKey': datailSchool,
            'pageNum': 1,
            'pageSize': 20
        }
        $('#searchKey').val(datailSchool)
        $('#result').html('')
        myAjax(data01, 'http://' + changeUrl.address + '/manager/talent/list.do', fn)
    }
}
//初始数据加载
$(function() {
    initLoad(generalSearch)
})