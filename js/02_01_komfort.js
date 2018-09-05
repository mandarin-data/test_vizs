var margin = {
    top: 30,
    right: 30,
    bottom: 40,
    left: 50
};

var comfortWidth = window.innerWidth - margin.left - margin.right;
var comfortHeight = window.innerHeight - margin.top - margin.bottom;

var svg_komfort = d3.select("#vis-1")
    .append("svg")
    .attr("width", comfortWidth)
    .attr("height", comfortHeight);

var g = svg_komfort.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var comfortX = d3.scaleBand()
    .rangeRound([0, comfortWidth])
    .paddingInner(0.001)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([comfortHeight, 0]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]);

d3.csv("../../data/test/02_01_komfort.csv", function (d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
}, function (error, data) {
    if (error) throw error;

    var keys = data.columns.slice(1);

    data.sort(function (a, b) {
        return b.total - a.total;
    });
    comfortX.domain(data.map(function (d) {
        return d.Régió;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.total;
    })]).nice();
    z.domain(keys);

    g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter().append("g")
        .attr("fill", function (d) {
            return z(d.key);
        })
        .selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return comfortX(d.data.Régió);
        })
        .attr("y", function (d) {
            return y(d[1]);
        })
        .attr("height", function (d) {
            return y(d[0]) - y(d[1]);
        })
        .attr("width", comfortX.bandwidth());

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + comfortHeight + ")")
        .call(d3.axisBottom(comfortX));

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("%");


    // legend, fix mértek, szerintem rossz pozíció
    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });
    legend.append("rect")
        .attr("x", comfortWidth - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", comfortWidth - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });
});
