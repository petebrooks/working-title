$(document).ready(function(){
  //get controller to give json of projects

  $("#sort_field").on("click", function(event){
    event.preventDefault();

    // var data = $(this).serialize();
    // var request = $.ajax("/votes", {"method": "post", data: data})
    // request.done(function(response) {
    //   $(".score").html(response)
    // });
  });
});
