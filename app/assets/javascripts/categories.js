$(document).ready(function(){
  //get controller to give json of projects
  //take json objects - insert into dom
  // when sort - take projects from all projects, sort, remove all projects and add all sorted projects

  $(".sort_field").on("click", function(event){
    event.preventDefault();
    var sort_id = $(this).attr("id")
    var allProjects = $(".project_box")

    allProjects.sort(function(a,b) {
      an = $(a).find("." + sort_id).text(),
      bn = $(b).find("." + sort_id).text();

      if(an < bn) { return 1; }
      if(an > bn) { return -1; }
      return 0;
      debugger;
    });

    allProjects.detach().appendTo(".all_category_projects")
    //for each project, make a project object
    //put them all in an array
    //sort the array
    //put them back as html
    //put them back on the DOMkillall

    // debugger;


    // var data = $(this).serialize();
    // var request = $.ajax("/votes", {"method": "post", data: data})
    // request.done(function(response) {
    //   $(".score").html(response)
    // });
  });
});
