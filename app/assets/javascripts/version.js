$(document).ready(function() {

  var branch_div = $("#branch_text");
  var children = $("div#children");

  children.slideUp();

  $("i#expand_branch").click(function(){
    $(this).hide();
    $("i#collapse_branch").show();
    children.slideDown();
  });

  $("i#collapse_branch").click(function(){
    $(this).hide();
    $("i#expand_branch").show();
    children.slideUp();
  });

  branch_div.on("click", "#contribution", function(){
    $("input#add_contribution").remove();
    $(this).after().after('<input id="add_contribution" placeholder="Add new text here"> </input>');
  });

  branch_div.on("keyup", "input#add_contribution", function(e){
    var contribution = this.value;
    var key = e.which;
    var version_id = branch_div.attr("versionid");
    var project_id = branch_div.attr("projectid");

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
        my: 'right center',
        at: 'left center',
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
