var fs = require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile');
var d3 = require('d3');

var inputFile = "01.json"
var data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

//console.log(data);

var keys = _.uniq(data.map(function(d){ return d.country }))
console.log(keys);

var outputData = d3.nest()
	.key(function(d) { return d.country })
	.entries(data);




//console.log(data);

var outputFile = "data.json";
jsonfile.spaces = 2;

jsonfile.writeFile(outputFile, outputData, function (err) {
  console.error(err)
})