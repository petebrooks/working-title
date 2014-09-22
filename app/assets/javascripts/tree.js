$(document).ready(function(){
	var treeData = $('.tree_data').data('data');
	var height = $(window).height();
	var width = $(window).width() * 0.5;

	var nodeColor = "blue";
	var highlightColor = "red";

	var tree = d3.layout.tree()
	.sort(null)
	.size([height, width])
  .separation(function(a, b){
    return (a.parent == b.parent ? 0.3 : 0.6);
  })
  .children(function(d) {
    return (!d.children || d.children.length === 0) ? null : d.children;
  });

  root = treeData;

  var text_div = $("div.tree_text");
  var tree_div = $("div.tree");

  var svg = d3.select("body div.tree")
  .append("svg")
  .attr('width', width)
  .attr('height', height)
  .append("g")
  .attr('width', width)
  .attr('height', height);

  // tree_div.css({
  //   "transform-origin": 'center center',
  //   "transform": 'rotate(90deg)'
  // });

  // tree_div.one("click", function() {
  //   $({deg: 90}).animate({deg: 0}, {
  //     duration: 1000,
  //     step: function(now) {
  //           // in the step-callback (that is fired each step of the animation),
  //           // you can use the `now` paramter which contains the current
  //           // animation-position (`0` up to `angle`)
  //           tree_div.css({
  //             transform: 'rotate(' + now + 'deg)'
  //           });
  //         }
  //       });
  //   root.children.forEach(collapse);
  //   update(root);
  // });


function collapse(d) {
 if (d.children) {
  d._children = d.children;
  d._children.forEach(collapse);
  d.children = null;
}
}

  root.children.forEach(collapse);
  update(root);

  function update(source) {
  	var nodes = tree.nodes(root);
  	var links = tree.links(nodes);

  	var voteRange = d3.extent(nodes.map(function(d) {
  		return d.voteScore;
  	}));

  	var voteScale = d3.scale.linear()
    .domain(voteRange)
    .range([4, 12]);

    nodes.forEach(function(d){
      d.r = voteScale(d.voteScore);
      d.y = d.depth * 30 + 30; 
      d.x = d.x * 0.5;
    });

    var node = svg.selectAll('g.node')
    .data(nodes);

    var nodeEnter = node.enter()
    .append('g')
    .attr('class', 'node')
    .attr('id', function(d) { return d.nodeid; })

    .on('mouseover', function(d) {
      d3.select(this).select("circle").attr("r", function(d){
        return d.r * 1.3;
      })
    })
    .on('mouseout', function(d) {
      d3.select(this).select("circle").attr("r", function(d){
        return d.r;
      })    
    })
    .on("click", function() { this.attr('fill', 'lightgray');})
    .on("click", click)
    .on("dblclick", (function(d) {
      console.log("dblclick`");
      window.location = "/projects/" + d.project_id +"/versions/" + d.id;
    })
    );

    nodeEnter.append('circle')
    .style("fill", "white")
    .style("stroke", "black")
    .attr("r", function(d) { return d.r });

    d3.select('.node circle').style("fill", "red");

    node.transition()
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";});

    node.exit().remove();

    var link = svg.selectAll("path.link")
    .data(links, function(d) { return d.target.id });

    link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("stroke", "black")
    .attr('fill', 'none')
    .attr('d', elbow);

    link.transition()
    .attr('d', elbow);

    link.exit().remove();

    nodes.forEach(function(d){
     d.x0 = d.x;
     d.y0 = d.y;
   })
  }

  function elbow(d, i) {
    return "M" + d.source.x + "," + d.source.y
    + "L" + d.source.x + "," + d.target.y 
    + "L" + d.target.x + "," + d.target.y
  }

  function click(d) {
    text_div.empty()
    d.text.forEach(function(line){
      text_div.append("<span class='clearfix'>" + line + "</span>");
    });
    text_div.append('<span class="clearfix" id="current">' + d.contribution + "</span>");
    console.log(d.parent);
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    svg.selectAll('g.node circle').style("fill", function(d){
      if(d.children) {
        return "lightgray";
      } else {
        return "white";
      };
    });
    update(d);
    // debugger;
  };

});
