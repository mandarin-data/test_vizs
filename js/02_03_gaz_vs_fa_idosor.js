var margin_0203 = {
  top: 50, 
  right: 50, 
  bottom: 50, 
  left: 60
};

var w_0203 = d3.select("#topic02-vis03").node().getBoundingClientRect().width - margin_0203.left - margin_0203.right;
var h_0203 = d3.select("#topic02-vis03").node().getBoundingClientRect().height - margin_0203.top - margin_0203.bottom;

var parseDate_0203 = d3.timeParse("%Y%m%d");

var scaleX_0203 = d3.scaleTime()
    .range([0, w_0203]);

var scaleY_0203 = d3.scaleLinear()
    .range([h_0203, 0]);

var color_0203 = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis_0203 = d3.axisBottom()
    .scale(scaleX_0203);

var yAxis_0203 = d3.axisLeft()
    .scale(scaleY_0203)

var line_0203 = d3.line()
    .x(function(d){return scaleX_0203(d.date)})
    .y(function(d){return scaleY_0203(d.ydata)})
    //.curve(d3.curveBasis);

var svg_0203 = d3.select("#topic02-vis03").append("svg")
    .attr("width", w_0203 + margin_0203.left + margin_0203.right)
    .attr("height", h_0203 + margin_0203.top + margin_0203.bottom)
    // .style("background-color", "lightGreen")
    .append("g")
    .attr("transform", "translate("+margin_0203.left +", "+margin_0203.top+")")

d3.tsv("../../data/02_lakasminoseg_energiaszegenyseg/02_03_01_gaz_vs_fa_idosor_arany.tsv", type, function (error, data) {
    if (error) throw error;

    var categories_0203 = data.columns.slice(1).map(function (name) {
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

scaleX_0203.domain(d3.extent(data, function(d){
  return d.date;
}));
scaleY_0203.domain([0, 1]);

console.log("categories_0203", categories_0203);

var legend_0203 = svg_0203.selectAll("g")
    .data(categories_0203)
    .enter()
    .append("g")
    .attr("class", "legend");

legend_0203.append("rect")
    .attr("x", w_0203-110)
    .attr("y", function(d, i) {return i * 20;} )
    .attr("width", 2)
    .attr("height", 15)
    .style("fill", function(d) {return color_0203(d.name);} );

legend_0203.append("text")
    .attr("x", w_0203-105)
    .attr("y", function(d, i) {return (i * 20) + 12;} )
    .text(function(d) {return d.name;} );

svg_0203.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, "+h_0203+")")
    .call(xAxis_0203);

svg_0203.append("g")
    .attr("class", "y axis")
    .call(yAxis_0203)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style("fill", "black")
    .text("Adott fűtési módot használó háztartások aránya");

var category_0203 = svg_0203.selectAll(".category")
    .data(categories_0203)
    .enter().append("g")
    .attr("class", "category");

category_0203.append("path")
    .attr("class", "line")
    .attr("d", function(d) {return line_0203(d.values);} )
    .style("stroke", function(d) {return color_0203(d.name)} );

var mouseG_0203 = svg_0203.append("g") // this the black vertical line to folow mouse
    .attr("class", "mouse-over-effects");

mouseG_0203.append("path")
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines_0203 = document.getElementsByClassName("line");
var mousePerLine_0203 = mouseG_0203.selectAll(".mouse-per-line")
    .data(categories_0203)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

mousePerLine_0203.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {return color_0203(d.name);} )
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

mousePerLine_0203.append("text")
    .attr("transform", "translate(10, 3)");

mouseG_0203.append("rect")
    .attr("width", w_0203)
    .attr("height", h_0203)
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
        var mouse_0203 = d3.mouse(this);
    
        console.log("Mouse:", mouse_0203);
    
        d3.select(".mouse-line")
            .attr("d", function(){
                var d_0203 = "M" + mouse_0203[0] +", " + h_0203;
                d_0203+=" " +mouse_0203[0] + ", " + 0;
                return d_0203;
            })
    
        var ypos_0203 = [];

        d3.selectAll(".mouse-per-line")
            .attr("transform", function(d, i) {
                console.log(w_0203/mouse_0203[0])
                var xDate_0203 = scaleX_0203.invert(mouse_0203[0]), 
                bisect_0203 = d3.bisector(function(d) { return d.date;}).right;
                idx_0203 = bisect_0203(d.values, xDate_0203);

                console.log("xDate:", xDate_0203);
                console.log("bisect", bisect_0203);
                console.log("idx:", idx_0203)

                var beginning_0203 = 0, 
                    end_0203 = lines_0203[i].getTotalLength(), 
                    target_0203 = null;

                console.log("end", end_0203);

                while (true){
                  target_0203 = Math.floor((beginning_0203 + end_0203) / 2);
                  console.log("Target:", target_0203);
                  pos_0203 = lines_0203[i].getPointAtLength(target_0203);
                  console.log("Position", pos_0203.y);
                  console.log("What is the position here:", pos_0203)
                  if ((target_0203 === end_0203 || target_0203 === beginning_0203) && pos_0203.x !== mouse_0203[0]) {
                      break;
                  }
                  if (pos_0203.x > mouse_0203[0])      end_0203 = target_0203;
                  else if (pos_0203.x < mouse_0203[0]) beginning_0203 = target_0203;
                  else break; //position found
                }

                d3.select(this).select('text')
                  .text(scaleY_0203.invert(pos_0203.y).toFixed(3));

                ypos_0203.push ({ind: i, y: pos_0203.y, off: 0});

                return "translate(" + mouse_0203[0] + ", " + pos_0203.y +")";
        })

        .call(function(sel) {
            ypos_0203.sort (function(a, b) { return a.y - b.y; });
            ypos_0203.forEach (function(p, i) {
                if (i > 0) {
                var last_0203 = ypos_0203[i-1].y;
                ypos_0203[i].off = Math.max (0, (last_0203 + 15) - ypos_0203[i].y);
                ypos_0203[i].y += ypos_0203[i].off;
                }
            })
            ypos_0203.sort (function(a, b) { return a.ind - b.ind; });
        })

        .select("text")
        .attr("transform", function(d, i) {
            return "translate (10, "+(3+ypos_0203[i].off)+")";
        });

    });
});
    
function type(d, _, columns) {
    d.date = parseDate_0203(d.date);
    for (var i_0203 = 1, n = columns.length, c; i_0203 < n; ++i_0203) d[c = columns[i_0203]] = +d[c];
    return d;
}

/*Sources:
https://bl.ocks.org/mbostock/3884955
https://www.codeseek.co/Asabeneh/d3-mouseover-multi-line-chart-d3js-v4-RZpYBo */