var margin_0404 = {
  top: 50,
  right: 50,
  bottom: 80,
  left: 60
};

var w_0404 = d3.select("#topic04-vis04").node().getBoundingClientRect().width - margin_0404.left - margin_0404.right;
var h_0404 = d3.select("#topic04-vis04").node().getBoundingClientRect().height - margin_0404.top - margin_0404.bottom;

var parseDate_0404 = d3.timeParse("%Y%m%d");

var scaleX_0404 = d3.scaleTime()
    .range([0, w_0404]);

var scaleY_0404 = d3.scaleLinear()
    .range([h_0404, 0]);

var color_0404 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A"]);

var xAxis_0404 = d3.axisBottom()
    .scale(scaleX_0404);

var yAxis_0404 = d3.axisLeft()
    .scale(scaleY_0404)

var line_0404 = d3.line()
    .x(function(d) {return scaleX_0404(d.date)})
    .y(function(d) {return scaleY_0404(d.ydata)})
    //.curve(d3.curveBasis);

var svg_0404 = d3.select("#topic04-vis04").append("svg")
    .attr("width", w_0404 + margin_0404.left + margin_0404.right)
    .attr("height", h_0404 + margin_0404.top + margin_0404.bottom)
    // .style("background-color", "lightGreen")
    .append("g")
    .attr("transform", "translate("+margin_0404.left +", "+margin_0404.top+")")

