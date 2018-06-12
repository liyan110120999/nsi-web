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


//过滤函数（如果为零，自动补空）
function zeroToEmpty(str) {
    // var strFilter = null;
    // return strFilter = (str == 0) ? ' ' : str;
    return str == null ? "" : str
}

function closeChangeStyle(obj) {
    if (obj) {
        var reg = new RegExp('</p><p>', 'g')
        var newObj = obj.replace(reg, '\n')
        return newObj.slice(3, newObj.length - 4)
    } else {
        return obj
    }
}


var args = getQueryStringArgs()
    // console.log(args.ID)
$.ajax({
    type: "get",
    data: {
        "talentId": args.ID
    },
    url: 'http://' + changeUrl.address + '/manager/talent/detail.do',
    success: function(msg) {
        console.log(msg);
        $("#name").text(zeroToEmpty(msg.data.name))
        $("#major").text(zeroToEmpty(msg.data.major))
        $("#education").text(zeroToEmpty(msg.data.education))
        $("#workNow").text(zeroToEmpty(msg.data.workPlace))
        $("#workYear").text(zeroToEmpty(msg.data.workYear))
        $("#expectWorkPosition").text(zeroToEmpty(msg.data.expectWorkPosition))
        $("#expectWorkPlace").text(zeroToEmpty(msg.data.expectWorkPlace))
        $("#expectSalary").text(zeroToEmpty(msg.data.expectSalary))


        $("#workExperience").text(closeChangeStyle(zeroToEmpty(msg.data.workExperience)))
        $("#educationalBackground").text(closeChangeStyle(zeroToEmpty(msg.data.educationBackground)))
        $("#trainingBackground").text(closeChangeStyle(zeroToEmpty(msg.data.trainingBackground)))
        $("#other").text(closeChangeStyle(zeroToEmpty(msg.data.other)))
    }
})