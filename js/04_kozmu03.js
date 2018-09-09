
var width_kozmu03 = d3.select("#viscontainer-kozmu03").node().getBoundingClientRect().width/1.2,
	height_kozmu03 = d3.select("#viscontainer-kozmu03").node().getBoundingClientRect().width/1.2,
	maxRadius_kozmu03 = (Math.min(width_kozmu03, height_kozmu03) / 2) - 60;

var formatNumber_kozmu03 = d3.format(',d');

var x_kozmu03 = d3.scaleLinear()
	.range([0, 2 * Math.PI])
	.clamp(true);

var y_kozmu03 = d3.scaleLinear()
	.range([maxRadius_kozmu03*0.4, maxRadius_kozmu03]);

var color_kozmu03 = d3.scaleOrdinal(["#888B8D","#43B02A","#385988", "#00AFD7","#A4343A","#FF671F","#fff", "#C4D600"]);

var partition_kozmu03 = d3.partition();

var arc_kozmu03 = d3.arc()
	.startAngle(d => x_kozmu03(d.x0))
	.endAngle(d => x_kozmu03(d.x1))
	.innerRadius(d => Math.max(0, y_kozmu03(d.y0)))
	.outerRadius(d => Math.max(0, y_kozmu03(d.y1)));

var middleArcLine_kozmu03 = d => {
	var halfPi_kozmu03 = Math.PI/2;
	var angles_kozmu03 = [x_kozmu03(d.x0) - halfPi_kozmu03, x_kozmu03(d.x1) - halfPi_kozmu03];
	var r_kozmu03 = Math.max(0, (y_kozmu03(d.y0) + y_kozmu03(d.y1)) / 2);

	var middleAngle_kozmu03 = (angles_kozmu03[1] + angles_kozmu03[0]) / 2;
	var invertDirection_kozmu03 = middleAngle_kozmu03 > 0 && middleAngle_kozmu03 < Math.PI;
	if (invertDirection_kozmu03) { angles_kozmu03.reverse(); }

	var path_kozmu03 = d3.path();
	path_kozmu03.arc(0, 0, r_kozmu03, angles_kozmu03[0], angles_kozmu03[1], invertDirection_kozmu03);
	return path_kozmu03.toString();
};

var textFits_kozmu03 = d => {
	var CHAR_SPACE_kozmu03 = 6;
	var deltaAngle_kozmu03 = x_kozmu03(d.x1) - x_kozmu03(d.x0);
	var r_kozmu03 = Math.max(0, (y_kozmu03(d.y0) + y_kozmu03(d.y1)) / 2);
	var perimeter_kozmu03 = r_kozmu03 * deltaAngle_kozmu03;
	return d.data.name.length * CHAR_SPACE_kozmu03 < perimeter_kozmu03;
};

var svg_kozmu03 = d3.select('#viscontainer-kozmu03').append('svg')
	.attr("id", "svg_kozmu03")
	.style('width', width_kozmu03)
	.style('height', height_kozmu03)
	.attr('viewBox', `${-width_kozmu03/2} ${-height_kozmu03/2 } ${width_kozmu03} ${height_kozmu03}`)
	.on('click', () => focusOn());

svg_kozmu03.append('text')
	.attr("class", "cim_kozmu03")
	.attr("x", 0)
	.attr("y", (maxRadius_kozmu03 * -1) - 20)
	.attr("text-anchor", "middle")
	.text("90 napon túli késedelmes hitelek (volumen)");

svg_kozmu03.append('text')
	.attr("class", "kozmu03_forras")
	.attr("x", 0)
	.attr("y", (-maxRadius_kozmu03 * -1) + 20)
	.attr("text-anchor", "middle")
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

svg_kozmu03.append('text')
	.attr("class", "labjegyzet_kozmu03")
	.attr("x", 0)
	.attr("y", (-maxRadius_kozmu03 * -1) + 40)
	.attr("text-anchor", "middle")
	.text("Lábjegyzet: A körívekre kattintva be-, a fehér körre kattintva kizoomolhat.");


