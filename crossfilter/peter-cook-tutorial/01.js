var fs          = require('fs');
var _           = require('lodash');
var jsonfile    = require('jsonfile');
var crossfilter = require('crossfilter');
var d3          = require('d3');

// http://animateddata.co.uk/articles/crossfilter/

var inputFile = "flights-3m.csv"
// var data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
var data = d3.csv.parse(fs.readFileSync(inputFile, 'utf8'));

var format = d3.time.format('%m%d%H%M');

data.forEach(function(d){
	d.delay = Number(d.delay);
	d.distance = Number(d.distance);
	d.date = format.parse(d.date);
})

//console.log(data[0]);

var cf = crossfilter(data);

//console.log('cf.size()', cf.size());

var delayDimension = cf.dimension(function(d) {
	return d.delay;
});

//console.log('delayDimension.top(3)', delayDimension.top(3));

//console.log('delayDimension.bottom(3)', delayDimension.bottom(3));

var originDestinationDimension = cf.dimension(function(d) {
	return d.origin + '-' + d.destination; 
});

var isDelayedDimension = cf.dimension(function(d) {
	return d.delay > 0;
})

delayDimension.filter(function(d) {
	return d > 0;
})

//console.log('delayDimension.bottom(3)', delayDimension.bottom(3));

var originDimension = cf.dimension(function(d) {
	return d.origin
});
originDimension.filter(function(d) {
	return d === 'MDW'
});

//console.log('delayDimension.top(3)', delayDimension.top(3));
//console.log('delayDimension.bottom(3)', delayDimension.bottom(3));

delayDimension.filterAll();
//console.log('delayDimension.bottom(3)', delayDimension.bottom(3));

originDimension.filterAll();
//console.log('delayDimension.top(3)', delayDimension.top(3));

var originGrouping = originDimension.group();
//console.log('originGrouping.all()', originGrouping.all());
//console.log('originGrouping.top(3)\n', originGrouping.top(3));

var delayGrouping = delayDimension.group();
//console.log('delayGrouping.top(5)\n', delayGrouping.top(5));

var dateDimension = cf.dimension(function(d) {
	return d.date;
})

var hourGrouping = dateDimension.group(function(d) {
	return d.getHours();
});
//console.log('hourGrouping.top(5)\n', hourGrouping.top(5));

originDimension.filter(function(d) { 
	return d === 'PHX';
});
//console.log('hourGrouping.all()\n', hourGrouping.all());

function reduceAdd(p, v) {
	return v.delay > 0 ? p + 1 : p; 
}
function reduceRemove(p, v) {
	return v.delay > 0 ? p - 1 : p;
}
function reduceInitial() { 
	return 0;
}

hourGrouping.reduce(reduceAdd, reduceRemove, reduceInitial);

console.log('hourGrouping.all()\n', hourGrouping.all());











































