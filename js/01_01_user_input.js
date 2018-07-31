var margin_0101 = {top: 20, right: 40, bottom: 20, left: 40},
    userInputWidth = d3.select("#vis-0101").node().getBoundingClientRect().width - margin_0101.left - margin_0101.right,
    userInputHeight = d3.select("#vis-0101").node().getBoundingClientRect().height - margin_0101.top - margin_0101.bottom;

var x_0101 = d3.scaleBand()
    .rangeRound([0, userInputWidth], 0.1)
		.paddingInner(0.1);

var y_0101 = d3.scaleLinear()
    .range([userInputHeight, 0]);

var xAxisUserInput_0101 = d3.axisBottom()
    .scale(x_0101);

var yAxis_0101 = d3.axisLeft()
    .scale(y_0101)
    .ticks(10);

var svg_0101 = d3.select("#vis-0101").append("svg")
    .attr("width", userInputWidth + margin_0101.left + margin_0101.right)
    .attr("height", userInputHeight + margin_0101.top + margin_0101.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_0101.left + "," + margin_0101.top + ")");
	
var tooltip_0101 = d3.select("#vis-0101")
	.append("div")
	.attr("class", "toolTip")
	.style("visibility", "hidden");


d3.tsv("../../data/01_hozzaferhetoseg_es_megfizethetoseg/01_01_user_input.tsv",  function(error, data_0101) {
	x_0101.domain(data_0101.map(function(d) { return d.Decilis; }));
	y_0101.domain([0, 100]);
	svg_0101.append("g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + userInputHeight + ")")
	  .call(xAxisUserInput_0101);

	svg_0101.append("g")
	  .attr("class", "y axis")
	  .call(yAxis_0101)
	.append("text")
	  .attr("transform", "rotate(-90)")
	  .attr("y", 6)
	  .attr("dy", ".71em")
	  .style("text-anchor", "end")
	  .text("Percent");

	svg_0101.selectAll(".bar")
	  .data(data_0101)
	  .enter().append("rect")
	  .attr("class", "bar")
	  .attr("x", function(d) { return x_0101(d.Decilis); })
	  .attr("y", function(d) { return y_0101(d["Percent"]); })

	  .attr("width", x_0101.bandwidth())
	  .attr("height", function(d) { return userInputHeight - y_0101(d["Percent"]); })

	  .on("mousemove", function(d){
			tooltip_0101
			  .style("visibility", "visible")
			  .style("left", d3.event.pageX - 50 + "px")
			  .style("top", d3.event.pageY - 70 + "px")
			  .style("display", "inline-block")
			  .html((d.Decilis) + ". decilis : " + (d["Percent"] + "%"));
		})
			.on("mouseout", function(d){ tooltip_0101.style("display", "none");});
	});


	
