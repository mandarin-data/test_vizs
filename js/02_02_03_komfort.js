var margin = {
        top: 30,
        right: 0,
        bottom: 30,
        left: 40
    },
    width = d3.select("#vis-020203").node().getBoundingClientRect().width - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var x = d3.scaleBand()
    .rangeRound([0, width - 230])
    .paddingInner(0.05)
    .align(0.8);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#385988", "#43B02A", "#FF671F", "#A4343A"]);

var svg = d3.select("#vis-020203").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("../../data/02_lakasminoseg_energiaszegenyseg/02_02_03_komfort.csv", function (d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
}, function (error, data) {
    if (error) throw error;

    var keys = data.columns.slice(1);

    data.sort(function (a, b) {
        return b.total - a.total;
    });
    x.domain(data.map(function (d) {
        return d.Tized;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.total;
    })]).nice();
    z.domain(keys);

    svg.append("g")
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
            return x(d.data.Tized);
        })
        .attr("y", function (d) {
            return y(d[1]);
        })
        .attr("height", function (d) {
            return y(d[0]) - y(d[1]);
        })
        .attr("width", x.bandwidth());

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("text-anchor", "start")
        .text("%");

    var legend = svg.append("g")
        .attr("font-family", "NeueHaasGroteskDisp Pro")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });
});
