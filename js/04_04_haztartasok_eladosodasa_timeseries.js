var locale_0404 = {
  "decimal": ",",
  "thousands": "\u00a0",
  "grouping": [3],
  "currency": ["", "\u00a0Ft"]
};
d3.formatDefaultLocale(locale_0404);
var formatThousands_0404 = d3.format(",");

var margin_0404 = {
  top: 100, 
  right: 55, 
  bottom: 143, 
  left: 65
};

var width_0404 = d3.select("#topic04-vis04").node().getBoundingClientRect().width - margin_0404.left - margin_0404.right;
var height_0404 = d3.select("#topic04-vis04").node().getBoundingClientRect().height - margin_0404.top - margin_0404.bottom;

var parseTime_0404 = d3.timeParse("%Y%m");

const row_0404 = d => {
    d.date = parseTime_0404(d.date);
    d["Ingatlanhitelek, forint"] = +d["Ingatlanhitelek, forint"];
    d["Ingatlanhitelek, deviza"] = +d["Ingatlanhitelek, deviza"];
    d["Fogyasztási és egyéb hitelek, forint"] = +d["Fogyasztási és egyéb hitelek, forint"];
    d["Fogyasztási és egyéb hitelek, deviza"] = +d["Fogyasztási és egyéb hitelek, deviza"];
    d["Hitelek a nem pénzügyi szektortól"] = +d["Hitelek a nem pénzügyi szektortól"];
    d["Forint/Svájci frank árfolyam"] = +d["Forint/Svájci frank árfolyam"];
    return d;
};
      
// Load and summarize the data.
d3.tsv('../../data/04_eladosodas/04_04_haztartasok_eladosodasa.tsv', row_0404, data => {
    render_0404(data);
});

var svg_0404 = d3.select("#topic04-vis04").append("svg")
    .attr("width", width_0404 + margin_0404.left + margin_0404.right)
    .attr("height", height_0404 + margin_0404.top + margin_0404.bottom)
    .append("g")
    .attr("transform", "translate("+margin_0404.left +", "+margin_0404.top+")")

var xAxisG_0404 = svg_0404.append('g')
    .attr('class', 'axis_0404');
var yAxisG_0404 = svg_0404.append('g')
    .attr('class', 'axis_0404 axis_0404--major axis_0404--y');
var yAxisLineG_0404 = svg_0404.append('g')
    .attr('class', 'axis_0404 axis_0404--major axis_0404--y');
var xAxisMinor_0404G_0404 = xAxisG_0404.append('g')
    .attr('class', 'axis_0404 axis_0404--minor');
var xAxisMajor_0404G_0404 = xAxisG_0404.append('g')
    .attr('class', 'axis_0404 axis_0404--major');

const keys_0404 = ["Ingatlanhitelek, forint", "Ingatlanhitelek, deviza", "Fogyasztási és egyéb hitelek, forint", "Fogyasztási és egyéb hitelek, deviza", "Hitelek a nem pénzügyi szektortól"];

var stack_0404 = d3.stack().keys(keys_0404);

var xValue_0404 = function (d) { return d.date; };
var xScale_0404 = d3.scaleTime();
var yScale_0404 = d3.scaleLinear();
var yLineScale_0404 = d3.scaleLinear();
var colorScale_0404 = d3.scaleOrdinal().range(["#1F314B", "#385988", "#006600", "#43B02A", "#FF671F"]);
var line_0404 = d3.line();


var xAxisMajor_0404 = d3.axisBottom().scale(xScale_0404);
var xAxisMinor_0404 = d3.axisBottom().scale(xScale_0404).ticks(30);
var yAxis_0404 = d3.axisLeft().scale(yScale_0404).tickFormat(formatThousands_0404);
var yAxisLine_0404 = d3.axisRight().scale(yLineScale_0404).ticks(10);


var area_0404 = d3.area()
    .x(d => xScale_0404(xValue_0404(d.data)))
    .y0(d => yScale_0404(d[0]))
    .y1(d => yScale_0404(d[1]))
    .curve(d3.curveBasis);

