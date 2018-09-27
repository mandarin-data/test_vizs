// create the svg
var margin_020202 = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width_020202 = d3.select("#vis-020202").node().getBoundingClientRect().width - margin_020202.left - margin_020202.right,
    height_020202 = 450 - margin_020202.top - margin_020202.bottom;


var svg_020202 = d3.select("#vis-020202").append("svg")
    .attr("width", width_020202 + margin_020202.left + margin_020202.right)
    .attr("height", height_020202 + margin_020202.top + margin_020202.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_020202.left + "," + margin_020202.top + ")");

// set x scale
var x_020202 = d3.scaleBand()
    .rangeRound([0, width_020202-150])
    .paddingInner(0.15)
    .align(0.8);

// set y scale
var y_020202 = d3.scaleLinear()
    .rangeRound([height_020202, 0]);

// set the colors
var z_020202 = d3.scaleOrdinal()
    .range(["#C4D600", "#A4343A" , "#385988", "#43B02A", "#FF671F", "#888B8D"]);

// load the csv and create the chart
d3.csv("../../data/02_lakasminoseg_energiaszegenyseg/02_02_02_kiadasok_vs_jovedelem.csv", function (d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
}, function (error, data) {
    if (error) throw error;

    var keys_020202 = data.columns.slice(1);

    x_020202.domain(data.map(function (d) {
        return d.Tized;
    }));
    y_020202.domain([0, d3.max(data, function (d) {
        return d.total;
    })]).nice();
    z_020202.domain(keys_020202);

    svg_020202.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys_020202)(data))
        .enter().append("g")
        .attr("fill", function (d) {
            return z_020202(d.key);
        })
        .selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x_020202(d.data.Tized);
        })
        .attr("y", function (d) {
            return y_020202(d[1]);
        })
        .attr("height", function (d) {
            return y_020202(d[0]) - y_020202(d[1]);
        })
        .attr("width", x_020202.bandwidth())
        .on("mouseover", function () {
            tooltip_020202.style("display", null);
        })
        .on("mouseout", function () {
            tooltip_020202.style("display", "none");
        })
        .on("mousemove", function (d) {
            console.log(d);
            var xPosition_020202 = d3.mouse(this)[0] - 5;
            var yPosition_020202 = d3.mouse(this)[1] - 5;
            tooltip_020202.attr("transform", "translate(" + (xPosition_020202 + 15) + "," + (yPosition_020202 + 15) + ")");
            tooltip_020202.select("text").text(d[1] - d[0]);
        });

    svg_020202.append("g")
        .attr("class", "axis_020202")
        .attr("transform", "translate(0," + height_020202 + ")")
    		.style("font-size", "13px")

        .call(d3.axisBottom(x_020202));

    var locale = d3.formatLocale({
        decimal: ",",
    });

    var format = locale.format(",.1f");

    svg_020202.append("g")
        .attr("class", "axis_020202")
        .call(d3.axisLeft(y_020202).tickFormat(function (d) {
            if (this.parentNode.nextSibling) {
                return format(d / 1000000) + " M"
            } else {
                return format(d / 1000000) + " M"
            }
        }))
        .append("text")
        .attr("x", 2)
        .attr("y", y_020202(y_020202.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("text-anchor", "start");

    svg_020202.append('text')
        .attr('id', '020202_title')
        .attr('x', (width_020202 / 2)-70)
        .attr('y', 0)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
    	.attr("font-family", "NeueHaasGroteskDisp Pro")
        .text("Az alapvető szükségletek éves kiadásai jövedelmi tizedek szerint (Ft, 2016)");

    svg_020202.append("text")
        .attr("class", "020202_forras")
        .attr("x", width_020202 - 265)
        .attr("y", height_020202 + margin_020202.bottom - 2)
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

    svg_020202.append("text")
        .attr("class", "020202_forras")
        .attr("x", width_020202 - 170)
        .attr("y", height_020202 + margin_020202.bottom - 2)
        .style("text-anchor", "middle")
        .style("font-size", '13px')
        .style(	'text-decoration', 'underline')
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


    svg_020202.append('text')
        .attr("id", "020202_ytitle")
        .attr("x", (width_020202 / 2) - 70)
        .attr("y", height_020202 + (margin_020202.bottom))
        .style("text-anchor", "middle")
        .style("font-size", '14px')
    	.attr("font-family", "NeueHaasGroteskDisp Pro")
        .text("Jövedelmi tized");


    // Prep the tooltip bits, initial display is hidden
    var tooltip_020202 = svg_020202.append("g")
        .attr("class", "tooltip_020202")
        .style("display", "none");

    tooltip_020202.append("rect")
        .attr("width", 60)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("stroke", "#666")
        .attr("stroke-width", "0.5px");


    tooltip_020202.append("text")
        .attr("x", 30)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font", "sans-serif");

    var legend_020202 = svg_020202.append("g")
        .attr("font-family", "NeueHaasGroteskDisp Pro")
        .attr("text-anchor", "start")
        .selectAll("g")
        .data(keys_020202.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend_020202.append("rect")
        .attr("x", 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z_020202);

    legend_020202.append("text")
        .attr("class", "legend_020202")
        .attr("x", 45)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .style("font-size", '13px')
        .text(function (d) {
            return d;
        });

});
