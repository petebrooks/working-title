$(document).ready(function(){

	var treeData = $('.tree_data').data('data');
	var height = 500;
	var width = 300;

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

  var text_div = $("div.text");

  var svg = d3.select("body div.tree")
  .append("svg")
  .attr('width', width)
  .attr('height', height)
  .append("g")
  .attr('width', width)
  .attr('height', height);

  root = treeData;

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

    // var text = text_div.selectAll('.node_text')
    //   .data(nodes);

    // text.enter()
    //   .append('g')
    //   .append('text')
    //   .text(function(d) { return d.contribution} )
    //   .attr("x", function(d) { d.x });

    // text.exit().remove();

    // text.enter()
    //   .append("text")
    //   .attr('class', 'node_text')
    //   .text(function(d) {d.contribution})
    //   .attr('y', function(d) {d.y});

    // text.transition()
    //   .text(function(d) {d.contribution});

    var nodeEnter = node.enter()
      .append('g')
      .attr('class', 'node')
      .attr('id', function(d) { return d.nodeid; })

	  	.on('mouseover', function(d) {
	  		// d3.select(this).insert("text")
        // var contribution = 
	  		// text_div.append("svg:text").attr('y', d.y)
     //    .text(d.contribution);
	  	})
	  	.on('mouseout', function(d) {
	  		d3.select(this).select("text").remove();
	  	})
	  	.on("click", click);

  	nodeEnter.append('circle')
      .style("fill", "white")
      .style("stroke", "black")
      .attr("r", function(d) { return d.r });

      d3.select('.node circle').style("fill", "red");

      nodeUpdate = node.transition()
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";})

      nodeUpdate;

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
      text_div.append("<p>" + line + "</p>");
    });
    text_div.append('<p>' + d.contribution + "</p>");
    console.log(d.text.join("\n"));
  	if (d.children) {
  		d._children = d.children;
  		d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    	d3.select(this).select("circle").style("fill", "lightgray");
    }
  	update(d);
    // debugger;
  };

});
