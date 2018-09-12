var margin_0501 = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 60
};

var w_0501 = d3.select("#topic05-vis01").node().getBoundingClientRect().width - margin_0501.left - margin_0501.right;
var h_0501 = d3.select("#topic05-vis01").node().getBoundingClientRect().height - margin_0501.top - margin_0501.bottom;

var parseDate_0501 = d3.timeParse("%Y%m%d");

var scaleX_0501 = d3.scaleTime()
    .range([0, w_0501]);

var scaleY_0501 = d3.scaleLinear()
    .range([h_0501, 0]);

var color_0501 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A"]);

var xAxis_0501 = d3.axisBottom()
    .scale(scaleX_0501);

var yAxis_0501 = d3.axisLeft()
    .scale(scaleY_0501)

var line_0501 = d3.line()
    .x(function(d) {return scaleX_0501(d.date)})
    .y(function(d) {return scaleY_0501(d.ydata)})
    //.curve(d3.curveBasis);

var svg_0501 = d3.select("#topic05-vis01").append("svg")
    .attr("width", w_0501 + margin_0501.left + margin_0501.right)
    .attr("height", h_0501 + margin_0501.top + margin_0501.bottom)
    // .style("background-color", "lightGreen")
    .append("g")
    .attr("transform", "translate("+margin_0501.left +", "+margin_0501.top+")")

d3.tsv("/wp-habitat/data/05_alberlet_also_szegmense/05_01_jovedelem_vs_alberletar_novekedes.tsv", type_0501, function (error, data) {
    if (error) throw error;

    var categories_0501 = data.columns.slice(1).map(function (name) {
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

scaleX_0501.domain(d3.extent(data, function(d){
  return d.date;
}));
scaleY_0501.domain([
    d3.min(categories_0501, function(c) { return d3.min(c.values, function(d) { return d.ydata * 1.15; }); }),
    d3.max(categories_0501, function(c) { return d3.max(c.values, function(d) { return d.ydata * 1.15; }); })
  ]);

console.log("categories_0501", categories_0501);

var legend_0501 = svg_0501.selectAll("g")
    .data(categories_0501)
    .enter()
    .append("g")
    .attr("class", "legend");

legend_0501.append("rect")
    .attr("x", w_0501-200)
    .attr("y", function(d, i) {return i * 20;} )
    .attr("width", 2)
    .attr("height", 15)
    .style("fill", function(d) {return color_0501(d.name);} );

legend_0501.append("text")
    .attr("font-size", (w_0501 * 0.0005 + 0.5) + "em")
    .attr("x", w_0501-195)
    .attr("y", function(d, i) {return (i * 20) + 12;} )
    .text(function(d) {return d.name;} );

svg_0501.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, "+h_0501+")")
    .call(xAxis_0501)
    .selectAll(".tick text")
    .attr("font-size", (w_0501 * 0.0005 + 0.5) + "em");

svg_0501.append("g")
    .attr("class", "y axis")
    .call(yAxis_0501)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style("fill", "black")
    .text("Változás aránya 2010-hez képest");

svg_0501.selectAll(".y.axis text")
    .attr("font-size", (w_0501 * 0.0005 + 0.5) + "em");

var category_0501 = svg_0501.selectAll(".category")
    .data(categories_0501)
    .enter().append("g")
    .attr("class", "category");

category_0501.append("path")
    .attr("class", "line")
    .attr("d", function(d) {return line_0501(d.values);} )
    .style("stroke", function(d) {return color_0501(d.name)} );

var mouseG_0501 = svg_0501.append("g") // this the black vertical line to folow mouse
    .attr("class", "mouse-over-effects");

mouseG_0501.append("path")
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines_0501 = document.getElementsByClassName("line");
var mousePerLine_0501 = mouseG_0501.selectAll(".mouse-per-line")
    .data(categories_0501)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

mousePerLine_0501.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {return color_0501(d.name);} )
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

mousePerLine_0501.append("text")
    .attr("transform", "translate(10, 3)")
    .attr("font-size", (w_0501 * 0.0005 + 0.5) + "em");

mouseG_0501.append("rect")
    .attr("width", w_0501)
    .attr("height", h_0501)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseout", function(){
        d3.select(".mouse-line").style("opacity", "0");
        d3.selectAll(".mouse-per-line circle").style("opacity", "0");
        d3.selectAll(".mouse-per-line text").style("opacity", "0")
    })
    .on("mouseover", function(){
        d3.select(".mouse-line").style("opacity", "1");
        d3.selectAll(".mouse-per-line circle").style("opacity", "1");
        d3.selectAll(".mouse-per-line text").style("opacity", "1")
    })
    .on("mousemove", function(){
        var mouse_0501 = d3.mouse(this);

        console.log("Mouse:", mouse_0501);

        d3.select(".mouse-line")
            .attr("d", function(){
                var d_0501 = "M" + mouse_0501[0] +", " + h_0501;
                d_0501+=" " +mouse_0501[0] + ", " + 0;
                return d_0501;
            })

        var ypos_0501 = [];

        d3.selectAll(".mouse-per-line")
            .attr("transform", function(d, i) {
                console.log(w_0501/mouse_0501[0])
                var xDate_0501 = scaleX_0501.invert(mouse_0501[0]),
                bisect_0501 = d3.bisector(function(d) { return d.date;}).right;
                idx_0501 = bisect_0501(d.values, xDate_0501);

                console.log("xDate:", xDate_0501);
                console.log("bisect", bisect_0501);
                console.log("idx:", idx_0501)

                var beginning_0501 = 0,
                    end_0501 = lines_0501[i].getTotalLength(),
                    target_0501 = null;

                console.log("end", end_0501);

                while (true){
                  target_0501 = Math.floor((beginning_0501 + end_0501) / 2);
                  console.log("Target:", target_0501);
                  pos_0501 = lines_0501[i].getPointAtLength(target_0501);
                  console.log("Position", pos_0501.y);
                  console.log("What is the position here:", pos_0501)
                  if ((target_0501 === end_0501 || target_0501 === beginning_0501) && pos_0501.x !== mouse_0501[0]) {break;}
                  if (pos_0501.x > mouse_0501[0]) end_0501 = target_0501;
                  else if (pos_0501.x < mouse_0501[0]) beginning_0501 = target_0501;
                  else break; //position found
                }

                d3.select(this).select('text')
                  .text(scaleY_0501.invert(pos_0501.y).toFixed(3));

                ypos_0501.push ({ind: i, y: pos_0501.y, off: 0});

                return "translate(" + mouse_0501[0] + ", " + pos_0501.y +")";
        })

        .call(function(sel) {
            ypos_0501.sort (function(a, b) { return a.y - b.y; });
            ypos_0501.forEach (function(p, i) {
                if (i > 0) {
                var last_0501 = ypos_0501[i-1].y;
                ypos_0501[i].off = Math.max (0, (last_0501 + 15) - ypos_0501[i].y);
                ypos_0501[i].y += ypos_0501[i].off;
                }
            })
            ypos_0501.sort (function(a, b) { return a.ind - b.ind; });
        })

        .select("text")
        .attr("transform", function(d, i) {
            return "translate (10, "+(3+ypos_0501[i].off)+")";
        });

    });
});

function type_0501(d, _, columns) {
    d.date = parseDate_0501(d.date);
    for (var i_0501 = 1, n = columns.length, c; i_0501 < n; ++i_0501) d[c = columns[i_0501]] = +d[c];
    return d;
}

/*Sources:
https://bl.ocks.org/mbostock/3884955
https://www.codeseek.co/Asabeneh/d3-mouseover-multi-line-chart-d3js-v4-RZpYBo */
