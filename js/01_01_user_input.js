<<<<<<< HEAD
var margin = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40
    },
    userInputWidth = d3.select("#vis-0101").node().getBoundingClientRect().width - margin.left - margin.right,
    userInputHeight = 450 - margin.top - margin.bottom;
=======
var margin_userinput = {
        top: 20,
        right: 60,
        bottom: 40,
        left: 60
    },
	userInputWidth = d3.select("#vis-0101").node().getBoundingClientRect().width - margin_userinput.left - margin_userinput.right,
	userInputHeight = 350 ;
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25


var fullwidth_ui = userInputWidth/2;


var x_userinput = d3.scaleBand()
    .rangeRound([0, userInputWidth], 0.1)
    .paddingInner(0.1);

var y_userinput = d3.scaleLinear()
    .range([userInputHeight, 0]);

<<<<<<< HEAD
var xAxisUserInput = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(10);

var svg = d3.select("#vis-0101").append("svg")
    .attr("width", userInputWidth + margin.left + margin.right)
    .attr("height", userInputHeight + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("#vis-0101")
    .append("div")
    .attr("class", "toolTip")
=======
var xAxis_userinput = d3.axisBottom()
    .scale(x_userinput);

var yAxis_userinput = d3.axisLeft()
	.scale(y_userinput)
	.ticks(10)
	.tickFormat(d => d + "%");



var svg_userinput = d3.select("#vis-0101").append("svg")
    .attr("width", userInputWidth + margin_userinput.left + margin_userinput.right)
    .attr("height", userInputHeight + margin_userinput.top + margin_userinput.bottom + 20)
	.append("g")
    .attr("transform", "translate(" + margin_userinput.left + "," + margin_userinput.top + ")");

var tooltip_userinput = d3.select("#vis-0101")
    .append("div")
    .attr("id", "toolTip")
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
    .style("visibility", "hidden");



<<<<<<< HEAD
d3.tsv("/wp-habitat/data/01_hozzaferhetoseg_es_megfizethetoseg/01_01_user_input.tsv", function (error, data) {
    x.domain(data.map(function (d) {
        return d.Decilis;
    }));
    y.domain([0, 100]);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + userInputHeight + ")")
        .call(xAxisUserInput);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Percent");

    svg.selectAll(".bar")
=======
d3.tsv("../../data/01_hozzaferhetoseg_es_megfizethetoseg/01_01_user_input.tsv", function (error, data) {
    x_userinput.domain(data.map(function (d) {
        return d.Decilis;
    }));

    y_userinput.domain([0, 100]);

	svg_userinput.append("g")
		.attr("class", "axis_userinput")
		.style("font-size", "12px")
		.attr("transform", "translate(0," + 350 + ")")
		.call(xAxis_userinput);

	svg_userinput.append("g")
		.attr("class", "axis_userinput")
		.style("font-size", "12px")
		.call(yAxis_userinput)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - (margin_userinput.left-15))
		.attr("x", 0  - (350/2) )
		.style("text-anchor", "middle")
		.style("fill", "#000000")
		.style("font-size", "12px")
		.text("Lakhatási költségek a jövedelem viszonylatában (%)");



    svg_userinput.selectAll(".bar")
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
<<<<<<< HEAD
            return x(d.Decilis);
        })
        .attr("y", function (d) {
            return y(d["Percent"]);
        })

        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return userInputHeight - y(d["Percent"]);
        })

        .on("mousemove", function (d) {
            tooltip
                .style("visibility", "visible")
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html((d.Decilis) + ". decilis : " + (d["Percent"] + "%"));
        })
        .on("mouseout", function (d) {
            tooltip.style("display", "none");
        });
