var margin_020301 = {
  top: 50, 
  right: 50, 
  bottom: 50, 
  left: 60
};

var w_020301 = d3.select("#topic02-vis03-part01").node().getBoundingClientRect().width - margin_020301.left - margin_020301.right;
var h_020301 = d3.select("#topic02-vis03-part01").node().getBoundingClientRect().height - margin_020301.top - margin_020301.bottom;

var parseDate_020301 = d3.timeParse("%Y%m%d");

var scaleX_020301 = d3.scaleTime()
    .range([0, w_020301]);

var scaleY_020301 = d3.scaleLinear()
    .range([h_020301, 0]);

var color_020301 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A, #00AFD7, #C4D600"]);

var xAxis_020301 = d3.axisBottom()
    .scale(scaleX_020301);

var yAxis_020301 = d3.axisLeft()
    .scale(scaleY_020301)

var line_020301 = d3.line()
    .x(function(d) {return scaleX_020301(d.date)})
    .y(function(d) {return scaleY_020301(d.ydata)})
    //.curve(d3.curveBasis);

var svg_020301 = d3.select("#topic02-vis03-part01").append("svg")
    .attr("width", w_020301 + margin_020301.left + margin_020301.right)
    .attr("height", h_020301 + margin_020301.top + margin_020301.bottom)
    .append("g")
    .attr("transform", "translate("+margin_020301.left +", "+margin_020301.top+")")

d3.tsv("../../data/02_lakasminoseg_energiaszegenyseg/02_03_01_gaz_vs_fa_hasznalat_timeseries.tsv", type_020301, function (error, data) {
    if (error) throw error;

    var categories_020301 = data.columns.slice(1).map(function (name) {
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

scaleX_020301.domain(d3.extent(data, function(d){
  return d.date;
}));
scaleY_020301.domain([
    0,
    d3.max(categories_020301, function(c) { return d3.max(c.values, function(d) { return d.ydata * 1.3; }); })
  ]);

console.log("categories_020301", categories_020301);

var legend_020301 = svg_020301.selectAll("g")
    .data(categories_020301)
    .enter()
    .append("g")
    .attr("class", "legend");

legend_020301.append("rect")
    .attr("x", w_020301-110)
    .attr("y", function(d, i) {return i * 20;} )
    .attr("width", 2)
    .attr("height", 15)
    .style("fill", function(d) {return color_020301(d.name);} );

legend_020301.append("text")
    .attr("x", w_020301-105)
    .attr("y", function(d, i) {return (i * 20) + 12;} )
    .text(function(d) {return d.name;} );

svg_020301.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, "+h_020301+")")
    .call(xAxis_020301);

svg_020301.append("g")
    .attr("class", "y axis")
    .call(yAxis_020301)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style("fill", "black")
    .text("Adott fűtési módot használó háztartások aránya (%)");
    
/*svg_020301.append("text")
    .attr("class", "title")
    .attr("x", (w_020301 / 2))             
    .attr("y", 0 - (margin_020301.top / 2))
    .attr("text-anchor", "middle")
    .text("Fűtési módok használatának aránya 2011-2016");*/

svg_020301.append("text")
    .attr("class", "data source")
    .attr("x", w_020301 - 40)
    .attr("y", h_020301 + 40)
    .style("text-anchor", "middle")
    .text("Adatok forrása: nincs");
    
var category_020301 = svg_020301.selectAll(".category")
    .data(categories_020301)
    .enter().append("g")
    .attr("class", "category");

category_020301.append("path")
    .attr("class", "line")
    .attr("d", function(d) {return line_020301(d.values);} )
    .style("stroke", function(d) {return color_020301(d.name)} );

var mouseG_020301 = svg_020301.append("g") // this the black vertical line to folow mouse
    .attr("class", "mouse-over-effects");

mouseG_020301.append("path")
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines_020301 = document.getElementsByClassName("line");
var mousePerLine_020301 = mouseG_020301.selectAll(".mouse-per-line")
    .data(categories_020301)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

mousePerLine_020301.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {return color_020301(d.name);} )
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

mousePerLine_020301.append("text")
    .attr("transform", "translate(10, 3)");

mouseG_020301.append("rect")
    .attr("width", w_020301)
    .attr("height", h_020301)
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
        var mouse_020301 = d3.mouse(this);
    
        console.log("Mouse:", mouse_020301);
    
        d3.select(".mouse-line")
            .attr("d", function(){
                var d_020301 = "M" + mouse_020301[0] +", " + h_020301;
                d_020301+=" " +mouse_020301[0] + ", " + 0;
                return d_020301;
            })
    
        var ypos_020301 = [];

        d3.selectAll(".mouse-per-line")
            .attr("transform", function(d, i) {
                console.log(w_020301/mouse_020301[0])
                var xDate_020301 = scaleX_020301.invert(mouse_020301[0]), 
                bisect_020301 = d3.bisector(function(d) { return d.date;}).right;
                idx_020301 = bisect_020301(d.values, xDate_020301);

                console.log("xDate:", xDate_020301);
                console.log("bisect", bisect_020301);
                console.log("idx:", idx_020301)

                var beginning_020301 = 0, 
                    end_020301 = lines_020301[i].getTotalLength(), 
                    target_020301 = null;

                console.log("end", end_020301);

                while (true){
                  target_020301 = Math.floor((beginning_020301 + end_020301) / 2);
                  console.log("Target:", target_020301);
                  pos_020301 = lines_020301[i].getPointAtLength(target_020301);
                  console.log("Position", pos_020301.y);
                  console.log("What is the position here:", pos_020301)
                  if ((target_020301 === end_020301 || target_020301 === beginning_020301) && pos_020301.x !== mouse_020301[0]) {break;}
                  if (pos_020301.x > mouse_020301[0]) end_020301 = target_020301;
                  else if (pos_020301.x < mouse_020301[0]) beginning_020301 = target_020301;
                  else break; //position found
                }

                d3.select(this).select('text')
                  .text(scaleY_020301.invert(pos_020301.y).toFixed(3));

                ypos_020301.push ({ind: i, y: pos_020301.y, off: 0});

                return "translate(" + mouse_020301[0] + ", " + pos_020301.y +")";
        })

        .call(function(sel) {
            ypos_020301.sort (function(a, b) { return a.y - b.y; });
            ypos_020301.forEach (function(p, i) {
                if (i > 0) {
                var last_020301 = ypos_020301[i-1].y;
                ypos_020301[i].off = Math.max (0, (last_020301 + 15) - ypos_020301[i].y);
                ypos_020301[i].y += ypos_020301[i].off;
                }
            })
            ypos_020301.sort (function(a, b) { return a.ind - b.ind; });
        })

        .select("text")
        .attr("transform", function(d, i) {
            return "translate (10, "+(3+ypos_020301[i].off)+")";
        });

    });
});
    
function type_020301(d, _, columns) {
    d.date = parseDate_020301(d.date);
    for (var i_020301 = 1, n = columns.length, c; i_020301 < n; ++i_020301) d[c = columns[i_020301]] = +d[c];
    return d;
}

/*Sources:
https://bl.ocks.org/mbostock/3884955
https://www.codeseek.co/Asabeneh/d3-mouseover-multi-line-chart-d3js-v4-RZpYBo */