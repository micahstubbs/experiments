##13

+ on mouseover of curve, shade area under curve and show AUC value on plot

---

##12

+ custom ticks parameter for alternate axis ticks

inspired by the [plotROC](http://sachsmc.github.io/plotROC/) R package

---

##11

+ refactor rocChart.js to render n ROC curves rather than a hard coded 4 curves
+ update color scale to `d3.category10()`
+ update make plot a perfect square

---

##10

+ abstract out chart drawing into rocChart.js reusable component

---

##09

+ step interpolation for no line smoothing
+ draw the random guess line behind (before) the ROC curves

##08

refactor how lines are generated
+ parameterize true positive rate variable names
+ draw random guess line from `(0, height)` to `(width, 0)` and remove requirement to have randomGuess line data points in the dataset
+ use basis interpolation, which produces a stepwise line shape with some line smoothing
+ change random guess line opacity to 40%

---

##07

+ update font to Open Sans

---

##06

+ revert back to a zero tick label for each axis
+ right align y-axis text labels that are integers like 0 and 1
+ set axis lines to opaque
+ extend x-axis lines 1px to make clean corners

---

##05

+ format numbers to show 0 decimal place numbers as whole numbers, for example `1.0` as `1`
+ hide axis ticks for 0.0 - origin point
+ hide y-axis tick label for origin point
+ translate x-axis tick label for origin point to diagonally align with random guess line


---

##04
+ change random guess line style from solid to dashed
+ add right and top solid boundary lines
+ lower opacity to 70%
+ axis ticks on the inside
+ update dimensions to 600 width x 450 height
+ tweak y-axis label "True Positive Rate" y-position

---

##03
+ remove chart title
+ change x-axis label to "False Positive Rate"

---

##02
+ with local d3js and tooltip js dependencies

---

[Interactive ROC Curve](http://bl.ocks.org/ilanman/f1b4a29749408dd826ef)
