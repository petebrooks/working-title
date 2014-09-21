$(document).ready(function(){

  var treeData = $('.tree_data').data('data');
  var height = 500;
  var width = 1000;

  var nodeColor = "blue";
  var highlightColor = "red";

  var tree = d3.layout.cluster()
    .sort(null)
    .size([height, width])
    .children(function(d) {
      return (!d.children || d.children.length === 0) ? null : d.children;
    });

  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });

  var svg = d3.select("body div.tree")
    .append("svg")
    .attr('width', width)
    .attr('height', height)
    .append("g")
    .attr('width', width)
    .attr('height', height);
    // .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom));

  function zoom() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }

  var node = svg.selectAll('.node');
  var link = svg.selectAll('.link');

  var i = 0;
  var root = treeData;

  update();

  function update() {
    var nodes = tree.nodes(root);
    var links = tree.links(nodes);

    var voteRange = d3.extent(nodes.map(function(d) {
      return d.voteScore;
    }));

    var voteScale = d3.scale.linear()
      .domain(voteRange)
      .range([2, 18]);

    nodes.forEach(function(d){
      // d.x = d.depth * 40 + 10;
    });

    var nodeEnter = node.data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('id', function(d) { return d.nodeid; })
      .attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
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
      .attr("r", function(d) { return voteScale(d.voteScore)})
      .style("fill", nodeColor);

    link.data(links)
      .enter().insert("line", "g")
      .attr("class", "link")
      .attr("y1", function(d) { return d.source.y })
      .attr("x1", function(d) { return d.source.x })
      .attr("y2", function(d) { return d.target.y })
      .attr("x2", function(d) { return d.target.x })
      .attr("stroke", "black");
  };

  function tick() {

  };

});
