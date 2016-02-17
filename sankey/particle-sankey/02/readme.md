Sankey Particles with only inline styles. A fork of the bl.ock [Sankey Particles III](http://bl.ocks.org/emeeks/e749224c89f82788cb18) from [emeeks](http://bl.ocks.org/emeeks)

Since it doesn't appear [possible](http://stackoverflow.com/questions/5293280/css-pseudo-classes-with-inline-styles) to [set CSS pseudo-class rules from JavaScript](http://stackoverflow.com/questions/311052/setting-css-pseudo-class-rules-from-javascript) we'll bind `mouseover` and `mouseout` events to each link path to replicate the functionality of the `:hover` CSS psuedo-class.

    .link:hover {
      stroke-opacity: .25;
    }

becomes 

    link
        .on('mouseover', function() {
          d3.select(this).style("stroke-opacity", .25);
        })
        .on('mouseout', function() {
          d3.select(this).style("stroke-opacity", .15);
        });

all other styles can be converted to inline styles more directly, like:

    .link {
      fill: none;
      stroke: #000;
      stroke-opacity: .15;
    }

to 

    var link = svg.append("g").selectAll(".link")
        /* ... */
        .style({
          "fill": "none",
          "stroke": "#000",
          "stroke-opacity": .15
        })

---

Original `README.md`:

Using particles to indicate flow between reservoirs in a sankey diagram. This time with particles moving at varying speeds and maintaining the color of the source node. You can drag the reservoirs (the rectangles) to adjust the path of the flows.

Other examples of sankeys with particles:

* [Fixed speed particles transitioning in color from source node color to target node color.](http://bl.ocks.org/emeeks/9673c96a682fe3948379)

* [Particles of differing sizes and differing speeds moving in "bursts" between nodes.](http://bl.ocks.org/emeeks/21f99959d48dd0d0c746)