var fs = require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile');

var inputFile = "01.json"
var data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

//console.log(data);

console.log(_.uniq(_.pluck(data, 'cylinders')));

var cylinders = _.uniq(_.pluck(data, 'cylinders'))

var passengerCounts = [9,10,19,20,29,30];

cylinders.forEach(function(c){
	passengerCounts.forEach(function(p){
		data.push({
			"enginesize": Math.round(Math.random()*6*100)/100,
			"passengers": p,
			"cylinders": c
		})
	})
})


console.log(data);

var outputFile = "02.json";
jsonfile.spaces = 2;

jsonfile.writeFile(outputFile, data, function (err) {
  console.error(err)
})