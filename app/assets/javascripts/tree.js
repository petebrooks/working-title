$(document).ready(function(){

  var treeData = $('.tree_data').data('data');
  var height = 500;
  var width = 1000;

  var nodeColor = "blue";
  var highlightColor = "red";

  var tree = d3.layout.force()
    .size([height, width])
    // .children(function(d) {
    //   return (!d.children || d.children.length === 0) ? null : d.children;
    // })
    .on("tick", tick);

  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("body div.tree")
    .append("svg")
    .attr('width', width)
    .attr('height', height)
    .append("g")
    .attr('width', width)
    .attr('height', height);
    // .call(d3.behavior.zoom().scaleExtent([1, 8]).on("click", zoom));

  function zoom() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  };

  var node = svg.selectAll('.node');
  var link = svg.selectAll('.link');

  var i = 0;
  var root = treeData;

  update();

  function update() {
    var nodes = d3.layout.tree().nodes(root);
    var links = d3.layout.tree().links(nodes);

    tree
      .nodes(nodes)
      .links(links)
      .start();

    node = node.data(nodes);
    link = link.data(links);

    var voteRange = d3.extent(nodes.map(function(d) {
      return d.voteScore;
    }));

    var voteScale = d3.scale.linear()
      .domain(voteRange)
      .range([2, 18]);

    node.enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + 50 + ',' + d.x + ');' })
      .append('circle')
      .attr("r", function(d) { return voteScale(d.voteScore) })
      .style("fill", nodeColor);

    link.enter()
      .insert("line", "g")
      .attr("class", "link")
      .attr("x1", function(d) { return d.source.y })
      .attr("y1", function(d) { return d.source.x })
      .attr("x2", function(d) { return d.target.y })
      .attr("y2", function(d) { return d.target.x })
      .attr("stroke", "black");
      debugger;
  };

  function tick() {
    link.attr("x1", function(d) { return d.source.y })
        .attr("y1", function(d) { return d.source.x })
        .attr("x2", function(d) { return d.target.y })
        .attr("y2", function(d) { return d.target.x });
    node.attr("transform", function(d) {
      return "translate(" + 50, "," + d.x + ");"
    });
  };

});
