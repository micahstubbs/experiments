var fs = require('fs');
var d3 = require('d3');
var json2csv = require('json2csv');

var csvfile1 = 'data2a.csv';


var data = d3.csv.parse(fs.readFileSync(csvfile1, 'utf8'));
  
for(var i=0; i<data.length; i++){
  // generate a new column of sample data with some 
  // arbitrary transformations on the close column
  data[i]['openInterest'] = Math.round(data[i]['close'] * 725 *100) / 100;
  console.log(data[i]);
}  

var openInterestArray = data.map(function(el){ return el.openInterest}).reverse();
  
//console.log(openInterestArray);

for(var i=0; i<openInterestArray.length; i++){
  data[i]['openInterest'] = openInterestArray[i];
  console.log(data[i]);
}

json2csv({ data: data }, function(err, csv) {
  if (err) console.log(err);
  fs.writeFile('data3a.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
});




