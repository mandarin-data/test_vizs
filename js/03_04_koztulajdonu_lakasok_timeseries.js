// set the dimensions and margins of the graph
var margin_0304 = {
  top: 60, 
  right: 45, 
  bottom: 175, 
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
    .range(["#97AFB9", "#00AFD7", "#D52E2E", "#FFA38E", "#294163", "#446b7f"]);

var line_0304 = d3.line()
    .defined(function(d) {return d.ydata != "null"; })
    .x(function(d) {return xbar_0304(d.date)})
    .y(function(d) {return yline_0304(d.ydata)})

// append the svg object
var svg_0304 = d3.select("#topic03-vis04").append("svg")
    .attr("width", width_0304 + margin_0304.left + margin_0304.right)
    .attr("height", height_0304 + margin_0304.top + margin_0304.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin_0304.left + "," + margin_0304.top + ")");

var tooltip_0304 = d3.tooltip() // returns the tooltip function
    .extent([[0,0],[width_0304,height_0304]]) // tells the tooltip how much area it has to work with
    //.tips(["value", "search(d.value, medianlist_0304)"],["Részvételi arány: ", "Medián (forint): "])
    .tips(["1"],[""])// tells the tooltip which properties to display in the tip and what to label thme
    .fontSize(13) // sets the font size for the tooltip
    .padding([8,4]) // sets the amount of padding in the tooltip rectangle
    .margin([10,10]) // set the distance H and V to keep the tooltip from the mouse pointer
    .format("notpercent");

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
  ybar_0304.domain([0, 240]);
  z_0304.domain(keys_0304);

  // Scale the range of the line chart data
  yline_0304.domain([0, 20]);
    
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
    .each(tooltip_0304.events);

  svg_0304.call(tooltip_0304)

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
      .attr("x", -80)
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
      .attr("x", 80)
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
        .attr("y", height_0304 + 68)
        .attr("width", 3)
        .attr("height", 15)
        .style("fill", function(d) {return z_0304(d.name);} );

    legendline_0304.append("text")
        .attr("x", -14)
        .attr("y", height_0304 + 83)
        .text(function(d) {return d.name;} );

    svg_0304.append("text")
        .attr("class", "data_source_0304")
        .attr("x", width_0304 - 460)
        .attr("y", height_0304 + 170)
        .style("text-anchor", "middle")
        .text("Adatok forrása: ");
    
    svg_0304.append("text")
        .attr("class", "data_source_0304")
        .attr("x", width_0304 - 388)
        .attr("y", height_0304 + 170)
        .style("text-anchor", "middle")
        .text("KSH 2018., ")
        .on('click', function(d) {
        window.open(
            'https://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_zrl001.html',
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

    svg_0304.append("text")
        .attr("class", "data_source_0304")
        .attr("x", width_0304 - 333)
        .attr("y", height_0304 + 170)
        .style("text-anchor", "middle")
        .text("NET Zrt., ")
        .on('click', function(d) {
        window.open(
            'http://',
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
    
    svg_0304.append("text")
        .attr("class", "data_source_0304")
        .attr("x", width_0304 - 243)
        .attr("y", height_0304 + 170)
        .style("text-anchor", "middle")
        .text("Költségvetési törvények ");
    
    svg_0304.append("text")
        .attr("class", "data_source_0304")
        .attr("x", width_0304 - 162)
        .attr("y", height_0304 + 170)
        .style("text-anchor", "middle")
        .text("2012, ")
        .on('click', function(d) {
        window.open(
            'http://www.parlament.hu/irom39/12002/adatok/01_mell.pdf',
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

    svg_0304.append("text")
        .attr("class", "data_source_0304")
        .attr("x", width_0304 - 132)
        .attr("y", height_0304 + 170)
        .style("text-anchor", "middle")
        .text("2013, ")
        .on('click', function(d) {
        window.open(
            'http://www.parlament.hu/irom40/01143/2013zsz_fokotet.pdf',
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

    svg_0304.append("text")
        .attr("class", "data_source_0304")
        .attr("x", width_0304 - 102)
        .attr("y", height_0304 + 170)
        .style("text-anchor", "middle")
        .text("2014, ")
        .on('click', function(d) {
        window.open(
            'http://www.parlament.hu/irom40/05954/2014zsz_fokotet.pdf',
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

    svg_0304.append("text")
        .attr("class", "data_source_0304")
        .attr("x", width_0304 - 72)
        .attr("y", height_0304 + 170)
        .style("text-anchor", "middle")
        .text("2015, ")
        .on('click', function(d) {
        window.open(
            'http://www.parlament.hu/irom40/12284/2015zsz_0_OGY.pdf',
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
    
    svg_0304.append("text")
        .attr("class", "data_source_0304")
        .attr("x", width_0304 - 42)
        .attr("y", height_0304 + 170)
        .style("text-anchor", "middle")
        .text("2016, ")
        .on('click', function(d) {
        window.open(
            'http://www.parlament.hu/irom40/17578/2016zsz_0_OGY.pdf',
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
    
    svg_0304.append("text")
        .attr("class", "data_source_0304")
        .attr("x", width_0304 - 12)
        .attr("y", height_0304 + 170)
        .style("text-anchor", "middle")
        .text("2017, ")
        .on('click', function(d) {
        window.open(
            'http://www.parlament.hu/irom40/10377/10377-1172.pdf',
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
//    svg_0304.selectAll("rect")
//        .on("mouseover", function() { tooltip_0304.style("display", null); })
//        .on("mouseout", function() { tooltip_0304.style("display", "none"); })
//        .on("mousemove", function(d) {
//          console.log(d);
//          var xPosition = d3.mouse(this)[0] - 5;
//          var yPosition = d3.mouse(this)[1] - 5;
//          tooltip_0304.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
//          tooltip_0304.select("text").text(d[1]-d[0]);
//        });
    
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
//    .style("opacity", 0.5)
//    .attr("stroke", "#666")
//    .attr("stroke-width", "0.5px");
//
//tooltip_0304.append("text")
//    .attr("x", 30)
//    .attr("dy", "1.2em")
//    .style("text-anchor", "middle")
//    .attr("font-size", "12px")
//    .attr("font", "sans serif");