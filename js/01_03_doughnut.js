var tooltip = d3.select('#chart')
            .append('div')
            .attr('class', 'tooltip');

        tooltip.append('div')
            .attr('class', 'label');

        tooltip.append('div')
            .attr('class', 'percent');


d3.csv('../../data/01_hozzaferhetoseg_es_megfizethetoseg/01_03_doughnut.tsv', function(error, dataset) {
	dataset.forEach(function(d) {
		d.percent = +d.percent;
		d.enabled = true;
	});

	var pie = d3.pie()
		.value(function(d) {
			return d.percent;
		})
		.sort(null);

	var path = svg.selectAll('path')
		.data(pie(dataset))
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', function(d, i) {
			return color(d.data.label);
		})
		.each(function(d) {
			this._current = d;
		});

	var legendRectSize = 18;

	var legendSpacing = 4;

	var legend = svg.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i) {
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
		.on('click', function(label) {
			var rect = d3.select(this);
			var enabled = true;
			var totalEnabled = d3.sum(dataset.map(function(d) {
				return (d.enabled) ? 1 : 0;
			}));

			if (rect.attr('class') === 'disabled') {
				rect.attr('class', '');
			} else {
				if (totalEnabled < 2) return;
				rect.attr('class', 'disabled');
				enabled = false;
			}


			pie.value(function(d) {
				if (d.label === label) d.enabled = enabled;
				return (d.enabled) ? d.percent : 0;
			});

			path = path.data(pie(dataset));

			path.transition()
				.duration(750)
				.attrTween('d', function(d) {
					var interpolate = d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function(t) {
						return arc(interpolate(t));
					};
				});
		});

	legend.append('text')
		.attr('x', legendRectSize + legendSpacing)
		.attr('y', legendRectSize - legendSpacing)
		.text(function(d) {
			return d;
		});

	path.on('mouseover', function(d) {

		tooltip.select('.label').html(d.data.label);
		tooltip.select('.percent').html(parseFloat(d.data.percent * 100).toFixed(1) + '%');
		tooltip.style('display', 'block');
	});
	path.on('mouseout', function() {
		tooltip.style('display', 'none');
	});


	path.on('mousemove', function(d) {
		tooltip.style('top', (d3.event.pageY + 10) + 'px')
			.style('left', (d3.event.pageX + 10) + 'px');
	});


});

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory20b);

var svg = d3.select('#chart')
	.append('svg')
	.attr('width', width)
	.attr('height', height)
	.append('g')
	.attr('transform', 'translate(' +
		(width / 2) + ',' + (height / 2) + ')');

var donutWidth = 75;

var arc = d3.arc()
	.innerRadius(radius - donutWidth) // NEW
	.outerRadius(radius);