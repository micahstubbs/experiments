////////////////////////////////////////////////////////////
//////////////////////// Set-up ////////////////////////////
////////////////////////////////////////////////////////////

//Quick fix for resizing some things for mobile-ish viewers
var mobileScreen = ($( window ).innerWidth() < 500 ? true : false);

//Scatterplot
var margin = {left: 60, top: 20, right: 20, bottom: 60},
	width = Math.min($("#chart").width(), 840) - margin.left - margin.right,
	height = width*2/3;

var svg = d3.select("#chart").append("svg")
			.attr("width", (width + margin.left + margin.right))
			.attr("height", (height + margin.top + margin.bottom));
			
var wrapper = svg.append("g").attr("class", "chordWrapper")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//////////////////////////////////////////////////////
///////////// Initialize Axes & Scales ///////////////
//////////////////////////////////////////////////////

var opacityCircles = 0.7,
	maxDistanceFromPoint = 50;

//Set the color for each region
var color = d3.scaleOrdinal()
					.range(["#EFB605", "#E58903", "#E01A25", "#C20049", "#991C71", "#66489F", "#2074A0", "#10A66E", "#7EB852"])
					.domain(["Africa | North & East", "Africa | South & West", "America | North & Central", "America | South", 
							 "Asia | East & Central", "Asia | South & West", "Europe | North & West", "Europe | South & East", "Oceania"]);
							 
//Set the new x axis range
var xScale = d3.scaleLog()
	.range([0, width])
	.domain([100,2e5]); //I prefer this exact scale over the true range and then using "nice"
	//.domain(d3.extent(countries, function(d) { return d.GDP_perCapita; }))
	//.nice();
//Set new x-axis
var xAxis = d3.axisBottom()
	.ticks(2)
	.tickFormat(function (d) {
		return xScale.tickFormat((mobileScreen ? 4 : 8),function(d) { 
			return d3.format('$.2s')(d);
		})(d);
	})	
	.scale(xScale);	
//Append the x-axis
wrapper.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(" + 0 + "," + height + ")")
	.call(xAxis);
		
//Set the new y axis range
var yScale = d3.scaleLinear()
	.range([height,0])
	.domain(d3.extent(countries, function(d) { return d.lifeExpectancy; }))
	.nice();	
var yAxis = d3.axisLeft()
	.ticks(6)  //Set rough # of ticks
	.scale(yScale);	
//Append the y-axis
wrapper.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + 0 + "," + 0 + ")")
		.call(yAxis);
		
//Scale for the bubble size
var rScale = d3.scaleSqrt()
			.range([mobileScreen ? 1 : 2, mobileScreen ? 10 : 16])
			.domain(d3.extent(countries, function(d) { return d.GDP; }));

//////////////////////////////////////////////////////
///////////////// Initialize Labels //////////////////
//////////////////////////////////////////////////////

//Set up X axis label
wrapper.append("g")
	.append("text")
	.attr("class", "x title")
	.attr("text-anchor", "end")
	.style("font-size", (mobileScreen ? 8 : 12) + "px")
	.attr("transform", "translate(" + width + "," + (height - 10) + ")")
	.text("GDP per capita [US $] - Note the logarithmic scale");

//Set up y axis label
wrapper.append("g")
	.append("text")
	.attr("class", "y title")
	.attr("text-anchor", "end")
	.style("font-size", (mobileScreen ? 8 : 12) + "px")
	.attr("transform", "translate(18, 0) rotate(-90)")
	.text("Life expectancy");

////////////////////////////////////////////////////////////	
///// Capture mouse events and voronoi.find() the site /////
////////////////////////////////////////////////////////////	

// Use the same variables of the data in the .x and .y as used in the cx and cy of the circle call
svg._tooltipped = svg._voronoi = null;
svg.on('mousemove', function() {
  if (!svg._voronoi) {
    console.log('computing the voronoi…');
    svg._voronoi = d3.voronoi()
	  .x(function(d) { return xScale(d.GDP_perCapita); })
	  .y(function(d) { return yScale(d.lifeExpectancy); })
    (countries);
    console.log('…done.');
  }
  var p = d3.mouse(this), site;
  p[0] -= margin.left;
  p[1] -= margin.top;
  // don't react if the mouse is close to one of the axis
  if (p[0] < 5 || p[1] < 5) {
    site = null;
  } else {
    site = svg._voronoi.find(p[0], p[1], maxDistanceFromPoint);
  }
  if (site !== svg._tooltipped) {
    if (svg._tooltipped) removeTooltip(svg._tooltipped.data)
    if (site) showTooltip(site.data);
    svg._tooltipped = site;
  }
});

////////////////////////////////////////////////////////////	
/////////////////// Scatterplot Circles ////////////////////
////////////////////////////////////////////////////////////	

//Initiate a group element for the circles	
var circleGroup = wrapper.append("g")
	.attr("class", "circleWrapper"); 
	
