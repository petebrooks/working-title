$(document).ready(function(){
  $(".new_vote").on("submit", function(event){
    event.preventDefault();
    var data = $(this).serialize();
    var request = $.ajax("/votes", {"method": "post", data: data})
    request.done(function(response) {
      $(".score").html(response)
    });
  });
});
