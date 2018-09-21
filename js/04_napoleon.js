// set the dimensions and margins of the graph
var margin_04nap = {
  top: 90, 
  right: 45, 
  bottom: 175, 
  left: 55
};

var width_04nap = d3.select("#topic04-nap").node().getBoundingClientRect().width - margin_04nap.left - margin_04nap.right;
var height_04nap = d3.select("#topic04-nap").node().getBoundingClientRect().height - margin_04nap.top - margin_04nap.bottom;

// set the ranges
var xbar_04nap = d3.scaleBand()
    .rangeRound([0, width_04nap])
    .paddingInner(0.05);
var ybar_04nap = d3.scaleLinear().range([height_04nap, 0]);
var yline_04nap = d3.scaleLinear().range([height_04nap, 0]);

// set the colors
var z_04nap = d3.scaleOrdinal()
    .range(["#385988", "#A4343A"]);

var line_04nap = d3.line()
    .x(function(d) {return xbar_04nap(d.date)})
    .y(function(d) {return yline_04nap(d.ydata)})
    //.curve(d3.curveBasis);

// append the svg object
var svg_04nap = d3.select("#topic04-nap").append("svg")
    .attr("width", width_04nap + margin_04nap.left + margin_04nap.right)
    .attr("height", height_04nap + margin_04nap.top + margin_04nap.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin_04nap.left + "," + margin_04nap.top + ")");

// Get the data
d3.tsv("../../data/04_eladosodas/04_napoleon.tsv", function(error, data) {
  if (error) throw error;

  // format the data
    categories_04nap = data.columns.slice(1).map(function (name) {
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

  // Scale the range of the bar chart data
  var keys_04nap = data.columns.slice(1),
      keysbar_04nap = keys_04nap.slice(0,1),
      categoriesbar_04nap = categories_04nap.slice(0,1),
      categoriesline_04nap = categories_04nap.slice(1,2);

  xbar_04nap.domain(data.map(function(d) { return d.date; }));
  ybar_04nap.domain([0, d3.max(categoriesbar_04nap, function(c) { return d3.max(c.values, function(d) { return d.ydata * 1.1; }); }) ]);
  z_04nap.domain(keys_04nap);

  // Scale the range of the line chart data
  yline_04nap.domain([0, d3.max(categoriesline_04nap, function(c) { return d3.max(c.values, function(d) { return d.ydata * 1.1; }); }) ]);
    
  svg_04nap.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keysbar_04nap)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z_04nap(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return xbar_04nap(d.data.date); })
      .attr("y", function(d) { return ybar_04nap(d[1]); })
      .attr("height", function(d) { return ybar_04nap(d[0]) - ybar_04nap(d[1]); })
      .attr("width", xbar_04nap.bandwidth());

  // Add the X Axis
  svg_04nap.append("g")
      .attr("class", "x axis_04nap")
      .attr("transform", "translate(0," + height_04nap + ")")
      .call(d3.axisBottom(xbar_04nap))
    .selectAll(".tick text")
    .style('font-size', '10px')
		.call(wrap, xbar_04nap.bandwidth());;

  // Add the Y0 Axis
  svg_04nap.append("g")
      .attr("class", "axisSteelBlue_04nap")
      .call(d3.axisLeft(ybar_04nap).ticks(null, "s"))
      .append("text")
      .attr("x", 0 - margin_04nap.left)
      .attr("y", -45)
      .attr("dy", "0.32em")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .text("Milliárd fornit");

/*
  // Add the Y1 Axis
  svg_04nap.append("g")
      .attr("class", "axisRed_04nap")
      .attr("transform", "translate( " + width_04nap + ", 0 )")
      .call(d3.axisRight(yline_04nap))
      .append("text")
      .attr("x", 0 + margin_04nap.left)
      .attr("y", -35)
      .attr("dy", "0.32em")
      .attr("text-anchor", "start")
      .attr("transform", "rotate(90)")
      .text("Milliárd forint");
      
*/
    var category_04nap = svg_04nap.selectAll(".category_04nap")
        .data(categoriesline_04nap)
        .enter().append("g")
        .attr("class", "category_04nap");

    category_04nap.append("path")
        .attr("class", "line_04nap")
        .attr("d", function(d) {return line_04nap(d.values);} )
        .style("stroke", function(d) {return z_04nap(d.name)} );
    
    svg_04nap.append("text")
        .attr("class", "title_04nap")
        .attr("x", (width_04nap / 2))             
        .attr("y", 0 - (margin_04nap.top / 2))
        .attr("text-anchor", "middle")
        .text("A lakossági hitelállomány alakulása (2009–2018, negyedéves adatok)");
    
    var legendbar_04nap = svg_04nap.selectAll(".legendbar_04nap")
        .data(categoriesbar_04nap)
        .enter().append("g")
        .attr("class", "legendbar_04nap")
        .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
    
    legendbar_04nap.append("rect")
        .attr("x", -20)
        .attr("y", height_04nap + 43)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d) {return z_04nap(d.name);} );

    legendbar_04nap.append("text")
        .attr("x", -2)
        .attr("y", height_04nap + 56)
        .text(function(d) {return d.name;} );
    
    var legendline_04nap = svg_04nap.selectAll(".legendline_04nap")
        .data(categoriesline_04nap)
        .enter().append("g")
        .attr("class", "legendline_04nap")
        .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
    
    legendline_04nap.append("rect")
        .attr("x", -20)
        .attr("y", height_04nap + 68)
        .attr("width", 3)
        .attr("height", 15)
        .style("fill", function(d) {return z_04nap(d.name);} );

    legendline_04nap.append("text")
        .attr("x", -14)
        .attr("y", height_04nap + 81)
        .text(function(d) {return d.name;} );


    svg_04nap.append("text")
        .attr("class", "data_source_04nap")
        .attr("x", width_04nap - 80)
        .attr("y", height_04nap + 50)
        .style("text-anchor", "middle")
        .text("Adatok forrása: MNBb ")
        .on('click', function(d) {
        window.open(
            '',
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

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
    while (word = words.pop()) {
      line.push(word)
      tspan.text(line.join(" "))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(" "))
        line = [word]
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
      }
    }
  })
}

//    svg_04nap.selectAll("rect")
//        .on("mouseover", function() { tooltip_04nap.style("display", null); })
//        .on("mouseout", function() { tooltip_04nap.style("display", "none"); })
//        .on("mousemove", function(d) {
//          console.log(d);
//          var xPosition = d3.mouse(this)[0] - 5;
//          var yPosition = d3.mouse(this)[1] - 5;
//          tooltip_04nap.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
//          tooltip_04nap.select("text").text(d[1]-d[0]);
//        });
    
});

//// Prep the tooltip bits, initial display is hidden
//var tooltip_04nap = svg_04nap.append("g")
//    .attr("class", "tooltip_04nap")
//    .style("display", "none");
//
//tooltip_04nap.append("rect")
//    .attr("width", 60)
//    .attr("height", 20)
//    .attr("fill", "white")
//    .style("opacity", 0.5)
//    .attr("stroke", "#666")
//    .attr("stroke-width", "0.5px");
//
//tooltip_04nap.append("text")
//    .attr("x", 30)
//    .attr("dy", "1.2em")
//    .style("text-anchor", "middle")
//    .attr("font-size", "12px")
//    .attr("font", "sans serif");