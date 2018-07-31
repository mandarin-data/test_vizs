function BarChart() {

	function chart(selection) {
		selection.each(function (d, i) {

			d3.select("#vis-11").remove();
			var margin_11 = {top: 30, right: 20, bottom: 30, left: 40},
				width = d3.select("#viscontainer-11").node().getBoundingClientRect().width - margin_11.left - margin_11.right,
				height = d3.select("#viscontainer-11").node().getBoundingClientRect().height - margin_11.top - margin_11.bottom;

			var x_11 = d3.scaleBand()
			.rangeRound([0, width - 230])
			.paddingInner(0.05)
			.align(0.8);

			var y_11 = d3.scaleLinear()
			.rangeRound([height, 0]);

			var color_11 = d3.scaleOrdinal()
			.range(["#385988", "#5C779D","#8095b3","#B6C2D3"]);

			var xAxis_11 = d3.axisBottom()
			.scale(x_11);

			var yAxis_11 =d3.axisLeft(y_11)
			.ticks(null, "%");

			var svg_11 = d3.select("#viscontainer-11").append("svg")
			.attr("width", width + margin_11.left + margin_11.right)
			.attr("height", height + margin_11.top + margin_11.bottom)
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
			d3.select("label")
				.select("input")
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
				//d.categories = color_11.domain().map(function(name) { return {name: name, y0_11: y0_11, y1_11: y0_11 += +d[name]}; });
				d.categories = color_11.domain().map(function(name) {
					//return { myregion_11:myregion_11, name: name, y0_11: y0_11, y1_11: y0_11 += +d[name]}; });
					return {
						myregion_11:myregion_11,
						name: name,
						y0_11: y0_11,
						y1_11: y0_11 += +d[name],
						value: d[name],
						y_corrected: 0
					};
				});
				d.total = d.categories[d.categories.length - 1].y1_11;

			});


			//Sort totals in descending order
			data_11.sort(function (a,b) {return d3.ascending(a.Régió, b.Régió);});
			data_11.sort(function(a, b) { return b.total - a.total; });


			x_11.domain(data_11.map(function(d) { return d.Régió; }));
			y_11.domain([0, 1]);


			svg_11.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis_11);

			svg_11.append("g")
				.attr("class", "y axis")
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
			.attr("class", "g")
			.attr("transform", function(d) { return "translate(" + "0" + ",0)"; })

			var tooltip_11 = svg_11.append("g")
			.attr("class", "tooltip")
			.style("display", "none");

			tooltip_11.append("rect")
				.attr("width", 60)
				.attr("height", 20)
				.attr("fill", "white")
				.style("opacity", 0.7);

			tooltip_11.append("text")
				.attr("x", 30)
				.attr("dy", "1.2em")
				.style("text-anchor", "middle")
				.attr("font-size", "12px")
				.attr("font", "sans-serif");	



			height_diff = 0;  //height discrepancy when calculating h based on data vs y(d.y0_11) - y(d.y1_11)


			state_11.selectAll("rect")
				.data(function(d) {
				return d.categories;
			})
				.enter().append("rect")
				.attr("width", x_11.bandwidth())
				.attr("y", function(d) {
				height_diff = height_diff + y_11(d.y0_11) - y_11(d.y1_11) - (y_11(0) - y_11(d.value));
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
				//return y_11(0) - y_11(d.value); //calculate height directly from value in csv file
			})
				.attr("class", function(d) {
				classLabel = d.name.replace(/\s+|[,]+\s/g, '').trim(); //remove spaces
				return "bars class" + classLabel;
			})
				.style("fill", function(d) { return color_11(d.name); });

			state_11.selectAll("rect")
				.on("mouseover", function() { tooltip_11.style("display", null); })
				.on("mouseout", function() { tooltip_11.style("display", "none"); })
				.on("mousemove", function(d) {
				var delta_11 = d.y1_11 - d.y0_11;
				var xPosition_11 = d3.mouse(this)[0] - 40;
				var yPosition_11 = d3.mouse(this)[1] - 30;
				tooltip_11.attr("transform", "translate(" + xPosition_11 + "," + yPosition_11 + ")")
					.select("text").text((delta_11*100).toFixed(1) + "%");
				console.log(delta_11)
			});


			var legend_11 = svg_11.selectAll(".legend")
			.data(color_11.domain().slice().reverse())
			.enter().append("g")
			.attr("class", function (d) {
				legendClassArray_11.push(d.replace(/\s+|[,]+\s/g, '')); //remove spaces
				legendClassArray_11_orig.push(d); //remove spaces
				return "legend";
			})
			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

			//reverse order to match order in which bars are stacked
			legendClassArray_11 = legendClassArray_11.reverse();
			legendClassArray_11_orig = legendClassArray_11_orig.reverse();

			legend_11.append("rect")
				.attr("x", width - 210)
				.attr("width", 18)
				.attr("height", 18)
				.style("fill", color_11)
				.attr("id", function (d, i) {
				return "id" + d.replace(/\s+|[,]+\s/g, '');
			})
				.on("mouseover",function(){

				if (active_link_11 === "0") d3.select(this).style("cursor", "pointer");
				else {
					if (active_link_11.split("class").pop() === this.id.split("id").pop()) {
						d3.select(this).style("cursor", "pointer");
					} else d3.select(this).style("cursor", "auto");
				}
			})
				.on("click",function(d){

				if (active_link_11 === "0") { //nothing selected, turn on this selection
					d3.select(this)
						.style("stroke", "black")
						.style("stroke-width", 2);
					active_link_11 = this.id.split("id").pop();
					plotSingle(this);

					//gray out the others
					for (i = 0; i < legendClassArray_11.length; i++) {
						if (legendClassArray_11[i] != active_link_11) {
							d3.select("#id" + legendClassArray_11[i])
								.style("opacity", 0.5);
						} else sortBy = i; //save index for sorting in change()
					}

					//enable sort checkbox
					d3.select("label").select("input").property("disabled", false)
					d3.select("label").style("color", "black")
					//sort the bars if checkbox is clicked
					d3.select("input").on("change", change);
				} else { //deactivate
					if (active_link_11 === this.id.split("id").pop()) {//active square selected; turn it OFF
						d3.select(this)
							.style("stroke", "none");

						//restore remaining boxes to normal opacity
						for (i = 0; i < legendClassArray_11.length; i++) {
							d3.select("#id" + legendClassArray_11[i])
								.style("opacity", 1);
						};


						if (d3.select("label").select("input").property("checked")) {
							restoreXFlag_11 = true;
						};

						//disable sort checkbox
						d3.select("label")
							.style("color", "#D8D8D8")
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
				.attr("x", width-175)
				.attr("y", 8)
				.attr("dy", "0.32em")
				.attr("font-size", "14px")
				.attr("font", "sans-serif")	
				.attr("text-anchor", "start")
				.text(function(d) { return d; });


			// restore graph after a single selection
			function restorePlot(d) {
				//restore graph after a single selection
				d3.selectAll(".bars:not(.class" + class_keep + ")")
					.transition()
					.duration(1000)
					.delay(function() {
					if (restoreXFlag_11) return 1300;
					else return 0;
				})
					.attr("width", x_11.bandwidth()) //restore bar width
					.style("opacity", 1);

				//translate bars back up to original y-posn
				d3.selectAll(".class" + class_keep)
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
				class_keep = d.id.split("id").pop();
				idx = legendClassArray_11.indexOf(class_keep);

				//erase all but selected bars by setting opacity to 0
				d3.selectAll(".bars:not(.class" + class_keep + ")")
					.transition()
					.duration(1000)
					.attr("width", 0) // use because svg has no zindex to hide bars so can't select visible bar underneath
					.style("opacity", 0);


				var state_11 = d3.selectAll(".g");

				state_11.nodes().forEach(function(d, i) {
					var nodes = d.childNodes;
					//get height and y posn of base bar and selected bar
					h_keep = d3.select(nodes[idx]).attr("height");
					y_keep = d3.select(nodes[idx]).attr("y");

					h_base = d3.select(nodes[0]).attr("height");
					y_base = d3.select(nodes[0]).attr("y");

					h_shift = h_keep - h_base;
					y_new = y_base - h_shift;

					d3.select(nodes[idx])
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

				colName = legendClassArray_11_orig[sortBy];
				var x0 = x_11.domain(data_11.sort(sortDescending_11
												  ? function(a, b) { return b[colName] - a[colName]; }
												  : function(a, b) { return b.total - a.total; })
									 .map(function(d,i) { return d.Régió; }))
				.copy();


				state_11.selectAll(".class" + active_link_11)
					.sort(function(a, b) {
					return x0(a.myregion_11) - x0(b.myregion_11);
				});

				var transition = svg_11.transition().duration(750),
					delay = function(d, i) { return i * 20; };

				//sort bars
				transition.selectAll(".class" + active_link_11)
					.delay(delay)
					.attr("x", function(d) {
					return x0(d.myregion_11);
				});

				//sort x-labels accordingly
				transition.select(".x.axis")
					.call(xAxis_11)
					.selectAll("g")
					.delay(delay);


				transition.select(".x.axis")
					.call(xAxis_11)
					.selectAll("g")
					.delay(delay);
			}		



		});
	}

	return chart;
}