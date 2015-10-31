function rocChart(id, data, options) {

  // set default configuration
  var cfg = {
    "margin": {top: 30, right: 20, bottom: 70, left: 61},
    "width": 600,
    "height": 450,
    "interpolationMode": "basis",
    "fpr": "fpr",
    "tpr1": "tpr1",
    "tpr2": "tpr2",
    "tpr3": "tpr3",
    "tpr4": "tpr4"
  }

  //Put all of the options into a variable called cfg
  if('undefined' !== typeof options){
    for(var i in options){
    if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
    }//for i
  }//if

  // if values for tooltips are not specified
  // set the default values for the tooltips to the corresponding
  // true positive rate variable name
  ["tip1", "tip2", "tip3", "tip4"].forEach(function(d, i) {
    if('undefined' === typeof cfg[d]){
      cfg[d] = ["tpr1", "tpr2", "tpr3", "tpr4"][i];
    }
  })

  var interpolationMode = cfg["interpolationMode"],
      fpr = cfg["fpr"],
      tpr1 = cfg["tpr1"],
      tpr2 = cfg["tpr2"],
      tpr3 = cfg["tpr3"],
      tpr4 = cfg["tpr4"];

  var format = d3.format('.1');
  
  var x = d3.scale.linear().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

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

  

  var valueline = d3.svg.line()
      .interpolate(interpolationMode)
      .x(function(d) { return x(d[fpr]); })
      .y(function(d) { return y(d[tpr1]); });

  var valueline2 = d3.svg.line()
      .interpolate(interpolationMode)
      .x(function(d) { return x(d[fpr]); })
      .y(function(d) { return y(d[tpr2]); });

  var valueline3 = d3.svg.line()
      .interpolate(interpolationMode)
      .x(function(d) { return x(d[fpr]); })
      .y(function(d) { return y(d[tpr3]); });

  var valueline4 = d3.svg.line()
      .interpolate(interpolationMode)
      .x(function(d) { return x(d[fpr]); })
      .y(function(d) { return y(d[tpr4]); });

  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .style("visibility","visible")
            .offset([-20, 0])
            .html(function(d) {
              return cfg["tip1"]; // "Break Points"
            });

  var tip2 = d3.tip()
            .attr('class', 'd3-tip')
            .style("visibility","visible")
            .offset([-20, 0])
            .html(function(d) {
              return cfg["tip2"]; // "Winners"
            });

  var tip3 = d3.tip()
            .attr('class', 'd3-tip')
            .style("visibility","visible")
            .offset([-20, 0])
            .html(function(d) {
              return cfg["tip3"]; // "First Serve %"
            });

  var tip4 = d3.tip()
            .attr('class', 'd3-tip')
            .style("visibility","visible")
            .offset([-20, 0])
            .html(function(d) {
              return cfg["tip4"]; // "Net Points Won"
            });

  var tip5 = d3.tip()
            .attr('class', 'd3-tip')
            .style("visibility","visible")
            .offset([-20, 0])
            .html(function(d) {
              return "Random guess model";
            });

  var svg = d3.select("#roc")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");
      
      x.domain([0, 1]);
      y.domain([0, 1]);

      svg.call(tip);
      svg.call(tip2);
      svg.call(tip3);
      svg.call(tip4);
      svg.call(tip5);

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
        .on('mouseover', tip5.show)
        .on("mousemove", function(){
          return tip5
            .style("top", (event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px");
        })
        .on('mouseout', tip5.hide);

      // draw the ROC curves
      svg.append("path")
        .attr("class", "curve")
        .style("stroke", "steelblue")
        .attr("d", valueline(data))
        .on('mouseover', tip.show)
        .on("mousemove", function(){ 
          return tip
            .style("top", (event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px");
        })
        .on('mouseout', tip.hide);

      svg.append("path")
        .attr("class", "curve")          
        .style("stroke", "red")
        .attr("d", valueline2(data))
        .on('mouseover', tip2.show)
        .on("mousemove", function(){
          return tip2
            .style("top", (event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px");
        })
        .on('mouseout', tip2.hide);

      svg.append("path")   
        .attr("class", "curve")       
        .style("stroke", "green")
        .attr("d", valueline3(data))
        .on('mouseover', tip3.show)
        .on("mousemove", function(){
          return tip3
            .style("top", (event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px");
        })
        .on('mouseout', tip3.hide);
      
      svg.append("path")   
        .attr("class", "curve")       
        .style("stroke", "purple")
        .attr("d", valueline4(data))
        .on('mouseover', tip4.show)
        .on("mousemove", function(){
          return tip4
            .style("top", (event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px");
        })
        .on('mouseout', tip4.hide);

} // rocChart