//Place the country circles
circleGroup.selectAll("countries")
	.data(countries.sort(function(a,b) { return b.GDP > a.GDP; })) //Sort so the biggest circles are below
	.enter().append("circle")
		.attr("class", function(d,i) { return "countries " + d.CountryCode; })
		.attr("cx", function(d) {return xScale(d.GDP_perCapita);})
		.attr("cy", function(d) {return yScale(d.lifeExpectancy);})
		.attr("r", function(d) {return rScale(d.GDP);})
		.attr('data-content', 'some data content')
		.attr('data-toggle', 'popover')
		.attr('data-duration', 100)
		.classed('popover-via-hover', true)
		.style("opacity", opacityCircles)
		.style("fill", function(d) {return color(d.Region);})
			
///////////////////////////////////////////////////////////////////////////
///////////////////////// Create the Legend////////////////////////////////
///////////////////////////////////////////////////////////////////////////

if (!mobileScreen) {
	//Legend			
	var	legendMargin = {left: 5, top: 10, right: 5, bottom: 10},
		legendWidth = 145,
		legendHeight = 270;
		
	var svgLegend = d3.select("#legend").append("svg")
				.attr("width", (legendWidth + legendMargin.left + legendMargin.right))
				.attr("height", (legendHeight + legendMargin.top + legendMargin.bottom));			

	var legendWrapper = svgLegend.append("g").attr("class", "legendWrapper")
					.attr("transform", "translate(" + legendMargin.left + "," + legendMargin.top +")");
		
	var rectSize = 15, //dimensions of the colored square
		rowHeight = 20, //height of a row in the legend
		maxWidth = 144; //widht of each row
		  
	//Create container per rect/text pair  
	var legend = legendWrapper.selectAll('.legendSquare')  	
			  .data(color.range())                              
			  .enter().append('g')   
			  .attr('class', 'legendSquare') 
			  .attr("transform", function(d,i) { return "translate(" + 0 + "," + (i * rowHeight) + ")"; })
			  .style("cursor", "pointer")
			  .on("mouseover", selectLegend(0.02))
			  .on("mouseout", selectLegend(opacityCircles));
	 
	//Non visible white rectangle behind square and text for better hover
	legend.append('rect')                                     
		  .attr('width', maxWidth) 
		  .attr('height', rowHeight) 			  		  
		  .style('fill', "white");
	//Append small squares to Legend
	legend.append('rect')                                     
		  .attr('width', rectSize) 
		  .attr('height', rectSize) 			  		  
		  .style('fill', function(d) {return d;});                                 
	//Append text to Legend
	legend.append('text')                                     
		  .attr('transform', 'translate(' + 22 + ',' + (rectSize/2) + ')')
		  .attr("class", "legendText")
		  .style("font-size", "10px")
		  .attr("dy", ".35em")		  
		  .text(function(d,i) { return color.domain()[i]; });  

	//Create g element for bubble size legend
	var bubbleSizeLegend = legendWrapper.append("g")
							.attr("transform", "translate(" + (legendWidth/2 - 30) + "," + (color.domain().length*rowHeight + 20) +")");
	//Draw the bubble size legend
	bubbleLegend(bubbleSizeLegend, rScale, legendSizes = [1e11,3e12,1e13], legendName = "GDP (Billion $)");		
}//if !mobileScreen
else {
	d3.select("#legend").style("display","none");
}

//////////////////////////////////////////////////////
/////////////////// Bubble Legend ////////////////////
//////////////////////////////////////////////////////

