$(document).ready(function(){

var treeData = $('.tree_data').data('data');
var height = 500;
var width = 1000;

var tree = d3.layout.tree()
  .sort(null)
  .size([height, width])
  .children(function(d) {
    return (!d.children || d.children.length === 0) ? null : d.children;
  });

var nodes = tree.nodes(treeData);
var links = tree.links(nodes);

var svg = d3.select("body div.tree")
  .append("svg")
  .attr('width', 1435)
  .attr('height', 600)
  .append("g");

var link = d3.svg.diagonal()
  .projection(function(d){
    return [d.y, d.x];
  });

svg.selectAll("path.link")
  .data(links)
  .enter()
  .append('path')
  .attr('class', 'link')
  .attr('d', link);

var nodeGroup = svg.selectAll("g.node")
  .data(nodes)
  .enter()
  .append('g')
  .attr('class', 'node')
  .attr('transform', function(d){
    return "translate(" + d.y + "," + d.x + ")";
  });

nodeGroup.append('circle')
  .attr('class', 'node-dot')
  .attr('r', 5);

});

// var treeData2 = JSON.parse(gon.tree_data);

// var treeData = [
//   {
//     "name": "Top Level",
//     "parent": "null",
//     "children": [
//       {
//         "name": "Level 2: A",
//         "parent": "Top Level",
//         "children": [
//           {
//             "name": "Son of A",
//             "parent": "Level 2: A"
//           },
//           {
//             "name": "Daughter of A",
//             "parent": "Level 2: A"
//           }
//         ]
//       },
//       {
//         "name": "Level 2: B",
//         "parent": "Top Level"
//       }
//     ]
//   }
// ];

