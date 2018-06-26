// 获取cookie
var args = getQueryStringArgs();
var datailSchool = decodeURIComponent(args['School_name'])

//过滤函数（如果为零，自动补空，地址用）
function zeroToAddress(str) {
    var strFilter = null;
    return strFilter = (str == 0) ? '' : str;
}

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
            'schoolId': datailSchool
        }, //提交的参数
        // url: changeUrl.address + '/School_api?whereFrom=detail',
        url: changeUrl.address + '/school/detail.do',
        success :   function(msg) {
            console.log(msg)
            var imgSrc = msg.data.schoolLogo ? 'http://' + changeUrl.imgAddress + msg.data.schoolLogo : '../assets/img/schoolNoPic.png';
            $('#School_logo').attr('src', imgSrc)
            $('#School_name').text(zeroToEmpty(msg.data.schoolName))
            $('#School_EnglishName').text(zeroToEmpty(msg.data.schoolEnglishname))
            $('#School_properties').text(zeroToEmpty(msg.data.schoolProperties))
            $('#OperationState').text(zeroToEmpty(msg.data.operationstate))

            $('#Address').text(filter(msg.data.areas) + " " + filter(msg.data.areas02) + " " + zeroToAddress(msg.data.areas03))
            $('#Website').text(zeroToEmpty(msg.data.website))
            $('#Website').attr("href", "http://" + zeroToEmpty(msg.data.website))
            $('#Telephone').text(zeroToEmpty(msg.data.telephone))
            $('#School_system').text(zeroToEmpty(msg.data.schoolSystem))
            $('#Founded_time').text(zeroToEmpty(msg.data.foundedTime))
            $('#TuitionHigh').text(zeroToEmpty(msg.data.tuitionhigh))

            $('#Tuition01').text(zeroToEmpty(msg.data.tuition01))
            $('#Tuition02').text(zeroToEmpty(msg.data.tuition02))
            $('#Tuition03').text(zeroToEmpty(msg.data.tuition03))
            $('#Tuition04').text(zeroToEmpty(msg.data.tuition04))

            $('#Inter_Course_Founded_time').text(zeroToEmpty(msg.data.interCourseFoundedTime))
            $('#Club_Num').text(zeroToEmpty(msg.data.clubNum))
            $('#Course_evaluation').text(zeroToEmpty(msg.data.courseEvaluation))
            $('#Stu_Year_Investment').text(zeroToEmpty(msg.data.stuYearInvestment))
            $('#Course').text(zeroToEmpty(msg.data.course))
            $('#Student_Capacity').text(zeroToEmpty(msg.data.studentCapacity))
            $('#Authentication').text(zeroToEmpty(msg.data.authentication))
            $('#Graduated_Stu_Num').text(zeroToEmpty(msg.data.graduatedStuNum))
            $('#Stu_Dominant_nationality').text(zeroToEmpty(msg.data.stuDominantNationality))
            $('#Student_Num_All').text(zeroToEmpty(msg.data.studentNumAll))

            $('#Student_Num01').text(zeroToEmpty(msg.data.studentNumA01))
            $('#Student_Num02').text(zeroToEmpty(msg.data.studentNumA02))
            $('#Student_Num03').text(zeroToEmpty(msg.data.studentNumA03))
            $('#Student_Num04').text(zeroToEmpty(msg.data.studentNumA04))

            $('#President_Country').text(zeroToEmpty(msg.data.presidentCountry))
            $('#Staff_Num').text(zeroToEmpty(msg.data.staffNum))
            $('#Teacher_Salary').text(zeroToEmpty(msg.data.teacherSalary))
            $('#Teacher_Num').text(zeroToEmpty(msg.data.teacherNum))
            $('#Teacher_Year_Investment').text(zeroToEmpty(msg.data.teacherYearInvestment))
            $('#Foreign_Teacher_num').text(zeroToEmpty(msg.data.foreignTeacherNum))
            $('#Teacher_Stu_ratio').text(zeroToEmpty(msg.data.teacherStuRatio))
            $('#Teacher_Retention').text(zeroToEmpty(msg.data.teacherRetention))

            $('#Covered_Area').text(zeroToEmpty(msg.data.coveredArea))
            $('#Built_Area').text(zeroToEmpty(msg.data.builtArea))
            $('#Hardware').text(zeroToEmpty(msg.data.hardware))
            $('#Investment').text(zeroToEmpty(msg.data.investment))
            $('#Remark').text(zeroToEmpty(msg.data.remark))

            $('#Load_People').text(msg.data.loadPeople)
            $('#Load_Time').text(msg.data.loadTime)

            // 学校名
            $('.schoolName').text(msg.data.schoolName)

            if (msg.data.website.substr(0, 7).toLowerCase() == "http://") {
                console.log(msg.data.website)
                website = msg.data.website
            } else if (msg.data.website.substr(0, 7).toLowerCase() == "https:/") {
                website = msg.data.website
            } else {
                website = "http://" + msg.data.website;
            }
            $('.Website').attr('href', website)

            //学校ID
            $('.everySchoolID').val(msg.data.id)
            $('.headerSchoolID').text(msg.data.id)
            accsessControl()

            // 硬件设施
            var Hardware = $("#Hardware")
            Hardware.siblings().height(Hardware.height()).css('lineHeight', Hardware.height() + "px")
                // 备注
            var Remark = $("#Remark")
            Remark.siblings().height(Remark.height()).css('lineHeight', Remark.height() + "px")
        },
        error: function() {
            alert('发生错误，请求数据失败！');
        }
    });

})

