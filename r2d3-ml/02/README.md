html, js, and css files fetched from http://www.r2d3.us/visual-intro-to-machine-learning-part-1/ with wget

`brew install wget`
`wget -erobots=off --no-parent --wait=3 --limit-rate=20K -r -p -U "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)" -A htm,html,css,js,json,gif,jpeg,jpg,bmp http://www.r2d3.us/visual-intro-to-machine-learning-part-1/`

modeled on the answer at http://superuser.com/a/130313/203455
