$(document).ready(function(){
  $(".new_vote").on("submit", function(event){
    event.preventDefault();
    data = $(this).serialize();
    request = $.ajax("/votes", {"method": "post", data: data})
    request.done(function(response) {
      $(".score").html(response)
    });
  });
});
