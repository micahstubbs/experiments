var fs = require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile');
var d3 = require('d3')

var nodes = JSON.parse(fs.readFileSync('nodes.json', 'utf8'));


//console.log(data);

nodes.forEach(function(d) {
	// decrement the id of each node by 1
	// so that the id of each node matches the 0-indexed array index of 
	// that node in the nodes array
	d['id'] = d['id'] - 1;
})

// set the feature property parent node to the feature of it's first child
nodes[0]["feature"] = nodes[1]["feature"];
nodes[1]["feature"] = nodes[2]["feature"];
nodes[2]["feature"] = nodes[3]["feature"]; 
nodes[3]["feature"] = nodes[4]["feature"]; 
nodes[4]["feature"] = nodes[5]["feature"]; 
nodes[9]["feature"] = nodes[10]["feature"]; 
nodes[10]["feature"] = nodes[11]["feature"]; 
nodes[13]["feature"] = nodes[14]["feature"];
nodes[14]["feature"] = nodes[15]["feature"];

nodes.forEach(function(d) {
	// set the feature property of the leaf nodes to a blank
	if (d['isLeaf'] === true) {
		d['feature'] = "";
	}

	// add a name property to each node
	//d['name'] = d['feature'];
})

// hard code sums for node size for nodes with children
// calculate size for a node as the sum of the sizes of its children
// find these relationships by manually inspecting the tree, for now
nodes[4]["size"] = nodes[5]["size"] + nodes[6]["size"];
nodes[3]["size"] = nodes[4]["size"] + nodes[7]["size"];
nodes[2]["size"] = nodes[3]["size"] + nodes[8]["size"];
nodes[10]["size"] = nodes[11]["size"] + nodes[12]["size"];
nodes[9]["size"] = nodes[10]["size"];
nodes[1]["size"] = nodes[2]["size"] + nodes[9]["size"];
nodes[14]["size"] = nodes[15]["size"] + nodes[16]["size"];
nodes[13]["size"] = nodes[17]["size"] + nodes[14]["size"];
nodes[0]["size"] = nodes[1]["size"] + nodes[13]["size"];

// roll up probability in the same fashion:
nodes[4]["probability"] = nodes[5]["probability"] + nodes[6]["probability"];
nodes[3]["probability"] = nodes[4]["probability"] + nodes[7]["probability"];
nodes[2]["probability"] = nodes[3]["probability"] + nodes[8]["probability"];
nodes[10]["probability"] = nodes[11]["probability"] + nodes[12]["probability"];
nodes[9]["probability"] = nodes[10]["probability"];
nodes[1]["probability"] = nodes[2]["probability"] + nodes[9]["probability"];
nodes[14]["probability"] = nodes[15]["probability"] + nodes[16]["probability"];
nodes[13]["probability"] = nodes[17]["probability"] + nodes[14]["probability"];
nodes[0]["probability"] = nodes[1]["probability"] + nodes[13]["probability"];

/*
// hard code the depth on each node, for now:
nodes[0]['depth']  = 0;
nodes[1]['depth']  = 1;
nodes[13]['depth'] = 1;
nodes[2]['depth']  = 2;
nodes[9]['depth']  = 2;
nodes[14]['depth'] = 2;
nodes[3]['depth']  = 3;
nodes[10]['depth'] = 3;
nodes[4]['depth']  = 4;
nodes[8]['depth']  = 5;
nodes[7]['depth']  = 5;
nodes[17]['depth'] = 5;
nodes[6]['depth']  = 5;
nodes[5]['depth']  = 5;
nodes[15]['depth'] = 5;
nodes[16]['depth'] = 5;
nodes[11]['depth'] = 5;
nodes[12]['depth'] = 5;
*/

//console.log(data);

var outputData = nodes;
var outputFile = "nodes-v2.json";
jsonfile.spaces = 2;

jsonfile.writeFile(outputFile, outputData, function (err) {
  console.error(err)
})
