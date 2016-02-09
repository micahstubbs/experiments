setwd('~/workspace/experiments/sample-data/austrian-city-regions/')

library(openxlsx)
library(reshape2)
library(ggmap)
library(jsonlite)

xlsxFile <- "wohnbevoelkerung_1971_-_2009.xlsx"

source_data <- read.xlsx(xlsxFile, sheet = 1, startRow = 2, colNames = TRUE,
          rowNames = FALSE, detectDates = FALSE, skipEmptyRows = TRUE,
          rows = NULL, cols = NULL, check.names = FALSE, namedRegion = NULL)

head(source_data)
df <- source_data

# filter for only Stadtregion or City Region level figures
df <- df[df$"SR/KZ/AZ" == "SR", ] 

# filter for only W = Large City Region Vienna, GS = Large City
df <- df[df$"Größen-klasse" %in% c("W", "GS"), ]

df <- transform(df, region = colsplit(Name, pattern = "\\s", names = c('type', 'city')))
head(df)

# select only the columns we're interested in
df <- df[ , c("region.city", "X1971", "X1981", "X1991", "X2001", "X2009")]
head(df)

# rename columns 
names(df)[names(df)=="region.city"] <- "city"
head(df)

# geocode the cities
geocodes <- geocode(as.character(df$city))
df <- data.frame(df[,1:6],geocodes)
head(df)

# rename columns once more
names(df)[names(df)=="X1971"] <- "1971"
names(df)[names(df)=="X1981"] <- "1981"
names(df)[names(df)=="X1991"] <- "1991"
names(df)[names(df)=="X2001"] <- "2001"
names(df)[names(df)=="X2009"] <- "2009"
head(df)

# melt
df <- melt(df, id.vars=c("city","lat","lon"), measure.vars=c("1971", "1981", "1991", "2001", "2009"), variable.name="year", value.name="population")
head(df)

# write out to json
myjson <- toJSON(df, pretty=TRUE, digits=5)
cat(myjson)
write(myjson, "large-cities.json")
