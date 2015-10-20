this version adds a legend!

to enable the legend symbol to interact with the areas, when you call `RadarChart()`, specify the field `radarChart.js` should use to assign an `areaName` to each area.

you can also specify the legend position as a parameter, where `x` and `y` are pixel coordinates offset from an origin at the top left of the parent `svg`.

    var legendPosition = {x: 25, y: 25}

    var radarChartOptions {
      areaName: "device",
      legendPosition: legendPosition
      // ...
    };

to get the interaction to work, we add a data-driven class to each area that we can later select in the `cellover()` function that is called when you mouse over the legend symbol.

    blobWrapper
    	.append("path")
    	.attr("class", function(d) {
    		return "radarArea" + " " + d[0][areaName].replace(/\s+/g, '') //Remove spaces from the areaName string to make one valid class name
    	})
    // ...

the legend is created with the delightful [d3-legend](http://d3-legend.susielu.com/) component from [susielu](http://bl.ocks.org/susielu)

an iteration on the bl.ock [radar chart with smallest area on top](http://bl.ocks.org/micahstubbs/465725cdc547c7cc8491) by [micahstubbs](http://bl.ocks.org/micahstubbs)

a further iteration on the bl.ock [Radar Chart Redesign](http://bl.ocks.org/nbremer/21746a9668ffdf6d8242) created by [nbremer](http://bl.ocks.org/nbremer), which is described nicely in this [blog post](http://www.visualcinnamon.com/2015/10/different-look-d3-radar-chart.html#comment-203)