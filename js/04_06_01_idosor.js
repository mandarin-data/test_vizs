var margin_040601 = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 60
};

var w_040601 = d3.select("#topic04-vis06-part01").node().getBoundingClientRect().width - margin_040601.left - margin_040601.right;
var h_040601 = d3.select("#topic04-vis06-part01").node().getBoundingClientRect().height - margin_040601.top - margin_040601.bottom;

var parseDate_040601 = d3.timeParse("%Y%m%d");

var scaleX_040601 = d3.scaleTime()
    .range([0, w_040601]);

var scaleY_040601 = d3.scaleLinear()
    .range([h_040601, 0]);

var color_040601 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A", "#FF671F", "#A4343A"]);

var xAxis_040601 = d3.axisBottom()
    .scale(scaleX_040601);

var yAxis_040601 = d3.axisLeft()
    .scale(scaleY_040601)

var line_040601 = d3.line()
    .x(function (d) {
        return scaleX_040601(d.date)
    })
    .y(function (d) {
        return scaleY_040601(d.ydata)
    })
//.curve(d3.curveBasis);

var svg_040601 = d3.select("#topic04-vis06-part01").append("svg")
    .attr("width", w_040601 + margin_040601.left + margin_040601.right)
    .attr("height", h_040601 + margin_040601.top + margin_040601.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_040601.left + ", " + margin_040601.top + ")")


svg_040601.append('text')
    .attr("id", "idosor_forras")
    .attr("x", w_040601)
    .attr("y", h_040601 + (margin_040601.bottom))
    .attr("text-anchor", "end")
    .style('font-size', "12px")
    .text("Adatok forrása: Eurostat");

