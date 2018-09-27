// create the svg
var margin_020204 = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width_020204 = d3.select("#vis-020204").node().getBoundingClientRect().width - margin_020204.left - margin_020204.right,
    height_020204 = 450 - margin_020204.top - margin_020204.bottom;


var svg_020204 = d3.select("#vis-020204").append("svg")
    .attr("width", width_020204 + margin_020204.left + margin_020204.right)
    .attr("height", height_020204 + margin_020204.top + margin_020204.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_020204.left + "," + margin_020204.top + ")");

// set x scale
var x_020204 = d3.scaleBand()
    .rangeRound([0, width_020204 - 65 - 150])
    .paddingInner(0.15)
    .align(0.8);

// set y scale
var y_020204 = d3.scaleLinear()
    .rangeRound([height_020204, 0]);

// set the colors
var z_020204 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A", "#FF671F", "#A4343A"]);

// load the csv and create the chart
d3.csv("../../data/02_lakasminoseg_energiaszegenyseg/02_02_04_gaz_vs_fa.csv", function (d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
}, function (error, data) {
    if (error) throw error;

    var keys_020204 = data.columns.slice(1);

    x_020204.domain(data.map(function (d) {
        return d.Tized;
    }));
    y_020204.domain([0, d3.max(data, function (d) {
        return d.total;
    })]).nice();
    z_020204.domain(keys_020204);

    svg_020204.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys_020204)(data))
        .enter().append("g")
        .attr("fill", function (d) {
            return z_020204(d.key);
        })
        .selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x_020204(d.data.Tized);
        })
        .attr("y", function (d) {
            return y_020204(d[1]);
        })
        .attr("height", function (d) {
            return y_020204(d[0]) - y_020204(d[1]);
        })
        .attr("width", x_020204.bandwidth())
        .on("mouseover", function () {
            tooltip_020204.style("display", null);
        })
        .on("mouseout", function () {
            tooltip_020204.style("display", "none");
        })
        .on("mousemove", function (d) {
            console.log(d);
            var xPosition_020204 = d3.mouse(this)[0] + 15;
            var yPosition_020204 = d3.mouse(this)[1] + 15;
            tooltip_020204.attr("transform", "translate(" + xPosition_020204 + "," + yPosition_020204 + ")");
            tooltip_020204.select("text").text((((d[1] - d[0]) * 100).toFixed(1)) + "%");
        });

    svg_020204.append("g")
        .attr("class", "axis_020204")
        .attr("transform", "translate(0," + height_020204 + ")")
        .call(d3.axisBottom(x_020204));

    svg_020204.append("g")
        .attr("class", "axis_020204")
        .call(d3.axisLeft(y_020204).ticks(null, "%"))
        .append("text")
        .attr("x", 2)
        .attr("y", y_020204(y_020204.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("text-anchor", "start");

    svg_020204.append('text')
        .attr('id', '020204_title')
        .attr('x', ((width_020204 - 230) / 2))
        .attr('y', -5)
        .attr("text-anchor", "middle")
        .style('font-size', "18px")
    	.attr("font-family", "NeueHaasGroteskDisp Pro")
        .text("A lakások fűtési módja jövedelmi tizedek szerint (2016)");

    svg_020204.append('text')
        .attr("id", "020204_ytitle")
        .attr("x", ((width_020204 - 230) / 2))
        .attr("y", height_020204 + (margin_020204.bottom))
        .style("text-anchor", "middle")
        .style('font-size', "13px")
    	.attr("font-family", "NeueHaasGroteskDisp Pro")
        .text("Jövedelmi tized");


    svg_020204.append("text")
        .attr("class", "020204_forras")
        .attr("x", width_020204 - 325)
        .attr("y", height_020204 + margin_020204.bottom - 2)
        .style("text-anchor", "middle")
        .style("font-size", '13px')
        .style('text-decoration', 'underline')
        .style('font-style', 'italic')
    	.attr("font-family", "NeueHaasGroteskDisp Pro")
        .text("Adatok forrása: KSH 2018c, ")
        .on('click', function (d) {
            window.open(
                'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_zhc025a.html'
            );
        })
        .on('mouseover', function (d) {
            d3.select(this).style("cursor", "pointer");
        })

        .on("mouseout", function () {
            d3.select(this).style("cursor", "default");
        })
        .on("mousemove", function (d) {
            d3.select(this).style("cursor", "pointer");
        });

    svg_020204.append("text")
        .attr("class", "020202_forras")
        .attr("x", width_020204- 230)
        .attr("y", height_020204 + margin_020204.bottom - 2)
        .style("text-anchor", "middle")
        .style("font-size", '13px')
        .style('text-decoration', 'underline')
        .style('font-style', 'italic')
    	.attr("font-family", "NeueHaasGroteskDisp Pro")
        .text("2018d.")
        .on('click', function (d) {
            window.open(
                'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_zhc021a.html?down=29008'
            );
        })
        .on('mouseover', function (d) {
            d3.select(this).style("cursor", "pointer");
        })

        .on("mouseout", function () {
            d3.select(this).style("cursor", "default");
        })
        .on("mousemove", function (d) {
            d3.select(this).style("cursor", "pointer");
        });



    // Prep the tooltip bits, initial display is hidden
    var tooltip_020204 = svg_020204.append("g")
        .attr("class", "tooltip_020204")
        .style("display", "none");

    tooltip_020204.append("rect")
        .attr("width", 60)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("stroke", "#666")
        .attr("stroke-width", "0.5px");


    tooltip_020204.append("text")
        .attr("x", 30)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font", "sans-serif");

    var legend_020204 = svg_020204.append("g")
        .attr("font-family", "NeueHaasGroteskDisp Pro")
        .attr("font-size", "13px")
        .attr("text-anchor", "start")
        .selectAll("g")
        .data(keys_020204.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend_020204.append("rect")
        .attr("x", width_020204 - 210)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z_020204);

    legend_020204.append("text")
        .attr("class", "legend_020204")
        .attr("x", width_020204 - 185)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });
});
