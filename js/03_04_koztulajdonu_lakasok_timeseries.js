// set the dimensions and margins of the graph
var margin_0304 = {
  top: 90, 
  right: 45, 
  bottom: 150, 
  left: 55
};

var width_0304 = d3.select("#topic03-vis04").node().getBoundingClientRect().width - margin_0304.left - margin_0304.right;
var height_0304 = d3.select("#topic03-vis04").node().getBoundingClientRect().height - margin_0304.top - margin_0304.bottom;

// set the ranges
var xbar_0304 = d3.scaleBand()
    .rangeRound([0, width_0304])
    .paddingInner(0.05);
var ybar_0304 = d3.scaleLinear().range([height_0304, 0]);
var yline_0304 = d3.scaleLinear().range([height_0304, 0]);

// set the colors
var z_0304 = d3.scaleOrdinal()
    .range(["#385988", "#00AFD7", "#310f11" , "#ad484d", "#bf7075", "#ecd6d7"]);

var line_0304 = d3.line()
    .x(function(d) {return xbar_0304(d.date)})
    .y(function(d) {return yline_0304(d.ydata)})
    //.curve(d3.curveBasis);

// append the svg object
var svg_0304 = d3.select("#topic03-vis04").append("svg")
    .attr("width", width_0304 + margin_0304.left + margin_0304.right)
    .attr("height", height_0304 + margin_0304.top + margin_0304.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin_0304.left + "," + margin_0304.top + ")");

// Get the data
d3.tsv("../../data/03_koltsegvetes_es_intezmenyek/03_04_koztulajdonu_lakasok_timeseries.tsv", function(error, data) {
  if (error) throw error;

  // format the data
    categories_0304 = data.columns.slice(1).map(function (name) {
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
  var keys_0304 = data.columns.slice(1),
      keysbar_0304 = keys_0304.slice(0,2),
      categoriesbar_0304 = categories_0304.slice(0,2),
      categoriesline_0304 = categories_0304.slice(2,6);

  xbar_0304.domain(data.map(function(d) { return d.date; }));
  ybar_0304.domain([0, d3.max(categoriesbar_0304, function(c) { return d3.max(c.values, function(d) { return d.ydata * 1.1; }); }) ]);
  z_0304.domain(keys_0304);

  // Scale the range of the line chart data
  yline_0304.domain([0, d3.max(categoriesline_0304, function(c) { return d3.max(c.values, function(d) { return d.ydata * 1.1; }); }) ]);
    
  svg_0304.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keysbar_0304)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z_0304(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return xbar_0304(d.data.date); })
      .attr("y", function(d) { return ybar_0304(d[1]); })
      .attr("height", function(d) { return ybar_0304(d[0]) - ybar_0304(d[1]); })
      .attr("width", xbar_0304.bandwidth())
//    .on("mouseover", function() { tooltip_0304.style("display", null); })
//    .on("mouseout", function() { tooltip_0304.style("display", "none"); })
//    .on("mousemove", function(d) {
//      console.log(d);
//      var xPosition = d3.mouse(this)[0] - 5;
//      var yPosition = d3.mouse(this)[1] - 5;
//      tooltip_0304.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
//      tooltip_0304.select("text").text(d[1]-d[0]);
//    });

  // Add the X Axis
  svg_0304.append("g")
      .attr("class", "x axis_0304")
      .attr("transform", "translate(0," + height_0304 + ")")
      .call(d3.axisBottom(xbar_0304));

  // Add the Y0 Axis
  svg_0304.append("g")
      .attr("class", "axisSteelBlue_0304")
      .call(d3.axisLeft(ybar_0304).ticks(null, "s"))
      .append("text")
      .attr("x", 0)
      .attr("y", -45)
      .attr("dy", "0.32em")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .text("Ezer lakás");

  // Add the Y1 Axis
  svg_0304.append("g")
      .attr("class", "axisRed_0304")
      .attr("transform", "translate( " + width_0304 + ", 0 )")
      .call(d3.axisRight(yline_0304))
      .append("text")
      .attr("x", 0)
      .attr("y", -35)
      .attr("dy", "0.32em")
      .attr("text-anchor", "start")
      .attr("transform", "rotate(90)")
      .text("Milliárd forint");
    
    var category_0304 = svg_0304.selectAll(".category_0304")
        .data(categoriesline_0304)
        .enter().append("g")
        .attr("class", "category_0304");

    category_0304.append("path")
        .attr("class", "line_0304")
        .attr("d", function(d) {return line_0304(d.values);} )
        .style("stroke", function(d) {return z_0304(d.name)} );
    
    svg_0304.append("text")
        .attr("class", "title_0304")
        .attr("x", (width_0304 / 2))             
        .attr("y", 0 - (margin_0304.top / 2))
        .attr("text-anchor", "middle")
        .text("A köztulajdonú lakások állománya és bevétel-kiadás mérlege");
    
    var legendbar_0304 = svg_0304.selectAll(".legendbar_0304")
        .data(categoriesbar_0304)
        .enter().append("g")
        .attr("class", "legendbar_0304")
        .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
    
    legendbar_0304.append("rect")
        .attr("x", -20)
        .attr("y", height_0304 + 30)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d) {return z_0304(d.name);} );

    legendbar_0304.append("text")
        .attr("x", -2)
        .attr("y", height_0304 + 45)
        .text(function(d) {return d.name;} );
    
    var legendline_0304 = svg_0304.selectAll(".legendline_0304")
        .data(categoriesline_0304)
        .enter().append("g")
        .attr("class", "legendline_0304")
        .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
    
    legendline_0304.append("rect")
        .attr("x", -20)
        .attr("y", height_0304 + 68 )
        .attr("width", 3)
        .attr("height", 15)
        .style("fill", function(d) {return z_0304(d.name);} );

    legendline_0304.append("text")
        .attr("x", -14)
        .attr("y", height_0304 + 83 )
        .text(function(d) {return d.name;} );

});

//// Prep the tooltip bits, initial display is hidden
//var tooltip_0304 = svg_0304.append("g")
//    .attr("class", "tooltip_0304")
//    .style("display", "none");
//
//tooltip_0304.append("rect")
//    .attr("width", 60)
//    .attr("height", 20)
//    .attr("fill", "white")
//    .style("opacity", 0.5);
//
//tooltip_0304.append("text")
//    .attr("x", 30)
//    .attr("dy", "1.2em")
//    .style("text-anchor", "middle")
//    .attr("font-size", "12px")
//    .attr("font-weight", "bold");
