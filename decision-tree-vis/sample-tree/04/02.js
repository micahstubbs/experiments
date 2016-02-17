var fs = require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile');
var d3 = require('d3')

var input = JSON.parse(fs.readFileSync('input.json', 'utf8'));
var data = JSON.parse(fs.readFileSync('graphData.json', 'utf8'));

//console.log(data);

var spec = {};

spec['input'] = input['input'];
spec['data'] = data['data'];


//console.log(data);

var outputData = spec;
var outputFile = "spec.json";
jsonfile.spaces = 2;

jsonfile.writeFile(outputFile, outputData, function (err) {
  console.error(err)
})