d3.tsv("../../data/04_adossag/04_06_01_idosor.tsv", type_040601, function (error, data) {
    if (error) throw error;

    var categories_040601 = data.columns.slice(1).map(function (name) {
        return {
            name: name,
            values: data.map(function (d) {
                return {
                    date: d.date,
                    ydata: d[name]
                };
            })
        };
    });

    scaleX_040601.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    scaleY_040601.domain([0, 100]);

    console.log("categories_040601", categories_040601);

    /*
    var legend_040601 = svg_040601.selectAll("g")
        .data(categories_040601)
        .enter()
        .append("g")
        .attr("class", "legend");

    legend_040601.append("rect")
        .attr("x", w_040601-110)
        .attr("y", function(d, i) {return i * 20;} )
        .attr("width", 2)
        .attr("height", 15)
        .style("fill", function(d) {return color_040601(d.name);} );

    legend_040601.append("text")
        .attr("x", w_040601-105)
        .attr("y", function(d, i) {return (i * 20) + 12;} )
        .text(function(d) {return d.name;} );

    */

    svg_040601.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + h_040601 + ")")
        .call(xAxis_040601)
    

    svg_040601.append("g")
        .attr("class", "y axis")
        .call(yAxis_040601)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("fill", "black")
        .text("Közműhátralékkal rendelkező háztartások aránya");

    var category_040601 = svg_040601.selectAll(".category")
        .data(categories_040601)
        .enter().append("g")
        .attr("class", "category");

    category_040601.append("path")
        .attr("class", "line")
        .attr("d", function (d) {
            return line_040601(d.values);
        })
        .style("stroke", function (d) {
            return color_040601(d.name)
        });

    var mouseG_040601 = svg_040601.append("g") // black vertical line to folow mouse
        .attr("class", "mouse-over-effects");

    mouseG_040601.append("path")
        .attr("class", "mouse-line")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", "0");

    var lines_040601 = document.getElementsByClassName("line");
    var mousePerLine_040601 = mouseG_040601.selectAll(".mouse-per-line")
        .data(categories_040601)
        .enter()
        .append("g")
        .attr("class", "mouse-per-line");

    mousePerLine_040601.append("circle")
        .attr("r", 7)
        .style("stroke", function (d) {
            return color_040601(d.name);
        })
        .style("fill", "none")
        .style("stroke-width", "1px")
        .style("opacity", "0");

    mousePerLine_040601.append("text")
        .attr("transform", "translate(10, 3)");
    mouseG_040601.append("rect")
        .attr("width", w_040601)
        .attr("height", h_040601)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mouseout", function () {
            d3.select(".mouse-line").style("opacity", "0");
            d3.selectAll(".mouse-per-line circle").style("opacity", "0");
            d3.selectAll(".mouse-per-line text").style("opacity", "0")
        })
        .on("mouseover", function () {
            d3.select(".mouse-line").style("opacity", "1");
            d3.selectAll(".mouse-per-line circle").style("opacity", "1");
            d3.selectAll(".mouse-per-line text").style("opacity", "1")
        })
        .on("mousemove", function () {
            var mouse_040601 = d3.mouse(this);

            console.log("Mouse:", mouse_040601);

            d3.select(".mouse-line")
                .attr("d", function () {
                    var d_040601 = "M" + mouse_040601[0] + ", " + h_040601;
                    d_040601 += " " + mouse_040601[0] + ", " + 0;
                    return d_040601;
                })

            var ypos_040601 = [];

            d3.selectAll(".mouse-per-line")
                .attr("transform", function (d, i) {
                    console.log(w_040601 / mouse_040601[0])
                    var xDate_040601 = scaleX_040601.invert(mouse_040601[0]),
                        bisect_040601 = d3.bisector(function (d) {
                            return d.date;
                        }).right;
                    idx_040601 = bisect_040601(d.values, xDate_040601);

                    console.log("xDate:", xDate_040601);
                    console.log("bisect", bisect_040601);
                    console.log("idx:", idx_040601)

                    var beginning_040601 = 0,
                        end_040601 = lines_040601[i].getTotalLength(),
                        target_040601 = null;

                    console.log("end", end_040601);

                    while (true) {
                        target_040601 = Math.floor((beginning_040601 + end_040601) / 2);
                        console.log("Target:", target_040601);
                        pos_040601 = lines_040601[i].getPointAtLength(target_040601);
                        console.log("Position", pos_040601.y);
                        console.log("What is the position here:", pos_040601)
                        if ((target_040601 === end_040601 || target_040601 === beginning_040601) && pos_040601.x !== mouse_040601[0]) {
                            break;
                        }
                        if (pos_040601.x > mouse_040601[0]) end_040601 = target_040601;
                        else if (pos_040601.x < mouse_040601[0]) beginning_040601 = target_040601;
                        else break; //position found
                    }

                    d3.select(this).select('text')
                        .text(scaleY_040601.invert(pos_040601.y).toFixed(3) + "%");

                    ypos_040601.push({
                        ind: i,
                        y: pos_040601.y,
                        off: 0
                    });

                    return "translate(" + mouse_040601[0] + ", " + pos_040601.y + ")";
                })

                .call(function (sel) {
                    ypos_040601.sort(function (a, b) {
                        return a.y - b.y;
                    });
                    ypos_040601.forEach(function (p, i) {
                        if (i > 0) {
                            var last_040601 = ypos_040601[i - 1].y;
                            ypos_040601[i].off = Math.max(0, (last_040601 + 15) - ypos_040601[i].y);
                            ypos_040601[i].y += ypos_040601[i].off;
                        }
                    })
                    ypos_040601.sort(function (a, b) {
                        return a.ind - b.ind;
                    });
                })

                .select("text")
                .attr("transform", function (d, i) {
                    return "translate (10, " + (3 + ypos_040601[i].off) + ")";
                });

        });
});

function type_040601(d, _, columns) {
    d.date = parseDate_040601(d.date);
    for (var i_040601 = 1, n = columns.length, c; i_040601 < n; ++i_040601) d[c = columns[i_040601]] = +d[c];
    return d;
}