svg_kozmu03.append('text')
	.attr("class", "labjegyzet_kozmu03")
	.attr("x", 0)
	.attr("y", (-maxRadius_kozmu03 * -1) + 55)
	.attr("text-anchor", "middle")
	.text("A háttérre kattintva a vizualizáció alaphelyzetbe hozható.");


d3.json('../../data/04_eladosodas/04_kozmu03.json', (error, root) => {
	if (error) throw error;

	root_kozmu03 = d3.hierarchy(root);
	root_kozmu03.sum(d => d.value);

	var slice_kozmu03 = svg_kozmu03.selectAll('g.slice')
	.data(partition_kozmu03(root_kozmu03).descendants());

	slice_kozmu03.exit().remove();

	var tooltip_kozmu03 = d3.select("#viscontainer-kozmu03")
	.append("div")
	.attr("class", "tooltip_kozmu03")
	.style("visibility", "hidden");

	var newSlice_kozmu03 = slice_kozmu03.enter()
	.append('g').attr('class', 'slice')
	.on('click', d => {
		d3.event.stopPropagation();
		focusOn(d);
	})

	.on("mousemove", function (d) {
		tooltip_kozmu03
			.style("visibility", "visible")
			.style("left", d3.mouse(this)[0] + 280 + "px")
			.style("top", d3.mouse(this)[1] + 200  + "px")
			.style("display", "inline")
			.html(d.data.name + '\n' + formatNumber_kozmu03(d.value));
	})
	.on("mouseout", function (d) {
		tooltip_kozmu03.style("display", "none");
	});

	newSlice_kozmu03.append('path')
		.attr('class', 'main-arc')
		.style('fill', d => color_kozmu03((d.children ? d : d.parent).data.name))
		.attr('d', arc_kozmu03);

	newSlice_kozmu03.append('path')
		.attr('class', 'hidden-arc')
		.attr('id', (_, i) => `hiddenArc${i}`)
		.attr('d', middleArcLine_kozmu03);

	var text_kozmu03 = newSlice_kozmu03.append('text')
	.attr("class", "all_text");

	svg_kozmu03.selectAll(".all_text")
		.attr('display', d => textFits_kozmu03(d) ? null : 'none');

	text_kozmu03.append('textPath')
		.attr('startOffset','50%')
		.attr('xlink:href', (_, i) => `#hiddenArc${i}` )
		.text(d => d.data.name)
		.style('fill', 'none')
		.style('stroke', '#fff')
		.style('stroke-width', 0)
		.style('stroke-linejoin', 'round');

	text_kozmu03.append('textPath')
		.attr('startOffset','50%')
		.attr('xlink:href', (_, i) => `#hiddenArc${i}` )
		.text(d => d.data.name);

});

function focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {

	var transition_kozmu03 = svg_kozmu03.transition()
		.duration(750)
		.tween('scale', () => {
			var xd_kozmu03 = d3.interpolate(x_kozmu03.domain(), [d.x0, d.x1]),
				yd_kozmu03 = d3.interpolate(y_kozmu03.domain(), [d.y0, 1]);
			return t => { x_kozmu03.domain(xd_kozmu03(t)); y_kozmu03.domain(yd_kozmu03(t)); };
		});

	transition_kozmu03.selectAll('path.main-arc')
		.attrTween('d', d => () => arc_kozmu03(d));

	transition_kozmu03.selectAll('path.hidden-arc')
		.attrTween('d', d => () => middleArcLine_kozmu03(d));

	transition_kozmu03.selectAll('.all_text')
		.attrTween('display', d => () => textFits_kozmu03(d) ? null : 'none');

	moveStackToFront_kozmu03(d);


	function moveStackToFront_kozmu03(elD) {
		svg_kozmu03.selectAll('.slice').filter(d => d === elD)
			.each(function(d) {
			this.parentNode.appendChild(this);
			if (d.parent) { moveStackToFront_kozmu03(d.parent); }
		})
	}
}
