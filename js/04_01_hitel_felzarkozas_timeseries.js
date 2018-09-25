var locale_0401 = {
  "decimal": ",",
  "thousands": "\u00a0",
  "grouping": [3],
  "currency": ["", "\u00a0Ft"]
};
d3.formatDefaultLocale(locale_0401);
var formatPercentDecimal_0401 = d3.format(",.2%"),
    formatPercent_0401 = d3.format("." + (d3.precisionFixed(0.05) - 2) + "%");

var margin_0401 = {
  top: 80, 
  right: 50, 
  bottom: 60, 
  left: 60
};

var w_0401 = d3.select("#topic04-vis01").node().getBoundingClientRect().width - margin_0401.left - margin_0401.right;
var h_0401 = d3.select("#topic04-vis01").node().getBoundingClientRect().height - margin_0401.top - margin_0401.bottom;

var parseDate_0401 = d3.timeParse("%Y");

var scaleX_0401 = d3.scaleTime()
    .range([0, w_0401]);

var scaleY_0401 = d3.scaleLinear()
    .range([h_0401, 0]);

var color_0401 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A", "#00AFD7", "#C4D600"]);

var xAxis_0401 = d3.axisBottom()
    .scale(scaleX_0401);

var yAxis_0401 = d3.axisLeft()
    .scale(scaleY_0401)

var line_0401 = d3.line()
    .x(function(d){return scaleX_0401(d.date)})
    .y(function(d){return scaleY_0401(d.ydata)})

var line_dashed_0401 = d3.line()
    .defined(function(d) {return d.dashed == 0; })
    .x(function(d){return scaleX_0401(d.date)})
    .y(function(d){return scaleY_0401(d.ydata)})

var svg_0401 = d3.select("#topic04-vis01").append("svg")
    .attr("width", w_0401 + margin_0401.left + margin_0401.right)
    .attr("height", h_0401 + margin_0401.top + margin_0401.bottom)
    .append("g")
    .attr("transform", "translate("+margin_0401.left +", "+margin_0401.top+")")

