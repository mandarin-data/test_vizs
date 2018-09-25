var locale_020302 = {
  "decimal": ",",
  "thousands": "\u00a0",
  "grouping": [3],
  "currency": ["", "\u00a0Ft"]
};
d3.formatDefaultLocale(locale_020302);
var format_020302 = d3.format("." +  d3.precisionFixed(0.001) + "f"),
    formatThousands_020302 = d3.format(",");

var margin_020302 = {
  top: 50, 
  right: 70, 
  bottom: 60, 
  left: 60
};

var w_020302 = d3.select("#topic02-vis03-part02").node().getBoundingClientRect().width - margin_020302.left - margin_020302.right;
var h_020302 = d3.select("#topic02-vis03-part02").node().getBoundingClientRect().height - margin_020302.top - margin_020302.bottom;

var parseDate_020302 = d3.timeParse("%Y");

var scaleX_020302 = d3.scaleTime()
    .range([0, w_020302]);

var scaleYLeft_020302 = d3.scaleLinear()
    .range([h_020302, 0]);
var scaleYRight_020302 = d3.scaleLinear()
    .range([h_020302, 0]);

var color_020302 = d3.scaleOrdinal()
    .range(["#43B02A", "#385988"]);
var colorReversed_020302 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A"]);

var lineLeft_020302 = d3.line()
    .x(function(d){return scaleX_020302(d.date)})
    .y(function(d){return scaleYLeft_020302(d["A gáz árváltozása"])})
var lineRight_020302 = d3.line()
    .x(function(d){return scaleX_020302(d.date)})
    .y(function(d){return scaleYRight_020302(d["A fa árváltozása"])})

var svg_020302 = d3.select("#topic02-vis03-part02").append("svg")
    .attr("width", w_020302 + margin_020302.left + margin_020302.right)
    .attr("height", h_020302 + margin_020302.top + margin_020302.bottom)
    .append("g")
    .attr("transform", "translate("+margin_020302.left +", "+margin_020302.top+")")

