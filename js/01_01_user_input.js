function MyTitle(){
	var margin_userinput = {top: 20, right: 0, bottom: 45, left: 40},
		userInputWidth = d3.select("#vis-0101").node().getBoundingClientRect().width - margin_userinput.left - margin_userinput.right,
		userInputHeight = 450 - margin_userinput.top - margin_userinput.bottom;

	var svg_userinput_title = d3.select("#svg_userinput_title")
	.attr("width", userInputWidth + margin_userinput.left + margin_userinput.right)
	.attr("height", 30);

	svg_userinput_title.append('text')
		.attr('id', 'userinput_title')
		.attr("x",  (userInputWidth)/2 )
		.attr("y", 27)
		.text("Az egy főre jutó havi lakhatási költségek és nettó jövedelmek jövedelmi tizedenként (Ft, 2016)");

}



var margin_userinput = {
        top: 20,
        right: 60,
        bottom: 40,
        left: 60
    },
	userInputWidth = d3.select("#vis-0101").node().getBoundingClientRect().width - margin_userinput.left - margin_userinput.right,
	userInputHeight = 350 ;


var fullwidth_ui = userInputWidth/2;


var x_userinput = d3.scaleBand()
    .rangeRound([0, userInputWidth], 0.1)
    .paddingInner(0.15);

var y_userinput = d3.scaleLinear()
    .range([userInputHeight, 0]);

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
    .style("visibility", "hidden");



d3.tsv("../../data/01_hozzaferhetoseg_es_megfizethetoseg/01_01_user_input.tsv", function (error, data) {
    x_userinput.domain(data.map(function (d) {
        return d.Decilis;
    }));
	
    y_userinput.domain([0, 100]);
	
	svg_userinput.append("g")
		.attr("class", "axis_userinput")
		.attr("transform", "translate(0," + 350 + ")")
		.call(xAxis_userinput);

	svg_userinput.append("g")
		.attr("class", "axis_userinput")
		.call(yAxis_userinput)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - (margin_userinput.left-15))
		.attr("x", 0  - (350/2) )
		.style("text-anchor", "middle")
		.style("fill", "#000000")
		.text("Lakhatásra fordított költségek a nettó jövedelemből (%)");


	
    svg_userinput.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
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
			.style("font-size", "14px")
			.text("Jövedelmi tized");
	
});



function myFunction() {
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
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("orient", "auto")
            .append("path")
            .attr("class", "marker")
            .attr("d", "M0,-5L10,0L0,5");

        svg_userinput.selectAll("text.label")
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("text")
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
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("text")
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
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("text")
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
                    return "költ kevesebbet lakhatásra"
                } else {
                    return "költ többet lakhatásra"
                };
            })

        svg_userinput.selectAll("line.arrow")
            .data(data.filter(function (d) {
                return d["Decilis"] == 2;
            }))
            .enter().append("line")
            .attr("class", "arrow")
            .attr("x1", function (d) {
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
            })
            .attr("y1", function (d) {
                return 65;
            })
            .attr("y2", function (d) {
                return   (350 * ((100 - atl_kolt_userinput) / 100) - 40) ;
            })
            .attr("marker-end", "url(#arrow)");
			

    });

}




function type(d) {
    d["Percent"] = +d["Percent"];
    return d;
}