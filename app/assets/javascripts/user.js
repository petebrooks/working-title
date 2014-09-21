// $(document).ready(function () {
//   $("li").on("click", function(event){
//     $("li").removeClass("active");
//     $(this).addClass("active");
//   });
// });

$(document).ready(function() {
  $('ul.tabs li').click(function(){
    var currentTab = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+currentTab).addClass('current');
  });
});