d3.tsv("/wp-habitat/data/04_eladosodas/04_04_haztartasok_eladosodasa.tsv", type_0404, function (error, data) {
    if (error) throw error;

    var categories_0404 = data.columns.slice(1).map(function (name) {
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

scaleX_0404.domain(d3.extent(data, function(d){
  return d.date;
}));
scaleY_0404.domain([
    0,
    d3.max(categories_0404, function(c) { return d3.max(c.values, function(d) { return d.ydata * 1.3; }); })
  ]);

console.log("categories_0404", categories_0404);

var legend_0404 = svg_0404.selectAll("g")
    .data(categories_0404)
    .enter()
    .append("g")
    .attr("class", "legend");

legend_0404.append("rect")
    .attr("x", w_0404-200)
    .attr("y", function(d, i) {return i * 20;} )
    .attr("width", 2)
    .attr("height", 15)
    .style("fill", function(d) {return color_0404(d.name);} );

legend_0404.append("text")
    .attr("font-size", (w_0404 * 0.0005 + 0.5) + "em")
    .attr("x", w_0404-195)
    .attr("y", function(d, i) {return (i * 20) + 12;} )
    .text(function(d) {return d.name;} );

svg_0404.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, "+h_0404+")")
    .call(xAxis_0404)
    .selectAll(".tick text")
    .attr("font-size", (w_0404 * 0.0005 + 0.5) + "em");

svg_0404.append("g")
    .attr("class", "y axis")
    .call(yAxis_0404)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style("fill", "black")
    .text("Milliárd forint");

svg_0404.selectAll(".y.axis text")
    .attr("font-size", (w_0404 * 0.0005 + 0.5) + "em");

svg_0404.append("text") // text label for the x axis
        .attr("x", w_0404)
        .attr("y", h_0404 + 60)
        .style("text-anchor", "middle")
        .attr("font-size", (w_0404 * 0.0005 + 0.3) + "em")
        .text("Forrás: MNB");

svg_0404.append("line")
    .attr("class", "event")
    .attr("x1", scaleX_0404(parseDate_0404("20040401")))
    .attr("y1", 0)
    .attr("x2",  scaleX_0404(parseDate_0404("20040401")))
    .attr("y2", h_0404 + 50)
    .style("stroke-width", 1)
    .style("stroke", "red")
    .style("fill", "none")
    .style("stroke-dasharray", ("3, 3"));

svg_0404.append("text")
    .attr("class", "event text")
    .attr("x", scaleX_0404(parseDate_0404("20040401")))
    .attr("y", h_0404 + 60)
    .style("text-anchor", "middle")
    .attr("font-size", (w_0404 * 0.0005 + 0.4) + "em")
    .text("EU-csatlakozás")

svg_0404.append("line")
    .attr("class", "event")
    .attr("x1", scaleX_0404(parseDate_0404("20081001")))
    .attr("y1", 0)
    .attr("x2",  scaleX_0404(parseDate_0404("20081001")))
    .attr("y2", h_0404 + 50)
    .style("stroke-width", 1)
    .style("stroke", "red")
    .style("fill", "none")
    .style("stroke-dasharray", ("3, 3"));

svg_0404.append("text")
    .attr("class", "event text")
    .attr("x", scaleX_0404(parseDate_0404("20081001")))
    .attr("y", h_0404 + 60)
    .style("text-anchor", "middle")
    .attr("font-size", (w_0404 * 0.0005 + 0.4) + "em")
    .text("Gazdasági válság")
svg_0404.append("text")
    .attr("class", "event text")
    .attr("x", scaleX_0404(parseDate_0404("20081001")))
    .attr("y", h_0404 + 75)
    .style("text-anchor", "middle")
    .attr("font-size", (w_0404 * 0.0005 + 0.4) + "em")
    .text("kezdete")

svg_0404.append("line")
    .attr("class", "event")
    .attr("x1", scaleX_0404(parseDate_0404("20111001")))
    .attr("y1", 0)
    .attr("x2",  scaleX_0404(parseDate_0404("20111001")))
    .attr("y2", h_0404 + 50)
    .style("stroke-width", 1)
    .style("stroke", "red")
    .style("fill", "none")
    .style("stroke-dasharray", ("3, 3"));

svg_0404.append("text")
    .attr("class", "event text")
    .attr("x", scaleX_0404(parseDate_0404("20111001")))
    .attr("y", h_0404 + 60)
    .style("text-anchor", "middle")
    .attr("font-size", (w_0404 * 0.0005 + 0.4) + "em")
    .text("Végtörlesztés:")
svg_0404.append("text")
    .attr("class", "event text")
    .attr("x", scaleX_0404(parseDate_0404("20111001")))
    .attr("y", h_0404 + 75)
    .style("text-anchor", "middle")
    .attr("font-size", (w_0404 * 0.0005 + 0.4) + "em")
    .text("180 forint/frank")

svg_0404.append("line")
    .attr("class", "event")
    .attr("x1", scaleX_0404(parseDate_0404("20141001")))
    .attr("y1", 0)
    .attr("x2",  scaleX_0404(parseDate_0404("20141001")))
    .attr("y2", h_0404 + 50)
    .style("stroke-width", 1)
    .style("stroke", "red")
    .style("fill", "none")
    .style("stroke-dasharray", ("3, 3"));

svg_0404.append("text")
    .attr("class", "event text")
    .attr("x", scaleX_0404(parseDate_0404("20141001")))
    .attr("y", h_0404 + 60)
    .style("text-anchor", "middle")
    .attr("font-size", (w_0404 * 0.0005 + 0.4) + "em")
    .text("Forintosítás:")
svg_0404.append("text")
    .attr("class", "event text")
    .attr("x", scaleX_0404(parseDate_0404("20141001")))
    .attr("y", h_0404 + 75)
    .style("text-anchor", "middle")
    .attr("font-size", (w_0404 * 0.0005 + 0.4) + "em")
    .text("256,5 forint/frank")

var category_0404 = svg_0404.selectAll(".category")
    .data(categories_0404)
    .enter().append("g")
    .attr("class", "category");

category_0404.append("path")
    .attr("class", "line")
    .attr("d", function(d) {return line_0404(d.values);} )
    .style("stroke", function(d) {return color_0404(d.name)} );

var mouseG_0404 = svg_0404.append("g") // this the black vertical line to folow mouse
    .attr("class", "mouse-over-effects");

mouseG_0404.append("path")
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines_0404 = document.getElementsByClassName("line");
var mousePerLine_0404 = mouseG_0404.selectAll(".mouse-per-line")
    .data(categories_0404)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

mousePerLine_0404.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {return color_0404(d.name);} )
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

mousePerLine_0404.append("text")
    .attr("transform", "translate(10, 3)")
    .attr("font-size", (w_0404 * 0.0005 + 0.5) + "em");

mouseG_0404.append("rect")
    .attr("width", w_0404)
    .attr("height", h_0404)
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
        var mouse_0404 = d3.mouse(this);

        console.log("Mouse:", mouse_0404);

        d3.select(".mouse-line")
            .attr("d", function(){
                var d_0404 = "M" + mouse_0404[0] +", " + h_0404;
                d_0404+=" " +mouse_0404[0] + ", " + 0;
                return d_0404;
            })

        var ypos_0404 = [];

        d3.selectAll(".mouse-per-line")
            .attr("transform", function(d, i) {
                console.log(w_0404/mouse_0404[0])
                var xDate_0404 = scaleX_0404.invert(mouse_0404[0]),
                bisect_0404 = d3.bisector(function(d) { return d.date;}).right;
                idx_0404 = bisect_0404(d.values, xDate_0404);

                console.log("xDate:", xDate_0404);
                console.log("bisect", bisect_0404);
                console.log("idx:", idx_0404)

                var beginning_0404 = 0,
                    end_0404 = lines_0404[i].getTotalLength(),
                    target_0404 = null;

                console.log("end", end_0404);

                while (true){
                  target_0404 = Math.floor((beginning_0404 + end_0404) / 2);
                  console.log("Target:", target_0404);
                  pos_0404 = lines_0404[i].getPointAtLength(target_0404);
                  console.log("Position", pos_0404.y);
                  console.log("What is the position here:", pos_0404)
                  if ((target_0404 === end_0404 || target_0404 === beginning_0404) && pos_0404.x !== mouse_0404[0]) {break;}
                  if (pos_0404.x > mouse_0404[0]) end_0404 = target_0404;
                  else if (pos_0404.x < mouse_0404[0]) beginning_0404 = target_0404;
                  else break; //position found
                }

                d3.select(this).select('text')
                  .text(scaleY_0404.invert(pos_0404.y).toFixed(3));

                ypos_0404.push ({ind: i, y: pos_0404.y, off: 0});

                return "translate(" + mouse_0404[0] + ", " + pos_0404.y +")";
        })

        .call(function(sel) {
            ypos_0404.sort (function(a, b) { return a.y - b.y; });
            ypos_0404.forEach (function(p, i) {
                if (i > 0) {
                var last_0404 = ypos_0404[i-1].y;
                ypos_0404[i].off = Math.max (0, (last_0404 + 15) - ypos_0404[i].y);
                ypos_0404[i].y += ypos_0404[i].off;
                }
            })
            ypos_0404.sort (function(a, b) { return a.ind - b.ind; });
        })

        .select("text")
        .attr("transform", function(d, i) {
            return "translate (10, "+(3+ypos_0404[i].off)+")";
        });

    });
});

function type_0404(d, _, columns) {
    d.date = parseDate_0404(d.date);
    for (var i_0404 = 1, n = columns.length, c; i_0404 < n; ++i_0404) d[c = columns[i_0404]] = +d[c];
    return d;
}

/*Sources:
https://bl.ocks.org/mbostock/3884955
https://www.codeseek.co/Asabeneh/d3-mouseover-multi-line-chart-d3js-v4-RZpYBo */
