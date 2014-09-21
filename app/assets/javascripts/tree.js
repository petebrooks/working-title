$(document).ready(function(){

  var treeData = $('.tree_data').data('data');
  var height = 1000;
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
    .projection(function(d) { return [d.x, d.y]; });

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

    var nodes = tree.nodes(root);

    var voteRange = d3.extent(nodes.map(function(d) {
      return d.voteScore;
    }));

    var voteScale = d3.scale.linear()
      .domain(voteRange)
      .range([2, 18]);


  // var zoom = d3.behavior.zoom()
  //   // .x(function(d) {return d.x})
  //   // .y(function(d) {return d.y})
  //   .center(function(d) { return [d.y, d.x] })
  //   .scaleExtent([1, 10])
  //   .on("zoom", runZoom);

  // function runZoom() {
  //   svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  // }
  root.children.forEach(collapse);
  update(root);

  function update(source) {
     var nodes = tree.nodes(root);
    var links = tree.links(nodes);

    nodes.forEach(function(d){
      d.y = d.depth * 40 + 10;
    });

    var node = svg.selectAll('g.node')
      .data(nodes);

    var link = svg.selectAll("line.link")
      .data(links, function(d) { return d.target.id });

    var nodeEnter = node.enter()
      .append('g')
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
      // .attr('cx', function(d){ return d.y; })
      // .attr('cy', function(d){ return d.x; })
      .attr("r", function(d) { return voteScale(d.voteScore) })
      .style("fill", nodeColor)
      .on("click", click);

    d3.select('.node circle').style("fill", "red");

    node.exit()
      .remove();

    link.exit()
      .remove();


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


    link.enter().insert("line", "g")
      .attr("class", "link")
      // .attr("d", diagonal);
      .attr("x1", function(d) { return d.source.x })
      .attr("y1", function(d) { return d.source.y })
      .attr("x2", function(d) { return d.target.x })
      .attr("y2", function(d) { return d.target.y })
      .attr("stroke", "black");
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
