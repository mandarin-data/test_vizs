var margin_020302 = {
  top: 50, 
  right: 50, 
  bottom: 50, 
  left: 60
};

var w_020302 = d3.select("#topic02-vis03-part02").node().getBoundingClientRect().width - margin_020302.left - margin_020302.right;
var h_020302 = d3.select("#topic02-vis03-part02").node().getBoundingClientRect().height - margin_020302.top - margin_020302.bottom;

var parseDate_020302 = d3.timeParse("%Y%m%d");

var scaleX_020302 = d3.scaleTime()
    .range([0, w_020302]);

var scaleY_020302 = d3.scaleLinear()
    .range([h_020302, 0]);

var color_020302 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A"]);

var xAxis_020302 = d3.axisBottom()
    .scale(scaleX_020302);

var yAxis_020302 = d3.axisLeft()
    .scale(scaleY_020302)

var line_020302 = d3.line()
    .x(function(d){return scaleX_020302(d.date)})
    .y(function(d){return scaleY_020302(d.ydata)})
    //.curve(d3.curveBasis);

var svg_020302 = d3.select("#topic02-vis03-part02").append("svg")
    .attr("width", w_020302 + margin_020302.left + margin_020302.right)
    .attr("height", h_020302 + margin_020302.top + margin_020302.bottom)
    .append("g")
    .attr("transform", "translate("+margin_020302.left +", "+margin_020302.top+")")

d3.tsv("../../data/02_lakasminoseg_energiaszegenyseg/02_03_02_gaz_vs_fa_arvaltozas_timeseries.tsv", type, function (error, data) {
    if (error) throw error;

    var categories_020302 = data.columns.slice(1).map(function (name) {
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

scaleX_020302.domain(d3.extent(data, function(d){
  return d.date;
}));
scaleY_020302.domain([
    d3.min(categories_020302, function(c) { return d3.min(c.values, function(d) { return d.ydata * 1.15; }); }),
    d3.max(categories_020302, function(c) { return d3.max(c.values, function(d) { return d.ydata * 1.15; }); })
  ]);
    
console.log("categories_020302", categories_020302);

var legend_020302 = svg_020302.selectAll("g")
    .data(categories_020302)
    .enter()
    .append("g")
    .attr("class", "legend");

legend_020302.append("rect")
    .attr("x", w_020302-185)
    .attr("y", function(d, i) {return i * 20;} )
    .attr("width", 2)
    .attr("height", 15)
    .style("fill", function(d) {return color_020302(d.name);} );

legend_020302.append("text")
    .attr("x", w_020302-180)
    .attr("y", function(d, i) {return (i * 20) + 12;} )
    .text(function(d) {return d.name;} );

svg_020302.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, "+h_020302+")")
    .call(xAxis_020302);

svg_020302.append("g")
    .attr("class", "y axis")
    .call(yAxis_020302)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style("fill", "black")
    .text("Árváltozás aránya 2010-hez képest");

var category_020302 = svg_020302.selectAll(".category")
    .data(categories_020302)
    .enter().append("g")
    .attr("class", "category");

category_020302.append("path")
    .attr("class", "line")
    .attr("d", function(d) {return line_020302(d.values);} )
    .style("stroke", function(d) {return color_020302(d.name)} );

var mouseG_020302 = svg_020302.append("g") // this the black vertical line to folow mouse
    .attr("class", "mouse-over-effects");

mouseG_020302.append("path")
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines_020302 = document.getElementsByClassName("line");
var mousePerLine_020302 = mouseG_020302.selectAll(".mouse-per-line")
    .data(categories_020302)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

mousePerLine_020302.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {return color_020302(d.name);} )
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

mousePerLine_020302.append("text")
    .attr("transform", "translate(10, 3)");

mouseG_020302.append("rect")
    .attr("width", w_020302)
    .attr("height", h_020302)
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
        var mouse_020302 = d3.mouse(this);
    
        console.log("Mouse:", mouse_020302);
    
        d3.select(".mouse-line")
            .attr("d", function(){
                var d_020302 = "M" + mouse_020302[0] +", " + h_020302;
                d_020302+=" " +mouse_020302[0] + ", " + 0;
                return d_020302;
            })
    
        var ypos_020302 = [];

        d3.selectAll(".mouse-per-line")
            .attr("transform", function(d, i) {
                console.log(w_020302/mouse_020302[0])
                var xDate_020302 = scaleX_020302.invert(mouse_020302[0]), 
                bisect_020302 = d3.bisector(function(d) { return d.date;}).right;
                idx_020302 = bisect_020302(d.values, xDate_020302);

                console.log("xDate:", xDate_020302);
                console.log("bisect", bisect_020302);
                console.log("idx:", idx_020302)

                var beginning_020302 = 0, 
                    end_020302 = lines_020302[i].getTotalLength(), 
                    target_020302 = null;

                console.log("end", end_020302);

                while (true){
                  target_020302 = Math.floor((beginning_020302 + end_020302) / 2);
                  console.log("Target:", target_020302);
                  pos_020302 = lines_020302[i].getPointAtLength(target_020302);
                  console.log("Position", pos_020302.y);
                  console.log("What is the position here:", pos_020302)
                  if ((target_020302 === end_020302 || target_020302 === beginning_020302) && pos_020302.x !== mouse_020302[0]) {break;}
                  if (pos_020302.x > mouse_020302[0]) end_020302 = target_020302;
                  else if (pos_020302.x < mouse_020302[0]) beginning_020302 = target_020302;
                  else break; //position found
                }

                d3.select(this).select('text')
                  .text(scaleY_020302.invert(pos_020302.y).toFixed(3));

                ypos_020302.push ({ind: i, y: pos_020302.y, off: 0});

                return "translate(" + mouse_020302[0] + ", " + pos_020302.y +")";
        })

        .call(function(sel) {
            ypos_020302.sort (function(a, b) { return a.y - b.y; });
            ypos_020302.forEach (function(p, i) {
                if (i > 0) {
                var last_020302 = ypos_020302[i-1].y;
                ypos_020302[i].off = Math.max (0, (last_020302 + 15) - ypos_020302[i].y);
                ypos_020302[i].y += ypos_020302[i].off;
                }
            })
            ypos_020302.sort (function(a, b) { return a.ind - b.ind; });
        })

        .select("text")
        .attr("transform", function(d, i) {
            return "translate (10, "+(3+ypos_020302[i].off)+")";
        });

    });
});
    
function type(d, _, columns) {
    d.date = parseDate_020302(d.date);
    for (var i_020302 = 1, n = columns.length, c; i_020302 < n; ++i_020302) d[c = columns[i_020302]] = +d[c];
    return d;
}

/*Sources:
https://bl.ocks.org/mbostock/3884955
https://www.codeseek.co/Asabeneh/d3-mouseover-multi-line-chart-d3js-v4-RZpYBo */