function MyTitle(){
		d3.selectAll("#svg_0201barchart_title > *").remove();

	var margin_11 = {top: 30, right: 0, bottom: 30, left: 50},
		width_11 = d3.select("#viscontainer-11").node().getBoundingClientRect().width - margin_11.left - margin_11.right,
		height_11 = 450 - margin_11.top - margin_11.bottom;
	
	var svg_0201barchart_title = d3.select("#svg_0201barchart_title")
	.attr("width", width_11 + margin_11.left + margin_11.right)
	.attr("height", 50);

	svg_0201barchart_title.append('text')
		.attr('id', 'barchart0201_title')
		.attr("x",  (width_11-280)/2 + margin_11.left)
		.attr("y", 15)
		.text("A lakott lakások komfortosság szerinti megoszlásának");

	svg_0201barchart_title.append('text')
		.attr('id', 'barchart0201_title')
		.attr("x",  (width_11-280)/2 + margin_11.left)
		.attr("y", 35)
		.text("regionális egyenlőtlenségei (2016)");

}

function MyTitle2(){
	d3.selectAll("#svg_0201barchart_title > *").remove();
	
	var margin_11 = {top: 30, right: 0, bottom: 30, left: 50},
		width_11 = d3.select("#viscontainer-11").node().getBoundingClientRect().width - margin_11.left - margin_11.right,
		height_11 = 450 - margin_11.top - margin_11.bottom;

	var svg_0201barchart_title = d3.select("#svg_0201barchart_title")
	.attr("width", width_11 + margin_11.left + margin_11.right)
	.attr("height", 50);

	svg_0201barchart_title.append('text')
		.attr('id', 'barchart0201_title')
		.attr("x",  (width_11-280)/2 + margin_11.left)
		.attr("y", 15)
		.text("A vízellátással, WC-vel és csatornával nem rendelkező lakott");

	svg_0201barchart_title.append('text')
		.attr('id', 'barchart0201_title')
		.attr("x",  (width_11-280)/2 + margin_11.left)
		.attr("y", 35)
		.text("lakások arányának regionális egyenlőtlenségei (2016)");

}

function MyTitle3(){
	d3.selectAll("#svg_0201barchart_title > *").remove();
	
	var margin_11 = {top: 30, right: 0, bottom: 30, left: 50},
		width_11 = d3.select("#viscontainer-11").node().getBoundingClientRect().width - margin_11.left - margin_11.right,
		height_11 = 450 - margin_11.top - margin_11.bottom;

	var svg_0201barchart_title = d3.select("#svg_0201barchart_title")
	.attr("width", width_11 + margin_11.left + margin_11.right)
	.attr("height", 50);

	svg_0201barchart_title.append('text')
		.attr('id', 'barchart0201_title')
		.attr("x",  (width_11-280)/2 + margin_11.left)
		.attr("y", 15)
		.text("A 2006 és 2016 között felújított lakott lakások arányának");

	svg_0201barchart_title.append('text')
		.attr('id', 'barchart0201_title')
		.attr("x",  (width_11-280)/2 + margin_11.left)
		.attr("y", 35)
		.text("regionális egyenlőtlenségei");

}



