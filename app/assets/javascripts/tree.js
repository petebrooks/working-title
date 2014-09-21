$(document).ready(function(){

	var treeData = $('.tree_data').data('data');
	var height = 500;
	var width = 1000;

	var nodeColor = "blue";
	var highlightColor = "red";

	var tree = d3.layout.tree()
	.sort(null)
	.size([height, width])
	.children(function(d) {
		return (!d.children || d.children.length === 0) ? null : d.children;
	});

  // var diagonal = d3.svg.diagonal()
  // .projection(function(d) { return [d.x, d.y]; });

  var svg = d3.select("body div.tree")
  .append("svg")
  .attr('width', width)
  .attr('height', height)
  .attr('preserveAspectRatio', 'xMidyMid meet')
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
	  	.range([2, 18]);

  	nodes.forEach(function(d){ d.y = d.depth * 40 + 10; });

  	var node = svg.selectAll('g.node')
	  	.data(nodes);


  	var nodeEnter = node.enter()
	  	.append('g')
	  	.attr('class', 'node')
	  	.attr('id', function(d) { return d.nodeid; })
	  	.on('mouseover', function(d) {
	  		d3.select(this).insert("text")
	  		.text(function(d) { return d.contribution})
	  		.attr("flood-color", "white");
	  	})
	  	.on('mouseout', function(d) {
	  		d3.select(this).select("text").remove();
	  	})
	  	.on("click", click);

  	nodeEnter.append('circle')
      .style("fill", nodeColor)
      .attr("r", function(d) { return voteScale(d.voteScore) });

      d3.select('.node circle').style("fill", "red");

      nodeUpdate = node.transition()
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";})

      nodeUpdate;

      node.exit().remove();

      var link = svg.selectAll("line.link")
	      .data(links, function(d) { return d.target.id });

      link.enter().insert("line", "g")
	      .attr("class", "link")
	      .attr("stroke", "black")
	      .attr("x1", function(d) { return d.source.x0 })
	      .attr("y1", function(d) { return d.source.y0 })
	      .attr("x2", function(d) { return d.source.x0 })
	      .attr("y2", function(d) { return d.source.y0 });

      link.transition()
	      .attr("x1", function(d) { return d.source.x })
	      .attr("y1", function(d) { return d.source.y })
	      .attr("x2", function(d) { return d.target.x })
	      .attr("y2", function(d) { return d.target.y })

      link.exit().remove();

      nodes.forEach(function(d){
      	d.x0 = d.x;
      	d.y0 = d.y;
      })
  }

  function click(d) {
  	if (d.children) {
  		d._children = d.children;
  		d.children = null;
  	} else {
  		d.children = d._children
  		d._children = null;
  	}
  	console.log(d);
  	update(d);
  };

});
