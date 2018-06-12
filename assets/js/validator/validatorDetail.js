
$(function() {

    // 公司信息验证
    $("#companyInfo_tab1").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: { /*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 验证
        fields: {
            // 公司名称
            Name: {
                validators: {
                    notEmpty: {
                        message: "公司名不能为空"
                    }
                }
            },
            //LOGO图片地址
            Logo: {
                validators: {
                    notEmpty: {
                        message: "请上传LOGO图片"
                    }
                }
            },
            // 公司简介
            Brief_intro: {
                validators: {
                    notEmpty: {
                        message: "企业简介不能为空"
                    }
                }
            },
            // 一句话简介
            Intro: {
                validators: {
                    notEmpty: {
                        message: "请填写一句话简介"
                    }
                }
            },
            // 公司地点
            Site: {
                validators: {
                    notEmpty: {
                        message: "公司地点不能为空"
                    }
                }
            },
            // 省份地点
            selProvince: {
                validators: {
                    notEmpty: {
                        message: "公司地点不能为空"
                    }
                }
            },
            // 省份地点
            selCity: {
                validators: {
                    notEmpty: {
                        message: "公司地点不能为空"
                    }
                }
            },
            Areas03:{
                validators: {
                    notEmpty: {
                        message: "公司地点不能为空"
                    }
                }
            },
            // 联系人姓名
            Link_name: {
                validators: {
                    notEmpty: {
                        message: "联系人姓名不能为空"
                    }
                }
            },
            // 联系人电话
            Link_phone: {
                validators: {
                    notEmpty: {
                        message: "联系人电话不能为空"
                    },
                    regexp: {
                        regexp: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                        message: '电话号码格式不正确'
                    }
                }
            },
            // 联系人邮箱
            Link_mail: {
                validators: {
                    notEmpty: {
                        message: "邮箱不能为空"
                    },
                    emailAddress: {
                        message: '邮箱格式不正确'
                    }

                }
            }
        }
    });

    // 发布职位验证
    $("#jobManage_tab2").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: { /*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 验证
        fields: {
            // 职位
            Position: {
                validators: {
                    notEmpty: {
                        message: "职位不能为空"
                    }
                }
            },
            //招聘人数
            Headcount: {
                validators: {
                    notEmpty: {
                        message: "招聘人数不能为空"
                    }
                },
                regexp: {
                    regexp: /^\d*$/,
                    message: '必须为正整数'
                }
            },
            // 省份地点1
            selProvince1: {
                validators: {
                    notEmpty: {
                        message: "工作城市不能为空"
                    }
                }
            },
            // 省份地点2
            selCity1: {
                validators: {
                    notEmpty: {
                        message: "工作城市不能为空"
                    }
                }
            },
            // 工作地点
            Areas03: {
                validators: {
                    notEmpty: {
                        message: "工作地点不能为空"
                    }
                }
            },
            // 职位描述
            Job_description: {
                validators: {
                    notEmpty: {
                        message: "职位描述不能为空"
                    }
                }
            },
            // 职位要求
            Job_requirement: {
                validators: {
                    notEmpty: {
                        message: "职位要求不能为空"
                    }
                }
            },

            // 服务待遇
            Job_weal: {
                validators: {
                    notEmpty: {
                        message: "福利待遇不能为空"
                    }
                }
            }
        }
    });

    var companyId = null;

    //添加公司
    $("#next").click(function () {//非submit按钮点击后进行验证，如果是submit则无需此句直接验证
        if($('#Logo').val() ===''){
            alert('请先上传图片')
        }else if($('#selProvince').val() ==='' || $('#selCity').val() ===''){
            alert('请完善所在城市信息')
        }else {
            $("#companyInfo_tab1").bootstrapValidator('validate');//提交验证
            if ($("#companyInfo_tab1").data('bootstrapValidator').isValid()) {//获取验证结果，如果成功，执行下面代码
                //添加公司信息
                var insertData = {
                    Name: $("#Name").val(),
                    Logo: $("#Logo").val(),
                    Brief_intro: $("#Brief_intro").val(),
                    Intro:$("#Intro").val(),
                    Province:$('#selProvince').val(),
                    City: $("#selCity").val(),
                    Site: $("#selCity").val(),
                    Link_name: $("#Link_name").val(),
                    Link_phone: $("#Link_phone").val(),
                    Link_mail: $("#Link_mail").val(),
                    Load_people:$.cookie('username')
                }
                $.ajax({
                    type: 'post',
                    url: 'http://' + changeUrl.address + '/Recuitment_api?whereFrom=insert',
                    data: insertData,
                    success: function(msg) {
                        console.log(msg)
                        companyId = msg.Id
                        alert('公司信息上传成功')

                        $('#tab-companyInfo').removeClass('active in')
                        $('#tab-JobManger').removeClass('hide').addClass('active in')

                        $('#companyInfo_tab1').removeClass('active')
                        $('#addNewJob').trigger('click')
                        $(window).scrollTop(350)
                    }
                })

            }else {
                alert('录入数据不符合格式')
            }
        }
    });

     //新增职位
       $('#saveNewJob').on('click',function () {

          $("#jobManage_tab2").bootstrapValidator('validate');//提交验证
           if( ($('#salary02').val() =='' || $('#salary01').val() =='') && $('#salary input:radio:checked').val()==='区间'){
               alert('请选择薪资')
           }else if($("#jobManage_tab2").data('bootstrapValidator').isValid()){
               var salary01 =  $('#salary input:radio:checked').val()==='区间' ? $('#salary01').val() : '面议'
               var jobInfo={
                   recuitment_id:companyId,
                   type:$('#SelectType').val(),
                   Position:$('#Position').val(),
                   Seniority:$('#Seniority input:radio:checked').val(),
                   Headcount:$('#Headcount').val(),
                   Areas:$('#selProvince1').val(),
                   Areas02:$('#selCity1').val(),
                   Areas03:$('#Areas03').val(),
                   Job_description:autoChangeStyle($('#Job_description').val()),
                   Job_requirement:autoChangeStyle($('#Job_requirement').val()),
                   Job_weal:autoChangeStyle($('#Job_weal').val()),
                   salary01:salary01,
                   salary02:$('#salary02').val(),
                   recuitment_name:$('#Name').val(),
                   Load_people:$.cookie('username')
               }
               $.ajax({
                   type:'post',
                   url:'http://' + changeUrl.address + '/Recuitment_api?whereFrom=job_insert',
                   data:jobInfo,
                   success:function (msg) {
                       console.log(msg)
                       if(msg.code ==1){
                           alert('添加成功，可继续添加职位')
                           $('#JobForm').addClass('hide')
                           $('#addNewJob').removeClass('hide')
                       }
                   },
                   error:function () {
                       alert('服务器繁忙，请稍后再试')
                   }
               })
           }

       })

});

function autoChangeStyle(obj) {
    var reg = new RegExp("\n", "g")
    obj = obj.replace(reg, "</p><p>");
    return obj = "<p>" + obj + "</p>";
}

//显示新填职位的框
$('#addNewJob').on('click',function () {
    $(this).addClass('hide')
    $('#JobForm').removeClass('hide')
    $('#jobManage_tab2').addClass('active')
    return false;
})