d3.tsv("../../data/02_lakasminoseg_energiaszegenyseg/02_03_02_gaz_vs_fa_arvaltozas_timeseries.tsv", type_020302, function (error, data) {
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

console.log(data);

scaleX_020302.domain(d3.extent(data, function(d){
  return d.date;
}));
scaleYLeft_020302.domain([
    d3.min(data, function(d) {return Math.max(d["A gáz árváltozása"]); }), 
    d3.max(data, function(d) {return Math.max(d["A gáz árváltozása"]); })]).nice();
scaleYRight_020302.domain([
    d3.min(data, function(d) {return Math.max(d["A fa árváltozása"]); }), 
    d3.max(data, function(d) {return Math.max(d["A fa árváltozása"]); })]).nice();

var legend_020302 = svg_020302.selectAll("g")
    .data(categories_020302)
    .enter()
    .append("g")
    .attr("class", "legend_020302");

legend_020302.append("rect")
    .attr("x", w_020302-130)
    .attr("y", function(d, i) {return i * 20;} )
    .attr("width", 2)
    .attr("height", 15)
    .style("fill", function(d) {return colorReversed_020302(d.name);} );

legend_020302.append("text")
    .attr("x", w_020302-125)
    .attr("y", function(d, i) {return (i * 20) + 12;} )
    .text(function(d) {return d.name;} );

svg_020302.append("path")
    .data([data])
    .attr("class", "line_020302")
    .style("stroke", "#385988")
    .attr("d", lineLeft_020302);

svg_020302.append("path")
    .data([data])
    .attr("class", "line_020302")
    .style("stroke", "#43B02A")
    .attr("d", lineRight_020302);

svg_020302.append("g")
    .attr("class", "x axis_020302")
    .attr("transform", "translate(0, "+h_020302+")")
    .call(d3.axisBottom(scaleX_020302));

svg_020302.append("g")
    .attr("class", "y axisLeft_020302")
    .call(d3.axisLeft(scaleYLeft_020302))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (margin_020302.left +margin_020302.right))
    .attr("y", -50)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style("fill", "black")
    .text("Gáz ára, Ft/m\u00B3");

svg_020302.append("g")
    .attr("class", "y axisRight_020302")
    .attr("transform", "translate( " + w_020302 + ", 0 )")
    .call(d3.axisRight(scaleYRight_020302).tickFormat(formatThousands_020302))
    .append("text")
    .attr("x", 0 + margin_020302.left)
    .attr("y", -60)
    .attr("dy", "0.32em")
    .attr("text-anchor", "start")
    .attr("transform", "rotate(90)")
    .style("fill", "black")
    .text("Egységes fűrészelt tűzifa ára, Ft/100 kg");

svg_020302.append("text")
    .attr("class", "title_020302")
    .attr("x", (w_020302 / 2))             
    .attr("y", 0 - (margin_020302.top / 2))
    .attr("text-anchor", "middle")
    .text("Az energiahordozók árváltozásai (2010–2016)");

svg_020302.append("text")
    .attr("class", "data_source_020302")
    .attr("x", w_020302 - 70)
    .attr("y", h_020302 + 50)
    .style("text-anchor", "middle")
    .text("Adatok forrása: KSH 2018b, ")
    .on('click', function(d) {
    window.open(
        'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_qsf003a.html?down=642.4000244140625'
    );
    })
    .on('mouseover', function(d){
        d3.select(this).style("cursor", "pointer"); 
    })

    .on("mouseout", function() { d3.select(this).style("cursor", "default"); })
    .on("mousemove", function(d) {
    d3.select(this).style("cursor", "pointer"); 
    });

//var category_020302 = svg_020302.selectAll(".category_020302")
//    .data(categories_020302)
//    .enter().append("g")
//    .attr("class", "category_020302");
//
//category_020302.append("path")
//    .attr("class", "lineLeft_020302")
//    .attr("d", function(d) {return lineLeft_020302(d.values);} )
//    .style("stroke", function(d) {return color_020302(d.name)} );

var mouseG_020302 = svg_020302.append("g") // this the black vertical line to folow mouse
    .attr("class", "mouse-over-effects_020302");

mouseG_020302.append("path")
    .attr("class", "mouse-line_020302")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines_020302 = document.getElementsByClassName("line_020302");

var mousePerLine_020302 = mouseG_020302.selectAll(".mouse-per-line_020302")
    .data(categories_020302)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line_020302");

mousePerLine_020302.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {return colorReversed_020302(d.name);} )
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
        d3.select(".mouse-line_020302").style("opacity", "0");
        d3.selectAll(".mouse-per-line_020302 circle").style("opacity", "0");
        d3.selectAll(".mouse-per-line_020302 text").style("opacity", "0")
    })
    .on("mouseover", function(){
        d3.select(".mouse-line_020302").style("opacity", "1");
        d3.selectAll(".mouse-per-line_020302 circle").style("opacity", "1");
        d3.selectAll(".mouse-per-line_020302 text").style("opacity", "1")
    })
    .on("mousemove", function(){
        var mouse_020302 = d3.mouse(this);
    
        d3.select(".mouse-line_020302")
            .attr("d", function(){
                var d_020302 = "M" + mouse_020302[0] +", " + h_020302;
                d_020302+=" " +mouse_020302[0] + ", " + 0;
                return d_020302;
            })
    
        var ypos_020302 = [];

        d3.selectAll(".mouse-per-line_020302")
            .attr("transform", function(d, i) {
                var xDate_020302 = scaleX_020302.invert(mouse_020302[0]), 
                bisect_020302 = d3.bisector(function(d) { return d.date;}).right;
                idx_020302 = bisect_020302(d.values, xDate_020302);

                var beginning_020302 = 0, 
                    end_020302 = lines_020302[i].getTotalLength(), 
                    target_020302 = null;

                while (true){
                  target_020302 = Math.floor((beginning_020302 + end_020302) / 2);
                    
                  pos_020302 = lines_020302[i].getPointAtLength(target_020302);

                  if ((target_020302 === end_020302 || target_020302 === beginning_020302) && pos_020302.x !== mouse_020302[0]) {break;}
                  if (pos_020302.x > mouse_020302[0]) end_020302 = target_020302;
                  else if (pos_020302.x < mouse_020302[0]) beginning_020302 = target_020302;
                  else break; //position found
                }

                d3.select(this).select('text')
                  .text(format_020302(scaleYLeft_020302.invert(pos_020302.y)));

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
    
function type_020302(d, _, columns) {
    d.date = parseDate_020302(d.date);
    for (var i_020302 = 1, n = columns.length, c; i_020302 < n; ++i_020302) d[c = columns[i_020302]] = +d[c];
    return d;
}

/*Sources:
https://bl.ocks.org/mbostock/3884955
https://www.codeseek.co/Asabeneh/d3-mouseover-multi-line-chart-d3js-v4-RZpYBo */