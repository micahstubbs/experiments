#the goal of this script is to check the js implementation of Pearson's Correlation from here
# https://gist.github.com/matt-west/6500993
# against the implementation in R cor https://stat.ethz.ch/R-manual/R-devel/library/stats/html/cor.html
# method: a character string indicating which correlation coefficient (or covariance) is to be computed. One of "pearson" (default), 

panel.pearson <- function(x, y, ...) {
  horizontal <- (par("usr")[1] + par("usr")[2]) / 2; 
  vertical <- (par("usr")[3] + par("usr")[4]) / 2; 
  text(horizontal, vertical, format(abs(cor(x,y)), digits=2)) 
}

# first let's reproduce the example from here:
# http://www2.warwick.ac.uk/fac/sci/moac/people/students/peter_cock/r/iris_plots/
pairs(iris[1:4], main = "Edgar Anderson's Iris Data", pch = 21, bg = c("red","green3","blue")[unclass(iris$Species)], upper.panel=panel.pearson)

# now let's plot it with the diamonds dataset
# we'll omit color for the points for now
diamondsSubset <- diamonds[1:1999,]
pairs(diamondsSubset[,c(1, 5:10)], main = "ggplot2's Diamond Data", pch = 21, upper.panel=panel.pearson)

# write the subset out to csv to confirm that it matches the data we use for the d3 pairs plot
write.csv(diamondsSubset, file = "~/workspace/experiments/pairs/09/source-data/diamonds-r.csv", quote= TRUE)