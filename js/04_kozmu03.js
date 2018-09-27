if (d3.select("#viscontainer-kozmu03").node().getBoundingClientRect().width  > 610)
{ 
   if (d3.select("#viscontainer-kozmu03").node().getBoundingClientRect().width  < 820){ 
        var width_abs_kozmu03 = d3.select("#viscontainer-kozmu03").node().getBoundingClientRect().width ;
        } else {
         var width_abs_kozmu03 = 820    
        }
} else {
  var width_abs_kozmu03 = 610 // 
};


var margin_kozmu03 = {top: width_abs_kozmu03/(820/40), right: 0, bottom: width_abs_kozmu03/(820/100), left: width_abs_kozmu03/(820/70)},
	width = width_abs_kozmu03 - margin_kozmu03.left - margin_kozmu03.right,
	height_kozmu03 = 450 - margin_kozmu03.top - margin_kozmu03.bottom;

var x_kozmu03 = d3.scaleBand()
.rangeRound([0, width - width_abs_kozmu03/(820/100)])
.paddingInner(0.10)
.align(0.8);

var y_kozmu03 = d3.scaleLinear()
.rangeRound([380, 0])

;

var z_kozmu03 = d3.scaleOrdinal()
.range(["#385988", "#43B02A", "#FF671F", "#A4343A"]);

var svg_kozmu03 = d3.select("#viscontainer-kozmu03").append("svg")
.attr("width", width + margin_kozmu03.left + margin_kozmu03.right)
.attr("height", 380 + margin_kozmu03.top + margin_kozmu03.bottom)
.attr("id","svg_kozmu03")
.append("g")
.attr("transform", "translate(" + margin_kozmu03.left + "," + margin_kozmu03.top + ")");


d3.csv("../../data/04_eladosodas/04_kozmu03.csv", function(d, i, columns) {
	for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
	d.total = t;
	return d;
}, function(error, data) {
	if (error) throw error;

	console.log(data);
	var keys_kozmu03 = data.columns.slice(1);

	var serie_kozmu03 = svg_kozmu03.selectAll(".serie_kozmu03")
	.data(d3.stack().keys(keys_kozmu03)(data))
	.enter().append("g")
	.attr("class", "serie_kozmu03");

	data.sort(function(a, b) { return b.total - a.total; });
	x_kozmu03.domain(data.map(function(d) { return d.type; }));
	y_kozmu03.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
	z_kozmu03.domain(keys_kozmu03);

	serie_kozmu03.append("g")
		.selectAll("g")
		.data(d3.stack().keys(keys_kozmu03)(data))
		.enter().append("g")
		.attr("fill", function(d) { return z_kozmu03(d.key); })
		.selectAll("rect")
		.data(function(d) { return d; })
		.enter().append("rect")
		.attr("x", function(d) { return x_kozmu03(d.data.type); })
		.attr("y", function(d) { return y_kozmu03(d[1]); })
		.attr("height", function(d) { return y_kozmu03(d[0]) - y_kozmu03(d[1]); })
		.attr("width", x_kozmu03.bandwidth());

	

svg_kozmu03.append('text')
		.attr('id', 'title_0304')
		.attr("x",  (width - width_abs_kozmu03/(820/100) )/2)
        .attr("font-size", width_abs_kozmu03/(820/18))
		.attr("y", -width_abs_kozmu03/(820/25))
		.text("90 napon túli késedelmes hitelszerződések száma (2017. december)");
		

	svg_kozmu03.append("g")
		.attr("class", "axis_kozmu03")
        .attr("font-size", width_abs_kozmu03/(820/15))    
		.attr("transform", "translate(0," + 380 + ")")
		.call(d3.axisBottom(x_kozmu03))
	    .selectAll(".tick text")
        .attr("font-size", width_abs_kozmu03/(820/15))        
		.call(wrap, x_kozmu03.bandwidth());;


	svg_kozmu03.append("g")
		.attr("class", "axis_kozmu03")
		.call(d3.axisLeft(y_kozmu03).tickFormat(d3.format("d")))
		.append("text")
		.attr("x", 2)
        .attr("font-size", width_abs_kozmu03/(820/15))        
		.attr("y", y_kozmu03(y_kozmu03.ticks().pop()))
		.attr("dy", "0.32em")
        .attr("text-anchor", "start");

    
    svg_kozmu03.selectAll(".tick")
        .attr("font-size", width_abs_kozmu03/(820/15))        
    
	var legend_kozmu03 = svg_kozmu03.append("g")
		.attr("text-anchor", "end")
		.selectAll("g")
		.data(keys_kozmu03.slice().reverse())
		.enter().append("g")
		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	legend_kozmu03.append("rect")
		.attr("x", width - width_abs_kozmu03/(820/90))
		.attr("width", width_abs_kozmu03/(820/18))
		.attr("height", width_abs_kozmu03/(820/18))
		.attr("fill", z_kozmu03);

	legend_kozmu03.append("text")
		.attr("class", "legend_kozmu03")
		.attr("x", width-width_abs_kozmu03/(820/60))
		.attr("y", 8)
        .attr("font-size", width_abs_kozmu03/(820/15))    
		.attr("dy", "0.32em")
		.attr("text-anchor", "start")
		.text(function(d) { return d; });

	var tooltip_kozmu03 = svg_kozmu03.append("g")
		.attr("class", "tooltip_kozmu03")
		.style("visibility", "hidden");

	tooltip_kozmu03.append("rect")
		.attr("width", width_abs_kozmu03/(820/60))
		.attr("height",width_abs_kozmu03/(820/25))
		.attr("fill", "white")
		.attr("stroke", "#666")
		.attr("stroke-width", "0.5px");

	tooltip_kozmu03.append("text")
		.attr("x", width_abs_kozmu03/(820/30))
		.attr("dy", "1.2em")
        .attr("font-size", width_abs_kozmu03/(820/14))
        .style("text-anchor", "middle");	

	serie_kozmu03.selectAll("rect")
		.on("mouseout", function() { tooltip_kozmu03.style("display", "none"); })
		.on("mousemove", function(d) {
		var delta_kozmu03 = d[1]-d[0];
		var xPosition_kozmu03 = d3.mouse(this)[0] - 25;
		var yPosition_kozmu03 = d3.mouse(this)[1] - 30;
		tooltip_kozmu03
			.style("visibility", "visible")
			.style("display", "inline")
			.attr("transform", "translate(" + xPosition_kozmu03 + "," + yPosition_kozmu03 + ")")
			.select("text").text((delta_kozmu03).toFixed(0));
	});

serie_kozmu03.append('text')
	.attr("class", "kozmu03_forras")
		.attr("x", width- width_abs_kozmu03/(820/100))
		.attr("y", height_kozmu03 + margin_kozmu03.top + margin_kozmu03.bottom*0.99)
        .attr("font-size", width_abs_kozmu03/(820/15))    
	.attr("text-anchor", "end")  
	.text("Adatok forrása: MNB")
	.on('click', function(d) {
		window.open(
			'http://www.mnb.hu/statisztika/statisztikai-adatok-informaciok/adatok-idosorok',
			'_blank' // <- This is what makes it open in a new window.
		);
	})
	.on('mouseover', function(d){
		d3.select(this).style("cursor", "pointer"); 
	})

	.on("mouseout", function() { d3.select(this).style("cursor", "default"); })
	.on("mousemove", function(d) {
	d3.select(this).style("cursor", "pointer"); 
	});
	
	
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