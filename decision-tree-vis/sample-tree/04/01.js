var fs = require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile');
var d3 = require('d3')

var nodes = JSON.parse(fs.readFileSync('nodes-v2.json', 'utf8'));
var edges = JSON.parse(fs.readFileSync('edges-v2.json', 'utf8'));

//console.log(data);

var graph = {
	"data": {}
};

graph['data']['nodes'] = nodes;
graph['data']['edges'] = edges;


//console.log(data);

var outputData = graph;
var outputFile = "graphData.json";
jsonfile.spaces = 2;

jsonfile.writeFile(outputFile, outputData, function (err) {
  console.error(err)
})
