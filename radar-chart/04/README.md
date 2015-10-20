this version tries out `radarChart.js` with a new dataset and makes some improvements.

\+ parameter-ize the `axisName` and `value` fields:

    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 1,
      wrapWidth: 135,
      levels: 5,
      roundStrokes: true,
      color: color,
      axisName: "statement",
      value: "percentCorrect"
    };

\+ subtract `Math.PI/2` from `angleSlice*i` when drawing the radial axis lines so that they line up with the axis label text and the points (it seems this is only a problem your dataset has a number of elements that is not divisible by four)

\+ sort the data for the areas from largest to smallest by average value (an approximation of actual blob area) so that that the smallest area is drawn last and therefore appears on top

    //Calculate the average value for each area
    data.forEach(function(d){
    	d[value + "Average"] = d3.mean(d.values, function(e){ return e[value] }); 
    })

    //Sort
    data = data.sort(function(a, b){
    	var a = a[value + "Average"],
    			b = b[value + "Average"];
    	return b - a;
	  })

an iteration on the bl.ock [radar chart for nested data](http://bl.ocks.org/micahstubbs/44bb05aab218a40a4c12) by [@micahstubbs](http://bl.ocks.org/micahstubbs)

and a further iteration on the bl.ock [Radar Chart Redesign](http://bl.ocks.org/nbremer/21746a9668ffdf6d8242) created by [@nbremer](http://bl.ocks.org/nbremer)

the data is a subset of [table 7-8: Correct answers to factual knowledge questions in physical and biological sciences, by country/region: Most recent year](http://www.nsf.gov/statistics/seind14/index.cfm/etc/tables.htm#chp7) from the US National Science Foundation