

var margin_0304 = {top: 50, right: 0, bottom: 70, left: 50},
	width_0304 = d3.select("#viscontainer-0304").node().getBoundingClientRect().width - margin_0304.left - margin_0304.right,
	height_0304 = 450 - margin_0304.top - margin_0304.bottom;

var x_0304 = d3.scaleBand()
.rangeRound([0, width_0304 - 460])
.paddingInner(0.4)
.align(0.8);

var y_0304 = d3.scaleLinear()
.rangeRound([height_0304, 0]);

var color_0304 = d3.scaleOrdinal()
.range(["#888B8D", "#002266", "#0044cc", "#385988","#00AFD7",  "#006600","#43B02A", "#00cc00","#C4D600", "#FF671F", "#cc0000" , "#A4343A",]);

   //.range([ "#002266",  "#385988", "#0044cc", "#00AFD7","#334d4d" ,"#888B8D", "#006600","#43B02A", "#00cc00","#C4D600", "#FFD300" ,"#FF671F", "#cc0000" , "#A4343A", "#660000", "#000000"]);


var xAxis_0304 = d3.axisBottom()
.scale(x_0304);

var yAxis_0304 =d3.axisLeft(y_0304)
.ticks();

var svg_0304 = d3.select("#viscontainer-0304").append("svg")
.attr("width", width_0304 + margin_0304.left + margin_0304.right)
.attr("height", height_0304 + margin_0304.top + margin_0304.bottom)
.attr("id","vis-11")
.append("g")
.attr("transform", "translate(" + margin_0304.left + "," + margin_0304.top + ")");

var active_link_0304 = "0"; //to control legend selections and hover
var legendClicked_0304; //to control legend selections
var legendClassArray_0304 = []; //store legend classes to select bars in plotSingle()
var legendClassArray_0304_orig = []; //orig (with spaces)
var sortDescending_0304; //if true, bars are sorted by height in descending order
var restoreXFlag_0304 = false; //restore order of bars back to original


//disable sort checkbox
d3.select("#mycheck_0304")
	.property("disabled", true)
	.property("checked", false);


str = "../../data/03_koltsegvetes_es_intezmenyek/03_04_viz.tsv";
d3.tsv(str, function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data_0304) {
  if (error) throw error;

var dataValues_0304 = d3.values(data_0304)[0];
var columns_0304  = Object.keys(dataValues_0304);
columns_0304.shift();

color_0304.domain(d3.keys(data_0304[0]).filter(function(key) { return key !== "type"; }));

data_0304.forEach(function(d) {
	var myregion_0304 = d.type; //add to stock code

	var y0_0304 = 0;
	//d.categories_0304 = color_0304.domain().map(function(name_0304) { return {name_0304: name_0304, y0_0304: y0_0304, y1_0304: y0_0304 += +d[name_0304]}; });
	d.categories_0304 = color_0304.domain().map(function(name_0304) {
		//return { myregion_0304:myregion_0304, name_0304: name_0304, y0_0304: y0_0304, y1_0304: y0_0304 += +d[name_0304]}; });
		return {
			myregion_0304:myregion_0304,
			name_0304: name_0304,
			y0_0304: y0_0304,
			y1_0304: y0_0304 += +d[name_0304],
			value_0304: d[name_0304],
			y_corrected: 0
		};
	});
	d.total_0304 = d.categories_0304[d.categories_0304.length - 1].y1_0304;
});

var myvar = 0;
	data_0304.forEach(function(d) {
		d.categories_0304.forEach(function(d) {
		if (d.name_0304 === "Családi otthonteremtési kedvezmény") {return myvar = 1}	;
	});
	});
	
var myvar = 0;
	data_0304.forEach(function(d) {
	});	

	

svg_0304.append('text')
		.attr('id', 'title_0304')
		.attr("x",  (width_0304 - 460 )/2)
		.attr("y", -25)
		.text("Hátralékos fogyasztók a tartozás hossza szerint (2017)");
	
	
//Sort totals in descending order
data_0304.sort(function (a,b) {return d3.ascending(a.type, b.type);});
//data_0304.sort(function(a, b) { return b.total_0304 - a.total_0304; });


x_0304.domain(data_0304.map(function(d) { return d.type; }));
y_0304.domain([0, d3.max(data_0304, function (d) {
        return d.total_0304;
    })]).nice();

svg_0304.append("g")
	.attr("class", "axis_0304")
	.attr("transform", "translate(0," + height_0304 + ")")
	.call(xAxis_0304);

svg_0304.append("g")
	.attr("class", "axis_0304")
	.call(yAxis_0304)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -35)
	.attr("x", 0  - (350/2) )
	.style("text-anchor", "middle")
	.style("fill", "#000000")
	.text("milliárd Ft");


