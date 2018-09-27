function BarChartKomf() {

    function chartkomf(selectionkomf) {
        selectionkomf.each(function (d, i) {
            d3.select("#vis-komfort").remove();

            var margin_020203 = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },

                width_020203 = d3.select("#vis-020203").node().getBoundingClientRect().width - margin_020203.left - margin_020203.right,
                height_020203 = 450 - margin_020203.top - margin_020203.bottom;

            var x_020203 = d3.scaleBand()
                .rangeRound([0, width_020203 - 150])
                .paddingInner(0.15)
                .align(0.8);

            var y_020203 = d3.scaleLinear()
                .rangeRound([height_020203, 0]);

            var color_020203 = d3.scaleOrdinal()
                .range(["#385988", "#43B02A", "#FF671F", "#A4343A"]);

            var xAxis_020203 = d3.axisBottom()
                .scale(x_020203);

            var yAxis_020203 = d3.axisLeft(y_020203)
                .ticks(null, "%");

            var svg_020203 = d3.select("#vis-020203").append("svg")
                .attr("width", width_020203 + margin_020203.left + margin_020203.right)
                .attr("height", height_020203 + margin_020203.top + margin_020203.bottom)
                .attr("id", "vis-komfort")
                .append("g")
                .attr("transform", "translate(" + margin_020203.left + "," + margin_020203.top + ")");


            var dataValues_020203 = d3.values(d)[0];
            var columns_020203 = Object.keys(dataValues_020203);
            columns_020203.shift();
            var data_020203 = d

            data_020203.forEach(function (d) {
                data_020203[columns_020203[1]] = +data_020203[columns_020203[1]];
                data_020203[columns_020203[2]] = +data_020203[columns_020203[2]];
                data_020203[columns_020203[3]] = +data_020203[columns_020203[3]];
                data_020203[columns_020203[0]] = +data_020203[columns_020203[0]];
            });


            color_020203.domain(d3.keys(data_020203[0]).filter(function (key) {
                return key !== "Tized";
            }));


            data_020203.forEach(function (d) {
                var myregion_020203 = d.Tized; //add to stock code

                var y0_020203 = 0;
                //d.categories_020203 = color_020203.domain().map(function(name_020203) { return {name_020203: name_020203, y0_020203: y0_020203, y1_020203: y0_020203 += +d[name_020203]}; });
                d.categories_020203 = color_020203.domain().map(function (name_020203) {
                    //return { myregion_020203:myregion_020203, name_020203: name_020203, y0_020203: y0_020203, y1_020203: y0_020203 += +d[name_020203]}; });
                    return {
                        myregion_020203: myregion_020203,
                        name_020203: name_020203,
                        y0_020203: y0_020203,
                        y1_020203: y0_020203 += +d[name_020203],
                        value_020203: d[name_020203],
                        y_corrected_k: 0
                    };
                });
                d.total_020203 = d.categories_020203[d.categories_020203.length - 1].y1_020203;

            });



            x_020203.domain(data_020203.map(function (d) {
                return d.Tized;
            }));
            y_020203.domain([0, 1]);


            svg_020203.append("g")
                .attr("class", "axis_020203")
                .attr("transform", "translate(0," + height_020203 + ")")
                .call(xAxis_020203);

            svg_020203.append("g")
                .attr("class", "axis_020203")
                .call(yAxis_020203)
                .append("text")
                .attr("x", 2)
                .attr("y", y_020203(y_020203.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("text-anchor", "start");

            svg_020203.append('text')
                .attr("id", "020203_ytitle")
                .attr("x", (width_020203 / 2) - 70)
                .attr("y", height_020203 + (margin_020203.bottom))
                .style("text-anchor", "middle")
                .style("font-size", '13px')
            	.attr("font-family", "NeueHaasGroteskDisp Pro")
                .text("Jövedelmi tized");

            var state_020203 = svg_020203.selectAll(".state020203")
                .data(data_020203)
                .enter().append("g")
                .attr("class", "g")
                .attr("transform", function (d) {
                    return "translate(" + "0" + ",0)";
                })

            var tooltip_020203 = svg_020203.append("g")
                .attr("class", "tooltip_020203")
                .style("display", "none");

            tooltip_020203.append("rect")
                .attr("width", 60)
                .attr("height", 20)
                .attr("fill", "white")
                .attr("stroke", "#666")
                .attr("stroke-width", "0.5px");

            tooltip_020203.append("text")
                .attr("x", 30)
                .attr("dy", "1.2em")
                .style("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("font", "sans-serif");


            svg_020203.append('text')
                .attr('id', '020203_title')
                .attr('x', (width_020203 / 2)-70)
                .attr('y', 0)
                .attr("text-anchor", "middle")
                .style("font-size", "18px")
            	.attr("font-family", "NeueHaasGroteskDisp Pro")
                .text("A lakások komfortfokozata jövedelmi tizedek szerint (2016)");

            svg_020203.append("text")
                .attr("class", "020203_forras")
                .attr("x", width_020203 - 265)
                .attr("y", height_020203 + margin_020203.bottom - 2)
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

            svg_020203.append("text")
                .attr("class", "020202_forras")
                .attr("x", width_020203 - 170)
                .attr("y", height_020203 + margin_020203.bottom - 2)
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



            height_diff_k = 0; //height discrepancy when calculating h based on data vs y(d.y0_020203) - y(d.y1_020203)

            state_020203.selectAll("rect")
                .data(function (d) {
                    return d.categories_020203;
                })
                .enter().append("rect")
                .attr('id', "rect_020203")
                .attr("width", x_020203.bandwidth())
                .attr("y", function (d) {
                    height_diff_k = height_diff_k + y_020203(d.y0_020203) - y_020203(d.y1_020203) - (y_020203(0) - y_020203(d.value_020203));
                    y_corrected_k = y_020203(d.y1_020203) + height_diff_k;
                    d.y_corrected_k = y_corrected_k //store in d for later use in restorePlotK()
                    //return y_corrected_k;
                    return y_020203(d.y1_020203);
                })
                .attr("x", function (d) { //add to stock code
                    return x_020203(d.myregion_020203)
                })
                .attr("height", function (d) {
                    return y_020203(d.y0_020203) - y_020203(d.y1_020203); //heights calculated based on stacked values (inaccurate)
                    //return y_020203(0) - y_020203(d.value_020203); //calculate height directly from value in csv file
                })
                .style("fill", function (d) {
                    return color_020203(d.name_020203);
                });

            state_020203.selectAll("#rect_020203")
                .on("mouseover", function () {
                    tooltip_020203.style("display", null);
                })
                .on("mouseout", function () {
                    tooltip_020203.style("display", "none");
                })
                .on("mousemove", function (d) {
                    var delta_020203 = d.y1_020203 - d.y0_020203;
                    var xPosition_020203 = d3.mouse(this)[0] + 15;
                    var yPosition_020203 = d3.mouse(this)[1] + 15;
                    tooltip_020203.attr("transform", "translate(" + xPosition_020203 + "," + yPosition_020203 + ")")
                        .select("text").text((delta_020203 * 100).toFixed(1) + "%");
                    console.log(delta_020203)
                });

        });
    }

    return chartkomf;
}
