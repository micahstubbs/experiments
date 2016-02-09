- abstract out the map svg into a separate file
- hide the breed code text

[d3 google group thread on working with external svg files](https://groups.google.com/forum/embed/#!topic/d3-js/-qYDy71c_lA)

[example](http://bl.ocks.org/mbostock/1014829)

[an iteration](http://bl.ocks.org/biovisualize/1238376)

[jsfiddle with .each() technique](http://jsfiddle.net/christopheviau/XnG6r/)


---

#### in ireland.svg 
- added the class `northernireland` to all of the paths that are children of the `g` element with `id="northernireland".
- moved the path for county Fermanagh from `<g id="republic">` to `<g id="northernireland">` 
- set fill color for county Fermanagh path to `#fff`.  I'm curious why the fill was originally set `#d1d7ab` for this county.  Maybe the svg was repurposed from another graphic originally about county Fermanagh?
- removed the styles `;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible` from the county Fermanagh path to match the paths for the other Northern Ireland counties.
- added `sodipodi:nodetypes="cssscssscsssssscccssssscsssssssc"` to the county Fermanagh path to match the paths for the other Northern Ireland counties.  What is this `sodipodi:nodetypes`? It looks like [some artifact from Inkscape](http://www.inkscapeforum.com/viewtopic.php?t=4590)