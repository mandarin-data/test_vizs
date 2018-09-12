<<<<<<< HEAD
var chartTooltip = d3.select('#chart-doughnut')
    .append('div')
    .attr('class', 'tooltip');

chartTooltip.append('div')
    .attr('class', 'label');

chartTooltip.append('div')
    .attr('class', 'percent');


d3.csv('/wp-habitat/data/01_hozzaferhetoseg_es_megfizethetoseg/01_03_doughnut.tsv', function (error, dataset) {
    dataset.forEach(function (d) {
        d.percent = +d.percent;
        d.enabled = true;
    });

    var pie = d3.pie()
        .value(function (d) {
            return d.percent;
        })
        .sort(null);

    var path = svgdoughnut.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color(d.data.label);
        })
        .each(function (d) {
            this._current = d;
        });

    var legendRectSize = 18;

    var legendSpacing = 4;

    var legend = svgdoughnut.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -2 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color)
        .on('click', function (label) {
            var rect = d3.select(this);
            var enabled = true;
            var totalEnabled = d3.sum(dataset.map(function (d) {
                return (d.enabled) ? 1 : 0;
            }));

            if (rect.attr('class') === 'disabled') {
                rect.attr('class', '');
            } else {
                if (totalEnabled < 2) return;
                rect.attr('class', 'disabled');
                enabled = false;
            }


            pie.value(function (d) {
                if (d.label === label) d.enabled = enabled;
                return (d.enabled) ? d.percent : 0;
            });

            path = path.data(pie(dataset));

            path.transition()
                .duration(750)
                .attrTween('d', function (d) {
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        return arc(interpolate(t));
                    };
                });
        });

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) {
            return d;
        });

    path.on('mouseover', function (d) {

        chartTooltip.select('.label').html(d.data.label);
        chartTooltip.select('.percent').html(parseFloat(d.data.percent * 100).toFixed(1) + '%');
        chartTooltip.style('display', 'block');
    });
    path.on('mouseout', function () {
        chartTooltip.style('display', 'none');
    });


    path.on('mousemove', function (d) {
        chartTooltip.style('top', (d3.event.pageY + 10) + 'px')
            .style('left', (d3.event.pageX + 10) + 'px');
    });
=======
var chartTooltip_doughnut = d3.select('#chart-doughnut')
	.append('div')
	.style("display", "none")
	.attr('id', 'd_tooltip');

chartTooltip_doughnut.append('div')
	.attr('id', 'd_label');

chartTooltip_doughnut.append('div')
	.attr('id', 'd_percent');


d3.csv('/wp-habitat/data/01_hozzaferhetoseg_es_megfizethetoseg/01_03_doughnut.tsv', function(error, dataset_doughnut) {
	dataset_doughnut.forEach(function(d) {
		d.percent = +d.percent;
		d.enabled = true;
	});

	var pie_doughnut = d3.pie()
		.value(function(d) {
			return d.percent;
		})
		.sort(null);

	var path_doughnut = svgdoughnut.selectAll('path')
		.data(pie_doughnut(dataset_doughnut))
		.enter()
		.append('path')
		.attr('d', arc_doughnut)
		.attr('fill', function(d, i) {
			return color_doughnut(d.data.label);
		})
		.each(function(d) {
			this._current = d;
		});

	var legendRectSize_doughnut = doughnutWidth/30;

	var legendSpacing_doughnut = 4;

	var legend_doughnut = svgdoughnut.selectAll('.legend')
		.data(color_doughnut.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i) {
			var height_doughnut = legendRectSize_doughnut + legendSpacing_doughnut;
			var offset_doughnut = height_doughnut * color_doughnut.domain().length / 2;
			var horz_doughnut = -5 * legendRectSize_doughnut;
			var vert_doughnut = i * height_doughnut - offset_doughnut;
			return 'translate(' + horz_doughnut + ',' + vert_doughnut + ')';

		});

	legend_doughnut.append('rect')
		.attr('class', 'd_rect')
		.attr('width', legendRectSize_doughnut)
		.attr('height', legendRectSize_doughnut)
		.style('fill', color_doughnut)
		.style('stroke', color_doughnut)
		.style('stroke-width', 2)
		.style('cursor', "pointer")
		.on('click', function(label) {
		var rect_doughnut = d3.select(this);
		var enabled_doughnut = true;
		var totalEnabled_doughnut = d3.sum(dataset_doughnut.map(function(d) {
			return (d.enabled) ? 1 : 0;
		}));

		if (rect_doughnut.attr('class') === 'disabled') {
			rect_doughnut.attr('class', '');
		} else {
			if (totalEnabled_doughnut < 2) return;
			rect_doughnut.attr('class', 'disabled');
			enabled_doughnut = false;
		}

		pie_doughnut.value(function(d) {
			if (d.label === label) d.enabled = enabled_doughnut;
			return (d.enabled) ? d.percent : 0;
		});

		path_doughnut = path_doughnut.data(pie_doughnut(dataset_doughnut));

		path_doughnut.transition()
			.duration(750)
			.attrTween('d', function(d) {
			var interpolate_doughnut = d3.interpolate(this._current, d);
			this._current = interpolate_doughnut(0);
			return function(t) {
				return arc_doughnut(interpolate_doughnut(t));
			};
		});
	});

	legend_doughnut.append('text')
		.attr('x', legendRectSize_doughnut + legendSpacing_doughnut)
		.attr('y', legendRectSize_doughnut - legendSpacing_doughnut)
		.style('font-size', doughnutWidth/30)
		.text(function(d) {
		return d;
	});


	path_doughnut.on('mouseover', function(d) {

		chartTooltip_doughnut.select('#d_label').html(d.data.label);
		chartTooltip_doughnut.select('#d_percent').html(parseFloat(d.data.percent * 100).toFixed(1) + '%');
		chartTooltip_doughnut.style('display', 'inline');
	});
	path_doughnut.on('mouseout', function() {
		chartTooltip_doughnut.style('display', 'none');
	});


	path_doughnut.on('mousemove', function(d) {
		chartTooltip_doughnut
			.style("left", d3.mouse(this)[0]+ (d3.select("#chart-doughnut").node().getBoundingClientRect().width)/2 - 30 + "px")
			.style("top", d3.mouse(this)[1] + 195 + "px");
	});
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25

});


