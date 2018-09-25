var locale_020301 = {
  "decimal": ",",
  "thousands": "\u00a0",
  "grouping": [3],
  "currency": ["", "\u00a0Ft"]
};
d3.formatDefaultLocale(locale_020301);
var format_020301 = d3.format(",.2%"),
    formatPercent_020301 = d3.format("." + (d3.precisionFixed(0.05) - 2) + "%");

var margin_020301 = {
  top: 50, 
  right: 50, 
  bottom: 60, 
  left: 65
};

var w_020301 = d3.select("#topic02-vis03-part01").node().getBoundingClientRect().width - margin_020301.left - margin_020301.right;
var h_020301 = d3.select("#topic02-vis03-part01").node().getBoundingClientRect().height - margin_020301.top - margin_020301.bottom;

var parseDate_020301 = d3.timeParse("%Y");

//var scaleX_020301 = d3.scaleBand().rangeRound([0, w_020301]).padding(1);
var scaleX_020301 = d3.scaleTime()
    .range([0, w_020301]);

var scaleY_020301 = d3.scaleLinear()
    .range([h_020301, 0]);

var color_020301 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A", "#00AFD7", "#C4D600"]);

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
    
console.log(categories_020301)

//scaleX_020301.domain(data.map(function(d) { return d.date; }));
scaleX_020301.domain(d3.extent(data, function(d){
  return d.date;
}));
scaleY_020301.domain([
    d3.min(categories_020301, function(c) { return d3.min(c.values, function(d) { return d.ydata * 0.97; }); }), 0.50
  ]);

var legend_020301 = svg_020301.selectAll("g")
    .data(categories_020301)
    .enter()
    .append("g")
    .attr("class", "legend_020301");

legend_020301.append("rect")
    .attr("x", w_020301-280)
    .attr("y", function(d, i) {return i * 20;} )
    .attr("width", 2)
    .attr("height", 15)
    .style("fill", function(d) {return color_020301(d.name);} );

legend_020301.append("text")
    .attr("x", w_020301-275)
    .attr("y", function(d, i) {return (i * 20) + 12;} )
    .text(function(d) {return d.name;} );

// Draw the line
var category_020301 = svg_020301.selectAll(".category_020301")
    .data(categories_020301)
    .enter().append("g")
    .attr("class", "category_020301");

category_020301.append("path")
    .attr("class", "line_020301")
    .attr("d", function(d) {return line_020301(d.values);} )
    .style("stroke", function(d) {return color_020301(d.name)} );

//// Draw the empty value for every point
//var points = svg_020301.selectAll('.points')
//  .data(category_020301)
//  .enter()
//  .append('g')
//  .attr('class', 'points')
//  .append('text')
//  .attr("x", 9)
//  .attr("dy", ".35em")
//  .attr('y', function(d) { return scaleY_020301(d.ydata); })
//  .text(function(d) { return d.ydata; })
//  .style('fill', function(d) { return color_020301(d.name); });
//
//// Draw the circle
//category_020301
//  .style("fill", "#FFF")
//  .style("stroke", function(d) { return color_020301(d.name); })
//  .selectAll("circle.line")
//  .data(function(d){ return d.values })
//  .enter()
//  .append("circle")
//  .attr("r", 5)
//  .style("stroke-width", 3)
//  .attr("cx", function(d) { return scaleX_020301(d.date); })
//  .attr("cy", function(d) { return scaleY_020301(d.ydata); });
//
//var focus = svg_020301.append('g')
//  .attr('class', 'focus')
//  .style('display', 'none');
//
//focus.append('line')
//  .attr('class', 'x-hover-line hover-line')
//  .attr('y1' , 0)
//  .attr('y2', h_020301);
//
//svg_020301.append('rect')
//  .attr("transform", "translate(" + margin_020301.left + "," + margin_020301.top + ")")
//  .attr("class", "overlay")
//  .attr("width", w_020301)
//  .attr("height", h_020301)
//  .on("mouseover", mouseover)
//  .on("mouseout", mouseout)
//  .on("mousemove", mousemove);
//
//var timeScales = data.map(function(name) { return scaleX_020301(name.date); });
//
//function mouseover() {
//  focus.style("display", null);
//  d3.selectAll('.points text').style("display", null);
//}
//function mouseout() {
//  focus.style("display", "none");
//  d3.selectAll('.points text').style("display", "none");
//}
//function mousemove() {
//  var i = d3.bisect(timeScales, d3.mouse(this)[0], 1);
//  var di = data[i-1];
//    //console.log(i)
//  focus.attr("transform", "translate(" + scaleX_020301(di.date) + ",0)");
//  d3.selectAll('.points text')
//    .attr('x', function(di) { return scaleX_020301(di.date) + 15; })
//    .attr('y', function(d) { return scaleY_020301(d.values[i-1].ydata); })
//    .text(function(d) { return d.values[i-1].ydata; })
//    .style('fill', function(d) { return color_020301(d.name); });
//}

