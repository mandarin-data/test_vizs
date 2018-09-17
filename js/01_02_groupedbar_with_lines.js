function MyTitle(){
	var margin_01_02 = {top: 20, right: 60, bottom: 40, left: 60},
		width_01_02 = d3.select("#chart_01_02").node().getBoundingClientRect().width - margin_01_02.left - margin_01_02.right,
		height_01_02 = 450 ;

	var svg_01_02_title = d3.select("#svg_01_02_title")
	.attr("width", width_01_02 + margin_01_02.left + margin_01_02.right)
	.attr("height", 30);

	svg_01_02_title.append('text')
		.attr('id', 'bar_01_02_title')
		.attr("x",  (width_01_02)/2 - 90)
		.attr("y", 27)
		.text("A jövedelmek és a lakásárak alakulása településtípusok szerint Magyarországon (2007–2017)");

}



function BarWithLines(str){

d3.select("#svg_01_02").remove();


/////////////////////////////////
////Bar properties
/////////////////////////////////
var margin_01_02 = {
        top: 20,
        right: 60,
        bottom: 40,
        left: 60
    },
	width_01_02 = d3.select("#chart_01_02").node().getBoundingClientRect().width - margin_01_02.left - margin_01_02.right,
	height_01_02 = 450 ;


var svg_01_02 = d3.select("#chart_01_02").append("svg")
	.attr("id", "svg_01_02")
    .attr("width", width_01_02 + margin_01_02.left + margin_01_02.right)
    .attr("height", height_01_02 + margin_01_02.top + margin_01_02.bottom + 20)
	.append("g")
    .attr("transform", "translate(" + margin_01_02.left + "," + margin_01_02.top + ")");

var x0_01_02 = d3.scaleBand()
    .rangeRound([0, width_01_02 - 280])
    .paddingInner(0.1);

var x1_01_02 = d3.scaleBand()
    .padding(0.05);

var y_01_02 = d3.scaleLinear()
    .rangeRound([height_01_02, 0]);

var z = d3.scaleOrdinal()	
	//.range(["#b3cccc", "#94b8b8", "#75a3a3", "#527a7a", "#334d4d", "#1f2e2e" ])
.range(["#1f2e2e","#334d4d","#527a7a","#75a3a3","#94b8b8", "#b3cccc" ])
///d3.scaleOrdinal(d3.schemeCategory20b);


/////////////////////////////////
////Line properties
/////////////////////////////////

var parseDate_0102_line = d3.timeParse("%Y");

var scaleX_0102_line = d3.scaleTime()
    .range([-15, width_01_02 - 280]);

var scaleY_0102_line = d3.scaleLinear()
    .range([height_01_02, 0]);

var color_0102_line = d3.scaleOrdinal()
    .range([ "#002266",  "#385988", "#0044cc", "#00AFD7","#334d4d" ,"#888B8D", "#006600","#43B02A", "#00cc00","#C4D600", "#FFD300" ,"#FF671F", "#cc0000" , "#A4343A", "#660000", "#000000"]);

var xAxis_0102_line = d3.axisBottom()
    .scale(scaleX_0102_line);

var yAxis_0102_line = d3.axisLeft()
    .scale(scaleY_0102_line)

var line_0102_line = d3.line()
    .x(function(d) {return scaleX_0102_line(d.year)})
    .y(function(d) {return scaleY_0102_line(d.ydata)})
    //.curve(d3.curveBasis);


/////////////////////////////////
////Show myBar
/////////////////////////////////

d3.tsv(str, function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);

  x0_01_02.domain(data.map(function(d) { return d.year; }));
  x1_01_02.domain(keys).rangeRound([0, x0_01_02.bandwidth()]);
  y_01_02.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
	
  svg_01_02.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0_01_02(d.year) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
	  .attr("id", "rect_01_02")
      .attr("x", function(d) { return x1_01_02(d.key); })
      .attr("y", function(d) { return y_01_02(d.value); })
      .attr("width", x1_01_02.bandwidth())
      .attr("height", function(d) { return height_01_02 - y_01_02(d.value); })
      .attr("fill", function(d) { return z(d.key); })
	  .attr("opacity", 0.5);

  svg_01_02.append("g")
      .attr("class", "axis_01_02")
      .attr("transform", "translate(0," + height_01_02 + ")")
      .call(d3.axisBottom(x0_01_02));

	svg_01_02.append("g")	
		.append("text")
		.attr("class", "axis_second")
		.attr("y", height_01_02 + 40)
		.attr("x",  (width_01_02 - 280)/2 )
		.attr("dy", ".23em")
		.style("text-anchor", "middle")
		.text("Év");
		
  svg_01_02.append("g")
		.attr("class", "axis_01_02")
		.call(d3.axisLeft(y_01_02).ticks(null, "s"))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - (margin_01_02.left-15))
		.attr("x", 0  - height_01_02/2 )
		.style("text-anchor", "middle")
		.style("fill", "#000000")
        .text("Egy főre eső, havi bruttó jövedelem (ezer Ft)");

	
	svg_01_02.append("g")
		.attr("class", "axis_01_02")
		.attr("transform", "translate(" + (width_01_02 - 280) + ",0)")
		.call(d3.axisRight(y_01_02).ticks(null, "s"))
	
	svg_01_02.append("g")	
		.append("text")
		.attr("class", "axis_second")
		.attr("transform", "rotate(-90)")
		.attr("y", width_01_02- 230)
		.attr("x", -height_01_02/2 )
		.attr("dy", ".23em")
		.style("text-anchor", "middle")
		.text("Lakások átlagos piaci ára (ezer Ft/négyzetméter)");


  var legend_0102_bar = svg_01_02.append("g")
    .selectAll("g")
    .data(keys.slice())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend_0102_bar.append("rect")
      .attr("x", width_01_02 - 210)
	  .attr("y", height_01_02 - 113)
      .attr("width", 15)
      .attr("height", 15)
	  .attr("opacity", 0.5)
      .attr("fill", z);

  legend_0102_bar.append("text")
	  .attr("class", "legend_01_02_bar")
	  .style("text-anchor", "start")
      .attr("x",width_01_02 - 185)
      .attr("y", height_01_02 - 105)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });	

	svg_01_02.append("g")	
		.append("text")
		.attr("class", "legend_text")
		.attr("y", height_01_02 - 123)
		.attr("x",  width_01_02 - 210 )
		.attr("dy", ".23em")
		.style("text-anchor", "start")
		.text("Jövedelem");	
	