var margin = {
	top: 50,
	right: 100,
	bottom: 50,
	left: 100
},
	userInputWidth = d3.select("#chart-doughnut").node().getBoundingClientRect().width - margin.left - margin.right,
	userInputHeight = d3.select("#chart-doughnut").node().getBoundingClientRect().width - margin.top - margin.bottom;


var doughnutWidth = userInputWidth;
var doughnutHeight = userInputHeight;
var radius_doughnut = Math.min(doughnutWidth, doughnutHeight) / 2;
var color_doughnut = d3.scaleOrdinal(["#385988", "#43B02A", "#FF671F", "#A4343A"])

var svgdoughnut = d3.select('#chart-doughnut')
<<<<<<< HEAD
    .append('svg')
    .attr('width', doughnutWidth)
    .attr('height', doughnutHeight)
    .append('g')
    .attr('transform', 'translate(' +
        (doughnutWidth / 2) + ',' + (doughnutHeight / 2) + ')');
=======
	.append('svg')
	.attr('width', doughnutWidth)
	.attr('height', doughnutHeight)
	.append('g')
	.attr('transform', 'translate(' +
		  (doughnutWidth / 2) + ',' + (doughnutHeight / 2) + ')');


svgdoughnut.append('text')
	.attr("id", "doughnut_title")
	.attr('x', 0)
	.attr('y', (-doughnutHeight)/2 + margin.top/2)
	.attr("text-anchor", "middle")
	.style('font-size', doughnutWidth/27)
	.text("A lakott lakások megoszlása használati jogcím szerint (2016)");

svgdoughnut.append('text')
	.attr("id", "doughnut_forras")
	.attr('x', 0)
	.attr('y', (+doughnutHeight)/2 - margin.bottom/2)
	.attr("text-anchor", "middle")
	.style('font-size', doughnutWidth/30)
	.text("Adatok forrása: KSH 2018a")
	.on('click', function(d) {
		window.open(
			'https://www.ksh.hu/mikrocenzus2016/docs/tablak/07/07_2_2.xls',
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

svgdoughnut.append('text')
	.attr("id", "doughnut_labjegyzet")
	.attr('x', 0)
	.attr('y', (+doughnutHeight)/2 - margin.bottom/10)
	.attr("text-anchor", "middle")
	.style('font-size', doughnutWidth/30)
	.text("A legend-re kattintva szűrhet!");
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25


<<<<<<< HEAD
var arc = d3.arc()
    .innerRadius(radius - donutWidth) // NEW
    .outerRadius(radius);
=======
var donutWidth = userInputWidth/5;
var arc_doughnut = d3.arc()
	.innerRadius(radius_doughnut - donutWidth)
	.outerRadius(radius_doughnut);
>>>>>>> 0dfefe8661d328b490d06c203612c3c0e24ddc25