function myFunction() {
    var wage = document.getElementById("myForm").elements[0].value;
	var expend = document.getElementById("myForm").elements[1].value;
	var userexp = ((expend/wage) * 100);


	d3.tsv("../../data/01_hozzaferhetoseg_es_megfizethetoseg/01_01_user_input.tsv",  function(error, data_0101) {
	  if (error) throw error;
		var period = data_0101.filter(function(row){
			row["Dec_f"] = +row["Dec_f"];
			row["Dec_a"] = +row["Dec_a"];
			return wage <= row['Dec_f'] && row['Dec_a'] <= wage;
		});
		
		var dec = period.filter(function(d) { return d.Decilis})[0].Decilis;
		
		var atl_kolt = period.filter(function(d) { return d.Decilis})[0]["Percent"];
		
		var dif = userexp - atl_kolt

	  x_0101.domain(data_0101.map(function(d) { return d.Decilis; }));
	  y_0101.domain([0, 100]);

	  svg_0101.selectAll("text.label").remove();
	  svg_0101.selectAll("text.label1").remove();
	  svg_0101.selectAll("text.label2").remove();
	  svg_0101.selectAll("line.arrow").remove();
	  svg_0101.selectAll("g").remove();
		
	  svg_0101.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + userInputHeight + ")")
		  .call(xAxisUserInput_0101);

	  svg_0101.append("g")
		  .attr("class", "y axis")
		  .call(yAxis_0101)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("Percent");

	  svg_0101.selectAll(".bar")
		  .data(data_0101)
		  .enter().append("rect")
		  .attr("class", "bar")
		  .attr("x", function(d) { return x_0101(d.Decilis); })
		  .attr("y", function(d) { return y_0101(d["Percent"]); })

		  .attr("width", x_0101.bandwidth())
		  .attr("height", function(d) { return userInputHeight - y_0101(d["Percent"]); })

		  .on("mousemove", function(d){
				tooltip_0101
				  .style("visibility", "visible")
				  .style("left", d3.event.pageX - 50 + "px")
				  .style("top", d3.event.pageY - 70 + "px")
				  .style("display", "inline-block")
				  .html((d.Decilis) + ". decilis : " + (d["Percent"] + "%"));
			})
				.on("mouseout", function(d){ tooltip_0101.style("display", "none");});

		// add text and arrow

		svg_0101.append("defs").append("marker")
			.attr("id", "arrow")
			.attr("viewBox", "0 -5 10 10")
			.attr("refX", 8)
			.attr("markerWidth", 7)
			.attr("markerHeight", 7)
			.attr("fill", "#606060")
			.attr("orient", "auto")
		   .append("path")
			.attr("class", "marker")
			.attr("d", "M0,-5L10,0L0,5");

		svg_0101.selectAll("text.label")
			.data(data_0101.filter(function(d) { return d["Decilis"] == 2; }))
			.enter().append("text")
			.attr("class", "label")
			.attr("x", function (d) {
				return userInputWidth/2;
			}).attr("y", function (d) {
				return 10;
			})
			.style("text-anchor", "middle")
			.style("font-size", "14px")
			.text("A " + dec + ". jövedelmi decilisbe tartozik,")


		svg_0101.selectAll("text.label1")
			.data(data_0101.filter(function(d) { return d["Decilis"] == 2; }))
			.enter().append("text")
			.attr("class", "label")
			.attr("x", function (d) {
				return userInputWidth/2;
			}).attr("y", function (d) {
				return 25;
			})
			.style("text-anchor", "middle")
			.style("font-size", "14px")
			.text(function(d) {
            	if (dif < 0) {return "melynek átlagához képest " + Math.round(Math.abs(dif)) + " százalékkal"}
            	else 	{ return "melynek átlagához képest " + Math.round(Math.abs(dif)) + " százalékkal" }
        		;})
		
		svg_0101.selectAll("text.label2")
			.data(data_0101.filter(function(d) { return d["Decilis"] == 2; }))
			.enter().append("text")
			.attr("class", "label")
			.attr("x", function (d) {
				return userInputWidth/2;
			}).attr("y", function (d) {
				return 40;
			})
			.style("text-anchor", "middle")
			.style("font-size", "14px")
			.text(function(d) {
            	if (dif < 0) {return "költ kevesebbet lahatásra"}
            	else 	{ return "költ többet lahatásra" }
        		;})
		
		 svg_0101.selectAll("line.arrow")
				.data(data_0101.filter(function(d) { return d["Decilis"] == 2; }))
				.enter().append("line")
				.attr("class", "arrow")
				.attr("stroke", "#606060")
				.attr("x1", function (d) {
			 		if (dec < 4) {return (userInputWidth/2 - 60)} 
			 		else if (dec > 6) {return (userInputWidth/2 + 60)} 
			 		else {return userInputWidth/2};
				})
				.attr("x2", function (d) {
					return ((x_0101(d.Decilis)-4)/2) * 1 + ((x_0101(d.Decilis)-4) * (dec-1));
				})
				.attr("y1", function (d) {
					return 65;
				})
				.attr("y2", function (d) {
					return (userInputHeight * ((100 -atl_kolt) / 100)) - 25 ;
				})
				.attr("marker-end", "url(#arrow)");

		});

}
	
function type(d) {
  d["Percent"] = +d["Percent"];
  return d;
}
