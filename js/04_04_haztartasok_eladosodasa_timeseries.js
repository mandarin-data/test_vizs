var margin_0404 = {
  top: 50, 
  right: 185, 
  bottom: 110, 
  left: 60
};

var width_0404 = d3.select("#topic04-vis04").node().getBoundingClientRect().width - margin_0404.left - margin_0404.right;
var height_0404 = d3.select("#topic04-vis04").node().getBoundingClientRect().height - margin_0404.top - margin_0404.bottom;

var parseTime_0404 = d3.timeParse("%Y%m%d");

var line_0404 = d3.line()
    //.curve(d3.curveMonotoneX)
    .x(function(d) {
        return x_scale_0404(d.date);
    })
    .y(function(d) {
        return y_scale_0404(d.response);
    });

var svg_0404 = d3.select('#topic04-vis04')
    .append('svg')
    .attr("width", width_0404 + margin_0404.left + margin_0404.right)
    .attr("height", height_0404 + margin_0404.top + margin_0404.bottom)
    .append("g")
    .attr("transform", "translate("+margin_0404.left +", "+margin_0404.top+")")

var x_scale_0404 = d3.scaleTime()
    .range([0, width_0404]);

var y_scale_0404 = d3.scaleLinear()
    .range([height_0404, 0]);

var colour_scale_0404 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A", "#00AFD7", "#C4D600"]);

var voronoi_0404 = d3.voronoi()
    .x(function(d) {
        return x_scale_0404(d.date);
    })
    .y(function(d) {
        return y_scale_0404(d.response);
    })
    .extent([
        [-margin_0404.left, -margin_0404.top],
        [width_0404 + margin_0404.right, height_0404 + margin_0404.bottom]
    ]);


svg_0404.append("g")
    .attr("class", "axis_0404 x")
    .attr("transform", "translate(0," + height_0404 + ")");

svg_0404.append("g")
    .attr("class", "axis_0404 y")


function relax_0404(data) {
    var spacing_0404 = 16;
    var dy_0404 = 2;
    var repeat_0404 = false;
    var count_0404 = 0;
    data.forEach(function(dA, i) {
        var yA_0404 = dA.labelY;
        data.forEach(function(dB, j) {
            var yB_0404 = dB.labelY;
            if (i === j) {
                return;
            }
            diff_0404 = yA_0404 - yB_0404;
            if (Math.abs(diff_0404) > spacing_0404) {
                return;
            }
            repeat_0404 = true;
            magnitude_0404 = diff_0404 > 0 ? 1 : -1;
            adjust_0404 = magnitude_0404 * dy_0404;
            dA.labelY = +yA_0404 + adjust_0404;
            dB.labelY = +yB_0404 - adjust_0404;
            dB.labelY = dB.labelY > height_0404 ? height_0404 : dB.labelY
            dA.labelY = dA.labelY > height_0404 ? height_0404 : dA.labelY
        })
    })
    if (repeat_0404) {
        relax_0404(data);
    }
}