=======
            return x_userinput(d.Decilis);
        })
        .attr("y", function (d) {
            return y_userinput(d["Percent"]);
        })

        .attr("width", x_userinput.bandwidth())
        .attr("height", function (d) {
            return 350 - y_userinput(d["Percent"]);
        })

        .on("mousemove", function (d) {
            tooltip_userinput
                .style("visibility", "visible")
                .style("left", d3.mouse(this)[0] + "px")
                .style("top", d3.mouse(this)[1] + 95  + "px")
		                .style("display", "inline")

                .html((d.Decilis) + ". decilis : " + (d["Percent"] + "%"));
        })
        .on("mouseout", function (d) {
            tooltip_userinput.style("display", "none");
        });

		svg_userinput.append('text')
			.attr("id", "userinput_forras")
			.attr("x", fullwidth_ui * 2 )
			.attr("y",  350 + (margin_userinput.bottom) + 10)
			.attr("text-anchor", "end")
			.style('font-size', "12px")
			.text("Adatok forrása: KSH 2017a")
			.on('click', function(d) {
				window.open(
				  'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_zhc021a.html?down=1523',
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

		svg_userinput.append('text')
			.attr("id", "ytitle")
			.attr("x", fullwidth_ui )
			.attr("y",  350 + (margin_userinput.bottom - 5))
			.style("text-anchor", "middle")
			.style("font-size", "12px")
			.text("Jövedelmi tized");

>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
});



function myFunction() {
<<<<<<< HEAD
    var wage = document.getElementById("myForm").elements[0].value;
    var expend = document.getElementById("myForm").elements[1].value;
    var userexp = ((expend / wage) * 100);


    d3.tsv("/wp-habitat/data/01_hozzaferhetoseg_es_megfizethetoseg/01_01_user_input.tsv", function (error, data) {
        if (error) throw error;
        var period = data.filter(function (row) {
            row["Dec_f"] = +row["Dec_f"];
            row["Dec_a"] = +row["Dec_a"];
            return wage <= row['Dec_f'] && row['Dec_a'] <= wage;
        });

        var dec = period.filter(function (d) {
            return d.Decilis
        })[0].Decilis;

        var atl_kolt = period.filter(function (d) {
            return d.Decilis
        })[0]["Percent"];

        var dif = userexp - atl_kolt

        x.domain(data.map(function (d) {
            return d.Decilis;
        }));
        y.domain([0, 100]);

        svg.selectAll("text.label").remove();
        svg.selectAll("text.label1").remove();
        svg.selectAll("text.label2").remove();
        svg.selectAll("line.arrow").remove();
        svg.selectAll("g").remove();

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + userInputHeight + ")")
            .call(xAxisUserInput);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Percent");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.Decilis);
            })
            .attr("y", function (d) {
                return y(d["Percent"]);
            })

            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                return userInputHeight - y(d["Percent"]);
            })

            .on("mousemove", function (d) {
                tooltip
                    .style("visibility", "visible")
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.Decilis) + ". decilis : " + (d["Percent"] + "%"));
            })
            .on("mouseout", function (d) {
                tooltip.style("display", "none");
            });

        // add text and arrow

        svg.append("defs").append("marker")
