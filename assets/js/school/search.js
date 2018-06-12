
//高级搜索框内容显示
$(function(){
    $(':input').labelauty();
    $('#advanceSearch,#closeAdvanceSearch').click(function () {
        $('#AdvancedSearchID').toggle(500)
    })
});


//查看更多
$('.clickForMore').click(function () {
    $('.moreArea').css('display','block')
    $('.clickForSlidedown').css('display','block')
    $('.baseArea').css('display','none')
    $(this).css('display','none')
    $('#AdvanceResetID').trigger('click')
})

$('.clickForSlidedown').click(function () {
    $('.moreArea').css('display','none')
    $('.clickForMore').css('display','block')
    $('.baseArea').css('display','block')
    $(this).css('display','none')
    $('#AdvanceResetID').trigger('click')
})


//年份滑块选择
$('.form_datetime').datetimepicker({
    //language:  'fr',
    format: "yyyy",
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 4,
    minView: 4,
    forceParse: 0,
    showMeridian: 1
});







