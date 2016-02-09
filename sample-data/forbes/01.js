var fs = require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile');

var inputFile = "forbes2000_2014.json"
var data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

//console.log(data);



// get an array of unique sectors
var sectors  = _.uniq(data.map(function(el){
	return el["Sector"]
}));

// get an array of unique continents
var continents = _.uniq(data.map(function(el){
	return el["Continent"]
}));

var results = [];

sectors.forEach(function(sector){
	continents.forEach(function(continent){
		var subset = _.filter(data, {'Sector': sector, 'Continent': continent});
		var ranks = subset.map(function(el){ return el["Rank"]});

		var sum  = _.sum(ranks);
		var count = ranks.length;
		var averageRank = sum / count;
		results.push({
			"sector": sector,
			"continent": continent,
			"averageRank": averageRank
		})

	})
})
//console.log(data);

var outputFile = "01.json";
jsonfile.spaces = 2;

jsonfile.writeFile(outputFile, results, function (err) {
  console.error(err)
})