function BarChart() {

	function chart(selection) {
		selection.each(function (d, i) {
            d3.select("#vis-11").remove();

			var margin_11 = {top: 30, right: 0, bottom: 45, left: 50},
				width_11 = d3.select("#viscontainer-11").node().getBoundingClientRect().width - margin_11.left - margin_11.right,
				height_11 = 450 - margin_11.top - margin_11.bottom;

			var x_11 = d3.scaleBand()
			.rangeRound([0, width_11 - 280])
			.paddingInner(0.15)
			.align(0.8);

			var y_11 = d3.scaleLinear()
			.rangeRound([height_11, 0]);

			var color_11 = d3.scaleOrdinal()
			.range(["#385988", "#43B02A", "#FF671F", "#A4343A"]);

			var xAxis_11 = d3.axisBottom()
			.scale(x_11);

			var yAxis_11 =d3.axisLeft(y_11)
			.ticks(null, "%");

			var svg_11 = d3.select("#viscontainer-11").append("svg")
			.attr("width", width_11 + margin_11.left + margin_11.right)
			.attr("height", height_11 + margin_11.top + margin_11.bottom)
			.attr("id","vis-11")
			.append("g")
			.attr("transform", "translate(" + margin_11.left + "," + margin_11.top + ")");

			var active_link_11 = "0"; //to control legend selections and hover
			var legendClicked_11; //to control legend selections
			var legendClassArray_11 = []; //store legend classes to select bars in plotSingle()
			var legendClassArray_11_orig = []; //orig (with spaces)
			var sortDescending_11; //if true, bars are sorted by height in descending order
			var restoreXFlag_11 = false; //restore order of bars back to original


			//disable sort checkbox
			d3.select("#mycheck_0201")
				.property("disabled", true)
				.property("checked", false);



			var dataValues_11 = d3.values(d)[0];
			var columns_11  = Object.keys(dataValues_11);
			columns_11.shift();
			var data_11 = d

			data_11.forEach(function(d) {
				data_11[columns_11[1]] = +data_11[columns_11[1]];
				data_11[columns_11[2]] = +data_11[columns_11[2]];
				data_11[columns_11[3]] = +data_11[columns_11[3]];
				data_11[columns_11[0]] = +data_11[columns_11[0]];
			});



			color_11.domain(d3.keys(data_11[0]).filter(function(key) { return key !== "Régió"; }));


			data_11.forEach(function(d) {
				var myregion_11 = d.Régió; //add to stock code

				var y0_11 = 0;
				//d.categories_11 = color_11.domain().map(function(name_11) { return {name_11: name_11, y0_11: y0_11, y1_11: y0_11 += +d[name_11]}; });
				d.categories_11 = color_11.domain().map(function(name_11) {
					//return { myregion_11:myregion_11, name_11: name_11, y0_11: y0_11, y1_11: y0_11 += +d[name_11]}; });
					return {
						myregion_11:myregion_11,
						name_11: name_11,
						y0_11: y0_11,
						y1_11: y0_11 += +d[name_11],
						value_11: d[name_11],
						y_corrected: 0
					};
				});
				d.total_0201 = d.categories_11[d.categories_11.length - 1].y1_11;

			});


			//Sort totals in descending order
			data_11.sort(function (a,b) {return d3.ascending(a.Régió, b.Régió);});
			data_11.sort(function(a, b) { return b.total_0201 - a.total_0201; });


			x_11.domain(data_11.map(function(d) { return d.Régió; }));
			y_11.domain([0, 1]);

			svg_11.append("g")
				.attr("class", "axis_0201")
				.attr("transform", "translate(0," + height_11 + ")")
				.call(xAxis_11);

			svg_11.append("g")
				.attr("class", "axis_0201")
				.call(yAxis_11)
				.append("text")
				.attr("x", 2)
				.attr("y", y_11(y_11.ticks().pop()) + 0.5)
				.attr("dy", "0.32em")
				.attr("fill", "#000")
				.attr("font-weight", "bold")
				.attr("text-anchor", "start")
			//.text("Population");



			var state_11 = svg_11.selectAll(".state")
			.data(data_11)
			.enter().append("g")
			.attr("class", "g_11")
			.attr("transform", function(d) { return "translate(" + "0" + ",0)"; })

			var tooltip_11 = svg_11.append("g")
			.attr("class", "tooltip_0201")
			.style("display", "none");

			tooltip_11.append("rect")
				.attr("width", 60)
				.attr("height", 20)
				.attr("fill", "white")
				.attr("stroke", "#666")
				.attr("stroke-width", "0.5px");

			tooltip_11.append("text")
				.attr("x", 30)
				.attr("dy", "1.2em")
				.style("text-anchor", "middle")
				.attr("foínt-size", "12px")
				.attr("font", "sans-serif");	

			svg_11.append('text')
				.attr("class", "barchart_02_01_forras")
				.attr("x", width_11  - 280)             
				.attr("y", height_11 + margin_11.bottom - 5)
				.attr("text-anchor", "end")  
				.text("Adatok forrása: KSH 2018a")
				.on('click', function(d) {
					window.open(
						'https://www.ksh.hu/mikrocenzus2016/kotet_7_lakaskorulmenyek',
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

			
			height_diff = 0;  //height discrepancy when calculating h based on data vs y(d.y0_11) - y(d.y1_11)

			state_11.selectAll("rect")
				.data(function(d) {
				return d.categories_11;
			})
				.enter().append("rect")
				.attr('id', "rect_0201")
				.attr("width", x_11.bandwidth())
				.attr("y", function(d) {
				height_diff = height_diff + y_11(d.y0_11) - y_11(d.y1_11) - (y_11(0) - y_11(d.value_11));
				y_corrected = y_11(d.y1_11) + height_diff;
				d.y_corrected = y_corrected //store in d for later use in restorePlot()
				//return y_corrected;
				return y_11(d.y1_11); 
			})
				.attr("x",function(d) { //add to stock code
				return x_11(d.myregion_11)
			})
				.attr("height", function(d) {
				return y_11(d.y0_11) - y_11(d.y1_11); //heights calculated based on stacked values (inaccurate)
				//return y_11(0) - y_11(d.value_11); //calculate height directly from value in csv file
			})
				.attr("class", function(d) {
				classLabel_11 = d.name_11.replace(/\s+|[,]+\s/g, '').trim(); //remove spaces
				return "bars class" + classLabel_11;
			})
				.style("fill", function(d) { return color_11(d.name_11); });

			state_11.selectAll("#rect_0201")
				.on("mouseover", function() { tooltip_11.style("display", null); })
				.on("mouseout", function() { tooltip_11.style("display", "none"); })
				.on("mousemove", function(d) {
				var delta_11 = d.y1_11 - d.y0_11;
				var xPosition_11 = d3.mouse(this)[0] - 40;
				var yPosition_11 = d3.mouse(this)[1] - 30;
				tooltip_11.attr("transform", "translate(" + xPosition_11 + "," + yPosition_11 + ")")
					.select("text").text((delta_11*100).toFixed(1) + "%");
			});


			var legend_11 = svg_11.selectAll(".legend_0201")
			.data(color_11.domain().slice().reverse())
			.enter().append("g")
			.attr("class", function (d) {
				legendClassArray_11.push(d.replace(/\s+|[,]+\s/g, '')); //remove spaces
				legendClassArray_11_orig.push(d); //remove spaces
				return "legend_0201";
			})
			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

			//reverse order to match order in which bars are stacked
			legendClassArray_11 = legendClassArray_11.reverse();
			legendClassArray_11_orig = legendClassArray_11_orig.reverse();

			legend_11.append("rect")
				.attr("x", width_11 - 260)
				.attr("width", 18)
				.attr("height", 18)
				.style("fill", color_11)
				.attr("id", function (d, i) {
				return "id_0201" + d.replace(/\s+|[,]+\s/g, '');
			})
				.on("mouseover",function(){
				if (active_link_11 === "0") d3.select(this).style("cursor", "pointer");
				else {
					if (active_link_11.split("class").pop() === this.id.split("id_0201").pop()) {
						d3.select(this).style("cursor", "pointer");
					} else d3.select(this).style("cursor", "auto");
				}
			})
				.on("click",function(d){

				if (active_link_11 === "0") { //nothing selected, turn on this selection
					d3.select(this)
						.style("stroke", "black")
						.style("stroke-width", 2);
					active_link_11 = this.id.split("id_0201").pop();
					plotSingle(this);
					//gray out the others
					for (i_0201 = 0; i_0201 < legendClassArray_11.length; i_0201++) {
						if (legendClassArray_11[i_0201] != active_link_11) {
							d3.select("#id_0201" + legendClassArray_11[i_0201])
								.style("opacity", 0.5);
						} else  sortBy_0201 = i_0201//save index for sorting in change()
					}

					//enable sort checkbox
                        d3.select("#mycheck_0201").property("disabled", false)
                        d3.select(".barlabel").style("color", "black")
			d3.select(".myinput_large").style("opacity", "100")
					//sort the bars if checkbox is clicked
                        d3.select("#mycheck_0201").on("change", change);
				} else { //deactivate
					if (active_link_11 === this.id.split("id_0201").pop()) {//active square selected; turn it OFF
						d3.select(this)
							.style("stroke", "none");
						//restore remaining boxes to normal opacity
						for (i_0201 = 0; i_0201 < legendClassArray_11.length; i_0201++) {
							d3.select("#id_0201" + legendClassArray_11[i_0201])
								.style("opacity", 1);
						};


                            if (d3.select("#mycheck_0201").property("checked")) {
							restoreXFlag_11 = true;
						};

						//disable sort checkbox
                         d3.select(".barlabel")
							.style("color", "#FFFFFF")
							.select("input")
							.property("disabled", true)
							.property("checked", false);

						 d3.select(".myinput_large")
							.style("opacity", "0")
							.select("input")
							.property("disabled", true)
							.property("checked", false);

						//sort bars back to original positions if necessary
						change();

						//y translate selected category bars back to original y posn
						restorePlot(d);
						active_link_11 = "0"; //reset
					}
				} //end active_link_11 check
			});


			legend_11.append("text")
				.attr("class", "legend_0201")
				.attr("x", width_11-225)
				.attr("y", 8)
				.attr("dy", "0.32em")
				.attr("text-anchor", "start")
				.text(function(d) { return d; });


			// restore graph after a single selection
			function restorePlot(d) {
				//restore graph after a single selection
				d3.selectAll(".bars:not(.class" + class_keep_0201 + ")")
					.transition()
					.duration(1000)
					.delay(function() {
					if (restoreXFlag_11) return 1300;
					else return 0;
				})
					.attr("width", x_11.bandwidth()) //restore bar width
					.style("opacity", 1);

				//translate bars back up to original y-posn
				d3.selectAll(".class" + class_keep_0201)
					.attr("x", function(d) { return x_11(d.myregion_11); })
					.transition()
					.duration(1000)
					.delay(function () {
					if (restoreXFlag_11) return 1300; //bars have to be restored to orig posn
					else return 0;
				})
					.attr("y", function(d) {
					return y_11(d.y1_11); //not exactly correct since not based on raw data value
					//return d.y_corrected;
				});

				//reset
				restoreXFlag_11 = false;
			}


			function plotSingle(d) {
				class_keep_0201 = d.id.split("id_0201").pop();
				idx_0201 = legendClassArray_11.indexOf(class_keep_0201);
				//erase all but selected bars by setting opacity to 0
				d3.selectAll(".bars:not(.class" + class_keep_0201 + ")")
					.transition()
					.duration(1000)
					.attr("width", 0) // use because svg has no zindex to hide bars so can't select visible bar underneath
					.style("opacity", 0);


				var state_11 = d3.selectAll(".g_11");
				state_11.nodes().forEach(function(d, i) {
					var nodes_0201 = d.childNodes;
					//get height and y posn of base bar and selected bar
					h_keep = d3.select(nodes_0201[idx_0201]).attr("height");
					y_keep = d3.select(nodes_0201[idx_0201]).attr("y");

					h_base = d3.select(nodes_0201[0]).attr("height");
					y_base = d3.select(nodes_0201[0]).attr("y");

					h_shift = h_keep - h_base;
					y_new = y_base - h_shift;

					d3.select(nodes_0201[idx_0201])
					//  .transition()
					//  .ease("bounce")
					//  .duration(1000)
					//  .delay(750)
						.attr("y", y_new);
				});
			}


			//adapted change() fn in http://bl.ocks.org/mbostock/3885705
			function change() {
				data_11.sort(function (a,b) {return d3.ascending(a.Régió, b.Régió);});


				if (this.checked) sortDescending_11 = true;
				else sortDescending_11 = false;

				colName_0201 = legendClassArray_11_orig[sortBy_0201];
				var x0_0201 = x_11.domain(data_11.sort(sortDescending_11
												  ? function(a, b) { return b[colName_0201] - a[colName_0201]; }
												  : function(a, b) { return b.total_0201 - a.total_0201; })
									 .map(function(d,i) { return d.Régió; }))
				.copy();


				state_11.selectAll(".class" + active_link_11)
					.sort(function(a, b) {
					return x0_0201(a.myregion_11) - x0_0201(b.myregion_11);
				});

				var transition = svg_11.transition().duration(750),
					delay = function(d, i) { return i * 20; };

				//sort bars
				transition.selectAll(".class" + active_link_11)
					.delay(delay)
					.attr("x", function(d) {
					return x0_0201(d.myregion_11);
				});

				//sort x-labels accordingly
				transition.select(".x.axis")
					.call(xAxis_11)
					.selectAll("g")
					.delay(delay);


				//sort x-labels accordingly
				transition.select(".axis_0201")
					.call(xAxis_11)
					.selectAll("g")
					.delay(delay);
			}		



		});
	}

	return chart;
}



function GroupedChart(str) {
d3.select("#vis-11").remove();
			var margin_02_01 = {top: 20, right: 0, bottom: 45, left: 50},
				width_11 = d3.select("#viscontainer-11").node().getBoundingClientRect().width - margin_02_01.left - margin_02_01.right,
				height_11 = 450 - margin_02_01.top - margin_02_01.bottom;



	
var svg_11 = d3.select("#viscontainer-11").append("svg")
    .attr("id", "vis-11")
    .attr("width", width_11 + margin_02_01.left + margin_02_01.right)
    .attr("height", height_11 + margin_02_01.top + margin_02_01.bottom + 20)
	.append("g")
    .attr("transform", "translate(" + margin_02_01.left + "," + margin_02_01.top + ")");

var x0_11 = d3.scaleBand()
    .rangeRound([0, width_11 - 280])
    .paddingInner(0.10);

var x1_11 = d3.scaleBand()
    .padding(0.05);

var y_11 = d3.scaleLinear()
    .rangeRound([height_11, 0]);

var z_11 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A", "#FF671F"]);

var tooltip_0201 = d3.select("#viscontainer-11")
	.append("div")
	.attr("class", "tooltip_0201_group")
	.style("visibility", "hidden");

	
//d3.tsv("../../data/02_lakasminoseg_energiaszegenyseg/02_01_03_felujitas.tsv", function(d, i, columns) {

d3.tsv(str, function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data_11) {
  if (error) throw error;

  var keys = data_11.columns.slice(1);

  x0_11.domain(data_11.map(function(d) { return d['Régió']; }));
  x1_11.domain(keys).rangeRound([0, x0_11.bandwidth()]);
  y_11.domain([0, d3.max(data_11, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

	
  svg_11.append("g")
    .selectAll("g")
    .data(data_11)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0_11(d['Régió']) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
	  .attr("class", "rect_0201")
      .attr("x", function(d) { return x1_11(d.key); })
      .attr("y", function(d) { return y_11(d.value); })
      .attr("width", x1_11.bandwidth())
      .attr("height", function(d) { return height_11 - y_11(d.value); })
      .attr("fill", function(d) { return z_11(d.key); })
		.on("mousemove", function (d) {
			tooltip_0201
				.style("visibility", "visible")
				.style("left", d3.event.clientX - 100 + "px")
				.style("top", d3.event.clientY   - 150 + "px")
				.style("display", "inline")
				.html((d.value*100).toFixed(1) + "%");
		})
		.on("mouseout", function (d) {
			tooltip_0201.style("display", "none");
		});
  

  svg_11.append("g")
      .attr("class", "axis_0201")
      .attr("transform", "translate(0," + height_11 + ")")
      .call(d3.axisBottom(x0_11));	
	
  svg_11.append("g")
		.attr("class", "axis_0201")
		.style("font-size", "13px")
		.call(d3.axisLeft(y_11).ticks(null, "%"));
	
	
  var legend_0201b = svg_11.append("g")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend_0201b.append("rect")
      .attr("x", width_11  - 280)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z_11);

  legend_0201b.append("text")
	  .attr("class", "legend_0201b_01_02")
	  .style("text-anchor", "start")
      .attr("x", width_11 - 250)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
	
			svg_11.append('text')
				.attr("class", "barchart_02_01_forras")
				.attr("x", width_11  - 280)             
				.attr("y", height_11 + margin_02_01.bottom - 5)
				.attr("text-anchor", "end")  
				.text("Adatok forrása: KSH2018a")
				.on('click', function(d) {
					window.open(
						'https://www.ksh.hu/mikrocenzus2016/kotet_7_lakaskorulmenyek',
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
}