$(document).ready(function(){
  //get controller to give json of projects
  //take json objects - insert into dom
  // when sort - take projects from all projects, sort, remove all projects and add all sorted projects

  $(".sort_field").on("click", function(event){
    event.preventDefault();
    var sort_id = $(this).attr("id")
    var allProjects = $(".project_box")
    //for each project, make a project object


    debugger;


    // var data = $(this).serialize();
    // var request = $.ajax("/votes", {"method": "post", data: data})
    // request.done(function(response) {
    //   $(".score").html(response)
    // });
  });
});