svg_020301.append("g")
    .attr("class", "x axis_020301")
    .attr("transform", "translate(0, "+h_020301+")")
    .call(xAxis_020301);

svg_020301.append("g")
    .attr("class", "y axis_020301")
    .call(yAxis_020301.tickFormat(formatPercent_020301))
    .append("text")
    .attr("transform", "rotate(-90)")
	.attr("x", -50)
    .attr("y", -60)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style("fill", "black")
    .text("Adott energiahordozóval fűtő háztartások aránya");
    
svg_020301.append("text")
    .attr("class", "title_020301")
    .attr("x", (w_020301 / 2))             
    .attr("y", 0 - (margin_020301.top / 2))
    .attr("text-anchor", "middle")
    .text("Az energiahordozók lakossági használatának aránya (2010–2016)");

svg_020301.append("text")
    .attr("class", "data_source_020301")
    .attr("x", w_020301 - 70)
    .attr("y", h_020301 + 50)
    .style("text-anchor", "middle")
    .text("Adatok forrása: KSH 2018c.")
    .on('click', function(d) {
    window.open(
        'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_zhc025a.html'
    );
    })
    .on('mouseover', function(d){
        d3.select(this).style("cursor", "pointer"); 
    })

    .on("mouseout", function() { d3.select(this).style("cursor", "default"); })
    .on("mousemove", function(d) {
    d3.select(this).style("cursor", "pointer"); 
    });
    
var mouseG_020301 = svg_020301.append("g") // this the black vertical line to follow mouse
    .attr("class", "mouse-over-effects_020301");

mouseG_020301.append("path")
    .attr("class", "mouse-line_020301")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines_020301 = document.getElementsByClassName("line_020301");

var mousePerLine_020301 = mouseG_020301.selectAll(".mouse-per-line_020301")
    .data(categories_020301)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line_020301");

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
        d3.select(".mouse-line_020301").style("opacity", "0");
        d3.selectAll(".mouse-per-line_020301 circle").style("opacity", "0");
        d3.selectAll(".mouse-per-line_020301 text").style("opacity", "0")
    })
    .on("mouseover", function(){
        d3.select(".mouse-line_020301").style("opacity", "1");
        d3.selectAll(".mouse-per-line_020301 circle").style("opacity", "1");
        d3.selectAll(".mouse-per-line_020301 text").style("opacity", "1")
    })
    .on("mousemove", function(){
        var mouse_020301 = d3.mouse(this);
        console.log("mouse_020301[0]", mouse_020301[0]);
    
        d3.select(".mouse-line_020301")
            .attr("d", function(){
                var d_020301 = "M" + mouse_020301[0] +", " + h_020301;
                console.log("d_020301 I", d_020301);
                d_020301+=" " +mouse_020301[0] + ", " + 0;
                console.log("d_020301 II", d_020301);
                return d_020301;
            })
    
        var ypos_020301 = [];

        d3.selectAll(".mouse-per-line_020301")
            .attr("transform", function(d, i) {
                var xDate_020301 = scaleX_020301.invert(mouse_020301[0]), 
                bisect_020301 = d3.bisector(function(d) { return d.date;}).right;
                idx_020301 = bisect_020301(d.values, xDate_020301);
            
                //console.log("xDate_020301", xDate_020301);
                //console.log("idx_020301", idx_020301);

                var beginning_020301 = 0, 
                    end_020301 = lines_020301[i].getTotalLength(), 
                    target_020301 = null;
                
                //console.log("lines_020301", lines_020301);
                //console.log("beginning_020301", beginning_020301);
                //console.log("end_020301", end_020301);
                
                while (true){
                  target_020301 = Math.floor((beginning_020301 + end_020301) / 2);
                    
                    //console.log("target_020301", target_020301);
                    
                  pos_020301 = lines_020301[i].getPointAtLength(target_020301);
                    
                    //console.log("pos_020301", pos_020301);
                
                    if ((target_020301 === end_020301 || target_020301 === beginning_020301) && pos_020301.x !== mouse_020301[0]) {break;}
                  if (pos_020301.x > mouse_020301[0]) end_020301 = target_020301;
                  else if (pos_020301.x < mouse_020301[0]) beginning_020301 = target_020301;
                  else break; //position found
                }

                d3.select(this).select('text')
                    .text(format_020301(scaleY_020301.invert(pos_020301.y)));
                console.log("i", i);
                console.log("pos_020301.y", pos_020301.y);
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
            return "translate(10, " + (3 + ypos_020301[i].off) + ")";
        });

    });