var state_0304 = svg_0304.selectAll(".state")
.data(data_0304)
.enter().append("g")
.attr("class", "g_0304")
.attr("transform", function(d) { return "translate(" + "0" + ",0)"; })

var tooltip_0304 = svg_0304.append("g")
.attr("class", "tooltip_0304")
.style("display", "none");

tooltip_0304.append("rect")
	.attr("width", 60)
	.attr("height", 20)
	.attr("fill", "white")
	.attr("stroke", "#666")
	.attr("stroke-width", "0.5px");

tooltip_0304.append("text")
	.attr("x", 30)
	.attr("dy", "1.2em")
	.style("text-anchor", "middle")
	.attr("foínt-size", "12px")
	.attr("font", "sans-serif");	

//forrasok
svg_0304.append('text')
	.attr("class", "barchart_forras_0304")
	.attr("x", width_0304  - 860)             
	.attr("y", height_0304 + margin_0304.bottom - 35)
	.attr("text-anchor", "start")  
	.text("Adatok forrása: Andráczi-Tóth 2018,")
	.on('click', function(d) {
		window.open(
			'https://emk.semmelweis.hu/szocialis_vezetokepzes/docs/prezentaciok/Andraczi_Toth_V_szockonz2018.pdf',
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

svg_0304.append('text')
	.attr("class", "barchart_forras_0304")
	.attr("x", width_0304  - 665)             
	.attr("y", height_0304 + margin_0304.bottom - 35)
	.attr("text-anchor", "start")  
	.text(" Átol et al. 2017,")
	.on('click', function(d) {
		window.open(
			'https://habitat.hu/wp-content/uploads/2018/08/Habitat_eves_jelentes_2016_web_2.pdf',
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

	
//
	svg_0304.append('text')
	.attr("class", "barchart_forras_0304")
	.attr("x", width_0304  - 580)             
	.attr("y", height_0304 + margin_0304.bottom - 35)
	.attr("text-anchor", "start")  
	.text("KSH 2018e,")
	.on('click', function(d) {
		window.open(
			'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_fsp013.html',
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

svg_0304.append('text')
	.attr("class", "barchart_forras_0304")
	.attr("x", width_0304  - 515)             
	.attr("y", height_0304 + margin_0304.bottom - 35)
	.attr("text-anchor", "start")  
	.text(" KSH 2018f,")
	.on('click', function(d) {
		window.open(
			'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_fsp013.html',
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
	
svg_0304.append('text')
	.attr("class", "barchart_forras_0304")
	.attr("x", width_0304  - 860)             
	.attr("y", height_0304 + margin_0304.bottom - 20)
	.attr("text-anchor", "start")  
	.text(" Nemzetgazdasági Minisztérium 2016,")
	.on('click', function(d) {
		window.open(
			'http://www.parlament.hu/irom40/10377/adatok/fejezetek/42.pdf',
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
	
svg_0304.append('text')
	.attr("class", "barchart_forras_0304")
	.attr("x", width_0304  - 660)             
	.attr("y", height_0304 + margin_0304.bottom - 20)
	.attr("text-anchor", "start")  
	.text(" Nemzetgazdasági Minisztérium 2017a,")
	.on('click', function(d) {
		window.open(
			'http://www.parlament.hu/irom40/15381/15381.htm',
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

	
svg_0304.append('text')
	.attr("class", "barchart_forras_0304")
	.attr("x", width_0304  - 860)             
	.attr("y", height_0304 + margin_0304.bottom - 5)
	.attr("text-anchor", "start")  
	.text("Nyitrai 2015, ")
	.on('click', function(d) {
		window.open(
			'https://slideplayer.hu/slide/7269162/',
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
		
svg_0304.append('text')
	.attr("class", "barchart_forras_0304")
	.attr("x", width_0304  - 790)             
	.attr("y", height_0304 + margin_0304.bottom - 5)
	.attr("text-anchor", "start")  
	.text(" Pénzügyminisztérium 2018.")
	.on('click', function(d) {
		window.open(
			'http://www.parlament.hu/irom41/00503/adatok/fejezetek/42.pdf',
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


	
svg_0304.append('text')
	.attr("class", "labjegyzet_0304")
	.attr("x", 0 )             
	.attr("y", height_0304 + margin_0304.bottom - 35)
	.attr("text-anchor", "start")  
	.text("*A szaggatott vonalak becsült értéket jelölnek.")
	
	
height_diff = 0;  //height discrepancy when calculating h based on data vs y(d.y0_0304) - y(d.y1_0304)

state_0304.selectAll("rect")
	.data(function(d) {
	return d.categories_0304;
})
	.enter().append("rect")
	.attr('id', "rect_0304")
	.attr("width", x_0304.bandwidth())
	.attr("y", function(d) {
	height_diff = height_diff + y_0304(d.y0_0304) - y_0304(d.y1_0304) - (y_0304(0) - y_0304(d.value_0304));
	y_corrected = y_0304(d.y1_0304) + height_diff;
	d.y_corrected = y_corrected //store in d for later use in restorePlot()
	//return y_corrected;
	return y_0304(d.y1_0304); 
})
	.attr("x",function(d) { //add to stock code
	return x_0304(d.myregion_0304)
})
	.attr("height", function(d) {
	return y_0304(d.y0_0304) - y_0304(d.y1_0304); //heights calculated based on stacked values (inaccurate)
	//return y_0304(0) - y_0304(d.value_0304); //calculate height directly from value in csv file
})
	.attr("class", function(d) {
	classLabel_0304 = d.name_0304.replace(/\s+|[,.]+\s/g, '').replace(/[\(\)]/g, "").trim(); //remove spaces
	return "bars class" + classLabel_0304;
})
	.style("fill", function(d) {return color_0304(d.name_0304); })
	.attr(
		"stroke", function(d) {            // <== Add these
			  if (
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.3) ||
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.0) ||
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.5) ||
				  (d.name_0304 === "Az önkormányzati lakásállomány felújítására fordított kiadások" && d.value_0304 === 13.0) ||
				  (d.name_0304 === "Települési támogatás" && d.value_0304 === 22.0) ||	
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 28.5) ||			
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 24.7) ||				  				  
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 26.3) ||				  				  
				  (d.name_0304 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0304 === 3.7) ||			
				  (d.name_0304 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0304 === 2.7)					  
				 ) {return "#323232"}  // <== Add these
			  else { return  "none" }             // <== Add these
      ;}
	)
	.attr(
		"stroke-dasharray", function(d) {            // <== Add these
			  if (
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.3) ||
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.0) ||
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.5) ||
				  (d.name_0304 === "Az önkormányzati lakásállomány felújítására fordított kiadások" && d.value_0304 === 13.0) ||
				  (d.name_0304 === "Települési támogatás" && d.value_0304 === 22.0) ||	
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 28.5) ||			
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 24.7) ||				  				  
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 26.3) ||				  				  
				  (d.name_0304 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0304 === 3.7) ||			
				  (d.name_0304 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0304 === 2.7)					  
				 ) {return "3"}  // <== Add these
			  else { return "none" }             // <== Add these
      ;}
	)
	.attr(
		"stroke-width", function(d) {            // <== Add these
			  if (
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.3) ||
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.0) ||
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.5) ||
				  (d.name_0304 === "Az önkormányzati lakásállomány felújítására fordított kiadások" && d.value_0304 === 13.0) ||
				  (d.name_0304 === "Települési támogatás" && d.value_0304 === 22.0) ||	
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 28.5) ||			
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 24.7) ||				  				  
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 26.3) ||				  				  
				  (d.name_0304 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0304 === 3.7) ||			
				  (d.name_0304 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0304 === 2.7)					  
				 ) {return "1"}  // <== Add these
			  else { return "none" }             // <== Add these
      ;}
	)	
	.attr(
		"stroke-linecap", function(d) {            // <== Add these
			  if (
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.3) ||
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.0) ||
				  (d.name_0304 === "Hajléktalanellátás" && d.value_0304 === 8.5) ||
				  (d.name_0304 === "Az önkormányzati lakásállomány felújítására fordított kiadások" && d.value_0304 === 13.0) ||
				  (d.name_0304 === "Települési támogatás" && d.value_0304 === 22.0) ||	
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 28.5) ||			
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 24.7) ||				  				  
				  (d.name_0304 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0304 === 26.3) ||				  				  
				  (d.name_0304 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0304 === 3.7) ||			
				  (d.name_0304 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0304 === 2.7)					  
				 ) {return "butt"}  // <== Add these
			  else { return "none" }             // <== Add these
      ;}
	);		
	
	
	
state_0304.selectAll("#rect_0304")
	.on("mouseover", function() { tooltip_0304.style("display", null); })
	.on("mouseout", function() { tooltip_0304.style("display", "none"); })
	.on("mousemove", function(d) {
	var delta_0304 = d.y1_0304 - d.y0_0304;
	var xPosition_0304 = d3.mouse(this)[0] - 40;
	var yPosition_0304 = d3.mouse(this)[1] - 30;
	tooltip_0304.attr("transform", "translate(" + xPosition_0304 + "," + yPosition_0304 + ")")
		.select("text").text((delta_0304).toFixed(1));
});

	
var csuszcsusz_0304 = 0
var legend_0304 = svg_0304.selectAll(".legend_0304")
.data(color_0304.domain().slice().reverse())
.enter().append("g")
.attr("class", function (d) {
	legendClassArray_0304.push(d.replace(/\s+|[,.]+\s/g, '').replace(/[\(\)]/g, "")); //remove spaces
	legendClassArray_0304_orig.push(d); //remove spaces
	return "legend_0304";
})
;

//reverse order to match order in which bars are stacked
legendClassArray_0304 = legendClassArray_0304.reverse();
legendClassArray_0304_orig = legendClassArray_0304_orig.reverse();

legend_0304.append("rect")
	.attr("x", width_0304 - 440)
	.attr("y", 1)
	.attr("width", 18)
	.attr("height", 18)
	.style("fill", color_0304)
	.attr("transform", function(d, i) {
		var hossz_0304 = Math.ceil(((d.length)/50)-1)
		csuszcsusz_0304 = csuszcsusz_0304 + hossz_0304/2		
		var coord_0304 = i * 23 + csuszcsusz_0304*11
		csuszcsusz_0304 = csuszcsusz_0304 + hossz_0304/2	
		return "translate(0," + coord_0304 + ")"; 
		})
	.attr("id", function (d, i) {
	return "id_0304" + d.replace(/\s+|[,.]+\s/g, '').replace(/[\(\)]/g, "");
})
	.on("mouseover",function(){
	if (active_link_0304 === "0") d3.select(this).style("cursor", "pointer");
	else {
		if (active_link_0304.split("class").pop() === this.id.split("id_0304").pop()) {
			d3.select(this).style("cursor", "pointer");
		} else d3.select(this).style("cursor", "auto");
	}
})
	.on("click",function(d){

	if (active_link_0304 === "0") { //nothing selected, turn on this selection
		d3.select(this)
			.style("stroke", "black")
			.style("stroke-width", 2);
		active_link_0304 = this.id.split("id_0304").pop();
		plotSingle(this);
		//gray out the others
		for (i_0304 = 0; i_0304 < legendClassArray_0304.length; i_0304++) {
			if (legendClassArray_0304[i_0304] != active_link_0304) {
				d3.select("#id_0304" + legendClassArray_0304[i_0304])
					.style("opacity", 0.5);
			} else  sortBy_0304 = i_0304//save index for sorting in change()
		}

		//enable sort checkbox
			//d3.select("#mycheck_0304").property("disabled", false)
			//d3.select(".barlabel_0304").style("color", "black")
//d3.select(".myinput_large").style("opacity", "100")
		//sort the bars if checkbox is clicked
			//d3.select("#mycheck_0304").on("change", change);
	} else { //deactivate
		if (active_link_0304 === this.id.split("id_0304").pop()) {//active square selected; turn it OFF
			d3.select(this)
				.style("stroke", "none");
			//restore remaining boxes to normal opacity
			for (i_0304 = 0; i_0304 < legendClassArray_0304.length; i_0304++) {
				d3.select("#id_0304" + legendClassArray_0304[i_0304])
					.style("opacity", 1);
			};


				//if (d3.select("#mycheck_0304").property("checked")) {
				//restoreXFlag_0304 = true;
			//};

			//disable sort checkbox
			 //d3.select(".barlabel_0304")
			//	.style("color", "#FFFFFF")
			//	.select("input")
			//	.property("disabled", true)
			//	.property("checked", false);

			// d3.select(".myinput_large")
			//	.style("opacity", "0")
			//	.select("input")
			//	.property("disabled", true)
			//	.property("checked", false);

			//sort bars back to original positions if necessary
			change();

			//y translate selected category bars back to original y posn
			restorePlot(d);
			active_link_0304 = "0"; //reset
		}
	} //end active_link_0304 check
});


legend_0304.append("text")
	.attr("class", "legend_0304")
	.attr("x", width_0304-200)
	.attr("y", -74)
	.attr("dy", "0.32em")
.attr("transform", function(d, i) {
		var hossz_0304 = Math.ceil(((d.length)/50)-1)
		var coord_0304 = i * 23 + csuszcsusz_0304*11
		csuszcsusz_0304 = csuszcsusz_0304 + hossz_0304	
		return "translate(0," + coord_0304 + ")"; 
		})	
	.attr("text-anchor", "start")
	.each(function (d, i) {
		newline = [];
		if (d.length < 45){
			newline.push(d) 
		}else{
			  var lines = d.split(/\s+/)
			  var res = lines[0]
			  res = res.concat(" ")
			  for (var i = 1; i < lines.length; i++){
				   res = res.concat(lines[i])
				  res = res.concat(" ")
				   if (res.length > 45){
				   newline.push(res)
				   res = ""
				  } else if (res.length < 45 && i === (lines.length)-1) {
				   newline.push(res)
				   res = ""					  
				  }
			   }
		}
		  for (var i = 0; i < newline.length; i++) {
			d3.select(this).append("tspan")
				.attr("dy",13)
				.attr("x",function(d) { 
				   return d.children1 || d._children1 ? -10 : width_0304-405; })
				  .text(newline[i])
		  }
     })
	
	
	
// restore graph after a single selection
function restorePlot(d) {
	//restore graph after a single selection
	d3.selectAll(".bars:not(.class" + class_keep_0304 + ")")
		.transition()
		.duration(1000)
		.delay(function() {
		if (restoreXFlag_0304) return 1300;
		else return 0;
	})
		.attr("width", x_0304.bandwidth()) //restore bar width
		.style("opacity", 1);

	//translate bars back up to original y-posn
	d3.selectAll(".class" + class_keep_0304)
		.attr("x", function(d) { return x_0304(d.myregion_0304); })
		.transition()
		.duration(1000)
		.delay(function () {
		if (restoreXFlag_0304) return 1300; //bars have to be restored to orig posn
		else return 0;
	})
		.attr("y", function(d) {
		return y_0304(d.y1_0304); //not exactly correct since not based on raw data value
		//return d.y_corrected;
	});

	//reset
	restoreXFlag_0304 = false;
}


function plotSingle(d) {

	class_keep_0304 = d.id.split("id_0304").pop();
	idx_0304 = legendClassArray_0304.indexOf(class_keep_0304);
	//erase all but selected bars by setting opacity to 0
	d3.selectAll(".bars:not(.class" + class_keep_0304 + ")")
		.transition()
		.duration(1000)
		.attr("width", 0) // use because svg has no zindex to hide bars so can't select visible bar underneath
		.style("opacity", 0);


	var state_0304 = d3.selectAll(".g_0304");
	state_0304.nodes().forEach(function(d, i) {
		var nodes_0304 = d.childNodes;
		//get height and y posn of base bar and selected bar
		h_keep = d3.select(nodes_0304[idx_0304]).attr("height");
		y_keep = d3.select(nodes_0304[idx_0304]).attr("y");

		h_base = d3.select(nodes_0304[0]).attr("height");
		y_base = d3.select(nodes_0304[0]).attr("y");

		h_shift = h_keep - h_base;
		y_new = y_base - h_shift;

		d3.select(nodes_0304[idx_0304])
		//  .transition()
		//  .ease("bounce")
		//  .duration(1000)
		//  .delay(750)
			.attr("y", y_new);
	});
}


//adapted change() fn in http://bl.ocks.org/mbostock/3885705
function change() {
	data_0304.sort(function (a,b) {return d3.ascending(a.type, b.type);});


	if (this.checked) sortDescending_0304 = true;
	else sortDescending_0304 = false;

	colName_0304 = legendClassArray_0304_orig[sortBy_0304];
	var x0_0304 = x_0304.domain(data_0304.sort(sortDescending_0304
									  ? function(a, b) { return b[colName_0304] - a[colName_0304]; }
									  : function(a, b) { return d3.ascending(a.type, b.type); })
						 .map(function(d,i) { return d.type; }))
	.copy();


	state_0304.selectAll(".class" + active_link_0304)
		.sort(function(a, b) {
		return x0_0304(a.myregion_0304) - x0_0304(b.myregion_0304);
	});

	var transition = svg_0304.transition().duration(750),
		delay = function(d, i) { return i * 20; };

	//sort bars
	transition.selectAll(".class" + active_link_0304)
		.delay(delay)
		.attr("x", function(d) {
		return x0_0304(d.myregion_0304);
	});

	//sort x-labels accordingly
	transition.select(".x.axis")
		.call(xAxis_0304)
		.selectAll("g")
		.delay(delay);


	//sort x-labels accordingly
	transition.select(".axis_0304")
		.call(xAxis_0304)
		.selectAll("g")
		.delay(delay);
}		

});