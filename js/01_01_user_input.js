var margin = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40
    },
    userInputWidth = d3.select("#vis-0101").node().getBoundingClientRect().width - margin.left - margin.right,
    userInputHeight = 450 - margin.top - margin.bottom;

var x = d3.scaleBand()
    .rangeRound([0, userInputWidth], 0.1)
    .paddingInner(0.1);

var y = d3.scaleLinear()
    .range([userInputHeight, 0]);

var xAxisUserInput = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(10);

var svg = d3.select("#vis-0101").append("svg")
    .attr("width", userInputWidth + margin.left + margin.right)
    .attr("height", userInputHeight + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("#vis-0101")
    .append("div")
    .attr("class", "toolTip")
    .style("visibility", "hidden");



d3.tsv("/wp-habitat/data/01_hozzaferhetoseg_es_megfizethetoseg/01_01_user_input.tsv", function (error, data) {
    x.domain(data.map(function (d) {
        return d.Decilis;
    }));
    y.domain([0, 100]);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + userInputHeight + ")")
        .call(xAxisUserInput);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Percent");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Decilis);
        })
        .attr("y", function (d) {
            return y(d["Percent"]);
        })

        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return userInputHeight - y(d["Percent"]);
        })

        .on("mousemove", function (d) {
            tooltip
                .style("visibility", "visible")
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html((d.Decilis) + ". decilis : " + (d["Percent"] + "%"));
        })
        .on("mouseout", function (d) {
            tooltip.style("display", "none");
        });
});



function myFunction() {
    var wage = document.getElementById("myForm").elements[0].value;
    var expend = document.getElementById("myForm").elements[1].value;
    var userexp = ((expend / wage) * 100);


    d3.tsv("/wp-habitat/data/01_hozzaferhetoseg_es_megfizethetoseg/01_01_user_input.tsv", function (error, data) {
        if (error) throw error;
        var period = data.filter(function (row) {
            row["Dec_f"] = +row["Dec_f"];
            row["Dec_a"] = +row["Dec_a"];
            return wage <= row['Dec_f'] && row['Dec_a'] <= wage;
        });

        var dec = period.filter(function (d) {
            return d.Decilis
        })[0].Decilis;

        var atl_kolt = period.filter(function (d) {
            return d.Decilis
        })[0]["Percent"];

        var dif = userexp - atl_kolt

        x.domain(data.map(function (d) {
            return d.Decilis;
        }));
        y.domain([0, 100]);

        svg.selectAll("text.label").remove();
        svg.selectAll("text.label1").remove();
        svg.selectAll("text.label2").remove();
        svg.selectAll("line.arrow").remove();
        svg.selectAll("g").remove();

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + userInputHeight + ")")
            .call(xAxisUserInput);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Percent");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.Decilis);
            })
            .attr("y", function (d) {
                return y(d["Percent"]);
            })

            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                return userInputHeight - y(d["Percent"]);
            })

            .on("mousemove", function (d) {
                tooltip
                    .style("visibility", "visible")
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.Decilis) + ". decilis : " + (d["Percent"] + "%"));
            })
            .on("mouseout", function (d) {
                tooltip.style("display", "none");
            });

        // add text and arrow

        svg.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("orient", "auto")
            .append("path")
            .attr("class", "marker")
            .attr("d", "M0,-5L10,0L0,5");

        svg.selectAll("text.label")
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("text")
            .attr("class", "label")
            .attr("x", function (d) {
                return userInputWidth / 2;
            }).attr("y", function (d) {
                return 10;
            })
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("A " + dec + ". jövedelmi decilisbe tartozik,")


        svg.selectAll("text.label1")
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("text")
            .attr("class", "label")
            .attr("x", function (d) {
                return userInputWidth / 2;
            }).attr("y", function (d) {
                return 25;
            })
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text(function (d) {
                if (dif < 0) {
                    return "melynek átlagához képest " + Math.round(Math.abs(dif)) + " százalékkal"
                } else {
                    return "melynek átlagához képest " + Math.round(Math.abs(dif)) + " százalékkal"
                };
            })

        svg.selectAll("text.label2")
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("text")
            .attr("class", "label")
            .attr("x", function (d) {
                return userInputWidth / 2;
            }).attr("y", function (d) {
                return 40;
            })
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text(function (d) {
                if (dif < 0) {
                    return "költ kevesebbet lahatásra"
                } else {
                    return "költ többet lahatásra"
                };
            })

        svg.selectAll("line.arrow")
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("line")
            .attr("class", "arrow")
            .attr("x1", function (d) {
                if (dec < 4) {
                    return (userInputWidth / 2 - 60)
                } else if (dec > 6) {
                    return (userInputWidth / 2 + 60)
                } else {
                    return userInputWidth / 2
                };
            })
            .attr("x2", function (d) {
                return ((x(d.Decilis) - 4) / 2) * 1 + ((x(d.Decilis) - 4) * (dec - 1));
            })
            .attr("y1", function (d) {
                return 65;
            })
            .attr("y2", function (d) {
                return (userInputHeight * ((100 - atl_kolt) / 100)) - 25;
            })
            .attr("marker-end", "url(#arrow)");

    });

}

function type(d) {
    d["Percent"] = +d["Percent"];
    return d;
}
