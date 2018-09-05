var margin_020301 = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 60
    },
    w_020301 = d3.select("#topic02-vis03-part01").node().getBoundingClientRect().width - margin_020301.left - margin_020301.right,
    h_020301 = d3.select("#topic02-vis03-part01").node().getBoundingClientRect().height - margin_020301.top - margin_020301.bottom,
    parseDate_020301 = d3.timeParse("%Y%m%d"),
    scaleX_020301 = d3.scaleTime().range([0, w_020301]),
    scaleY_020301 = d3.scaleLinear().range([h_020301, 0]),
    color_020301 = d3.scaleOrdinal().range(["#385988", "#43B02A", "#FF671F", "#A4343A"]),
    xAxis_020301 = d3.axisBottom().scale(scaleX_020301),
    yAxis_020301 = d3.axisLeft().scale(scaleY_020301),
    line_020301 = d3.line().x(function (t) {
        return scaleX_020301(t.date)
    }).y(function (t) {
        return scaleY_020301(t.ydata)
    }),
    svg_020301 = d3.select("#topic02-vis03-part01").append("svg").attr("width", w_020301 + margin_020301.left + margin_020301.right).attr("height", h_020301 + margin_020301.top + margin_020301.bottom).append("g").attr("transform", "translate(" + margin_020301.left + ", " + margin_020301.top + ")");

function type_020301(t, e, a) {
    t.date = parseDate_020301(t.date);
    for (var n = 1, s = a.length, o; n < s; ++n) t[o = a[n]] = +t[o];
    return t
}
d3.tsv("/wp-habitat/data/02_lakasminoseg_energiaszegenyseg/02_03_01_gaz_vs_fa_hasznalat_timeseries.tsv", type_020301, function (t, a) {
    var e, n, s, o, c, r;
    if (t) throw t;
    e = a.columns.slice(1).map(function (e) {
        return {
            name: e,
            values: a.map(function (t) {
                return {
                    date: t.date,
                    ydata: t[e]
                }
            })
        }
    }), scaleX_020301.domain(d3.extent(a, function (t) {
        return t.date
    })), scaleY_020301.domain([0, 1]), console.log("categories_020301", e), (n = svg_020301.selectAll("g").data(e).enter().append("g").attr("class", "legend")).append("rect").attr("x", w_020301 - 110).attr("y", function (t, e) {
        return 20 * e
    }).attr("width", 2).attr("height", 15).style("fill", function (t) {
        return color_020301(t.name)
    }), n.append("text").attr("font-size", 5e-4 * w_020301 + .5 + "em").attr("x", w_020301 - 105).attr("y", function (t, e) {
        return 20 * e + 12
    }).text(function (t) {
        return t.name
    }), svg_020301.append("g").attr("class", "x axis").attr("transform", "translate(0, " + h_020301 + ")").call(xAxis_020301).selectAll(".tick text").attr("font-size", 5e-4 * w_020301 + .5 + "em"), svg_020301.append("g").attr("class", "y axis").call(yAxis_020301).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").style("fill", "black").text("Adott fűtési módot használó háztartások aránya"), svg_020301.selectAll(".y.axis text").attr("font-size", 5e-4 * w_020301 + .5 + "em"), (s = svg_020301.selectAll(".category").data(e).enter().append("g").attr("class", "category")).append("path").attr("class", "line").attr("d", function (t) {
        return line_020301(t.values)
    }).style("stroke", function (t) {
        return color_020301(t.name)
    }), (o = svg_020301.append("g").attr("class", "mouse-over-effects")).append("path").attr("class", "mouse-line").style("stroke", "black").style("stroke-width", "1px").style("opacity", "0"), c = document.getElementsByClassName("line"), (r = o.selectAll(".mouse-per-line").data(e).enter().append("g").attr("class", "mouse-per-line")).append("circle").attr("r", 7).style("stroke", function (t) {
        return color_020301(t.name)
    }).style("fill", "none").style("stroke-width", "1px").style("opacity", "0"), r.append("text").attr("transform", "translate(10, 3)").attr("font-size", 5e-4 * w_020301 + .5 + "em"), o.append("rect").attr("width", w_020301).attr("height", h_020301).attr("fill", "none").attr("pointer-events", "all").on("mouseout", function () {
        d3.select(".mouse-line").style("opacity", "0"), d3.selectAll(".mouse-per-line circle").style("opacity", "0"), d3.selectAll(".mouse-per-line text").style("opacity", "0")
    }).on("mouseover", function () {
        d3.select(".mouse-line").style("opacity", "1"), d3.selectAll(".mouse-per-line circle").style("opacity", "1"), d3.selectAll(".mouse-per-line text").style("opacity", "1")
    }).on("mousemove", function () {
        var l, i = d3.mouse(this);
        console.log("Mouse:", i), d3.select(".mouse-line").attr("d", function () {
            var t = "M" + i[0] + ", " + h_020301;
            return t += " " + i[0] + ", 0"
        }), l = [], d3.selectAll(".mouse-per-line").attr("transform", function (t, e) {
            var a, n, s, o, r;
            for (console.log(w_020301 / i[0]), a = scaleX_020301.invert(i[0]), n = d3.bisector(function (t) {
                    return t.date
                }).right, idx_020301 = n(t.values, a), console.log("xDate:", a), console.log("bisect", n), console.log("idx:", idx_020301), s = 0, o = c[e].getTotalLength(), r = null, console.log("end", o); r = Math.floor((s + o) / 2), console.log("Target:", r), pos_020301 = c[e].getPointAtLength(r), console.log("Position", pos_020301.y), console.log("What is the position here:", pos_020301), r !== o && r !== s || pos_020301.x === i[0];)
                if (pos_020301.x > i[0]) o = r;
                else {
                    if (!(pos_020301.x < i[0])) break;
                    s = r
                }
            return d3.select(this).select("text").text(scaleY_020301.invert(pos_020301.y).toFixed(3)), l.push({
                ind: e,
                y: pos_020301.y,
                off: 0
            }), "translate(" + i[0] + ", " + pos_020301.y + ")"
        }).call(function (t) {
            l.sort(function (t, e) {
                return t.y - e.y
            }), l.forEach(function (t, e) {
                if (0 < e) {
                    var a = l[e - 1].y;
                    l[e].off = Math.max(0, a + 15 - l[e].y), l[e].y += l[e].off
                }
            }), l.sort(function (t, e) {
                return t.ind - e.ind
            })
        }).select("text").attr("transform", function (t, e) {
            return "translate (10, " + (3 + l[e].off) + ")"
        })
    })
});
