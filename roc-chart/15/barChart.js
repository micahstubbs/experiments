function barChart(id, data, options) {
  var margin = options.margin || {top: 25, right: 25, bottom: 25, left: 25};
  var width = options.width || 960 - margin.left - margin.right;
  var height = options.height || 500 - margin.top - margin.bottom;
  var xValue = function(d) { return d.name; };
  var yValue = function(d) { return d.value; };
  var xScale = d3.scale.ordinal();
  var yScale = d3.scale.linear();
  var colorScale = d3.scale.category10();     
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(6, 0);
  var yAxis = d3.svg.axis().scale(yScale).orient("left");

  var barData = [];
  for (k in data[0]) {
    barData.push({
      name: k,
      value: parseFloat(data[0][k])
    })
  }
  console.log('barData', barData);

  d3.select(id)
    .datum(barData)
    .call(chart);

  function chart(selection) {
    selection.each(function(data) {
      var dx = (data[0].dx === undefined) ? d3.functor(width / data.length - 1) : function(d){return xValue(d.dx) - 1};

      // Update the x-scale.
      xScale
          .domain(data.map(function (d) { return d.name; }))
          .rangeBands([0, width]);

      // Update the y-scale.
      yScale
          .domain([0, d3.max(data, yValue)])
          .range([height, 0]);

      // Enter svg
      var svg = d3.select(this).selectAll("svg").data([data]),
      gEnter = svg.enter().append("svg")  
        .append("g")
        .classed("plot",true);

      // Enter Axes
      gEnter.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      gEnter.append("g")
        .attr("class", "y axis")
        .call(yAxis)

      //Enter Bars
      var bar = gEnter.selectAll(".bar")
        .data(data);

      var barEnter = bar.enter().append("g")
        .attr("class", "bar");

      barEnter.append("rect");
      barEnter.append("text");

      // Update the outer dimensions.
      svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      // Update the inner dimensions.
      var g = svg.select("g.plot")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");                

      // Update the x-axis.
      g.select(".x.axis")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(xAxis);

      // Update the bars
      g.selectAll("g.bar")
        .attr("transform", function(d){
          return "translate(" + 
            xScale(xValue(d)) + "," +
            yScale(yValue(d)) + 
          ")"
        });

      g.selectAll(".bar rect")  
        .attr("width", dx)
        .attr("height", function(d) { return height - yScale(yValue(d)); })
        .style('fill', function(d) { return colorScale(xValue(d)); });

      g.selectAll(".bar text")
        .attr("dy", ".75em")
        .attr("x", function(d) { return  .5*dx(d); })
        .attr("y", 6) //stand off from top of bar
        .attr("text-anchor", "middle")
        .text(yValue);
    });
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

}
