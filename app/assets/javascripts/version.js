$(document).ready(function() {

  var branch_text = $("#branch_text");
  var children = $("div#children");

  // children.slideUp();

  $("i#expand_branch").click(function(){
    console.log("click");
    $(this).hide();
    $("i#collapse_branch").show();
    children.slideDown();
  });

  $("i#collapse_branch").click(function(){
    $(this).hide();
    $("i#expand_branch").show();
    children.slideUp();
  });

  branch_text.on("click", "#contribution", function(){
    $("input#add_contribution").remove();
    $(this).after().after('<input id="add_contribution" placeholder="Add new text here"> </input>');
  });

  branch_text.on("keyup", "input#add_contribution", function(e){
    var contribution = this.value;
    var key = e.which;
    var version_id = branch_text.attr("versionid");
    var project_id = branch_text.attr("projectid");

    if(key == 13) {
      $.post("/projects/" + project_id + "/versions", {
        "version[contribution]": contribution,
        "version[previous_version_id]": version_id,
        "version[insertion_index]": -1
      }, function(d){
        console.log(d.id);
        window.location.href = "/projects/" + project_id + "/versions/" + d.id;
      }, "json");
    };

  });

  $("div #contribution").each(function(){
    $(this).qtip({
      content: {
        text: $(this).next('span')
      },
      overwrite: false,
      position: {
        my: 'left center',
        at: 'right center',
        target: $(this)
      },
      show: {
        event: 'mouseenter',
        solo: true
      },
      hide: {
        event: 'click'
      },
      style: {
        classes: 'qtip-blue',
      }
    });
  });

});
