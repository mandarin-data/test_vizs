var chartTooltip_doughnut = d3.select('#chart-doughnut-040604')
    .append('div')
    .attr('class', 'd_tooltip');

chartTooltip_doughnut.append('div')
    .attr('class', 'd_label');

chartTooltip_doughnut.append('div')
    .attr('class', 'd_percent');


d3.csv('../../data/04_adossag/04_06_04_doughnut.csv', function (error, dataset_doughnut) {
    dataset_doughnut.forEach(function (d) {
        d.percent = +d.percent;
        d.enabled = true;
    });


    var pie_doughnut = d3.pie()
        .value(function (d) {
            return d.percent;
        })
        .sort(null);

    var path_doughnut = svgdoughnut.selectAll('path')
        .data(pie_doughnut(dataset_doughnut))
        .enter()
        .append('path')
        .attr('d', arc_doughnut)
        .attr('fill', function (d, i) {
            return color_doughnut(d.data.label);
        })
        .each(function (d) {
            this._current = d;
        });

    var legendRectSize_doughnut = doughnutWidth/30;

    var legendSpacing_doughnut = 4;

    var legend_doughnut = svgdoughnut.selectAll('.legend')
        .data(color_doughnut.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
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
        .on('click', function (label) {
            var rect_doughnut = d3.select(this);
            var enabled_doughnut = true;
            var totalEnabled_doughnut = d3.sum(dataset_doughnut.map(function (d) {
                return (d.enabled) ? 1 : 0;
            }));

            if (rect_doughnut.attr('class') === 'disabled') {
                rect_doughnut.attr('class', '');
            } else {
                if (totalEnabled_doughnut < 2) return;
                rect_doughnut.attr('class', 'disabled');
                enabled_doughnut = false;
            }


            pie_doughnut.value(function (d) {
                if (d.label === label) d.enabled = enabled_doughnut;
                return (d.enabled) ? d.percent : 0;
            });

            path_doughnut = path_doughnut.data(pie_doughnut(dataset_doughnut));

            path_doughnut.transition()
                .duration(750)
                .attrTween('d', function (d) {
                    var interpolate_doughnut = d3.interpolate(this._current, d);
                    this._current = interpolate_doughnut(0);
                    return function (t) {
                        return arc_doughnut(interpolate_doughnut(t));
                    };
                });
        });

    legend_doughnut.append('text')
        .attr('x', legendRectSize_doughnut + legendSpacing_doughnut)
        .attr('y', legendRectSize_doughnut - legendSpacing_doughnut)
        .text(function (d) {
            return d;
        });

    path_doughnut.on('mouseover', function (d) {

        chartTooltip_doughnut.select('#d_label').html(d.data.label);
        chartTooltip_doughnut.select('#d_percent').html(parseFloat(d.data.percent) + 'M Ft');
        chartTooltip_doughnut.style('display', 'block');
    });
    path_doughnut.on('mouseout', function () {
        chartTooltip_doughnut.style('display', 'none');
    });


    path_doughnut.on('mousemove', function(d) {
		chartTooltip_doughnut
			.style("left", d3.mouse(this)[0]+ (d3.select("#chart-doughnut-040604").node().getBoundingClientRect().width)/2 - 30 + "px")
			.style("top", d3.mouse(this)[1] + 195 + "px");
    });


});

var margin = {
	top: 50,
	right: 100,
	bottom: 50,
	left: 100
},
	userInputWidth = d3.select("#chart-doughnut-040604").node().getBoundingClientRect().width - margin.left - margin.right,
	userInputHeight = d3.select("#chart-doughnut-040604").node().getBoundingClientRect().width - margin.top - margin.bottom;


var doughnutWidth = userInputWidth;
var doughnutHeight = userInputHeight;
var radius_doughnut = Math.min(doughnutWidth, doughnutHeight) / 2;
var color_doughnut = d3.scaleOrdinal().range(["#A4343A", "#43B02A", "#FF671F", "#888B8D", "#385988"]);

var svgdoughnut = d3.select('#chart-doughnut-040604')
    .append('svg')
    .attr('width', doughnutWidth)
    .attr('height', doughnutHeight)
    .append('g')
    .attr('transform', 'translate(' +
        (doughnutWidth / 2) + ',' + (doughnutHeight / 2) + ')');

svgdoughnut.append('text')
    .attr("id", "doughnut_title")
    .attr('x', 0)
    .attr('y', (-doughnutHeight) / 2 + margin.top / 2)
    .attr("text-anchor", "middle")
    .style('font-size', doughnutWidth / 27)
    .text("60 napon túli hátralékos lakossági fogyasztók hátraléka (Mft)");

svgdoughnut.append('text')
    .attr("id", "doughnut_forras")
    .attr('x', 0)
    .attr('y', (+doughnutHeight) / 2 - margin.bottom / 2)
    .attr("text-anchor", "middle")
    .style('font-size', doughnutWidth / 30)
    .text("Adatok forrása: MEKH")
    ;


svgdoughnut.append('text')
    .attr("id", "doughnut_labjegyzet")
    .attr('x', 0)
    .attr('y', (+doughnutHeight) / 2 - margin.bottom / 10)
    .attr("text-anchor", "middle")
    .style('font-size', doughnutWidth / 30)
    .text("A legend-re kattintva szűrhet!");

var donutWidth = userInputWidth/5;
var arc_doughnut = d3.arc()
	.innerRadius(radius_doughnut - donutWidth)
	.outerRadius(radius_doughnut);