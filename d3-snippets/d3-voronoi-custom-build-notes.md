npm i --save git+https://github.com/fil/d3-voronoi.git\#find

➜  d3 git:(voronoi-find) ✗ npm i --save-dev rimraf
d3@4.2.7 /Users/m/workspace/d3
└── rimraf@2.5.4

http://stackoverflow.com/questions/33448675/babel-6-cli-unexpected-token-export
npm install --save-dev babel-cli babel-preset-es2015

➜  node_modules git:(voronoi-find) ✗ cd d3-voronoi
➜  d3-voronoi git:(voronoi-find) ✗ la
total 88
-rw-r--r--   1 m  staff   154B Oct 19 18:56 .eslintrc
-rw-r--r--   1 m  staff    30B Oct 19 18:56 .npmignore
-rw-r--r--   1 m  staff   2.6K Oct 19 18:56 LICENSE
-rw-r--r--   1 m  staff    10K Oct 19 18:56 README.md
-rw-r--r--   1 m  staff    50B Oct 19 18:56 index.js
-rw-r--r--   1 m  staff    14K Oct 19 18:56 package.json
drwxr-xr-x  11 m  staff   374B Oct 19 18:56 src
➜  d3-voronoi git:(voronoi-find) ✗ sb .
➜  d3-voronoi git:(voronoi-find) ✗ npm run prepublish

> d3-voronoi@1.0.2 prepublish /Users/m/workspace/d3/node_modules/d3-voronoi
> npm run test && uglifyjs --preamble "$(preamble)" build/d3-voronoi.js -c -m -o build/d3-voronoi.min.js


> d3-voronoi@1.0.2 pretest /Users/m/workspace/d3/node_modules/d3-voronoi
> rm -rf build && mkdir build && rollup --banner "$(preamble)" -f umd -n d3 -o build/d3-voronoi.js -- index.js


> d3-voronoi@1.0.2 test /Users/m/workspace/d3/node_modules/d3-voronoi
> tape 'test/**/*-test.js' && eslint index.js src

➜  d3-voronoi git:(voronoi-find) ✗

---

npm i --save git+https://github.com/micahstubbs/d3.git\#voronoi-find