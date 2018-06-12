		/**去掉字符串前后所有空格*/
        function trim(str){
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }

        setTimeout(function(){
            // 微信配置
        var href = window.location.href;
        var title = '新学说';
        var desc = '新学说';
        var imgUrl = '新学说';
        // 官网咨询页面
        var page1 = $(".xqy_top");
        // 学校库分享
        var page2 = $("#School_name");
        // 机构库分享
        var page3 = $("#Service");
        // 人才库分享
        var page4 = $("#talentShare");
        // 招聘单位分享
        var pageRecruit = $('#recruitShare')
        // 项目库分享
        var page5 = $(".SubjectIntroduction");

  // 官网咨询页面
        if(page1.length >0){
            title = $(".xqy_top span").html();
            console.log(title);


            var str = $(".xqy_bot  img").attr("src");
            var patt1 = new RegExp("http")
            var result = patt1.test(str)


            if(result){
                imgUrl =$(".xqy_bot  img").attr("src");
            }else{
                imgUrl ='http://www.xinxueshuo.cn'+$(".xqy_bot  img").attr("src");
            }           
            desc = trim($(".xqy_bot p").eq(2).text());
            console.log("文章摘要："+desc);  

            // 学校库分享
        }else if(page2.length >0){
            title = $("#School_name").text()+'  新学说四库全书-学校库';
            imgUrl = $("#School_logo").attr("src");
            if(imgUrl == '../assets/img/schoolNoPic.png') imgUrl = 'http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png';
            desc = '成立于'+$("#Founded_time").html()+'年  学校性质：'+$("#School_properties").html()+'  课程：'+$("#Course").html()+'   地址：'+$("#Areas").html()+$("#Areas02").html()+$("#Areas03").html();

        // 机构库分享
        }else if(page3.length >0){

            title = $(".instutionName").html()+'  新学说四库全书-机构库';
            imgUrl = $("#institutionLogo").attr("src");
            if(imgUrl == '../assets/img/schoolNoPic.png') imgUrl = 'http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png';
            desc = '类型：'+$("#companyType").html()+'  标签：'+$("#instutionLable").html()+'   机构简介：'+$("#Service").html();

        // 人才库分享
        }else if(page4.length >0){
            title = '新学说人才推荐:' +$('#name').text()
            imgUrl = $("#userLogo").attr("src");
            if(imgUrl == '../assets/img/userLogo.jpg') imgUrl = 'http://data.xinxueshuo.cn/nsi/assets/img/userLogo.jpg';
             desc = '教育背景：'+$('#educationalBackground').text()
        // 招聘单位分享
        }else if(pageRecruit.length >0){
            title =  '新学说招聘单位推荐:' +$('#shareName').text()
            imgUrl = 'http://data.xinxueshuo.cn/nsi'+$("#shareImg").attr("src").substr(2);
            // if(imgUrl == '../assets/img/userLogo.jpg') imgUrl = 'http://data.xinxueshuo.cn/nsi/assets/img/userLogo.jpg';
            desc = '简介：'+$('#shareIntro').text()

            // 项目库分享
        }else if(page5.length >0){

            title = $(".projectName").html()+'  新学说四库全书-项目库';
            imgUrl = 'http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png';
            desc = '项目简介：'+$(".SubjectIntroduction").html();

        }
        
        console.log(href)
        $.ajax({
            type : "get",
            async:true,
            traditional :true,
            data: {
                URL:href
            },//提交的参数
            url:'http://data.xinxueshuo.cn/nsi-0.9/Admin_api?whereFrom=WeChatShare',
            dataType : "jsonp",//数据类型为jsonp  
            jsonp: "Callback",//服务端用于接收callback调用的function名的参数  
            success : function(msg){
                // console.log(msg)
                wx.config({

                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。

                    appId: msg.appId, // 必填，公众号的唯一标识

                    timestamp:msg.timestamp , // 必填，生成签名的时间戳

                    nonceStr: msg.nonceStr, // 必填，生成签名的随机串

                    signature: msg.signature,// 必填，签名，见附录1

                    jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2

                });

                wx.ready(function(){

                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                                        // 分享给朋友
                        wx.onMenuShareAppMessage({

                            title: title, // 分享标题

                            desc: desc, // 分享描述

                            link: href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

                            imgUrl: imgUrl, // 分享图标

                            type: '', // 分享类型,music、video或link，不填默认为link

                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

                            success: function () {
                                // 用户确认分享后执行的回调函数
                                
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        
                                                // 分享到朋友圈
                        wx.onMenuShareTimeline({

                            title: title, // 分享标题

                            link: href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

                            imgUrl: imgUrl, // 分享图标

                            success: function () {

                                // 用户确认分享后执行的回调函数

                            },

                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        

                });
                // 处理失败验证
                wx.error(function(res){
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });

                wx.checkJsApi({

                    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,

                    success: function (res) {
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    }
                });


            },
            error:function(){
                alert('发生错误，请求数据失败！');
            }
        });
        },1000)
        