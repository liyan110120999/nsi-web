//搜索功能
$('#SearchButton').click(function () {
    var searchVal = $('#search').val()
    window.location.href='../company/searchCompany.html?whereFrom='+searchVal
})
$('#search').keydown(function (e) {
    var curKey = e.which
    if( curKey == 13){
        var searchVal = $('#search').val()
        window.location.href='../company/searchCompany.html?whereFrom='+searchVal
    }
})
