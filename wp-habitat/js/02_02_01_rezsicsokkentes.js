var tooltip, margin = {
        top: 30,
        right: 30,
        bottom: 50,
        left: 50
    },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom,
    svg_rezsicsokkentes = d3.select("#rezsicsokkentes").append("svg").attr("width", width).attr("height", height),
    g = svg_rezsicsokkentes.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
    x = d3.scaleBand().rangeRound([0, width]).paddingInner(.05).align(.1),
    y = d3.scaleLinear().rangeRound([height, 0]),
    z = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
d3.csv("/wp-habitat/data/02_lakasminoseg_energiaszegenyseg/02_02_01_rezsicsokkentes.csv", function (e, a, n) {
    for (a = 1, t = 0; a < n.length; ++a) t += e[n[a]] = +e[n[a]];
    return e.total = t, e
}, function (t, e) {
    var a, n;
    if (t) throw t;
    a = e.columns.slice(1), x.domain(e.map(function (t) {
        return t.Tized
    })), y.domain([0, d3.max(e, function (t) {
        return t.total
    })]).nice(), z.domain(a), g.append("g").selectAll("g").data(d3.stack().keys(a)(e)).enter().append("g").attr("fill", function (t) {
        return z(t.key)
    }).selectAll("rect").data(function (t) {
        return t
    }).enter().append("rect").attr("x", function (t) {
        return x(t.data.Tized)
    }).attr("y", function (t) {
        return y(t[1])
    }).attr("height", function (t) {
        return y(t[0]) - y(t[1])
    }).attr("width", x.bandwidth()).on("mouseover", function () {
        tooltip.style("display", null)
    }).on("mouseout", function () {
        tooltip.style("display", "none")
    }).on("mousemove", function (t) {
        var e, a;
        console.log(t), e = d3.mouse(this)[0] - 5, a = d3.mouse(this)[1] - 5, tooltip.attr("transform", "translate(" + e + "," + a + ")"), tooltip.select("text").text(t[1] - t[0])
    }), g.append("g").attr("class", "axis").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)), g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(null, "s")).append("text").attr("x", 2).attr("y", y(y.ticks().pop()) + .5).attr("dy", "0.32em").attr("fill", "#000").attr("font-weight", "bold").attr("text-anchor", "start"), (n = g.append("g").attr("font-family", "sans-serif").attr("font-size", 10).attr("text-anchor", "start").selectAll("g").data(a.slice().reverse()).enter().append("g").attr("transform", function (t, e) {
        return "translate(0," + 20 * e + ")"
    })).append("rect").attr("x", 19).attr("width", 19).attr("height", 19).attr("fill", z), n.append("text").attr("x", 45).attr("y", 9.5).attr("dy", "0.32em").text(function (t) {
        return t
    })
}), (tooltip = svg_rezsicsokkentes.append("g").attr("class", "tooltip").style("display", "none")).append("rect").attr("width", 60).attr("height", 20).attr("fill", "white").style("opacity", .5), tooltip.append("text").attr("x", 30).attr("dy", "1.2em").style("text-anchor", "middle").attr("font-size", "12px").attr("font-weight", "bold");
