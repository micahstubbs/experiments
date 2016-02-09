var fs = require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile');

var inputFile = "forbes2000_2014.json"
var data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

// the goal of this script is to generate
// a subset that shows the average profit by sector

//console.log(data);

// get an array of unique sectors
var sectors  = _.uniq(data.map(function(el){
	return el["Sector"]
}));

var results = [];

sectors.forEach(function(sector){

		var subset = _.filter(data, {'Sector': sector});
		var profits = subset.map(function(el){ return el["Profits"]});

		var sum  = _.sum(profits);
		var count = profits.length;
		var averageProfit = sum / count;
		results.push({
			"sector": sector,
			"averageProfit": averageProfit
	})
})
//console.log(data);

var outputFile = "02.json";
jsonfile.spaces = 2;

jsonfile.writeFile(outputFile, results, function (err) {
  console.error(err)
})