d3.tsv("../../data/04_eladosodas/04_01_hitel_felzarkozas.tsv", type_0401, function (error, data) {
    if (error) throw error;

    var categories_0401 = data.columns.slice(2).map(function (name) {
        return {
            name: name,
            values: data.map(function (d) {
                return {
                    date: d.date, 
                    dashed: d.dashed,
                    ydata: d[name]
                };
            })
        };
    });

scaleX_0401.domain(d3.extent(data, function(d){
  return d.date;
}));
scaleY_0401.domain([0, 0.5]);

var legend_0401 = svg_0401.selectAll("g")
    .data(categories_0401)
    .enter()
    .append("g")
    .attr("class", "legend_0401");

legend_0401.append("rect")
    .attr("x", w_0401-135)
    .attr("y", function(d, i) {return i * 20;} )
    .attr("width", 2)
    .attr("height", 15)
    .style("fill", function(d) {return color_0401(d.name);} );

legend_0401.append("text")
    .attr("x", w_0401-130)
    .attr("y", function(d, i) {return (i * 20) + 12;} )
    .text(function(d) {return d.name;} );

svg_0401.append("g")
    .attr("class", "x axis_0401")
    .attr("transform", "translate(0, "+h_0401+")")
    .call(xAxis_0401);

svg_0401.append("g")
    .attr("class", "y axis_0401")
    .call(yAxis_0401.tickFormat(formatPercent_0401));
    
svg_0401.append("text")
    .attr("class", "title_0401")
    .attr("x", (w_0401 / 2))             
    .attr("y", 0 - (margin_0401.top / 2))
    .attr("text-anchor", "middle")
    .text('A hitelezésben várható „felzárkózás”');
    
svg_0401.append('text')
	.attr("class", "data_source_0401")
    .attr("x", w_0401 - 40)
    .attr("y", h_0401 + 50)
	.attr("text-anchor", "middle")  
	.text("Adatok forrása: MNB")
	.on('click', function(d) {
		window.open(
			'https://www.portfolio.hu/public/portfolio/conferences/presentations/nagy_marton_portfolio_hitelezes_2018-787.pdf'
		);
	})
	.on('mouseover', function(d){
		d3.select(this).style("cursor", "pointer"); 
	})

	.on("mouseout", function() { d3.select(this).style("cursor", "default"); })
	.on("mousemove", function(d) {
	d3.select(this).style("cursor", "pointer"); 
	});
    
var category_0401 = svg_0401.selectAll(".category_0401")
    .data(categories_0401)
    .enter().append("g")
    .attr("class", "category_0401");

category_0401.append("path")
    .attr("class", "line_0401")
    .attr("d", function(d) {return line_0401(d.values);} )
    .style("stroke", function(d) {return color_0401(d.name)} )
    .style("stroke-dasharray", ("4, 4"));

category_0401.append("path")
    .attr("class", "line_dashed_0401")
    .attr("d", function(d) {return line_dashed_0401(d.values);} )
    .style("stroke", function(d) {return color_0401(d.name)} );    
    
var mouseG_0401 = svg_0401.append("g") // this the black vertical line to folow mouse
    .attr("class", "mouse-over-effects_0401");

mouseG_0401.append("path")
    .attr("class", "mouse-line_0401")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines_0401 = document.getElementsByClassName("line_0401");

var mousePerLine_0401 = mouseG_0401.selectAll(".mouse-per-line_0401")
    .data(categories_0401)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line_0401");

mousePerLine_0401.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {return color_0401(d.name);} )
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

mousePerLine_0401.append("text")
    .attr("transform", "translate(10, 3)");

mouseG_0401.append("rect")
    .attr("width", w_0401)
    .attr("height", h_0401)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseout", function(){
        d3.select(".mouse-line_0401").style("opacity", "0");
        d3.selectAll(".mouse-per-line_0401 circle").style("opacity", "0");
        d3.selectAll(".mouse-per-line_0401 text").style("opacity", "0")
    })
    .on("mouseover", function(){
        d3.select(".mouse-line_0401").style("opacity", "1");
        d3.selectAll(".mouse-per-line_0401 circle").style("opacity", "1");
        d3.selectAll(".mouse-per-line_0401 text").style("opacity", "1")
    })
    .on("mousemove", function(){
        var mouse_0401 = d3.mouse(this);
    
        d3.select(".mouse-line_0401")
            .attr("d", function(){
                var d_0401 = "M" + mouse_0401[0] +", " + h_0401;
                d_0401+=" " +mouse_0401[0] + ", " + 0;
                return d_0401;
            })
    
        var ypos_0401 = [];

        d3.selectAll(".mouse-per-line_0401")
            .attr("transform", function(d, i) {
                var xDate_0401 = scaleX_0401.invert(mouse_0401[0]), 
                bisect_0401 = d3.bisector(function(d) { return d.date;}).right;
                idx_0401 = bisect_0401(d.values, xDate_0401);

                var beginning_0401 = 0, 
                    end_0401 = lines_0401[i].getTotalLength(), 
                    target_0401 = null;

                while (true){
                  target_0401 = Math.floor((beginning_0401 + end_0401) / 2);
                    
                  pos_0401 = lines_0401[i].getPointAtLength(target_0401);

                  if ((target_0401 === end_0401 || target_0401 === beginning_0401) && pos_0401.x !== mouse_0401[0]) {break;}
                  if (pos_0401.x > mouse_0401[0]) end_0401 = target_0401;
                  else if (pos_0401.x < mouse_0401[0]) beginning_0401 = target_0401;
                  else break; //position found
                }

                d3.select(this).select('text')
                  .text(formatPercentDecimal_0401(scaleY_0401.invert(pos_0401.y)));

                ypos_0401.push ({ind: i, y: pos_0401.y, off: 0});

                return "translate(" + mouse_0401[0] + ", " + pos_0401.y +")";
        })

        .call(function(sel) {
            ypos_0401.sort (function(a, b) { return a.y - b.y; });
            ypos_0401.forEach (function(p, i) {
                if (i > 0) {
                var last_0401 = ypos_0401[i-1].y;
                ypos_0401[i].off = Math.max (0, (last_0401 + 15) - ypos_0401[i].y);
                ypos_0401[i].y += ypos_0401[i].off;
                }
            })
            ypos_0401.sort (function(a, b) { return a.ind - b.ind; });
        })

        .select("text")
        .attr("transform", function(d, i) {
            return "translate (10, "+(3+ypos_0401[i].off)+")";
        });

    });
});
    
function type_0401(d, _, columns) {
    d.date = parseDate_0401(d.date);
    for (var i_0401 = 1, n = columns.length, c; i_0401 < n; ++i_0401) d[c = columns[i_0401]] = +d[c];
    return d;
}

/*Sources:
https://bl.ocks.org/mbostock/3884955
https://www.codeseek.co/Asabeneh/d3-mouseover-multi-line-chart-d3js-v4-RZpYBo */