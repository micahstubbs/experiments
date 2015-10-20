this version loads nested data from `data.json`:

`index.html`

    //Load the data and Call function to draw the Radar chart
    d3.json("data.json", function(error, data){
    	RadarChart(".radarChart", data, radarChartOptions);
    });

then, it converts the nested data into an array of `values` arrays:

`radarChart.js`

    // convert the nested data passed in
    // into an array of values arrays
    data = data.map(function(d) { return d.values })

an iteration on the bl.ock [Radar Chart Redesign](http://bl.ocks.org/nbremer/21746a9668ffdf6d8242) created by [@nbremer](http://bl.ocks.org/nbremer)