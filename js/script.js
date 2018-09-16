function reloadTabs() {
    reloadTables();
    reloadGraphs();
}
$(function () {
    $(document).on('click', '.infoButton', function(){
        $(this).parent().siblings('.innerContent').slideToggle();
        $(this).children('i').toggleClass("fa-angle-up fa-angle-down");
        return false;
    }); 
});