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

  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("body div.tree")
    .append("svg")
    .attr('width', width)
    .attr('height', height)
    .append("g")
    .attr('width', width)
    .attr('height', height);

  var i = 0;
  root = treeData;

  update(root);

  function update(source) {

    var nodes = tree.nodes(root);
    var links = tree.links(nodes);

    nodes.forEach(function(d){
      d.y = d.depth * 40 + 10;
    });

    var node = svg.selectAll('g.node')
      .data(nodes, function(d) {
        return d.nodeid || (d.nodeid = i++);
      });

    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('id', function(d) { return d.nodeid; })
      .attr('transform', function(d) {
        return 'translate(' + d.y + ',' + d.x + ')';
      })
      .on('mouseover', function(d) {
        d3.select(this).insert("text")
        .text(function(d) { return d.contribution})
        .attr("flood-color", "white");
      })
      .on('mouseout', function(d) {
        d3.select(this).select("text").remove();
      });

    nodeEnter.append('circle')
      // .attr('cx', function(d){ return d.y; })
      // .attr('cy', function(d){ return d.x; })
      .attr("r", 10)
      .style("fill", nodeColor);


    // nodeEnter.append("text")
    //   .attr("x", function(d) {
    //     return d.children || d._children ? -13 : 13;
    //   })
    //   .attr("dy", "0.35em")
    //   .attr("text-anchor", function(d) {
    //     return d.children || d._children ? "end" : "start";
    //   })
    //   .text(function(d) { return d.contribution; })
    //   .style("fill-opacity", 1);

    var link = svg.selectAll("line.link")
      .data(links, function(d) { return d.target.id });

    link.enter().insert("line", "g")
      .attr("class", "link")
      // .attr("d", diagonal);
      .attr("y1", function(d) { return d.source.x })
      .attr("x1", function(d) { return d.source.y })
      .attr("y2", function(d) { return d.target.x })
      .attr("x2", function(d) { return d.target.y })
      .attr("stroke", "black");
  }

});
