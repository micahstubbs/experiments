a treemap prototype where the 

+ area of the cell 
+ the maxArea of all the cells that share the same depth and same parent with that cell

is used to scale the color on an orange to lightgray colorscale.

the size variable is double-encoded as cell area and cell color.

I extend `d3.layout.treemap` to calculate the maxArea across a set of sibling nodes and call the extended layout `d3.layout.treemap2`

the sort property of the treemap2 layout positions the largest area cell in the top-right of the group.  

`.sort(function(a, b){ return a.value - b.value })`