/*var bisect = d3.bisector(function(d) { return parseDate_020301(d.date); }).left;
var focus = svg_020301.append("g")
      .attr("class", "focus")
      .style("display", "none");
for(var i=0;i<categories_020301.length;i++){
          focus.append("g")
            .attr("class", "focus"+i)
            .append("circle")
            .style("stroke",  color_020301(categories_020301[i].name))
            .style("fill", "none")
            .attr("transform", "translate(" + margin_020301.left  + "," + margin_020301.top + ")")
            .attr("r", 4);
          focus.append("g")
            .attr("class", "focus"+i)
            .append("line")
            .style("stroke",  color_020301(categories_020301[i].name))
            .style("fill", color_020301(categories_020301[i].name))
            .attr("transform", "translate(" + margin_020301.left  + "," + margin_020301.top + ")")
            .classed('x', true); 
          svg_020301.select(".focus"+i)
            .append("text")
            .attr("transform", "translate(" + margin_020301.left  + "," + margin_020301.top + ")")
            .attr("x", 9)
            .attr("dy", ".35em");
      }
  svg_020301.append("rect")
      .attr("class", "overlay")
      .attr("width", w_020301)
      .attr("height", h_020301)
        .attr("transform", "translate(" + margin_020301.left + "," + margin_020301.top + ")")
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove",  mousemove);
function mousemove() {
          var x0 = scaleX_020301.invert(d3.mouse(this)[0]);
          var series =
                categories_020301.map(function(e) {
                var i = bisect(e.values, x0, 1),
                    d0 = e.values[i - 1],
                    d1 = e.values[i];
                return x0 - d0.date > d1.date - x0 ? d1 : d0;
              });
  for(var i=0; i<series.length;i++){
            var selectedFocus = svg_020301.selectAll(".focus"+i);
            selectedFocus.attr("transform", "translate(" + scaleX_020301(parseDate_020301(series[i].date)) + "," + scaleY_020301(series[i].ydata) + ")");
            selectedFocus.select("text").text(series[i].ydata);
      console.log("i", i);
      console.log("parseDate_020301(series[i].date)", parseDate_020301(series[i].date));
      console.log("series[i].ydata", series[i].ydata)
//           selectedFocus.select("line")
//                .attr('x1', 0)
//                .attr('x2', 0)
//                .attr('y1', 0)
//                .attr('y2', h_020301 - scaleY_020301(series[i].ydata));
          }
        }*/

});
    
function type_020301(d, _, columns) {
    d.date = parseDate_020301(d.date);
    for (var i_020301 = 1, n = columns.length, c; i_020301 < n; ++i_020301) d[c = columns[i_020301]] = +d[c];
    return d;
}

/*Sources:
https://bl.ocks.org/mbostock/3884955
https://www.codeseek.co/Asabeneh/d3-mouseover-multi-line-chart-d3js-v4-RZpYBo */