//点击显示图片上传模态框（自制）
$('#upHeadImg').click(function() {
    $('#upImgModal').animate({
        top: 100
    }, 500)
    $('#modalBg').css({ 'background': 'rgba(153,153,153,.8)', 'position': 'fixed', 'z-index': 5 })
    uploadIMG() //图片上传
})
$('#closeUpImg').click(function() {
    $('#upImgModal').animate({
        top: -500
    }, 500)
    $('#modalBg').css({ 'background': '', 'position': '', 'z-index': '' })
})



// 权限管理
function accsessControl() {
    console.log($.cookie('usertitle'))
    var num = $.cookie('usertitle');
    if (num == undefined) {
        //导航条登录显示控制
        //   alert(-2)
        $('.rightNav li').eq(0).css('display', 'block')
        $('.rightNav li').eq(1).css('display', 'block')
        $('.rightNav li').eq(2).css('display', 'none')
        $('.rightNav li').eq(3).css('display', 'none')
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
        $('#Inter_Course_Founded_time,#Student_Num01,#Student_Num02,#Student_Num03,#Student_Num04,#Authentication,#Course_evaluation,#Student_Num_All,#Student_Capacity,#Graduated_Stu_Num,#Stu_Dominant_nationality,#Stu_Year_Investment,#Club_Num,#President_Country,#Staff_Num,#Teacher_Num,#Foreign_Teacher_num,#Teacher_Year_Investment,#Teacher_Retention,#Teacher_Salary,#Teacher_Stu_ratio,#Covered_Area,#Built_Area,#Investment,#Remark').text('权限不足').css({ 'color': '#CCCCCC', 'fontSize': '14px' })
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
        $('#Teacher_Num,#Student_Capacity,#Stu_Year_Investment,#Foreign_Teacher_num,#Teacher_Year_Investment,#Teacher_Retention,#Teacher_Salary,#Investment,#Remark').text('权限不足').css({ 'color': '#CCCCCC', 'fontSize': '14px' })

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
        $('#Investment').text('权限不足').css({ 'color': '#CCCCCC', 'fontSize': '14px' })
    } else {
        //详情页面删除按钮
        $('#deleteDetail').click(function() {
                ConfirmDelete();
            })
            //修改
        $('#modifyDetail').click(function() {
            window.location.href = './alert.html?School_name=' + datailSchool
        })
    }
}