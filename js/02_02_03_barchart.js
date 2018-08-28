function BarChart() {

    function chart(selection) {
        selection.each(function (d, i) {

            var dataValues = d3.values(d)[0];
            var columns = Object.keys(dataValues);
            columns.shift();

            var data = d
            data.forEach(function (d) {
                d[columns[1]] = +d[columns[1]];
                d[columns[2]] = +d[columns[2]];
                d[columns[3]] = +d[columns[3]];
                d[columns[0]] = +d[columns[0]];
            });


            var svg = d3.select("svg"),
                margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                width = +svg.attr("width") - margin.left - margin.right,
                height = +svg.attr("height") - margin.top - margin.bottom;


            var x = d3.scaleBand()
                .rangeRound([0, width - 300])
                .paddingInner(0.05)
                .align(0.1);

            var y = d3.scaleLinear()
                .rangeRound([height, 0]);

            var z = d3.scaleOrdinal()
                .range(["#385988", "#43B02A", "#FF671F", "#A4343A"]);


            //Here comes the chart
            var keys = data.columns.slice(1);

            data.sort(function (a, b) {
                return b.total - a.total;
            });
            x.domain(data.map(function (d) {
                return d.Tized;
            }));
            y.domain([0, 1]).nice();
            z.domain(keys);


            svg.selectAll("g").remove();
            g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.data.Tized);
                })
                .attr("y", function (d) {
                    return y(d[1]);
                })
                .attr("height", function (d) {
                    return y(d[0]) - y(d[1]);
                })
                .attr("width", x.bandwidth())

                .on("mouseover", function () {
                    tooltip.style("display", null);
                    d3.select(this).style("fill", function () {
                        return d3.rgb(d3.select(this).style("fill")).darker(0.3);
                    });
                })

                .on("mouseout", function () {
                    tooltip.style("display", "none");
                    d3.select(this).style("fill", function () {
                        return d3.rgb(d3.select(this).style("fill")).brighter(0.3);
                    });;
                })
                .on("mousemove", function (d) {
                    var xPosition = d3.mouse(this)[0] - 5;
                    var yPosition = d3.mouse(this)[1] - 5;
                    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                    tooltip.select("text").text((((d[1] - d[0]) * 100).toFixed(1)) + "%");
                });

            g.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "%")).append("text")
                .attr("x", 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")

            var legend = g.append("g")
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
                .attr("x", (width - 275))
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

            legend.append("text")
                .attr("x", (width - 245))
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .attr("text-anchor", "start")
                .text(function (d) {
                    return d;
                });

            // Prep the tooltip bits, initial display is hidden
            var tooltip = svg.append("g")
                .attr("class", "tooltip")
                .style("display", "none")


            tooltip.append("rect")
                .attr("width", 60)
                .attr("height", 20)
                .attr("fill", "white")
                .style("opacity", 0.7);

            tooltip.append("text")
                .attr("x", 30)
                .attr("dy", "1.2em")
                .style("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("font", "NeueHaasGroteskDisp Pro");

        });
    }

    return chart;
}
