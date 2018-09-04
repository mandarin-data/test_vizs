// create the svg
var margin_020201 = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width_020201 = d3.select("#vis-020201").node().getBoundingClientRect().width - margin_020201.left - margin_020201.right,
    height_020201 = 450 - margin_020201.top - margin_020201.bottom;


var svg_020201 = d3.select("#vis-020201").append("svg")
    .attr("width", width_020201 + margin_020201.left + margin_020201.right)
    .attr("height", height_020201 + margin_020201.top + margin_020201.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_020201.left + "," + margin_020201.top + ")");


// set x scale
var x_020201 = d3.scaleBand()
    .rangeRound([0, width_020201])
    .paddingInner(0.05)
    .align(0.1);

// set y scale
var y_020201 = d3.scaleLinear()
    .rangeRound([height_020201, 0]);

// set the colors
var z_020201 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A"]);

// load the csv and create the chart
d3.csv("../../data/02_lakasminoseg_energiaszegenyseg/02_02_01_rezsicsokkentes.csv", function (d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
}, function (error, data) {
    if (error) throw error;

    var keys_020201 = data.columns.slice(1);

    x_020201.domain(data.map(function (d) {
        return d.Tized;
    }));
    y_020201.domain([0, d3.max(data, function (d) {
        return d.total;
    })]).nice();
    z_020201.domain(keys_020201);

    svg_020201.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys_020201)(data))
        .enter().append("g")
        .attr("fill", function (d) {
            return z_020201(d.key);
        })
        .selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x_020201(d.data.Tized);
        })
        .attr("y", function (d) {
            return y_020201(d[1]);
        })
        .attr("height", function (d) {
            return y_020201(d[0]) - y_020201(d[1]);
        })
        .attr("width", x_020201.bandwidth())
        .on("mouseover", function () {
            tooltip_020201.style("display", null);
        })
        .on("mouseout", function () {
            tooltip_020201.style("display", "none");
        })
        .on("mousemove", function (d) {
            console.log(d);
            var xPosition_020201 = d3.mouse(this)[0] - 5;
            var yPosition_020201 = d3.mouse(this)[1] - 5;
            tooltip_020201.attr("transform", "translate(" + (xPosition_020201 +15) + "," + (yPosition_020201+15) + ")");
            tooltip_020201.select("text").text(((d[1] - d[0])).toFixed(1));
        });

    svg_020201.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height_020201 + ")")
        .call(d3.axisBottom(x_020201));

    svg_020201.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y_020201).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y_020201(y_020201.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start");

    svg_020201.append('text')
        .attr('id', '020201_title')
        .attr('x', (width_020201 / 2))
        .attr('y', 0)
        .attr("text-anchor", "middle")
        .text("Energiaköltségek és rezsicsökkentés");

    svg_020201.append('text')
        .attr("id", "020201_forras")
        .attr("x", width_020201)
        .attr("y", height_020201 + (margin_020201.bottom))
        .attr("text-anchor", "end")
        .style('font-size', "12px")
        .text("Adatok forrása: nincs");
    
    // Prep the tooltip bits, initial display is hidden
    var tooltip_020201 = svg_020201.append("g")
        .attr("class", "tooltip_020201")
        .style("display", "none");

    tooltip_020201.append("rect")
        .attr("width", 60)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("stroke", "#666")
        .attr("stroke-width", "0.5px");


    tooltip_020201.append("text")
        .attr("x", 30)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font", "sans-serif");


    var legend_020201 = svg_020201.append("g")
        .attr("font-family", "NeueHaasGroteskDisp Pro")
        .attr("font-size", 10)
        .attr("text-anchor", "start")
        .selectAll("g")
        .data(keys_020201.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend_020201.append("rect")
        .attr("x", 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z_020201);

    legend_020201.append("text")
        .attr("class", "legend_020201")
        .attr("x", 45)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });
});