function bubbleLegend(wrapperVar, scale, sizes, titleName) {

	var legendSize1 = sizes[0],
		legendSize2 = sizes[1],
		legendSize3 = sizes[2],
		legendCenter = 0,
		legendBottom = 50,
		legendLineLength = 25,
		textPadding = 5,
		numFormat = d3.format(",");
	
	wrapperVar.append("text")
		.attr("class","legendTitle")
		.attr("transform", "translate(" + legendCenter + "," + 0 + ")")
		.attr("x", 0 + "px")
		.attr("y", 0 + "px")
		.attr("dy", "1em")
		.text(titleName);
		
	wrapperVar.append("circle")
        .attr('r', scale(legendSize1))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize1)));
    wrapperVar.append("circle")
        .attr('r', scale(legendSize2))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize2)));
    wrapperVar.append("circle")
        .attr('r', scale(legendSize3))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize3)));
		
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize1)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize1)));	
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize2)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize2)));
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize3)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize3)));
		
	wrapperVar.append("text")
        .attr('class',"legendText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize1)))
		.attr('dy', '0.25em')
		.text("$ " + numFormat(Math.round(legendSize1/1e9)) + " B");
	wrapperVar.append("text")
        .attr('class',"legendText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize2)))
		.attr('dy', '0.25em')
		.text("$ " + numFormat(Math.round(legendSize2/1e9)) + " B");
	wrapperVar.append("text")
        .attr('class',"legendText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize3)))
		.attr('dy', '0.25em')
		.text("$ " + numFormat(Math.round(legendSize3/1e9)) + " B");
		
}//bubbleLegend

///////////////////////////////////////////////////////////////////////////
//////////////////// Hover function for the legend ////////////////////////
///////////////////////////////////////////////////////////////////////////
	
//Decrease opacity of non selected circles when hovering in the legend	
function selectLegend(opacity) {
	return function(d, i) {
		var chosen = color.domain()[i];
			
		wrapper.selectAll(".countries")
			.filter(function(d) { return d.Region != chosen; })
			.transition()
			.style("opacity", opacity);
	  };
}//function selectLegend

///////////////////////////////////////////////////////////////////////////
/////////////////// Hover functions of the circles ////////////////////////
///////////////////////////////////////////////////////////////////////////

//define some variables or get their values from other scripts
var someTitleFromOtherCode = 'Sample title';
var someContentFromOuterSpace = '<p>Some sample message.</p>';

//demo popover. trigger via hover
var popover1;

console.log('popover1', popover1);
// popover1.open();

//Hide the tooltip when the mouse moves away
function removeTooltip (d, i) {

	//Save the chosen circle (so not the voronoi)
	var element = d3.selectAll(".countries."+d.CountryCode);
		
	//Fade out the bubble again
	element.style("opacity", opacityCircles);
	
	//Hide tooltip
	popover1.close();

	// $('.popover').each(function() {
	// 	$(this).remove();
	// }); 
  
	//Fade out guide lines, then remove them
	d3.selectAll(".guide")
		.transition().duration(200)
		.style("opacity",  0)
		.remove();
		
}//function removeTooltip

//Show the tooltip on the hovered over slice
function showTooltip (d, i) {
	//Save the chosen circle (so not the voronoi)
	var element = d3.select(".countries."+d.CountryCode),
 	    el = element._groups[0];

	//define some variables or get their values from other scripts
	var someTitleFromOtherCode = 'Sample title';
	var someContentFromOuterSpace = '<p>Some sample message.</p>';

	console.log('d from showTooltip', d);

	// demo popover trigger via hover
	popover1 = new Popover(`.${d.CountryCode}`, { 
		trigger: 'hover',
		template: '<div class="popover" role="tooltip">'
	  + '<div class="arrow"></div>'
	  // + '<h3 class="popover-title">'+someTitleFromOtherCode+'</h3>'
	  + '<div class="popover-content">'+ "<span style='font-size: 11px; text-align: center;'>" + d.Country + "</span>" +'</div>'
	  + '</div>'
	});

	console.log('popover1', popover1);
	popover1.open();

	//Define and show the tooltip
	// $(el).popover({
	// 	placement: 'auto top',
	// 	container: '#chart',
	// 	trigger: 'manual',
	// 	html : true,
	// 	content: function() { 
	// 		return "<span style='font-size: 11px; text-align: center;'>" + d.Country + "</span>"; }
	// });
	// $(el).popover('show');

	//Make chosen circle more visible
	element.style("opacity", 1);

	//Place and show tooltip
	var x = +element.attr("cx"),
		y = +element.attr("cy"),
		color = element.style("fill");

	//Append lines to bubbles that will be used to show the precise data points
	
	//vertical line
	wrapper
		.append("line")
		.attr("class", "guide")
		.attr("x1", x)
		.attr("x2", x)
		.attr("y1", y)
		.attr("y2", height + 20)
		.style("stroke", color)
		.style("opacity",  0)
		.transition().duration(200)
		.style("opacity", 0.5);
	//Value on the axis
	wrapper
		.append("text")
		.attr("class", "guide")
		.attr("x", x)
		.attr("y", height + 38)
		.style("fill", color)
		.style("opacity",  0)
		.style("text-anchor", "middle")
		.text( "$ " + d3.format(".2s")(d.GDP_perCapita) )
		.transition().duration(200)
		.style("opacity", 0.5);

	//horizontal line
	wrapper
		.append("line")
		.attr("class", "guide")
		.attr("x1", x)
		.attr("x2", -20)
		.attr("y1", y)
		.attr("y2", y)
		.style("stroke", color)
		.style("opacity",  0)
		.transition().duration(200)
		.style("opacity", 0.5);
	//Value on the axis
	wrapper
		.append("text")
		.attr("class", "guide")
		.attr("x", -25)
		.attr("y", y)
		.attr("dy", "0.35em")
		.style("fill", color)
		.style("opacity",  0)
		.style("text-anchor", "end")
		.text( d3.format(".1f")(d.lifeExpectancy) )
		.transition().duration(200)
		.style("opacity", 0.5);	
					
}//function showTooltip