d3.tsv("../../data/04_eladosodas/04_04_haztartasok_eladosodasa.tsv", function(d, i, columns) {
    d.date = parseTime_0404(d.date);

    for (var i_0404 = 1; i_0404 < columns.length; ++i_0404) {
        d[columns[i_0404]] = +d[columns[i_0404]];
    }

    return d;
}, function(data) {

    var responses_0404 = data.columns.slice(1)
        .map(function(id) {
            return {
                id: id,
                values: data.map(function(d) {
                    return {
                        date: d.date,
                        response: d[id]
                    };
                })
            };
        });

    x_scale_0404.domain(d3.extent(data, function(d) {
        return d.date;
    }));

    y_scale_0404.domain([
        d3.min(responses_0404, function(r) {
            return d3.min(r.values, function(d) {
                return d.response;
            });
        }),
        d3.max(responses_0404, function(r) {
            return d3.max(r.values, function(d) {
                return d.response;
            });
        })
    ]);

    responses_0404.forEach(function(r) {
        r.labelY = y_scale_0404(r.values[r.values.length - 1].response);
    });

    relax_0404(responses_0404);
    colour_scale_0404.domain(responses_0404.map(function(c) {
        return c.id;
    }));

    var response_0404 = svg_0404.selectAll(".response_0404")
        .data(responses_0404)
        .enter()
        .append("g")
        .attr("class", "response_0404");

    response_0404.append("path")
        .attr("class", "time series line_0404")
        .attr("d", function(d) {
            return line_0404(d.values);
        })
        .attr("stroke", function(d) {
            return colour_scale_0404(d.id);
        });

    response_0404.append("text")
        .datum(function(d) {
            return {
                id: d.id,
                value: d.values[d.values.length - 1],
                labelY: d.labelY
            };
        })
        .attr("transform", function(d) {
            return "translate(" + (x_scale_0404(d.value.date) + 10) + "," + d.labelY + ")";
        })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .attr("class", "label_0404")
        .style("font", "10px sans-serif")
        .text(function(d) {
            return d.id;
        });

    var data_0404 = d3.merge(responses_0404.map(function(d) {
        return d.values;
    }));

    var lines_0404 = svg_0404.selectAll(".lines_0404")
        .data(responses_0404);

    lines_0404.enter()
        .append("line")
        .attr("x1", function(d) {
            return x_scale_0404(d.values[d.values.length - 1].date);
        })
        .attr("y1", function(d) {
            return y_scale_0404(d.values[d.values.length - 1].response);
        })
        .attr("x2", function(d) {
            return x_scale_0404(d.values[d.values.length - 1].date) + 10;
        })
        .attr("y2", function(d) {
            return d.labelY;
        })
        .attr('stroke', 'black')
        .attr('stroke-width', '0.5px');

    svg_0404.select('.y.axis_0404')
        .call(d3.axisLeft(y_scale_0404))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("Milliárd forint");

    svg_0404.select('.x.axis_0404 .tick text')


    svg_0404.select('.x.axis_0404')
        .call(d3.axisBottom(x_scale_0404)
            .ticks(d3.timesecondYear))
        .selectAll('text')
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", "1.5em")
        .style("text-anchor", "end");
        //.attr("transform", "rotate(0)");
    
    svg_0404.append("text")
    .attr("class", "title_0404")
    .attr("x", (width_0404 / 2))             
    .attr("y", 0 - (margin_0404.top / 2))
    .attr("text-anchor", "middle")
    .text("A háztartások eladósodottsága (milliárd Ft, 1989–2018)");
    
    svg_0404.append('text')
        .attr("class", "data source_0404")
        .attr("x", width_0404 + 120)
        .attr("y", height_0404 + 90)
        .attr("text-anchor", "middle")  
        .text("Adatok forrása: MNB")
        .on('click', function(d) {
            window.open(
                'http://www.mnb.hu/letoltes/htszla-hu.xlsx',
                '_blank'
            );
        })
        .on('mouseover', function(d){
            d3.select(this).style("cursor", "pointer"); 
        })

        .on("mouseout", function() { d3.select(this).style("cursor", "default"); })
        .on("mousemove", function(d) {
        d3.select(this).style("cursor", "pointer"); 
        });
    
    svg_0404.append("line")
        .attr("class", "event_0404")
        .attr("x1", x_scale_0404(parseTime_0404("20040401")))
        .attr("y1", 0)
        .attr("x2",  x_scale_0404(parseTime_0404("20040401")))
        .attr("y2", height_0404 + 50)
        .style("stroke-width", 1)
        .style("stroke", "red")
        .style("fill", "none")
        .style("stroke-dasharray", ("3, 3"));

    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", x_scale_0404(parseTime_0404("20040401")))
        .attr("y", height_0404 + 60)
        .style("text-anchor", "middle")
        .text("EU-csatlakozás");

    svg_0404.append("line")
        .attr("class", "event_0404")
        .attr("x1", x_scale_0404(parseTime_0404("20081001")))
        .attr("y1", 0)
        .attr("x2",  x_scale_0404(parseTime_0404("20081001")))
        .attr("y2", height_0404 + 50)
        .style("stroke-width", 1)
        .style("stroke", "red")
        .style("fill", "none")
        .style("stroke-dasharray", ("3, 3"));

    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", x_scale_0404(parseTime_0404("20081001")))
        .attr("y", height_0404 + 60)
        .style("text-anchor", "middle")
        .text("Gazdasági válság")
    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", x_scale_0404(parseTime_0404("20081001")))
        .attr("y", height_0404 + 75)
        .style("text-anchor", "middle")
        .text("kezdete")

    svg_0404.append("line")
        .attr("class", "event_0404")
        .attr("x1", x_scale_0404(parseTime_0404("20111001")))
        .attr("y1", 0)
        .attr("x2",  x_scale_0404(parseTime_0404("20111001")))
        .attr("y2", height_0404 + 50)
        .style("stroke-width", 1)
        .style("stroke", "red")
        .style("fill", "none")
        .style("stroke-dasharray", ("3, 3"));

    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", x_scale_0404(parseTime_0404("20111001")))
        .attr("y", height_0404 + 60)
        .style("text-anchor", "middle")
        .text("Végtörlesztés:")
    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", x_scale_0404(parseTime_0404("20111001")))
        .attr("y", height_0404 + 75)
        .style("text-anchor", "middle")
        .text("180 forint/frank")

    svg_0404.append("line")
        .attr("class", "event_0404")
        .attr("x1", x_scale_0404(parseTime_0404("20141001")))
        .attr("y1", 0)
        .attr("x2",  x_scale_0404(parseTime_0404("20141001")))
        .attr("y2", height_0404 + 50)
        .style("stroke-width", 1)
        .style("stroke", "red")
        .style("fill", "none")
        .style("stroke-dasharray", ("3, 3"));

    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", x_scale_0404(parseTime_0404("20141001")))
        .attr("y", height_0404 + 60)
        .style("text-anchor", "middle")
        .text("Forintosítás:")
    svg_0404.append("text")
        .attr("class", "event text_0404")
        .attr("font-size", (width_0404 * 0.0005 + 0.4) + "em")
        .attr("x", x_scale_0404(parseTime_0404("20141001")))
        .attr("y", height_0404 + 75)
        .style("text-anchor", "middle")
        .text("256,5 forint/frank")

})

/*Sources:
https://bl.ocks.org/mbostock/3884955
https://www.codeseek.co/Asabeneh/d3-mouseover-multi-line-chart-d3js-v4-RZpYBo 
https://bl.ocks.org/martinjc/980a2fcdbf0653c301dc2fb52750b0d9*/
