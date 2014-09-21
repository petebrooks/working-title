$(document).ready(function() {
  $('ul.tabs li').click(function(){
    var currentTab = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+currentTab).addClass('current');
  });
});

