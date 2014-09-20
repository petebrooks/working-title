var treeData = JSON.parse(gon.tree_data)

var tree = d3.layout.tree()
  .sort(null)
  .size([500, 100])
  .children(function(d) {
    return (!d.children || d.children.length === 0) ? null : d.children;
  });

var nodes = tree.nodes(treeData);
var links = tree.links(nodes);

var svg = d3.select("body")
  .append("svg:svg")
  .append("svg:g")
  .attr('width', 1435)
  .attr('height', 600);

var link = d3.svg.diagonal()
  .projection(function(d){
    return [d.y, d.x];
  });

svg.selectAll("path.link") 
  .data(links)
  .enter()
  .append('svg:path')
  .attr('class', 'link')
  .attr('d', link);

var nodeGroup = svg.selectAll("g.node")
  .data(nodes)
  .enter()
  .append('svg:g')
  .attr('class', 'node')
  .attr('transform', function(d){
    return "translate(" + d.y + "," + d.x + ")";
  });

nodeGroup.append('svg:circle')
  .attr('class', 'node-dot')
  .attr('r', 50);