=======
    var wage_userinput = document.getElementById("myForm").elements[0].value;
    var expend_userinput = document.getElementById("myForm").elements[1].value;
    var userexp_userinput = ((expend_userinput / wage_userinput) * 100);


    d3.tsv("../../data/01_hozzaferhetoseg_es_megfizethetoseg/01_01_user_input.tsv", function (error, data) {
        if (error) throw error;
        var period_userinput = data.filter(function (row) {
            row["Dec_f"] = +row["Dec_f"];
            row["Dec_a"] = +row["Dec_a"];
            return wage_userinput <= row['Dec_f'] && row['Dec_a'] <= wage_userinput;
        });

        var dec_userinput = period_userinput.filter(function (d) {
            return d.Decilis
        })[0].Decilis;

        var atl_kolt_userinput = period_userinput.filter(function (d) {
            return d.Decilis
        })[0]["Percent"];

        var dif_userinput = userexp_userinput - atl_kolt_userinput

        x_userinput.domain(data.map(function (d) {
            return d.Decilis;
        }));
        y_userinput.domain([0, 100]);

        svg_userinput.selectAll("text.label_01_01").remove();
        svg_userinput.selectAll("line.arrow").remove();



        svg_userinput.append("defs").append("marker")
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("orient", "auto")
            .append("path")
            .attr("class", "marker")
            .attr("d", "M0,-5L10,0L0,5");

<<<<<<< HEAD
        svg.selectAll("text.label")
=======
        svg_userinput.selectAll("text.label")
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("text")
<<<<<<< HEAD
            .attr("class", "label")
            .attr("x", function (d) {
                return userInputWidth / 2;
            }).attr("y", function (d) {
                return 10;
            })
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text("A " + dec + ". jövedelmi decilisbe tartozik,")


        svg.selectAll("text.label1")
=======
            .attr("class", "label_01_01")
            .attr("x", function (d) {
                return fullwidth_ui;
            })
			.attr("y", function (d) {
                return 10;
            })
		    .style("text-anchor", "middle")
			.style("font-size", "14px")
            .text( dec_userinput + ". jövedelmi tizedbe tartozik,")


        svg_userinput.selectAll("text.label1")
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("text")
<<<<<<< HEAD
            .attr("class", "label")
            .attr("x", function (d) {
                return userInputWidth / 2;
            }).attr("y", function (d) {
                return 25;
            })
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text(function (d) {
                if (dif < 0) {
                    return "melynek átlagához képest " + Math.round(Math.abs(dif)) + " százalékkal"
                } else {
                    return "melynek átlagához képest " + Math.round(Math.abs(dif)) + " százalékkal"
                };
            })

        svg.selectAll("text.label2")
=======
            .attr("class", "label_01_01")
            .attr("x", function (d) {
                return fullwidth_ui;
            })
			.attr("y", function (d) {
                return 25;
            })
            .style("text-anchor", "middle")
			.style("font-size", "14px")
            .text(function (d) {
                if (dif_userinput < 0) {
                    return "melynek átlagához képest " + Math.round(Math.abs(dif_userinput)) + " százalékkal"
                } else {
                    return "melynek átlagához képest " + Math.round(Math.abs(dif_userinput)) + " százalékkal"
                };
            })

        svg_userinput.selectAll("text.label2")
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("text")
<<<<<<< HEAD
            .attr("class", "label")
            .attr("x", function (d) {
                return userInputWidth / 2;
            }).attr("y", function (d) {
                return 40;
            })
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .text(function (d) {
                if (dif < 0) {
=======
            .attr("class", "label_01_01")
            .attr("x", function (d) {
                return fullwidth_ui;
            })
			.attr("y", function (d) {
                return 40;
            })
            .style("text-anchor", "middle")
			.style("font-size", "14px")
            .text(function (d) {
                if (dif_userinput < 0) {
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
                    return "költ kevesebbet lahatásra"
                } else {
                    return "költ többet lahatásra"
                };
            })

<<<<<<< HEAD
        svg.selectAll("line.arrow")
=======
        svg_userinput.selectAll("line.arrow")
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("line")
            .attr("class", "arrow")
            .attr("x1", function (d) {
<<<<<<< HEAD
                if (dec < 4) {
                    return (userInputWidth / 2 - 60)
                } else if (dec > 6) {
                    return (userInputWidth / 2 + 60)
                } else {
                    return userInputWidth / 2
                };
            })
            .attr("x2", function (d) {
                return ((x(d.Decilis) - 4) / 2) * 1 + ((x(d.Decilis) - 4) * (dec - 1));
=======
                if (dec_userinput < 4) {
                    return (fullwidth_ui - 60)
                } else if (dec_userinput > 6) {
                    return (fullwidth_ui + 60)
                } else {
                    return fullwidth_ui
                };
            })
            .attr("x2", function (d) {
                return ((x_userinput(d.Decilis) - 4) / 2) * 1 + ((x_userinput(d.Decilis) - 4) * (dec_userinput - 1));
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
            })
            .attr("y1", function (d) {
                return 65;
            })
            .attr("y2", function (d) {
<<<<<<< HEAD
                return (userInputHeight * ((100 - atl_kolt) / 100)) - 25;
            })
            .attr("marker-end", "url(#arrow)");

=======
                return   (350 * ((100 - atl_kolt_userinput) / 100) - 40) ;
            })
            .attr("marker-end", "url(#arrow)");


>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
    });

}

<<<<<<< HEAD
=======



>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
function type(d) {
    d["Percent"] = +d["Percent"];
    return d;
}
