This example adds labels for the index, row, and column of the scatterplot matrix to help reason about the grid layout.  I wanted this example to maintain the color-by-diagonal pattern. After labeling the grid cells and some experimentation, I realized that

```
var row = Math.floor(i % rows);
var col = Math.floor(i / rows);
colors(row + col)
```

would generate the pattern I was looking for.

When a measure intersects with itself, this example shows the name of that measure in the style of the [pairs plot](http://vita.had.co.nz/papers/gpp.pdf) implemented in the [R](https://www.r-project.org/) package [ggplot2](http://ggplot2.org/).

Forked from [Correlation Matrix I](http://bl.ocks.org/micahstubbs/3ef5a223bdb760a228b4) by [micahstubbs](http://bl.ocks.org/micahstubbs)

Originally inspired by the [Simple Correlation Matrix](http://bl.ocks.org/emeeks/671c0e7adfb1ce7060b8) block from [emeeks](http://bl.ocks.org/emeeks)
