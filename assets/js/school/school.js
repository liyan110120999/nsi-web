$('#searchBtn').on('click', function() {
    var searchVal = $('#search_content').val()
    window.location.href = './search.html?whereFrom=' + searchVal
})
$('#search_content').keydown(function(e) {
    var curKey = e.which;
    var searchVal = $('#search_content').val()
    if (curKey == 13) {
        window.location.href = './search.html?whereFrom=' + searchVal
    }
})

var searchTips = document.getElementById('search_tips')
searchTips.addEventListener("click", function(e) {
    // e.stopPropagation()
    var target = e.target
    $('#search_content').val(target.innerHTML)
    window.location.href = './search.html?whereFrom=' + target.innerHTML
})


//搜索提示
$('#search_content').on('input propertychange', function(e) {
        // e.stopPropagation()
        $('#search_tips').html('')
        var searchVal = $(this).val()
        $.ajax({
            type: 'get',
            url: 'http://' + changeUrl.address + '/School_api?whereFrom=suggestSearch',
            data: {
                keyword: searchVal
            },
            success: function(msg) {
                if (msg.data.length !== 0) {
                    $('#search_tips').removeClass('hide')
                    for (var i = 0; i < msg.data.length; i++) {
                        $('#search_tips').append(
                            '<li>' + msg.data[i] + '</li>'
                        )
                    }
                } else {
                    $('#search_tips').addClass('hide')
                }

            },
            error: function() {
                alert('服务器繁忙，请稍后再试~')
            }
        })
    })
    //获取焦点(如果之前输入了值，那么就显示提示)
$('#search_content').focus(function(event) {
    // event.stopPropagation()
    $('#search_tips').html('')
    var searchVal = $(this).val()
    if (searchVal !== '') {
        $.ajax({
            type: 'get',
            url: 'http://' + changeUrl.address + '/School_api?whereFrom=suggestSearch',
            data: {
                keyword: searchVal
            },
            success: function(msg) {
                if (msg.data.length !== 0) {
                    $('#search_tips').removeClass('hide')
                    for (var i = 0; i < msg.data.length; i++) {
                        $('#search_tips').append(
                            '<li>' + msg.data[i] + '</li>'
                        )
                    }
                } else {
                    $('#search_tips').addClass('hide')
                }

            },
            error: function() {
                alert('服务器繁忙，请稍后再试~')
            }
        })
    }
})

//失去焦点
$('#search_content').blur(function() {
    setTimeout(function() {
        $('#search_tips').addClass('hide')
    }, 300)
})

//热门广告学校
$(function() {
    $.ajax({
        type: 'get',
        url: 'http://' + changeUrl.address + '/show_school_boards_api?whereFrom=show_boardsBySchool',
        data: {

        },
        success: function(msg) {
            console.log(msg)
            for (var i = 0; i < msg.data.length; i++) {
                var imgSrc = msg.data[i].School_logo ? 'http://' + changeUrl.imgAddress + msg.data[i].School_logo : '../assets/img/schoolNoPic.png';
                $('#adviceSchoolWrap').append(
                    '<div class="col-md-3">' +
                    '<a class="school_list" href="./detail.html?School_name=' + msg.data[i].Id + '&whereFrom=search">' +
                    '<div class="text-center">' +
                    '<img src="' + imgSrc + '" alt="学校logo" class="school_logo ">' +
                    '</div>' +
                    '<h4 class="text-center school_name">' + msg.data[i].School_name + '</h4>' +
                    '<div class="clearfix">' +
                    '<p class="pull-left">' +
                    '<span>' + msg.data[i].School_properties + '</span> <span>|</span> <span>建校时间：</span> <span>' + msg.data[i].Founded_time + '</span>' +
                    '</p>' +
                    '<p class="pull-right">' +
                    '<span class="glyphicon glyphicon-globe" style="top:2px;color:#215089;"></span> <span>' + msg.data[0].Areas + '</span>' +
                    '</p>' +
                    '</div>' +
                    ' <p>' +
                    '<span>学制：</span> <span>' + msg.data[i].School_system + '</span>' +
                    '</p>' +
                    '<p> <span>课程：</span> <span>' + msg.data[i].Course + '</span></p>' +
                    ' <p> <span class="glyphicon glyphicon-time" style="top:2px;color:#215089;"></span> <span> 提交时间：</span> <span>' + msg.data[i].Load_Time + '</span></p>' +
                    '</a>' +
                    '</div>'
                )
            }
        },
        error: function() {
            alert('服务器繁忙，请稍后再试~')
        }
    })
})