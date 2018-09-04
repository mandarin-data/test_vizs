function BarChartKomf() {

    function chartkomf(selectionkomf) {
        selectionkomf.each(function (d, i) {
            d3.select("#vis-komfort").remove();

            var margin_020203 = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },

                width_020203 = d3.select("#vis-020203").node().getBoundingClientRect().width - margin_020203.left - margin_020203.right,
                height_020203 = 450 - margin_020203.top - margin_020203.bottom;

            var x_020203 = d3.scaleBand()
                .rangeRound([0, width_020203])
                .paddingInner(0.05)
                .align(0.1);

            var y_020203 = d3.scaleLinear()
                .rangeRound([height_020203, 0]);

            var color_020203 = d3.scaleOrdinal()
                .range(["#385988", "#43B02A", "#FF671F", "#A4343A"]);

            var xAxis_020203 = d3.axisBottom()
                .scale(x_020203);

            var yAxis_020203 = d3.axisLeft(y_020203)
                .ticks(null, "%");

            var svg_020203 = d3.select("#vis-020203").append("svg")
                .attr("width", width_020203 + margin_020203.left + margin_020203.right)
                .attr("height", height_020203 + margin_020203.top + margin_020203.bottom)
                .attr("id", "vis-komfort")
                .append("g")
                .attr("transform", "translate(" + margin_020203.left + "," + margin_020203.top + ")");

            var active_link_020203 = "0"; //to control legend selections and hover
            var legendClicked_020203; //to control legend selections
            var legendClassArray_020203 = []; //store legend classes to select bars in plotSingleK()
            var legendClassArray_020203_orig = []; //orig (with spaces)
            var sortDescending_020203; //if true, bars are sorted by height in descending order
            var restoreXFlag_020203 = false; //restore order of bars back to original

            /*
            //disable sort checkbox
            d3.select("#mycheck")
                .property("disabled", true)
                .property("checked", false);
            */


            var dataValues_020203 = d3.values(d)[0];
            var columns_020203 = Object.keys(dataValues_020203);
            columns_020203.shift();
            var data_020203 = d

            data_020203.forEach(function (d) {
                data_020203[columns_020203[1]] = +data_020203[columns_020203[1]];
                data_020203[columns_020203[2]] = +data_020203[columns_020203[2]];
                data_020203[columns_020203[3]] = +data_020203[columns_020203[3]];
                data_020203[columns_020203[0]] = +data_020203[columns_020203[0]];
            });


            color_020203.domain(d3.keys(data_020203[0]).filter(function (key) {
                return key !== "Tized";
            }));


            data_020203.forEach(function (d) {
                var myregion_020203 = d.Tized; //add to stock code

                var y0_020203 = 0;
                //d.categories = color_020203.domain().map(function(name) { return {name: name, y0_020203: y0_020203, y1_020203: y0_020203 += +d[name]}; });
                d.categories = color_020203.domain().map(function (name) {
                    //return { myregion_020203:myregion_020203, name: name, y0_020203: y0_020203, y1_020203: y0_020203 += +d[name]}; });
                    return {
                        myregion_020203: myregion_020203,
                        name: name,
                        y0_020203: y0_020203,
                        y1_020203: y0_020203 += +d[name],
                        value: d[name],
                        y_corrected_k: 0
                    };
                });
                d.total = d.categories[d.categories.length - 1].y1_020203;

            });







            /*
            //Sort totals in descending order
			data_020203.sort(function (a,b) {return d3.ascending(a.Tized, b.Tized);});
			data_020203.sort(function(a, b) { return b.total - a.total; });
            */

            x_020203.domain(data_020203.map(function (d) {
                return d.Tized;
            }));
            y_020203.domain([0, 1]);


            svg_020203.append("g")
                .attr("class", "axis_020203")
                .attr("transform", "translate(0," + height_020203 + ")")
                .call(xAxis_020203);

            svg_020203.append("g")
                .attr("class", "axis_020203")
                .call(yAxis_020203)
                .append("text")
                .attr("x", 2)
                .attr("y", y_020203(y_020203.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
            //.text("Population");



            var state_020203 = svg_020203.selectAll(".state")
                .data(data_020203)
                .enter().append("g")
                .attr("class", "g")
                .attr("transform", function (d) {
                    return "translate(" + "0" + ",0)";
                })

            var tooltip_020203 = svg_020203.append("g")
                .attr("class", "tooltip_020203")
                .style("display", "none");

            tooltip_020203.append("rect")
                .attr("width", 60)
                .attr("height", 20)
                .attr("fill", "white")
                .attr("stroke", "#666")
                .attr("stroke-width", "0.5px");

            tooltip_020203.append("text")
                .attr("x", 30)
                .attr("dy", "1.2em")
                .style("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("font", "sans-serif");

            svg_020203.append('text')
                .attr("class", "barchart_020203_forras")
                .attr("x", width_020203)
                .attr("y", height_020203 + margin_020203.bottom - 3)
                .attr("text-anchor", "end")
                .text("Adatok forrása: még nem tudni")
                .on('click', function (d) {
                    window.open(
                        'https://hu.wikipedia.org/wiki/Sablon:Nincs_forr%C3%A1s',
                        '_blank' // <- This is what makes it open in a new window.
                    );
                })
                .on('mouseover', function (d) {
                    d3.select(this).style("cursor", "pointer");
                })

                .on("mouseout", function () {
                    d3.select(this).style("cursor", "default");
                })
                .on("mousemove", function (d) {
                    d3.select(this).style("cursor", "pointer");
                });


            height_diff_k = 0; //height discrepancy when calculating h based on data vs y(d.y0_020203) - y(d.y1_020203)

            state_020203.selectAll("rect")
                .data(function (d) {
                    return d.categories;
                })
                .enter().append("rect")
                .attr("width", x_020203.bandwidth())
                .attr("y", function (d) {
                    height_diff_k = height_diff_k + y_020203(d.y0_020203) - y_020203(d.y1_020203) - (y_020203(0) - y_020203(d.value));
                    y_corrected_k = y_020203(d.y1_020203) + height_diff_k;
                    d.y_corrected_k = y_corrected_k //store in d for later use in restorePlotK()
                    //return y_corrected_k;
                    return y_020203(d.y1_020203);
                })
                .attr("x", function (d) { //add to stock code
                    return x_020203(d.myregion_020203)
                })
                .attr("height", function (d) {
                    return y_020203(d.y0_020203) - y_020203(d.y1_020203); //heights calculated based on stacked values (inaccurate)
                    //return y_020203(0) - y_020203(d.value); //calculate height directly from value in csv file
                })
                .attr("class", function (d) {
                    classLabel = d.name.replace(/\s+|[,]+\s/g, '').trim(); //remove spaces
                    return "bars class" + classLabel;
                })
                .style("fill", function (d) {
                    return color_020203(d.name);
                });

            state_020203.selectAll("rect")
                .on("mouseover", function () {
                    tooltip_020203.style("display", null);
                })
                .on("mouseout", function () {
                    tooltip_020203.style("display", "none");
                })
                .on("mousemove", function (d) {
                    var delta_020203 = d.y1_020203 - d.y0_020203;
                    var xPosition_020203 = d3.mouse(this)[0] + 15;
                    var yPosition_020203 = d3.mouse(this)[1] + 15;
                    tooltip_020203.attr("transform", "translate(" + xPosition_020203 + "," + yPosition_020203 + ")")
                        .select("text").text((delta_020203 * 100).toFixed(1) + "%");
                    console.log(delta_020203)
                });


            var legend_020203 = svg_020203.selectAll(".legend")
                .data(color_020203.domain().slice().reverse())
                .enter().append("g")
                .attr("class", function (d) {
                    legendClassArray_020203.push(d.replace(/\s+|[,]+\s/g, '')); //remove spaces
                    legendClassArray_020203_orig.push(d); //remove spaces
                    return "legend";
                })
                .attr("transform", function (d, i) {
                    return "translate(0," + i * 20 + ")";
                });


            /*
            
            //reverse order to match order in which bars are stacked
			legendClassArray_020203 = legendClassArray_020203.reverse();
			legendClassArray_020203_orig = legendClassArray_020203_orig.reverse();

			legend_020203.append("rect")
				.attr("x", width_020203 - 210)
				.attr("width", 18)
				.attr("height", 18)
				.style("fill", color_020203)
				.attr("id", function (d, i) {
				return "id" + d.replace(/\s+|[,]+\s/g, '');
			})
				.on("mouseover",function(){

				if (active_link_020203 === "0") d3.select(this).style("cursor", "pointer");
				else {
					if (active_link_020203.split("class").pop() === this.id.split("id").pop()) {
						d3.select(this).style("cursor", "pointer");
					} else d3.select(this).style("cursor", "auto");
				}
			})
				.on("click",function(d){

				if (active_link_020203 === "0") { //nothing selected, turn on this selection
					d3.select(this)
						.style("stroke", "black")
						.style("stroke-width", 2);
					active_link_020203 = this.id.split("id").pop();
					plotSingleK(this);

					//gray out the others
					for (i = 0; i < legendClassArray_020203.length; i++) {
						if (legendClassArray_020203[i] != active_link_020203) {
							d3.select("#id" + legendClassArray_020203[i])
								.style("opacity", 0.5);
						} else sortBy = i; //save index for sorting in change()
					}

					//enable sort checkbox
                        d3.select("#mycheck").property("disabled", false)
                        d3.select(".barlabel").style("color", "black")
			d3.select(".myinput_large").style("opacity", "100")
					//sort the bars if checkbox is clicked
                        d3.select("#mycheck").on("change", change);
				} else { //deactivate
					if (active_link_020203 === this.id.split("id").pop()) {//active square selected; turn it OFF
						d3.select(this)
							.style("stroke", "none");

						//restore remaining boxes to normal opacity
						for (i = 0; i < legendClassArray_020203.length; i++) {
							d3.select("#id" + legendClassArray_020203[i])
								.style("opacity", 1);
						};


                            if (d3.select("#mycheck").property("checked")) {
							restoreXFlag_020203 = true;
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
						restorePlotK(d);
						active_link_020203 = "0"; //reset
					}
				} //end active_link_020203 check
			});


			legend_020203.append("text")
				.attr("class", "legend_020203")
				.attr("x", width_020203-175)
				.attr("y", 8)
				.attr("dy", "0.32em")
				.attr("text-anchor", "start")
				.text(function(d) { return d; });

*/
            // restore graph after a single selection
            function restorePlotK(d) {
                //restore graph after a single selection
                d3.selectAll(".bars:not(.class" + class_keep + ")")
                    .transition()
                    .duration(1000)
                    .delay(function () {
                        if (restoreXFlag_020203) return 1300;
                        else return 0;
                    })
                    .attr("width", x_020203.bandwidth()) //restore bar width
                    .style("opacity", 1);

                //translate bars back up to original y-posn
                d3.selectAll(".class" + class_keep)
                    .attr("x", function (d) {
                        return x_020203(d.myregion_020203);
                    })
                    .transition()
                    .duration(1000)
                    .delay(function () {
                        if (restoreXFlag_020203) return 1300; //bars have to be restored to orig posn
                        else return 0;
                    })
                    .attr("y", function (d) {
                        return y_020203(d.y1_020203); //not exactly correct since not based on raw data value
                        //return d.y_corrected_k;
                    });

                //reset
                restoreXFlag_020203 = false;
            }


            function plotSingleK(d) {
                class_keep = d.id.split("id").pop();
                idxk = legendClassArray_020203.indexOf(class_keep);

                //erase all but selected bars by setting opacity to 0
                d3.selectAll(".bars:not(.class" + class_keep + ")")
                    .transition()
                    .duration(1000)
                    .attr("width", 0) // use because svg has no zindex to hide bars so can't select visible bar underneath
                    .style("opacity", 0);


                var state_020203 = d3.selectAll(".g");

                state_020203.nodes().forEach(function (d, i) {
                    var nodes = d.childNodes;
                    //get height and y posn of base bar and selected bar
                    h_keepk = d3.select(nodes[idxk]).attr("height");
                    y_keepk = d3.select(nodes[idxk]).attr("y");

                    h_basek = d3.select(nodes[0]).attr("height");
                    y_basek = d3.select(nodes[0]).attr("y");

                    h_shiftk = h_keepk - h_basek;
                    y_newk = y_basek - h_shiftk;

                    d3.select(nodes[idxk])
                        //  .transition()
                        //  .ease("bounce")
                        //  .duration(1000)
                        //  .delay(750)
                        .attr("y", y_newk);
                });
            }

/*
            //adapted change() fn in http://bl.ocks.org/mbostock/3885705
            function change() {
                data_020203.sort(function (a, b) {
                    return d3.ascending(a.Tized, b.Tized);
                });


                if (this.checked) sortDescending_020203 = true;
                else sortDescending_020203 = false;

                colName = legendClassArray_020203_orig[sortBy];
                var x0 = x_020203.domain(data_020203.sort(sortDescending_020203 ?
                            function (a, b) {
                                return b[colName] - a[colName];
                            } :
                            function (a, b) {
                                return b.total - a.total;
                            })
                        .map(function (d, i) {
                            return d.Tized;
                        }))
                    .copy();


                state_020203.selectAll(".class" + active_link_020203)
                    .sort(function (a, b) {
                        return x0(a.myregion_020203) - x0(b.myregion_020203);
                    });

                var transition = svg_020203.transition().duration(750),
                    delay = function (d, i) {
                        return i * 20;
                    };

                //sort bars
                transition.selectAll(".class" + active_link_020203)
                    .delay(delay)
                    .attr("x", function (d) {
                        return x0(d.myregion_020203);
                    });

                //sort x-labels accordingly
                transition.select(".x.axis")
                    .call(xAxis_020203)
                    .selectAll("g")
                    .delay(delay);


                //sort x-labels accordingly
                transition.select(".axis_020203")
                    .call(xAxis_020203)
                    .selectAll("g")
                    .delay(delay);
            }

*/

        });
    }

    return chartkomf;
}
