(function (t) {
  var n = window.innerWidth <= 480,
    e = n ? window.innerWidth < 320 ? 320 : window.innerWidth : 720,
    r = e,
    i = {
      top: 0,
      right: 0,
      bottom: -0,
      left: -0
    },
    a = 10,
    u = {
      houses: "1Xb8Srdx91Q_g5yoYomjKtV8Wh8DsmeTU58M9NCwIu14",
      units: "1M3q7uzvOAp5kWPQ0uSyGkdiNSlZR3Syq86GNgXKlzFg"
    },
    o = -5e4,
    s, l, f, c, h, p, d;
  var g = t.behavior.zoom()
    .scaleExtent([1, 10])
    .center([e / 2, r / 2])
    .on("zoom", D);
  var m = t.select("#app")
    .append("svg")
    .attr("width", e)
    .attr("height", r)
    .append("g")
    .attr("transform", "translate(" + i.left + "," + i.right + ")")
    .call(g);
  var v = m.append("rect")
    .attr("width", e)
    .attr("height", r)
    .style("fill", "none")
    .style("pointer-events", "all");
  var y = m.append("g");
  y.append("image")
    .attr("class", "background")
    .attr("xlink:href", "map.svg")
    .attr("width", 720)
    .attr("height", 720);
  var _ = t.scale.linear()
    .range([0, 720])
    .domain([0, 1500]);
  var w = t.scale.linear()
    .range([0, 720])
    .domain([0, 1500]);
  var x = t.scale.sqrt()
    .range([0, a]);
  var b = t.scale.linear()
    .range(["#E84261", "#ffe08a"])
    .interpolate(t.interpolateRgb);
  var M = t.scale.linear()
    .range(["#ffe08a", "#3FEA95"])
    .interpolate(t.interpolateRgb);
  var k = t.select("#app")
    .append("div")
    .attr("class", "ttip ttip--hidden");
  k.append("div")
    .attr("class", "ttip__icon")
    .append("div")
    .attr("class", "ttip__icon__image");
  k.append("div")
    .attr("class", "ttip__details")
    .append("p")
    .attr("class", "ttip__details__name");
  k.select(".ttip__details")
    .append("p")
    .attr("class", "ttip__details__median")
    .append("span")
    .attr("class", "ttip__details__median__change");
  S("houses");

  function S(n) {
    U(n, function (n, e) {
      if (e) throw e;
      var r = false;
      if (d) {
        r = true
      }
      d = n.toJSON();
      x.domain([0, t.max(d, function (t) {
        return t.median
      })]);
      b.domain([-t.max(d, function (t) {
        return t.change
      }), 0]);
      M.domain([0, t.max(d, function (t) {
        return t.change
      })]);
      A(d);
      L(d);
      j(d);
      if (!r) {
        Y()
      }
      if (!r) {
        z()
      } else {
        B()
      }
      l.on("mouseover", X);
      l.on("mouseleave", W)
    })
  }

  function A(n) {
    var e = n.sort(function (n, e) {
        return t.descending(n.median, e.median)
      })
      .slice(0, 10);
    var r = n.sort(function (n, e) {
        return t.descending(n.change, e.change)
      })
      .slice(0, 10);
    l = y.selectAll(".station")
      .data(n);
    l.transition()
      .duration(500)
      .attr("transform", function (t) {
        return "translate(" + _(+t.x) + "," + w(+t.y) + ")"
      })
      .each(function (n) {
        t.select(this)
          .select("circle.station__bg")
          .transition()
          .duration(500)
          .attr("r", x(n.median))
          .attr("fill", function (t) {
            if (t.change === o) {
              return b(0)
            } else if (t.change > 0) {
              return M(t.change)
            }
            return b(t.change)
          });
        t.select(this)
          .select("image.station__icon")
          .transition()
          .duration(500)
          .attr("width", x(n.median))
          .attr("height", x(n.median))
          .attr("transform", function (t) {
            return "translate(-" + x(t.median) * .5 + ",-" + x(t.median) * .5 + ")"
          });
        t.select(this)
          .select("text")
          .attr("class", "station__major-label")
          .attr("dx", function () {
            return E(n.name)
          })
          .attr("dy", function () {
            return N(n.name)
          })
          .attr("fill", function () {
            if (n.major === "T") {
              if (n.change === o) {
                return t.rgb(b(0))
                  .darker()
              } else if (n.change > 0) {
                return t.rgb(M(n.change))
                  .darker()
              }
              return t.rgb(b(n.change))
                .darker()
            }
          })
          .text(function () {
            if (n.major === "T") {
              return n.name
            }
            return ""
          });
        if (e.indexOf(n) !== -1) {
          t.select(this)
            .classed("top-ten-median", true)
            .attr("rank-median", e.indexOf(n) + 1);
          if (t.select(this)
            .select("g.station__median-rank")
            .empty()) {
            t.select(this)
              .append("g")
              .classed("station__median-rank", true)
              .attr("transform", "translate(0, " + -(a * 2.5) + ")")
          }
          var i = t.select(this)
            .select("g.station__median-rank")
            .classed("station__median-rank--hidden", true);
          if (i.select("text")
            .empty()) {
            i.append("text")
          }
          i.select("text")
            .text(e.indexOf(n) + 1)
            .attr("transform", "translate(0," + a * .25 + ")")
        } else {
          t.select(this)
            .classed("top-ten-median", false)
            .attr("rank-median", null);
          t.select(this)
            .select("g.station__median-rank")
            .classed("station__median-rank--hidden", true)
        }
        if (r.indexOf(n) !== -1) {
          t.select(this)
            .classed("top-ten-change", true)
            .attr("rank-change", r.indexOf(n) + 1);
          if (t.select(this)
            .select("g.station__change-rank")
            .empty()) {
            t.select(this)
              .append("g")
              .classed("station__change-rank", true)
              .attr("transform", "translate(0, " + -(a * 2.5) + ")")
          }
          var i = t.select(this)
            .select("g.station__change-rank")
            .classed("station__change-rank--hidden", true);
          if (i.select("text")
            .empty()) {
            i.append("text")
          }
          i.select("text")
            .text(r.indexOf(n) + 1)
            .attr("transform", "translate(0," + a * .25 + ")")
        } else {
          t.select(this)
            .classed("top-ten-change", false)
            .attr("rank-change", null);
          t.select(this)
            .select("g.station__change-rank")
            .classed("station__change-rank--hidden", true)
        }
      });
    l.enter()
      .append("g")
      .attr("class", "station")
      .attr("transform", function (t) {
        return "translate(" + _(+t.x) + "," + w(+t.y) + ")"
      })
      .each(function (n) {
        t.select(this)
          .append("circle")
          .attr("class", "station__bg")
          .attr("r", x(n.median))
          .attr("fill", function (t) {
            if (t.change === o) {
              return b(0)
            } else if (t.change > 0) {
              return M(t.change)
            }
            return b(t.change)
          });
        t.select(this)
          .append("image")
          .attr("class", "station__icon")
          .attr("xlink:href", "station__icon.svg")
          .attr("width", x(n.median))
          .attr("height", x(n.median))
          .attr("transform", function (t) {
            return "translate(-" + x(t.median) * .5 + ",-" + x(t.median) * .5 + ")"
          });
        t.select(this)
          .append("text")
          .attr("class", "station__major-label")
          .attr("dx", function () {
            return E(n.name)
          })
          .attr("dy", function () {
            return N(n.name)
          })
          .attr("fill", function () {
            if (n.major === "T") {
              if (n.change === o) {
                return t.rgb(b(0))
                  .darker()
              } else if (n.change > 0) {
                return t.rgb(M(n.change))
                  .darker()
              }
              return t.rgb(b(n.change))
                .darker()
            }
          })
          .text(function () {
            if (n.major === "T") {
              return n.name
            }
            return ""
          });
        if (e.indexOf(n) !== -1) {
          t.select(this)
            .classed("top-ten-median", true)
            .attr("rank-median", e.indexOf(n) + 1);
          var i = t.select(this)
            .append("g")
            .classed("station__median-rank", true)
            .classed("station__median-rank--hidden", true)
            .attr("transform", "translate(0, " + -(a * 2.5) + ")");
          i.append("text")
            .text(e.indexOf(n) + 1)
            .attr("transform", "translate(0," + a * .25 + ")")
        }
        if (r.indexOf(n) !== -1) {
          t.select(this)
            .classed("top-ten-change", true)
            .attr("rank-change", r.indexOf(n) + 1);
          var i = t.select(this)
            .append("g")
            .classed("station__change-rank", true)
            .classed("station__change-rank--hidden", true)
            .attr("transform", "translate(0, " + -(a * 2.5) + ")");
          i.append("text")
            .text(r.indexOf(n) + 1)
            .attr("transform", "translate(0," + a * .25 + ")")
        }
      });
    l.exit()
      .remove()
  }

  function E(t) {
    switch (t) {
    case "Melton":
      return "-20";
    case "Sandringham":
      return "-32.5";
    case "Pakenham":
      return "-70";
    case "Belgrave":
      return "-70";
    case "Cranbourne":
      return "-30";
    case "Campbellfield":
      return "-35"
    }
    return "12.5"
  }

  function N(t) {
    switch (t) {
    case "Melton":
      return "20";
    case "Sandringham":
      return "20";
    case "Campbellfield":
      return "-15";
    case "Cranbourne":
      return "20"
    }
    return "3"
  }

  function D() {
    if (n) {
      k.attr("class", "ttip ttip--hidden")
    }
    t.select(".menu")
      .classed("menu--hovered", true);
    y.attr("transform", "translate(" + t.event.translate + ")scale(" + t.event.scale + ")")
  }

  function C() {
    m.call(g.event);
    var t = g.center(),
      n = g.translate(),
      e = T(t);
    g.scale(g.scale() * Math.pow(2, +this.getAttribute("data-zoom")));
    var r = P(e);
    g.translate([n[0] + t[0] - r[0], n[1] + t[1] - r[1]]);
    m.transition()
      .duration(500)
      .call(g.event)
  }

  function T(t) {
    var n = g.scale(),
      e = g.translate();
    return [(t[0] - e[0]) / n, (t[1] - e[1]) / n]
  }

  function P(t) {
    var n = g.scale(),
      e = g.translate();
    return [t[0] * n + e[0], t[1] * n + e[1]]
  }

  function L(e) {
    if (f) {
      f.remove()
    }
    var i = t.max(e, function (t) {
        return t.change
      }),
      a = [-i, 0, i];
    var u = {};
    if (n) {
      u.containerX = 15;
      u.containerY = 27.5;
      u.mainBarWidth = 175;
      u.mainBarHeight = 20;
      u.mainBarBorderWidth = 0;
      u.pegInterval = 35;
      u.pegWidth = 2;
      u.pegHeight = 26;
      u.pegOffset = 1;
      u.pegFill = "#fff";
      u.pegLabelsX = [8, 85.5, 152.5];
      u.pegLabelsY = 14;
      u.labelX = 0;
      u.labelY = -5.5
    } else {
      u.containerX = 32.5;
      u.containerY = r - 60;
      u.mainBarWidth = 250;
      u.mainBarHeight = 30;
      u.mainBarBorderWidth = 1;
      u.pegBorderWidth = 6;
      u.pegBorderHeight = 30;
      u.pegBorderOffset = 3;
      u.pegInterval = 50;
      u.pegWidth = 4;
      u.pegHeight = 36;
      u.pegOffset = 2;
      u.pegFill = "#C5EBF9";
      u.pegLabelsX = [10, 118, 215];
      u.pegLabelsY = 20;
      u.labelX = 0;
      u.labelY = -12.5
    }
    f = y.append("g")
      .attr("class", "legend__change")
      .attr("transform", "translate(" + u.containerX + "," + u.containerY + ")");
    var o = f.append("defs")
      .append("linearGradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%")
      .attr("id", "legend__change__gradient");
    o.selectAll("stop")
      .data(a)
      .enter()
      .append("stop")
      .attr("offset", function (t, n) {
        return n * 50 + "%"
      })
      .style("stop-color", function (t) {
        if (t > 0) {
          return M(t)
        }
        return b(t)
      })
      .style("stop-opacity", 1);
    f.append("rect")
      .attr("width", u.mainBarWidth)
      .attr("height", u.mainBarHeight)
      .attr("stroke", "#000")
      .attr("stroke-width", u.mainBarBorderWidth)
      .attr("fill", "url(#legend__change__gradient)");
    if (!n) {
      f.selectAll("rect.legend__change__peg__border")
        .data([1, 2, 3, 4])
        .enter()
        .append("rect")
        .attr("class", "legend__change__peg__border")
        .attr("width", u.pegBorderWidth)
        .attr("height", u.pegBorderHeight)
        .attr("fill", "#000")
        .attr("transform", function (t) {
          return "translate(" + (u.pegInterval * t - u.pegBorderOffset) + "," + 0 + ")"
        })
    }
    f.selectAll("rect.legend__change__peg")
      .data([1, 2, 3, 4])
      .enter()
      .append("rect")
      .attr("class", "legend__change__peg")
      .attr("width", u.pegWidth)
      .attr("height", u.pegHeight)
      .attr("fill", u.pegFill)
      .attr("transform", function (t) {
        return "translate(" + (u.pegInterval * t - u.pegOffset) + "," + -3 + ")"
      });
    f.selectAll("text.legend__change__peg__text")
      .data(a)
      .enter()
      .append("text")
      .attr("class", "legend__change__peg__text")
      .attr("transform", function (t, n) {
        return "translate(" + u.pegLabelsX[n] + "," + u.pegLabelsY + ")"
      })
      .attr("fill", function (n) {
        if (n > 0) {
          return t.rgb(M(a[0]))
            .darker(2.5)
        }
        return t.rgb(b(a[0]))
          .darker(2.5)
      })
      .text(function (t) {
        if (n) {
          return t.toFixed(0)
        }
        return t.toFixed(0) + "%"
      });
    f.append("text")
      .attr("transform", "translate(" + u.labelX + "," + u.labelY + ")")
      .attr("class", "legend__label")
      .text(function () {
        if (n) {
          return "Annual change in median property price (%)"
        }
        return "Annual change in median property price"
      })
  }

  function j(e) {
    if (c) {
      c.remove()
    }
    var i = {};
    if (n) {
      i.containerX = 15;
      i.containerY = 77.5;
      i.textXOffset = 10;
      i.textY = 2.5;
      i.labelY = -10;
      i.groupYInterval = 25;
      i.groupXOffset = 1.5
    } else {
      i.containerX = 32.5;
      i.containerY = r - 180;
      i.textXOffset = 15;
      i.textY = 3.5;
      i.labelY = -12.5;
      i.groupYInterval = 30;
      i.groupXOffset = 2.5
    }
    var a = t.max(e, function (t) {
        return t.median
      }),
      u = [a, a * .75, a * .5],
      o = t.format("$.3s");
    c = y.append("g")
      .attr("class", "legend__median")
      .attr("transform", "translate(" + i.containerX + "," + i.containerY + ")");
    c.selectAll("g")
      .data(u)
      .enter()
      .append("g")
      .each(function (n, e) {
        t.select(this)
          .attr("transform", "translate(" + (10 - e * i.groupXOffset) + "," + (e * i.groupYInterval + 10) + ")");
        t.select(this)
          .append("circle")
          .attr("r", x(n))
          .attr("fill", "#1388B3");
        t.select(this)
          .append("image")
          .attr("xlink:href", "station__icon.svg")
          .attr("width", x(n))
          .attr("height", x(n))
          .attr("transform", function (t) {
            return "translate(-" + x(t) * .5 + ",-" + x(t) * .5 + ")"
          });
        t.select(this)
          .append("text")
          .text(o(n))
          .attr("transform", "translate(" + (x(n) + i.textXOffset) + "," + i.textY + ")")
          .attr("class", "legend__median__text")
      });
    c.append("text")
      .attr("transform", "translate(" + 0 + "," + i.labelY + ")")
      .attr("class", "legend__label")
      .text("Median property price")
  }

  function I(n) {
    var e = t.select(n)
      .data()[0],
      r = O(e, n);
    var i = t.format("$.3s");
    k.select(".ttip__details__name")
      .html(e.name)
      .style("color", function () {
        if (e.change === o) {
          return t.rgb(b(0))
            .darker()
        } else if (e.change > 0) {
          return t.rgb(M(e.change))
            .darker()
        }
        return t.rgb(b(e.change))
          .darker()
      });
    k.select(".ttip__icon")
      .style("background", function () {
        if (e.change === o) {
          return b(0)
        } else if (e.change > 0) {
          return M(e.change)
        }
        return b(e.change)
      });
    k.select(".ttip__details__median")
      .html(i(e.median) + "<span class='ttip__details__median__change'></span>");
    k.select(".ttip__details__median__change")
      .html(function () {
        if (e.change === o) {
          return "No data"
        }
        return e.change.toFixed(1) + "%"
      })
      .attr("class", function () {
        if (e.change === o) {
          return "ttip__details__median__change ttip__details__median__change--even"
        } else if (e.change > 0) {
          return "ttip__details__median__change ttip__details__median__change--up"
        } else if (e.change < 0) {
          return "ttip__details__median__change ttip__details__median__change--down"
        }
        return "ttip__details__median__change ttip__details__median__change--even"
      });
    k.style("top", r.y + "px")
      .style("left", r.x + "px")
      .attr("class", "ttip")
  }

  function O(i, a) {
    var u, o = t.select(a),
      s, l, f = {
        x: [799.556, 851.112, 902.668, 948.831, 994.998, 1041.165, 1087.332, 1133.499, 1179.666, 1225.833],
        y: 598
      };
    if (!n) {
      if (o.classed("top-ten-median") && t.select("input[name=top10Toggle]:checked")
        .property("value") === "top10MediansOn") {
        u = +o.attr("rank-median");
        s = f.x[u - 1];
        l = f.y
      } else if (o.classed("top-ten-change") && t.select("input[name=top10Toggle]:checked")
        .property("value") === "top10ChangesOn") {
        u = +o.attr("rank-change");
        s = f.x[u - 1];
        l = f.y
      }
    }
    var c = {};
    if (n) {
      c.rightBoundary = .45;
      c.topBoundary = .8;
      c.bottomBoundary = .2;
      c.tooltipWidth = 150;
      c.tooltipHeight = 52.5
    } else {
      c.rightBoundary = .5;
      c.topBoundary = .8;
      c.bottomBoundary = .2;
      c.tooltipWidth = 200;
      c.tooltipHeight = 70
    }
    var h = _(s || i.x),
      p = w(l || i.y),
      d = x(i.median) + 7.5,
      g = -(c.tooltipHeight / 2),
      m = {
        x: t.transform(y.attr("transform"))
          .translate[0],
        y: t.transform(y.attr("transform"))
          .translate[1]
      },
      v = t.transform(y.attr("transform"))
      .scale[0];
    h *= v;
    p *= v;
    h += m.x;
    p += m.y;
    if (e - h < e * c.rightBoundary) {
      d = -x(i.median) - 7.5
    }
    if (r - p > r * c.topBoundary) {
      g = 0
    }
    if (r - p < r * c.bottomBoundary) {
      g = -c.tooltipHeight
    }
    d *= v;
    if (d < 0) {
      d -= c.tooltipWidth
    }
    return {
      x: h + d,
      y: p + g
    }
  }

  function z() {
    if (n) {
      return
    }
    var t = y.append("g")
      .classed("title", true)
      .attr("transform", "translate(" + _(780) + "," + w(552.409) + ")");
    t.append("text")
      .classed("title__main", true)
      .text("Down the line");
    t.append("text")
      .classed("title__sub", true)
      .text("Property prices across Melbourne")
      .attr("transform", "translate(0,20)")
  }

  function q() {
    var n = t.select(".title")
      .classed("title--shrunk", true)
      .transition()
      .duration(500)
      .attr("transform", "translate(" + _(780) + "," + w(455.409) + ")");
    n.select(".title__sub")
      .attr("transform", "translate(0,17.5)")
  }

  function B() {
    var n = t.select(".title")
      .classed("title--shrunk", false)
      .transition()
      .duration(500)
      .attr("transform", "translate(" + _(780) + "," + w(552.409) + ")");
    n.select(".title__sub")
      .attr("transform", "translate(0,20)")
  }

  function Y() {
    var e = t.select("#app")
      .append("div")
      .attr("class", "menu");
    if (!n) {
      var r = e.append("div")
        .attr("class", "zoom-menu");
      r.append("img")
        .attr("src", "domain.png")
        .style("margin-bottom", "5px");
      r.append("button")
        .text("+")
        .attr("data-zoom", "1")
        .on("click", C);
      r.append("br");
      r.append("button")
        .text("-")
        .attr("data-zoom", "-1")
        .on("click", C);
      r.append("hr")
    }
    var i = e.append("form")
      .attr("class", "data-menu");
    i.append("label")
      .html("Houses");
    i.append("input")
      .attr("type", "radio")
      .attr("value", "houseData")
      .attr("checked", "checked")
      .attr("name", "dataToggle")
      .on("click", function () {
        S("houses");
        if (!n) {
          document.getElementById("top10Off")
            .checked = true
        }
      });
    i.append("br");
    i.append("label")
      .html("Units");
    i.append("input")
      .attr("type", "radio")
      .attr("value", "unitsData")
      .attr("name", "dataToggle")
      .on("click", function () {
        S("units");
        if (!n) {
          document.getElementById("top10Off")
            .checked = true
        }
      });
    if (!n) {
      i.append("hr");
      var a = e.append("form")
        .attr("class", "ranking-menu");
      a.append("label")
        .html("Top 10 median price");
      a.append("input")
        .attr("type", "radio")
        .attr("id", "top10MediansOn")
        .attr("value", "top10MediansOn")
        .attr("name", "top10Toggle")
        .on("click", function () {
          G();
          Z();
          q()
        });
      a.append("br");
      a.append("label")
        .html("Top 10 growth rates");
      a.append("input")
        .attr("type", "radio")
        .attr("id", "top10ChangesOn")
        .attr("value", "top10ChangesOn")
        .attr("name", "top10Toggle")
        .on("click", function () {
          $();
          V();
          q()
        });
      a.append("br");
      a.append("label")
        .html("Turn rankings off");
      a.append("input")
        .attr("type", "radio")
        .attr("id", "top10Off")
        .attr("value", "top10Off")
        .attr("name", "top10Toggle")
        .attr("checked", "checked")
        .on("click", function () {
          $();
          G();
          B()
        })
    }
    if (n) {
      e.append("img")
        .attr("src", "domain.png")
        .attr("height", "18px")
        .attr("width", "80px")
        .style("margin-top", "5px")
    }
  }

  function R() {
    t.select(".app__loading")
      .classed("app__loading--hidden", false)
  }

  function F() {
    t.select(".app__loading")
      .classed("app__loading--hidden", true)
  }

  function U(t, n) {
    R();
    var e = new Miso.Dataset({
      importer: Miso.Dataset.Importers.GoogleSpreadsheet,
      parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
      key: u[t],
      worksheet: "1"
    });
    e.fetch({
      success: function () {
        n(e);
        F()
      },
      error: function (e) {
        console.error("Error: " + e + " Attempting fallback.");
        H(t, n)
      }
    })
  }

  function H(t, n) {
    var e = new Miso.Dataset({
      url: "./data/" + t + ".csv",
      delimiter: ","
    });
    e.fetch({
      success: function () {
        n(e);
        F()
      },
      error: function (t) {
        console.error("Error: " + t);
        n(e, t);
        F()
      }
    })
  }

  function X(n) {
    t.select(this)
      .select("circle")
      .style("stroke-width", 2)
      .style("stroke", function () {
        if (n.change === -5e4) {
          return b(0)
        } else if (n.change > 0) {
          return M(n.change)
        }
        return b(n.change)
      })
      .attr("fill", function () {
        if (n.change === -5e4) {
          return t.rgb(b(0))
            .brighter(.5)
        } else if (n.change > 0) {
          return t.rgb(M(n.change))
            .brighter(.5)
        }
        return t.rgb(b(n.change))
          .brighter(.5)
      });
    I(this)
  }

  function W(n, e) {
    t.select(this)
      .select("circle")
      .style("stroke-width", 0)
      .attr("fill", function () {
        if (n.change === -5e4) {
          return b(0)
        } else if (n.change > 0) {
          return M(n.change)
        }
        return b(n.change)
      });
    k.attr("class", "ttip ttip--hidden")
  }

  function Z() {
    var n = {
      x: [799.556, 851.112, 902.668, 948.831, 994.998, 1041.165, 1087.332, 1133.499, 1179.666, 1225.833],
      y: 598
    };
    m.call(g.event);
    g.scale(1);
    g.translate([-55, 0]);
    m.transition()
      .duration(500)
      .call(g.event);
    t.selectAll(".top-ten-median")
      .each(function () {
        var e = t.select(this),
          r = +e.attr("rank-median");
        e.transition()
          .duration(500)
          .attr("transform", function () {
            return "translate(" + _(n.x[r - 1]) + "," + w(n.y) + ")"
          });
        e.select(".station__major-label")
          .classed("station__major-label--hidden", true);
        e.select(".station__median-rank")
          .classed("station__median-rank--hidden", false);
        e.select(".station__change-rank")
          .classed("station__change-rank--hidden", true)
      })
  }

  function $() {
    t.selectAll(".top-ten-median")
      .each(function (n) {
        var e = t.select(this);
        e.transition()
          .duration(500)
          .attr("transform", function () {
            return "translate(" + _(+n.x) + "," + w(+n.y) + ")"
          });
        e.select(".station__major-label")
          .classed("station__major-label--hidden", false);
        e.select(".station__median-rank")
          .classed("station__median-rank--hidden", true)
      })
  }

  function V() {
    var n = {
      x: [799.556, 851.112, 902.668, 948.831, 994.998, 1041.165, 1087.332, 1133.499, 1179.666, 1225.833],
      y: 598
    };
    m.call(g.event);
    g.scale(1);
    g.translate([-55, 0]);
    m.transition()
      .duration(500)
      .call(g.event);
    t.selectAll(".top-ten-change")
      .each(function () {
        var e = t.select(this),
          r = +e.attr("rank-change");
        t.select(this)
          .transition()
          .duration(500)
          .attr("transform", function () {
            return "translate(" + _(n.x[r - 1]) + "," + w(n.y) + ")"
          });
        t.select(this)
          .select(".station__major-label")
          .classed("station__major-label--hidden", true);
        t.select(this)
          .select(".station__change-rank")
          .classed("station__change-rank--hidden", false);
        t.select(this)
          .select(".station__median-rank")
          .classed("station__median-rank--hidden", true)
      })
  }

  function G() {
    t.selectAll(".top-ten-change")
      .each(function (n) {
        var e = t.select(this);
        e.transition()
          .duration(500)
          .attr("transform", function () {
            return "translate(" + _(+n.x) + "," + w(+n.y) + ")"
          });
        e.select(".station__major-label")
          .classed("station__major-label--hidden", false);
        t.select(this)
          .select(".station__change-rank")
          .classed("station__change-rank--hidden", true)
      })
  }
})(d3);
