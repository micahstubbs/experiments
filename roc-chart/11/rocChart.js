function rocChart(id, data, options) {

  // set default configuration
  var cfg = {
    "margin": {top: 30, right: 20, bottom: 70, left: 61},
    "width": 470,
    "height": 450,
    "interpolationMode": "basis",
    "fpr": "fpr",
    "tprVariables": [{
      "name": "tpr0",
    }]
  }

  //Put all of the options into a variable called cfg
  if('undefined' !== typeof options){
    for(var i in options){
    if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
    }//for i
  }//if

  var tips = {};

  // if values for tooltips are not specified
  // set the default values for the tooltips to the corresponding
  // true positive rate variable name
  cfg["tprVariables"].forEach(function(d, i) {
    if('undefined' === typeof d.tipText){
      d.tipText = d.name;
    }

    tips["tip" + i] = tip(d.tipText);

  })

  console.log("cfg['tprVariables']", cfg["tprVariables"]);
  console.log("tips", tips);

  var interpolationMode = cfg["interpolationMode"],
      fpr = cfg["fpr"];

  var format = d3.format('.1');
  
  var x = d3.scale.linear().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);
  var color = d3.scale.category10() // d3.scale.ordinal().range(["steelblue", "red", "green", "purple"]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .ticks(5)
    .tickFormat(format)
    .outerTickSize(0);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("right")
    .ticks(5)
    .tickFormat(format)
    .outerTickSize(0);

  
  // a function that returns a line generator
  function valueLine(data, tpr) {

     var lineGenerator = d3.svg.line()
      .interpolate(interpolationMode)
      .x(function(d) { return x(d[fpr]); })
      .y(function(d) { return y(d[tpr]); });

    return lineGenerator(data);
  }

  // a function that returns a tooltip
  function tip(tipText) {

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .style("visibility","visible")
      .offset([-20, 0])
      .html(function(d) {
        return tipText; // "Break Points"
      });

    return tip;
  }

  var svg = d3.select("#roc")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain([0, 1]);
  y.domain([0, 1]);

  tipRandomGuess = tip("Random guess model")
  svg.call(tipRandomGuess);

  for(key in tips){
    svg.call(tips[key]);
  }

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")            
        .attr("x", width / 2)
        .attr("y", 40 )
        .style("text-anchor", "middle")
        .text("False Positive Rate")
          
  var xAxisG = svg.select("g.x.axis");
            
  // draw the top boundary line
  xAxisG.append("line")
    .attr({
      "x1": -1,
      "x2": width + 1,
      "y1": -height,
      "y2": -height
    });

  // draw a bottom boundary line over the existing
  // x-axis domain path to make even corners
  xAxisG.append("line")
    .attr({
      "x1": -1,
      "x2": width + 1,
      "y1": 0,
      "y2": 0
    });


  // position the axis tick labels below the x-axis
  xAxisG.selectAll('.tick text')
    .attr('transform', 'translate(0,' + 25 + ')');

  // hide the y-axis ticks for 0 and 1
  xAxisG.selectAll("g.tick line")
    .style("opacity", function(d) {
      // if d is an integer
      return d % 1 === 0 ? 0 : 1;
    });

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")            
      .attr("transform", "rotate(-90)")
      .attr("y", -35)
      // manually configured so that the label extends 
      // ~11px above the 0.6 tick label and 
      // ~11px below the 0.4 tick label
      .attr("x", 0 - height/1.56)  
      .style("font-size","12px")              
      .style("text-anchor", "left")
      .text("True Positive Rate");

  yAxisG = svg.select("g.y.axis");

  // add the right boundary line
  yAxisG.append("line")
    .attr({
      "x1": width,
      "x2": width,
      "y1": 0,
      "y2": height
    })

  // position the axis tick labels to the right of 
  // the y-axis and
  // translate the first and the last tick labels
  // so that they are right aligned
  // or even with the 2nd digit of the decimal number
  // tick labels
  yAxisG.selectAll("g.tick text")
    .attr('transform', function(d) {
      if(d % 1 === 0) { // if d is an integer
        return 'translate(' + -22 + ',0)';
      } else {
        return 'translate(' + -32 + ',0)';
      }
  })

  // hide the y-axis ticks for 0 and 1
  yAxisG.selectAll("g.tick line")
    .style("opacity", function(d) {
      // if d is an integer
      return d % 1 === 0 ? 0 : 1;
    });

  // draw the random guess line
  svg.append("line") 
    .attr("class", "curve")         
    .style("stroke", "black")
    .attr({
      "x1": 0,
      "x2": width,
      "y1": height,
      "y2": 0
    })
    .style({
      "stroke-width": 2,
      "stroke-dasharray": "8",
      "opacity": 0.4
    })
    .on('mouseover', tipRandomGuess.show)
    .on("mousemove", function(){
      return tipRandomGuess
        .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px");
    })
    .on('mouseout', tipRandomGuess.hide);

  // draw the ROC curves

  function drawCurve(data, tpr, tip, stroke){
    svg.append("path")
      .attr("class", "curve")
      .style("stroke", stroke)
      .attr("d", valueLine(data, tpr))
      .on('mouseover', tip.show)
      .on("mousemove", function(){ 
        return tip
          .style("top", (event.pageY-10)+"px")
          .style("left",(event.pageX+10)+"px");
      })
      .on('mouseout', tip.hide);
  }

  cfg["tprVariables"].forEach(function(d, i){
    console.log("drawing the curve for", d.tipText)
    console.log("color(", i, ")", color(i));
    drawCurve(data, d.name, tips["tip" + i], color(i));
  })

} // rocChart
