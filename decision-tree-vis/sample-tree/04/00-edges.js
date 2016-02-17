var fs = require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile');
var d3 = require('d3')

var edges = JSON.parse(fs.readFileSync('edges.json', 'utf8'));
var nodes = JSON.parse(fs.readFileSync('nodes-v2.json', 'utf8'));

edges.forEach(function(d) {

	// decrement the value of source and target each by 1
	// so that they match the index position of each node 
	// in a 0-indexed array of nodes
	d['source'] = d['source'] - 1;
	d['target'] = d['target'] - 1;

	// set the value to the size property of the target node
	//d['value'] = nodes[d['target']]['size'];
	/*
	d['size'] = nodes[d['target']]['size'];
	d['probability'] = nodes[d['target']]['probability'];
	d['label'] = nodes[d['target']]['label'];
	*/''

})

var outputData = edges;
var outputFile = "edges-v2.json";
jsonfile.spaces = 2;

jsonfile.writeFile(outputFile, outputData, function (err) {
  console.error(err)
})