/////////////////////////////////
////Start Linechart
/////////////////////////////////	

d3.tsv("../../data/01_hozzaferhetoseg_es_megfizethetoseg/01_02_jov_v4.tsv", type_0102_line, function (error, data_line) {
    if (error) throw error;

    var categories_0102_line = data_line.columns.slice(1).map(function (name) {
		
		dataWithNaN = data_line.map(function(d) {
            return {year: d.year, ydata: +d[name]};
        });
		
		var fltData = dataWithNaN.filter( function(d) { return !isNaN(d.ydata)});

        return {
            name: name,
            values: fltData
        };
    });
	
	scaleX_0102_line.domain(d3.extent(data_line, function(d){
	  return  d.year;
	}));
	scaleY_0102_line.domain([
		0,d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })
	  ]);
	mydata_0102_line = categories_0102_line.filter(function(d) { return d["name"] != ""; })


	
////	
svg_01_02.append('text')
	.attr("class", "barline_utasitas")
	.attr("x", 0)             
	.attr("y", height_01_02 + 40)
	.attr("text-anchor", "start")
	.text("*A jövedelmek megjelenítéséhez kattints az üres négyzetekre!")
	

	
svg_01_02.append('text')
	.attr("class", "barline_forras")
	.attr("x", width_01_02 -300)             
	.attr("y", height_01_02 + 40)
	.attr("text-anchor", "end")  
	.text("Adatok forrása: KSH 2017c")
	.on('click', function(d) {
		window.open(
			'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_zhc014a.html',
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
    
svg_01_02.append('text')
	.attr("class", "barline_forras")
	.attr("x", width_01_02 -300)             
	.attr("y", height_01_02 + 40)
	.attr("text-anchor", "start")  
	.text(", 2018b")
	.on('click', function(d) {
		window.open(
			'http://www.ksh.hu/apps/shop.kiadvany?p_kiadvany_id=1037838&p_temakor_kod=KSH&p_lang=HU',
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
    

var category_0102_line = svg_01_02.selectAll(".category")
    .data(mydata_0102_line)
    .enter().append("g")
    .attr("class", "category");
	
var id1jövedelmitized = { id1jövedelmitized: 0};	
var id2jövedelmitized = { id2jövedelmitized: 0};	
var id3jövedelmitized = { id3jövedelmitized: 0};	
var id4jövedelmitized = { id4jövedelmitized: 0};	
var id5jövedelmitized = { id5jövedelmitized: 0};	
var id6jövedelmitized = { id6jövedelmitized: 0};	
var id7jövedelmitized = { id7jövedelmitized: 0};	
var id8jövedelmitized = { id8jövedelmitized: 0};	
var id9jövedelmitized = { id9jövedelmitized: 0};	
var id10jövedelmitized = { id10jövedelmitized: 0};	
var idBudapestijövedelem = { idBudapestijövedelem : 0};
var idNagyvárosimegyeijogúvárosijövedelem = {idNagyvárosimegyeijogúvárosijövedelem : 0};
var idEgyébvárosijövedelem = {idEgyébvárosijövedelem : 0};
var idKözségijövedelem = {idKözségijövedelem : 0};
var idOrszágosjövedelem = {idOrszágosjövedelem : 0};	

var all_button = {id1jövedelmitized, id2jövedelmitized, id3jövedelmitized, id4jövedelmitized, id5jövedelmitized, id6jövedelmitized, id7jövedelmitized,  id8jövedelmitized, id9jövedelmitized,id10jövedelmitized,  idBudapestijövedelem, idNagyvárosimegyeijogúvárosijövedelem, idEgyébvárosijövedelem, idKözségijövedelem, idOrszágosjövedelem};	

var sum_values = 0;
var sum_names = [];
var sum_values2 = 0;
var legendClassArray_11 = [];
	
	
var legend_0102_line = svg_01_02.append("g")
.selectAll("g")
.data(mydata_0102_line)
.enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend_0102_line.append("text")
  .attr("class", "legend_01_02")
  .style("font-size", "13px")
  .style("text-anchor", "start")
  .attr("x", width_01_02 - 185)
  .attr("y", 20)
  .attr("dy", "0.32em")
  .text(function(d) { return  d.name; });		

svg_01_02.append("g")	
	.append("text")
	.attr("class", "legend_text")
	.attr("y", 0)
	.attr("x",  width_01_02 - 210 )
	.attr("dy", ".23em")
	.style("text-anchor", "start")
	.text("Lakásár");		
	
legend_0102_line.append("rect")
    .attr("x", width_01_02 - 210)
	  .attr("y", 11)
    .attr("width", 15)
    .attr("height", 15)
	.style("fill", "#FFFFFF")
    .style("stroke", function(d) {return color_0102_line(d.name);} )
	.attr("class", function (d) {
				legendClassArray_11.push(d['name'].replace(/\s+|[,.]+\s/g, '')); //remove spaces
				return "legend";
			})
	.attr("id", function (d, i) {
				return "id" + d['name'].replace(/\s+|[,.]+\s/g, '');
			})
	.on("mouseover",function(){
		my_value = this.id;
		for (i = 0; i < Object.keys(all_button).length; i++) {
			var tracking = Object.keys(all_button)[i];
			sum_values2 = sum_values2 + all_button[tracking][tracking];
		};
		
		if (sum_values2 < 10){
			d3.select(this).style("cursor", "pointer")
		} else if (sum_values2 === 10 & all_button[my_value][my_value] === 0) {
			d3.select(this).style("cursor", "default")
		};
		
		sum_values2 = 0;
	
})
	.on("click", function(){
		my_value = this.id;
		//1) Ha  kiválasztott értéke 0, akkor végigfutok az összes legenden, megszámolom hány 1-es van
		//2) Ha a sum_values értéke kisebbegyenlő 3, akkor a kiválasztott 1-es értéket kap és keretet
		//3) Ha a sum_values 3, akkor a többit lesöttítem, a kurzort nem kattinthatóra teszem
		//4) Elindítok egy loop-ot, ami kiírom a sum_names-be az összes 1-es értékűt
		//5) eltüntetem a korábbi vonalakat,ujrarajzolom, nullázom a futó változókat
		if (all_button[my_value][my_value] === 0) {
			for (i = 0; i < Object.keys(all_button).length; i++) {
				var tracking = Object.keys(all_button)[i];
				sum_values = sum_values + all_button[tracking][tracking];
				};
			
			if (sum_values <= 9){
					all_button[my_value][my_value] = 1;
					for (i = 0; i < Object.keys(all_button).length; i++) {
						if (all_button[my_value][my_value] === 1){
							d3.select("#" + my_value + ".legend")
									.style("fill", function(d) {return color_0102_line(d.name);} );
							
						}
					};
			};	

			sum_values = sum_values + 1;
			if (sum_values === 10){
					for (i = 0; i < Object.keys(all_button).length; i++) {
						var tracking = Object.keys(all_button)[i];
						if (all_button[tracking][tracking] === 0){
							d3.select("#" + tracking + ".legend")
									.style("opacity", 0.5)
									.style("cursor", "default");
						}
					}				
			};
						
			for (i = 0; i < Object.keys(all_button).length; i++) {
				var tracking = Object.keys(all_button)[i];
				if (all_button[tracking][tracking] === 1){
					sum_names.push(tracking);
				}
			};
			plotSingle(sum_names);
			sum_values = 0;
			sum_names = [];

			if (sum_values > 10){
				sum_values = 0
			};
		} else {
			//1) ha a kattintott értéke 1, akkor nullára változtatom
			//2) leveszem róla  keretet
			//3) kiszámolom a sum_values értékét, plusz a sum_names-t (aminek az értéke 1)
			//4) ha a sum_values kisebb, mint 3 akkor a sötétítést kiszeveszm, pointer kurzor
			//5) eltüntetem a korábbi vonalakat,ujrarajzolom, nullázom a futó változókat
			all_button[my_value][my_value] = 0;
			d3.select("#" + my_value + ".legend")
					.style("fill", "#FFFFFF");
			
			for (i = 0; i < Object.keys(all_button).length; i++) {
				var tracking = Object.keys(all_button)[i];
				sum_values = sum_values + all_button[tracking][tracking];				
				if (all_button[tracking][tracking] === 1){
					sum_names.push(tracking);
				}
			};
			if (sum_values < 10){
					for (i = 0; i < Object.keys(all_button).length; i++) {
						var tracking = Object.keys(all_button)[i];
						if (all_button[tracking][tracking] === 0){
							d3.select("#" + tracking + ".legend")
									.style("opacity", 1)
									.style("cursor", "pointer");
						}
					};
					category_0102_line.selectAll(".line").remove();
					plotSingle(sum_names);
					sum_values = 0;
					sum_names = [];
			};
						
			category_0102_line.selectAll(".line").remove();
			plotSingle(sum_names);
			sum_values = 0;
			sum_names = [];
		}
			
});

	

function plotSingle(d) {
d3.tsv("../../data/01_hozzaferhetoseg_es_megfizethetoseg/01_02_jov_v4.tsv", type_0102_line, function (error, data_line2) {
    if (error) throw error;

    var categories_0102_line2 = data_line2.columns.slice(1).map(function (name) {
		
		dataWithNaN_ps = data_line2.map(function(d) {
            return {year: d.year, ydata: +d[name]};
        });
		
		var fltData = dataWithNaN_ps.filter( function(d) { return !isNaN(d.ydata)});

        return {
            name: name,
            values: fltData
        };
    });

mydata_0102_line_ps = categories_0102_line2.filter(function(d) { return d["name"] != ""; })
filter_var = d
	
mydata_0102_line2_ps = mydata_0102_line_ps.filter(function(d) {return "id" + d['name'].replace(/\s+|[,.]+\s/g, '') == filter_var[0]; })
mydata_0102_line3_ps = mydata_0102_line_ps.filter(function(d) {return "id" + d['name'].replace(/\s+|[,.]+\s/g, '') == filter_var[1]; })
mydata_0102_line4_ps = mydata_0102_line_ps.filter(function(d) {return "id" + d['name'].replace(/\s+|[,.]+\s/g, '') == filter_var[2]; })
mydata_0102_line5_ps = mydata_0102_line_ps.filter(function(d) {return "id" + d['name'].replace(/\s+|[,.]+\s/g, '') == filter_var[3]; })
mydata_0102_line6_ps = mydata_0102_line_ps.filter(function(d) {return "id" + d['name'].replace(/\s+|[,.]+\s/g, '') == filter_var[4]; })
mydata_0102_line7_ps = mydata_0102_line_ps.filter(function(d) {return "id" + d['name'].replace(/\s+|[,.]+\s/g, '') == filter_var[5]; })	
mydata_0102_line8_ps = mydata_0102_line_ps.filter(function(d) {return "id" + d['name'].replace(/\s+|[,.]+\s/g, '') == filter_var[6]; })
mydata_0102_line9_ps = mydata_0102_line_ps.filter(function(d) {return "id" + d['name'].replace(/\s+|[,.]+\s/g, '') == filter_var[7]; })
mydata_0102_line10_ps = mydata_0102_line_ps.filter(function(d) {return "id" + d['name'].replace(/\s+|[,.]+\s/g, '') == filter_var[8]; })
mydata_0102_line11_ps = mydata_0102_line_ps.filter(function(d) {return "id" + d['name'].replace(/\s+|[,.]+\s/g, '') == filter_var[9]; })	
	
category_0102_line.append("path")
	.data(mydata_0102_line2_ps)
    .attr("class", "line")
    .attr("d", function(d) {return line_0102_line(d.values)   ;} )
    .style("stroke", function(d) {return color_0102_line(d.name)} )
		.style("stroke-width", "1.5px");	

category_0102_line.append("path")
	.data(mydata_0102_line3_ps)
    .attr("class", "line")
    .attr("d", function(d) {return line_0102_line(d.values)   ;} )
    .style("stroke", function(d) {return color_0102_line(d.name)} )
		.style("stroke-width", "1.5px");	

category_0102_line.append("path")
	.data(mydata_0102_line4_ps)
    .attr("class", "line")
    .attr("d", function(d) {return line_0102_line(d.values)   ;} )
    .style("stroke", function(d) {return color_0102_line(d.name)} )
	.style("stroke-width", "1.5px");	

category_0102_line.append("path")
	.data(mydata_0102_line5_ps)
    .attr("class", "line")
    .attr("d", function(d) {return line_0102_line(d.values)   ;} )
    .style("stroke", function(d) {return color_0102_line(d.name)} )
	.style("stroke-width", "1.5px");	
		
category_0102_line.append("path")
	.data(mydata_0102_line6_ps)
    .attr("class", "line")
    .attr("d", function(d) {return line_0102_line(d.values)   ;} )
    .style("stroke", function(d) {return color_0102_line(d.name)} )
	.style("stroke-width", "1.5px");		

category_0102_line.append("path")
	.data(mydata_0102_line7_ps)
    .attr("class", "line")
    .attr("d", function(d) {return line_0102_line(d.values)   ;} )
    .style("stroke", function(d) {return color_0102_line(d.name)} )
	.style("stroke-width", "1.5px");		

category_0102_line.append("path")
	.data(mydata_0102_line8_ps)
    .attr("class", "line")
    .attr("d", function(d) {return line_0102_line(d.values)   ;} )
    .style("stroke", function(d) {return color_0102_line(d.name)} )
	.style("stroke-width", "1.5px");	

category_0102_line.append("path")
	.data(mydata_0102_line9_ps)
    .attr("class", "line")
    .attr("d", function(d) {return line_0102_line(d.values)   ;} )
    .style("stroke", function(d) {return color_0102_line(d.name)} )
	.style("stroke-width", "1.5px");	
		
category_0102_line.append("path")
	.data(mydata_0102_line10_ps)
    .attr("class", "line")
    .attr("d", function(d) {return line_0102_line(d.values)   ;} )
    .style("stroke", function(d) {return color_0102_line(d.name)} )
	.style("stroke-width", "1.5px");		

category_0102_line.append("path")
	.data(mydata_0102_line11_ps)
    .attr("class", "line")
    .attr("d", function(d) {return line_0102_line(d.values)   ;} )
    .style("stroke", function(d) {return color_0102_line(d.name)} )
	.style("stroke-width", "1.5px");		
	
});			
}



		

});
    
function type_0102_line(d, _, columns) {
    d.year = parseDate_0102_line(d.year);
    for (var i_0102_line = 1, n = columns.length, c; i_0102_line < n; ++i_0102_line) d[c = columns[i_0102_line]] = +d[c];
    return d;
}
	
	
	
	
	
/////////////////////////////////
////Bar finisher
/////////////////////////////////	
	
});
	
}