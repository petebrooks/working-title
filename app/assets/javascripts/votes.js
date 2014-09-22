$(document).ready(function(){
  $(".new_vote").on("submit", function(event){
    event.preventDefault();
    var data = $(this).serialize();
    var request = $.ajax("/votes", {"method": "post", data: data})
    request.done(function(response) {
    	$(".new_vote").css("display", "none");
    	$('.score').addClass('padded');
      $(".score").html(response)
    });
  });
});