// Render chart
function render_0404(data) {
    const stacked_0404 = stack_0404(data)

    //console.log(data);

    xScale_0404
        .domain(d3.extent(data, xValue_0404))
        .range([0, width_0404]);

    yScale_0404
        .domain([
            d3.min(stacked_0404, function (series) {
              return d3.min(series, function (d) { return d[0]; });
            }), 11000
        ])
        .range([height_0404, 0]);

    yLineScale_0404
        .domain([130, 300])
        .range([height_0404, 0]);

    colorScale_0404.domain(d3.range(keys_0404.length));

    line_0404
        .defined(function(d) {return d["Forint/Svájci frank árfolyam"] != 0; })
        .x(function(d) {return xScale_0404(d.date)})
        .y(function(d) {return yLineScale_0404(d["Forint/Svájci frank árfolyam"])});

    var paths_0404 = svg_0404.selectAll('path').data(stacked_0404);
    var pathsEnter_0404 = paths_0404
        .enter().append('path');
    pathsEnter_0404.merge(paths_0404)
        .attr('fill', function (d) { return colorScale_0404(d.index); })
        .attr('stroke', function (d) { return colorScale_0404(d.index); })
        .attr('d', area_0404);

    paths_0404.select('title')
        .merge(pathsEnter_0404.append('title'))
        .text(function (d) { return d.key; })

    var pathsLine_0404 = svg_0404.selectAll('path').data(stacked_0404);
    var pathsEnterLine_0404 = paths_0404
        .enter().append('path');
    pathsEnter_0404.merge(paths_0404)
        .attr('fill', function (d) { return colorScale_0404(d.index); })
        .attr('stroke', function (d) { return colorScale_0404(d.index); })
        .attr('d', area_0404);

    var labels_0404 = svg_0404.selectAll('text').data(stacked_0404)
    labels_0404
        .enter().append('text')
        .attr('class', 'area label_0404')
        .merge(labels_0404)
        .text(function (d) { return d.key; })
        .attr('transform', d3.areaLabel(area_0404).interpolateResolution(1000));     
    xAxisMajor_0404.tickSize(2); 
    xAxisMinor_0404.tickSize(2);

    xAxisG_0404.attr('transform', `translate(0,${height_0404})`);
    xAxisMajor_0404G_0404.call(xAxisMajor_0404);
    xAxisMinor_0404G_0404.call(xAxisMinor_0404);
    yAxisG_0404.call(yAxis_0404);
    yAxisLineG_0404.call(yAxisLine_0404);
    yAxisLineG_0404.attr("transform", "translate( " + width_0404 + ", 0 )");
    yAxisG_0404.append('text')
        .attr('class', 'axis label_0404')
        .attr('x', -height_0404 / 2)
        .attr('y', -55)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text("Milliárd forint");

    yAxisLineG_0404.append('text')
        .attr('class', 'axis label_0404')
        .attr('x', height_0404 / 2)
        .attr('y', -40)
        .attr('transform', `rotate(90)`)
        .style('text-anchor', 'middle')
        .text("Forint");

    svg_0404.append("path")
        .data([data])
        .attr("class", "yline_0404")
        .attr("d", line_0404);

    svg_0404.append("text")
        .attr("class", "title_0404")
        .attr("x", (width_0404 / 2))             
        .attr("y", -80)
        .attr("text-anchor", "middle")
        .text("A háztartások eladósodottsága (milliárd Ft, 1989–2018)");

    svg_0404.append("line")
        .attr("class", "event_0404")
        .attr("x1", xScale_0404(parseTime_0404("200404")))
        .attr("y1", -26)
        .attr("x2",  xScale_0404(parseTime_0404("200404")))
        .attr("y2", height_0404)
        .style("stroke-dasharray", ("3, 3"));  
    svg_0404.append("circle")
        .attr("class", "event_0404")
        .attr("r", "6")
        .attr("cx", xScale_0404(parseTime_0404("200404")))
        .attr("cy", -31)
        .style("fill", "none");
    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", xScale_0404(parseTime_0404("200404")))
        .attr("y", -42)
        .style("text-anchor", "middle")
        .text("EU-csatlakozás");

    svg_0404.append("line")
        .attr("class", "event_0404")
        .attr("x1", xScale_0404(parseTime_0404("200810")))
        .attr("y1", -12)
        .attr("x2",  xScale_0404(parseTime_0404("200810")))
        .attr("y2", height_0404)
        .style("stroke-dasharray", ("3, 3"));
    svg_0404.append("circle")
        .attr("class", "event_0404")
        .attr("r", "6")
        .attr("cx", xScale_0404(parseTime_0404("200810")))
        .attr("cy", -17)
        .style("fill", "none");
    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", xScale_0404(parseTime_0404("200810")))
        .attr("y", -42)
        .style("text-anchor", "middle")
        .text("Gazdasági válság");
    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", xScale_0404(parseTime_0404("200810")))
        .attr("y", -27)
        .style("text-anchor", "middle")
        .text("kezdete");

    svg_0404.append("line")
        .attr("class", "event_0404")
        .attr("x1", xScale_0404(parseTime_0404("201110")))
        .attr("y1", -12)
        .attr("x2",  xScale_0404(parseTime_0404("201110")))
        .attr("y2", height_0404)
        .style("stroke-dasharray", ("3, 3"));
    svg_0404.append("circle")
        .attr("class", "event_0404")
        .attr("r", "6")
        .attr("cx", xScale_0404(parseTime_0404("201110")))
        .attr("cy", -17)
        .style("fill", "none");
    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", xScale_0404(parseTime_0404("201110")))
        .attr("y", -42)
        .style("text-anchor", "middle")
        .text("Végtörlesztés:");
    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", xScale_0404(parseTime_0404("201110")))
        .attr("y", -27)
        .style("text-anchor", "middle")
        .text("180 forint/frank");

    svg_0404.append("line")
        .attr("class", "event_0404")
        .attr("x1", xScale_0404(parseTime_0404("201410")))
        .attr("y1", -12)
        .attr("x2",  xScale_0404(parseTime_0404("201410")))
        .attr("y2", height_0404)
        .style("stroke-dasharray", ("3, 3"));
    svg_0404.append("circle")
        .attr("class", "event_0404")
        .attr("r", "6")
        .attr("cx", xScale_0404(parseTime_0404("201410")))
        .attr("cy", -17)
        .style("fill", "none");
    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", xScale_0404(parseTime_0404("201410")))
        .attr("y", -42)
        .style("text-anchor", "middle")
        .text("Forintosítás:");
    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", xScale_0404(parseTime_0404("201410")))
        .attr("y", -27)
        .style("text-anchor", "middle")
        .text("256,5 forint/frank");

    var legendarea_0404 = svg_0404.selectAll(".legendarea_0404")
        .data(stacked_0404)
        .enter().append("g")
        .attr("class", "legendarea_0404")
        .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
    legendarea_0404.append("rect")
        .attr("x", -20)
        .attr("y", height_0404 + 30)
        .attr("width", 13)
        .attr("height", 13)
        .style("fill", function(d) {return colorScale_0404(d.key);} );
    legendarea_0404.append("text")
        .attr("x", -2)
        .attr("y", height_0404 + 42)
        .text(function(d) {return d.key + " (bal tengely)";} );

    var legendline_0404 = svg_0404.selectAll(".legendline_0404")
        .data(["Forint/Svájci frank árfolyam"])
        .enter().append("g")
        .attr("class", "legendline_0404")
        .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
    legendline_0404.append("rect")
        .attr("x", -20)
        .attr("y", height_0404 + 125)
        .attr("width", 3)
        .attr("height", 13)
        .style("fill", "#222" );
    legendline_0404.append("text")
        .attr("x", -13)
        .attr("y", height_0404 + 137)
        .text("Forint/Svájci frank árfolyam (jobb tengely)");

}
  
/*Sources:
https://gist.github.com/sajudson/5b1a5f1c8ad0d3b858b3ec3a385d7e0c
*/
