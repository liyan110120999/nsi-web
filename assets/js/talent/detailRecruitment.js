// 解析url
$(function(){
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
    var args = getQueryStringArgs(),
        Id = decodeURIComponent(args['ID'])

    function judgeSalary(salary01,salary02){
        return salary01==="面议"?"面议":salary01+'K-'+salary02+'K'
    }

    $.ajax({
        type: "get",
        dataType: "json",
        data: { recuitment_job_Id: Id },
        url: 'http://' + changeUrl.address + '/Recuitment_api?whereFrom=job_detail',
        success: function(msg) {
            // console.log(msg)
            $("#companyName").text(msg.data01[0].recuitment_name)
            $("#position").text(msg.data01[0].Position)
            $("#salary").text(judgeSalary(msg.data01[0].salary01,msg.data01[0].salary02))
            $("#area").text(msg.data01[0].Areas)
            $("#hasJobYear").text(msg.data01[0].Seniority)
            $("#Headcount").text(msg.data01[0].Headcount)
            $("#type").text(msg.data01[0].type)
            $("#time").text(msg.data01[0].Load_time)
            $("#companyLogo").attr("src",msg.data02[0].Logo)
            $("#companyNameDesc").html(msg.data01[0].recuitment_name+'<span class="addV" title="新学说认证"></span>')
            $("#positionDesc").text(msg.data01[0].Position)
            $("#Job_description").html(msg.data01[0].Job_description)
            $("#Job_requirement").html(msg.data01[0].Job_requirement)
            $("#Job_weal").html(msg.data01[0].Job_weal)
            $("#address").text(msg.data01[0].Areas+' - '+msg.data01[0].Areas02+' - '+msg.data01[0].Areas03)
            $("#linkName").text(msg.data02[0].Link_name)
            $("#linkTel").text(msg.data02[0].Link_phone)
            $("#LinkMail").text(msg.data02[0].Link_mail)
        }
    })
})
