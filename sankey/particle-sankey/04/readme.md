remove `Wind` to `Electricty Grid` link from `energy.json` to see if we can 
draw disconnected nodes in the middle of a Sankey diagram.


the `Wind` node is at index 47 in the nodes array

the `Electricity Grid` node is at index 15 in the nodes array

so we will remove this link from the `links` array in `energy.json`:

`{"source":47,"target":15,"value":289.366}`

and it works!

for dramatic effect, let's try removing all of the links from another node:

the `Oil Imports` node is at index 36 in the nodes array

the `Oil Reserves` node is at index 38 in the nodes array

the `Oil` node is at index 37 in the nodes array

so let's also remove these two links from the `links` array `energy.json`:

    {"source":36,"target":37,"value":504.287},
    {"source":38,"target":37,"value":107.703},

Sadly, that does not work.  When we remove all of the inbound links from a node, the layout sends the node upstream (to the left in our example).

let's try leaving the links in place but setting the value to zero:

    {"source":36,"target":37,"value":0},
    {"source":38,"target":37,"value":0},

This does not work either.  Neither does setting the value of these links to `null`.

Setting the value of the links to a really small number like `0.000001` the closest we get to the result we're looking for:

    {"source":36,"target":37,"value":0.000001},
    {"source":38,"target":37,"value":0.000001},

It looks like we need to modify the `d3.sankey.js` to achieve this _orphan nodes in the middle_ behavior.

---

Sankey Particles that appends the canvas and the svg with JavaScript. A fork of the bl.ock [Sankey Particles III](http://bl.ocks.org/emeeks/e749224c89f82788cb18) from [emeeks](http://bl.ocks.org/emeeks)

---

Original `README.md`:

Using particles to indicate flow between reservoirs in a sankey diagram. This time with particles moving at varying speeds and maintaining the color of the source node. You can drag the reservoirs (the rectangles) to adjust the path of the flows.

Other examples of sankeys with particles:

* [Fixed speed particles transitioning in color from source node color to target node color.](http://bl.ocks.org/emeeks/9673c96a682fe3948379)

* [Particles of differing sizes and differing speeds moving in "bursts" between nodes.](http://bl.ocks.org/emeeks/21f99959d48dd0d0c746)