var locale_0501 = {
  "decimal": ",",
  "thousands": "\u00a0",
  "grouping": [3],
  "currency": ["", "\u00a0Ft"]
};
d3.formatDefaultLocale(locale_0501);
var formatPercentDecimal_0501 = d3.format(",.2%"),
    formatPercent_0501 = d3.format("." + (d3.precisionFixed(0.05) - 2) + "%");

var margin_0501 = {
  top: 80, 
  right: 70, 
  bottom: 100, 
  left: 65
};

var w_0501 = d3.select("#topic05-vis01").node().getBoundingClientRect().width - margin_0501.left - margin_0501.right;
var h_0501 = d3.select("#topic05-vis01").node().getBoundingClientRect().height - margin_0501.top - margin_0501.bottom;

var parseDate_0501 = d3.timeParse("%Y%m%d");

var scaleX_0501 = d3.scaleTime()
    .range([0, w_0501]);

var scaleY_0501 = d3.scaleLinear()
    .range([h_0501, 0]);

var color_0501 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A", "#00AFD7", "#C4D600"]);

var xAxis_0501 = d3.axisBottom()
    .scale(scaleX_0501);

var yAxis_0501 = d3.axisLeft()
    .scale(scaleY_0501)

var line_0501 = d3.line()
    .x(function(d){return scaleX_0501(d.date)})
    .y(function(d){return scaleY_0501(d.ydata)});
    //.curve(d3.curveBasis);

var svg_0501 = d3.select("#topic05-vis01").append("svg")
    .attr("width", w_0501 + margin_0501.left + margin_0501.right)
    .attr("height", h_0501 + margin_0501.top + margin_0501.bottom)
    .append("g")
    .attr("transform", "translate("+margin_0501.left +", "+margin_0501.top+")")

d3.tsv("../../data/05_alberlet_also_szegmense/05_01_jovedelem_vs_alberletar_novekedes.tsv", type_0501, function (error, data) {
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

var keys_0501 = data.columns.slice(1);

scaleX_0501.domain(d3.extent(data, function(d){
  return d.date;
}));
scaleY_0501.domain([0.8, 1.9]);

var legend_0501 = svg_0501.selectAll("g")
    .data(categories_0501)
    .enter()
    .append("g")
    .attr("class", "legend_0501");

legend_0501.append("rect")
    .attr("x", w_0501)
    .attr("y", function(d, i) {return i * 20;} )
    .attr("width", 2)
    .attr("height", 15)
    .style("fill", function(d) {return color_0501(d.name);} );

legend_0501.append("text")
    .attr("x", w_0501-5)
    .attr("y", function(d, i) {return (i * 20) + 12;} )
    .attr("font-size", function() {
        if (w_0501 <= 500) {return (w_0501 * 0.0005 + 0.5) + "em"}
        else 	{ return "14px" }
    ;})
    .style("text-anchor", "end")
    .text(function(d) {return d.name;} );

svg_0501.append("g")
    .attr("class", "x axis_0501")
    .attr("transform", "translate(0, "+h_0501+")")
    .call(xAxis_0501)
    .attr("font-size", function() {
        if (w_0501 <= 500) {return (w_0501 * 0.0005 + 0.5) + "em"}
        else 	{ return "14px" }
    ;});

svg_0501.append("g")
    .attr("class", "y axis_0501")
    .call(yAxis_0501.tickFormat(formatPercent_0501))
    .attr("font-size", function() {
        if (w_0501 <= 500) {return (w_0501 * 0.0005 + 0.5) + "em"}
        else 	{ return "14px" }
    ;})
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -60)
    .attr("y", -60)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style("fill", "black")
    .text("Változás 2010-hez képest (2010 = 100%)");
    
svg_0501.append("text")
    .attr("class", "title_0501")
    .attr("x", (w_0501 / 2))             
    .attr("y", 0 - (margin_0501.top / 2))
    .attr("font-size", function() {
        if (w_0501 <= 500) {return (w_0501 * 0.0005 + 0.5) + "em"}
        else 	{ return "18px" }
    ;})
    .attr("text-anchor", "middle")
    .text("A jövedelmek és az albérletárak változása az alsó jövedelmi tizedben (2010–2017)");


svg_0501.append("text")
    .attr("class", "data_source_0501")
    .attr("x", function() {
        if (w_0501 <= 500) {return w_0501 - 100}
        else 	{ return (w_0501 - 130)}
    ;}) 
    .attr("y", h_0501 + 50)
    .attr("font-size", function() {
        if (w_0501 <= 500) {return  "10px"}
        else 	{ return "14px" }
    ;})
    .style("text-anchor", "middle")
    .text("Adatok forrása: jofogas.hu, ")
    .on('click', function(d) {
    window.open(
        'https://www.jofogas.hu/'
    );
    })
    .on('mouseover', function(d){
        d3.select(this).style("cursor", "pointer"); 
    })

    .on("mouseout", function() { d3.select(this).style("cursor", "default"); })
    .on("mousemove", function(d) {
    d3.select(this).style("cursor", "pointer"); 
    });

svg_0501.append("text")
    .attr("class", "data_source_0501")
    .attr("x", function() {
        if (w_0501 <= 500) {return (w_0501 - 12) }
        else 	{ return (w_0501 - 7)}
    ;}) 
    .attr("y", h_0501 + 50)
    .attr("font-size", function() {
        if (w_0501 <= 500) {return "10px"}
        else 	{ return "14px" }
    ;})
    .style("text-anchor", "middle")
    .text("KSH 2018a.")
    .on('click', function(d) {
    window.open(
        'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_zhc014a.html'
    );
    })
    .on('mouseover', function(d){
        d3.select(this).style("cursor", "pointer"); 
    })

    .on("mouseout", function() { d3.select(this).style("cursor", "default"); })
    .on("mousemove", function(d) {
    d3.select(this).style("cursor", "pointer"); 
    });
    
var category_0501 = svg_0501.selectAll(".category_0501")
    .data(categories_0501)
    .enter().append("g")
    .attr("class", "category_0501");

category_0501.append("path")
    .attr("class", "line_0501")
    .attr("d", function(d) {return line_0501(d.values);} )
    .style("stroke", function(d) {return color_0501(d.name)} );

// Draw the empty value for every point
var points_0501 = svg_0501.selectAll('.points')
  .data(categories_0501)
  .enter()
  .append('g')
  .attr('class', 'points_0501')
  .append('text');

var timeScales_0501 = data.map(function(name) { return scaleX_0501(name.date); });
console.log(timeScales_0501)

var mouseG_0501 = svg_0501.append("g") // this the black vertical line to folow mouse
    .attr("class", "mouse-over-effects_0501");

mouseG_0501.append("path")
    .attr("class", "mouse-line_0501")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines_0501 = document.getElementsByClassName("line_0501");

var mousePerLine_0501 = mouseG_0501.selectAll(".mouse-per-line_0501")
    .data(categories_0501)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line_0501");

mousePerLine_0501.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {return color_0501(d.name);} )
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

