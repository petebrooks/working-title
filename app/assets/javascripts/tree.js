$(document).ready(function(){

  var treeData = $('.tree_data').data('data');
  var height = 1000;
  var width = 1000;

  var nodeColor = "blue";
  var highlightColor = "red";
  var originalColor = "red";

  var tree = d3.layout.force()
    .size([height, width])
    .charge(-400)
    .linkDistance(50)
    .on("tick", tick);

  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("body div.tree")
    .append("svg")
    .attr('width', width - 50)
    .attr('height', height - 50)
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

    nodes.forEach(function(d) {
      d.y = d.depth * 120;
    });
    debugger;

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
      .append('circle')
      .attr('class', 'node')
      .attr('id', function(d) { return d.nodeid; })
      // .attr('cx', function(d) { return d.y; })
      // .attr('cy', function(d) { return d.x; })
      .attr("r", function(d) { return voteScale(d.voteScore) })
      .style("fill", nodeColor);

    d3.select(".node").style("fill", originalColor);

    link.enter()
      .insert("line", ".node")
      .attr("class", "link")
      // .attr("x1", function(d) { return d.source.y })
      // .attr("y1", function(d) { return d.source.x })
      // .attr("x2", function(d) { return d.target.y })
      // .attr("y2", function(d) { return d.target.x })
      .attr("stroke", "black");
  };

  function tick() {
    link.attr("x1", function(d) { return d.source.y })
        .attr("y1", function(d) { return d.source.x })
        .attr("x2", function(d) { return d.target.y })
        .attr("y2", function(d) { return d.target.x });
    node.attr('cx', function(d) { return d.y; })
        .attr('cy', function(d) { return d.x; });
  };
});