mousePerLine_0501.append("text")
    .attr("transform", "translate(10, 3)");

mouseG_0501.append("rect")
    .attr("width", w_0501)
    .attr("height", h_0501)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseout", function(){
        d3.select(".mouse-line_0501").style("opacity", "0");
        d3.selectAll(".mouse-per-line_0501 circle").style("opacity", "0");
        d3.selectAll(".mouse-per-line_0501 text").style("opacity", "0")
    })
    .on("mouseover", function(){
        d3.select(".mouse-line_0501").style("opacity", "1");
        d3.selectAll(".mouse-per-line_0501 circle").style("opacity", "1");
        d3.selectAll(".mouse-per-line_0501 text").style("opacity", "1")
    })
    .on("mousemove", function(){
        var mouse_0501 = d3.mouse(this),
            j_0501 = d3.bisect(timeScales_0501, mouse_0501[0], 1),
            di_0501 = data[j_0501-1];
            console.log(di_0501["Nettó átlagjövedelem-változás"])
            if (isNaN(di_0501["Nettó átlagjövedelem-változás"])) {
                di_0501["Nettó átlagjövedelem-változás"] = 1.1140651021;
            }
            console.log(di_0501["Nettó átlagjövedelem-változás"])
    
        d3.select(".mouse-line_0501")
            .attr("d", function(){
                var d_0501 = "M" + mouse_0501[0] +", " + h_0501;
                d_0501+=" " +mouse_0501[0] + ", " + 0;
                return d_0501;
            })
    
        var ypos_0501 = [];

        d3.selectAll(".mouse-per-line_0501")
            .attr("transform", function(d, i) {
                var xDate_0501 = scaleX_0501.invert(mouse_0501[0]), 
                bisect_0501 = d3.bisector(function(d) { return d.date;}).right;
                idx_0501 = bisect_0501(d.values, xDate_0501);

                var beginning_0501 = 0, 
                    end_0501 = lines_0501[i].getTotalLength(), 
                    target_0501 = null;

                while (true){
                  target_0501 = Math.floor((beginning_0501 + end_0501) / 2);
                    
                  pos_0501 = lines_0501[i].getPointAtLength(target_0501);

                  if ((target_0501 === end_0501 || target_0501 === beginning_0501) && pos_0501.x !== mouse_0501[0]) {break;}
                  if (pos_0501.x > mouse_0501[0]) end_0501 = target_0501;
                  else if (pos_0501.x < mouse_0501[0]) beginning_0501 = target_0501;
                  else break; //position found
                }

                d3.select(this).select('text')
                    .text(formatPercentDecimal_0501(di_0501[keys_0501[i]]));

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
        })
        .attr("font-size", function() {
        if (w_0501 <= 500) {return (w_0501 * 0.0005 + 0.5) + "em"}
        else 	{ return "14px" }
        ;});

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