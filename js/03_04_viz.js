if (d3.select("#viscontainer-0304").node().getBoundingClientRect().width  > 650)
{ 
   if (d3.select("#viscontainer-0304").node().getBoundingClientRect().width  < 1200){ 
        var width_abs_0301 = d3.select("#viscontainer-0304").node().getBoundingClientRect().width ;
        } else {
         var width_abs_0301 = 1200    
        }
} else {
  var width_abs_0301 = 650 // 
};



var margin_0301 = {top: width_abs_0301/(1200/50), right: 0, bottom: width_abs_0301/(1200/70), left: width_abs_0301/(1200/50)},
	width_0301 = width_abs_0301 - margin_0301.left - margin_0301.right,
	height_0301 = 450 - margin_0301.top - margin_0301.bottom;

var x_0301 = d3.scaleBand()
.rangeRound([0, width_0301 - width_abs_0301/(1200/435)])
.paddingInner(0.4)
.align(0.8);

var y_0301 = d3.scaleLinear()
.rangeRound([height_0301, 0]);

var color_0301 = d3.scaleOrdinal()
.range(["#1F314B", "#294163", "#385988", "#007691", "#00AFD7",  "#006600","#228B22", "#43B02A","#2EC62E", "#800000", "#A4343A" , "#D52E2E",]);

   //.range([ "#002266",  "#385988", "#0044cc", "#00AFD7","#334d4d" ,"#888B8D", "#006600","#43B02A", "#00cc00","#C4D600", "#FFD300" ,"#FF671F", "#cc0000" , "#A4343A", "#660000", "#000000"]);


var xAxis_0301 = d3.axisBottom()
.scale(x_0301);

var yAxis_0301 =d3.axisLeft(y_0301)
.ticks();

var svg_0301 = d3.select("#viscontainer-0304").append("svg")
.attr("id", "myviz_0301")
.attr("width", width_0301 + margin_0301.left + margin_0301.right)
.attr("height", height_0301 + margin_0301.top + margin_0301.bottom)
.append("g")
.attr("transform", "translate(" + margin_0301.left + "," + margin_0301.top + ")");

var active_link_0301 = "0"; //to control legend selections and hover
var legendClicked_0301; //to control legend selections
var legendClassArray_0301 = []; //store legend classes to select bars in plotSingle()
var legendClassArray_0301_orig = []; //orig (with spaces)
var sortDescending_0301; //if true, bars are sorted by height in descending order
var restoreXFlag_0301 = false; //restore order of bars back to original


//disable sort checkbox
d3.select("#mycheck_0301")
	.property("disabled", true)
	.property("checked", false);


str = "../../data/03_koltsegvetes_es_intezmenyek/03_04_viz.tsv";
d3.tsv(str, function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data_0301) {
  if (error) throw error;

var dataValues_0301 = d3.values(data_0301)[0];
var columns_0301  = Object.keys(dataValues_0301);
columns_0301.shift();

color_0301.domain(d3.keys(data_0301[0]).filter(function(key) { return key !== "type"; }));

data_0301.forEach(function(d) {
	var myregion_0301 = d.type; //add to stock code

	var y0_0301 = 0;
	//d.categories_0301 = color_0301.domain().map(function(name_0301) { return {name_0301: name_0301, y0_0301: y0_0301, y1_0301: y0_0301 += +d[name_0301]}; });
	d.categories_0301 = color_0301.domain().map(function(name_0301) {
		//return { myregion_0301:myregion_0301, name_0301: name_0301, y0_0301: y0_0301, y1_0301: y0_0301 += +d[name_0301]}; });
		return {
			myregion_0301:myregion_0301,
			name_0301: name_0301,
			y0_0301: y0_0301,
			y1_0301: y0_0301 += +d[name_0301],
			value_0301: d[name_0301],
			y_corrected_0301: 0
		};
	});
	d.total_0301 = d.categories_0301[d.categories_0301.length - 1].y1_0301;
});



svg_0301.append('text')
		.attr('id', 'title_0301')
		.attr("x",  (width_0301 - width_abs_0301/(1200/435) )/2)
		.attr("y", -width_abs_0301/(1200/25))
        .attr("font-size", width_abs_0301/(1200/17))
		.text("Az állami költségvetés lakhatási célú kiadásai (milliárd Ft, 2012-2019)");
	
	
//Sort totals in descending order
data_0301.sort(function (a,b) {return d3.ascending(a.type, b.type);});
//data_0301.sort(function(a, b) { return b.total_0301 - a.total_0301; });


x_0301.domain(data_0301.map(function(d) { return d.type; }));
y_0301.domain([0, d3.max(data_0301, function (d) {
        return d.total_0301;
    })]).nice();

svg_0301.append("g")
	.attr("class", "axis_0301")
	.attr("transform", "translate(0," + height_0301 + ")")
    .attr("font-size", width_abs_0301/(1200/14))
	.call(xAxis_0301);

svg_0301.append("g")
	.attr("class", "axis_0301")
	.call(yAxis_0301)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", - width_abs_0301/(1200/35))
	.attr("x", 0  - (350/2) )
    .attr("font-size", width_abs_0301/(1200/14))    
	.style("text-anchor", "middle")
	.style("fill", "#000000")
	.text("milliárd Ft");

svg_0301.selectAll(".tick")
        .attr("font-size", width_abs_0301/(1200/14))    
    
var state_0301 = svg_0301.selectAll(".state")
.data(data_0301)
.enter().append("g")
.attr("class", "g_0301")
.attr("transform", function(d) { return "translate(" + "0" + ",0)"; })

var tooltip_0301 = svg_0301.append("g")
.attr("class", "tooltip_0301")
.attr("font-size", width_abs_0301/(1200/13))    
.style("display", "none");

tooltip_0301.append("rect")
	.attr("width", width_abs_0301/(1200/60))
	.attr("height", width_abs_0301/(1200/20))
	.attr("fill", "white")
	.attr("stroke", "#666")
	.attr("stroke-width", "0.5px");

tooltip_0301.append("text")
	.attr("x", width_abs_0301/(1200/30))
	.attr("dy", "1.2em")
	.style("text-anchor", "middle")
    .attr("font-size", width_abs_0301/(1200/13));	

//forrasok
svg_0301.append('text')
	.attr("class", "barchart_forras_0301")
	.attr("x", width_0301  - width_abs_0301/(1200/860))             
	.attr("y", height_0301 + margin_0301.bottom - width_abs_0301/(1200/30))
	.attr("text-anchor", "start")  
    .attr("font-size", width_abs_0301/(1200/13))        
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

svg_0301.append('text')
	.attr("class", "barchart_forras_0301")
	.attr("x", width_0301  - width_abs_0301/(1200/665))             
	.attr("y", height_0301 + margin_0301.bottom - width_abs_0301/(1200/30))
	.attr("text-anchor", "start")  
    .attr("font-size", width_abs_0301/(1200/13))        
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
	svg_0301.append('text')
	.attr("class", "barchart_forras_0301")
	.attr("x", width_0301  - width_abs_0301/(1200/580))             
	.attr("y", height_0301 + margin_0301.bottom - width_abs_0301/(1200/30))
	.attr("text-anchor", "start") 
    .attr("font-size", width_abs_0301/(1200/13))        
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

svg_0301.append('text')
	.attr("class", "barchart_forras_0301")
	.attr("x", width_0301  - width_abs_0301/(1200/515))             
	.attr("y", height_0301 + margin_0301.bottom - width_abs_0301/(1200/30))
	.attr("text-anchor", "start")  
    .attr("font-size", width_abs_0301/(1200/13))        
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
	
svg_0301.append('text')
	.attr("class", "barchart_forras_0301")
	.attr("x", width_0301  - width_abs_0301/(1200/860))             
	.attr("y", height_0301 + margin_0301.bottom - width_abs_0301/(1200/17))
	.attr("text-anchor", "start")  
    .attr("font-size", width_abs_0301/(1200/13))        
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
	
svg_0301.append('text')
	.attr("class", "barchart_forras_0301")
	.attr("x", width_0301  - width_abs_0301/(1200/660))             
	.attr("y", height_0301 + margin_0301.bottom - width_abs_0301/(1200/17))
	.attr("text-anchor", "start")  
    .attr("font-size", width_abs_0301/(1200/13))        
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

	
svg_0301.append('text')
	.attr("class", "barchart_forras_0301")
	.attr("x", width_0301  - width_abs_0301/(1200/860))             
	.attr("y", height_0301 + margin_0301.bottom - width_abs_0301/(1200/2))
	.attr("text-anchor", "start")  
	.text("Nyitrai 2015, ")
    .attr("font-size", width_abs_0301/(1200/13))        
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
		
svg_0301.append('text')
	.attr("class", "barchart_forras_0301")
	.attr("x", width_0301  - width_abs_0301/(1200/790))             
	.attr("y", height_0301 + margin_0301.bottom -  width_abs_0301/(1200/2))
	.attr("text-anchor", "start")  
    .attr("font-size", width_abs_0301/(1200/13))        
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


	
svg_0301.append('text')
	.attr("class", "labjegyzet_0301")
	.attr("x", 0 )             
	.attr("y", height_0301 + margin_0301.bottom - width_abs_0301/(1200/30))
	.attr("text-anchor", "start")  
    .attr("font-size", width_abs_0301/(1200/14))        
	.text("*A szaggatott vonalak becsült értéket jelölnek.")
	
	
height_diff_0301 = 0;  //height discrepancy when calculating h based on data vs y(d.y0_0301) - y(d.y1_0301)

state_0301.selectAll("rect")
	.data(function(d) {
	return d.categories_0301;
})
	.enter().append("rect")
	.attr('id', "rect_0301")
	.attr("width", x_0301.bandwidth())
	.attr("y", function(d) {
	height_diff_0301 = height_diff_0301 + y_0301(d.y0_0301) - y_0301(d.y1_0301) - (y_0301(0) - y_0301(d.value_0301));
	y_corrected_0301 = y_0301(d.y1_0301) + height_diff_0301;
	d.y_corrected_0301 = y_corrected_0301 //store in d for later use in restorePlot()
	//return y_corrected_0301;
	return y_0301(d.y1_0301); 
})
	.attr("x",function(d) { //add to stock code
	return x_0301(d.myregion_0301)
})
	.attr("height", function(d) {
	return y_0301(d.y0_0301) - y_0301(d.y1_0301); //heights calculated based on stacked values (inaccurate)
	//return y_0301(0) - y_0301(d.value_0301); //calculate height directly from value in csv file
})
	.attr("class", function(d) {
	classLabel_0301 = d.name_0301.replace(/\s+|[,.]+\s/g, '').replace(/[\(\)]/g, "").trim(); //remove spaces
	return "bars class" + classLabel_0301;
})
	.style("fill", function(d) {return color_0301(d.name_0301); })
	.attr(
		"stroke", function(d) {            // <== Add these
			  if (
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.3) ||
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.0) ||
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.5) ||
				  (d.name_0301 === "Az önkormányzati lakásállomány felújítására fordított kiadások" && d.value_0301 === 13.0) ||
				  (d.name_0301 === "Települési támogatás" && d.value_0301 === 22.0) ||	
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 28.5) ||			
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 24.7) ||				  				  
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 26.3) ||				  				  
				  (d.name_0301 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0301 === 3.7) ||			
				  (d.name_0301 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0301 === 2.7)					  
				 ) {return "#1D1D1D"}  // <== Add these
			  else { return  "none" }             // <== Add these
      ;}
	)
	.attr(
		"stroke-dasharray", function(d) {            // <== Add these
			  if (
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.3) ||
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.0) ||
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.5) ||
				  (d.name_0301 === "Az önkormányzati lakásállomány felújítására fordított kiadások" && d.value_0301 === 13.0) ||
				  (d.name_0301 === "Települési támogatás" && d.value_0301 === 22.0) ||	
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 28.5) ||			
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 24.7) ||				  				  
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 26.3) ||				  				  
				  (d.name_0301 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0301 === 3.7) ||			
				  (d.name_0301 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0301 === 2.7)					  
				 ) {return "3"}  // <== Add these
			  else { return "none" }             // <== Add these
      ;}
	)
	.attr(
		"stroke-width", function(d) {            // <== Add these
			  if (
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.3) ||
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.0) ||
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.5) ||
				  (d.name_0301 === "Az önkormányzati lakásállomány felújítására fordított kiadások" && d.value_0301 === 13.0) ||
				  (d.name_0301 === "Települési támogatás" && d.value_0301 === 22.0) ||	
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 28.5) ||			
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 24.7) ||				  				  
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 26.3) ||				  				  
				  (d.name_0301 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0301 === 3.7) ||			
				  (d.name_0301 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0301 === 2.7)					  
				 ) {return "1"}  // <== Add these
			  else { return "none" }             // <== Add these
      ;}
	)	
	.attr(
		"stroke-linecap", function(d) {            // <== Add these
			  if (
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.3) ||
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.0) ||
				  (d.name_0301 === "Hajléktalanellátás" && d.value_0301 === 8.5) ||
				  (d.name_0301 === "Az önkormányzati lakásállomány felújítására fordított kiadások" && d.value_0301 === 13.0) ||
				  (d.name_0301 === "Települési támogatás" && d.value_0301 === 22.0) ||	
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 28.5) ||			
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 24.7) ||				  				  
				  (d.name_0301 === "Egyéb kamattámogatások (pl. lakáshitelek, árfolyamgát, CSOK-hoz kapcsolódó hitel)" && d.value_0301 === 26.3) ||				  				  
				  (d.name_0301 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0301 === 3.7) ||			
				  (d.name_0301 === "Egyéb, tulajdonszerzéshez kapcsolódó vissza nem térítendő támogatások (pl. régi szocpol és hasonló formák, nemzeti otthonteremtési kedvezmény)" && d.value_0301 === 2.7)					  
				 ) {return "butt"}  // <== Add these
			  else { return "none" }             // <== Add these
      ;}
	);		
	
	
	
state_0301.selectAll("#rect_0301")
	.on("mouseover", function() { tooltip_0301.style("display", null); })
	.on("mouseout", function() { tooltip_0301.style("display", "none"); })
	.on("mousemove", function(d) {
	var delta_0301 = d.y1_0301 - d.y0_0301;
	var string_0301 = delta_0301.toFixed(1)
	var xPosition_0301 = d3.mouse(this)[0] - 25;
	var yPosition_0301 = d3.mouse(this)[1] - 30;
	tooltip_0301.attr("transform", "translate(" + xPosition_0301 + "," + yPosition_0301 + ")")
		.select("text").text(string_0301.toString().replace(".",","));
});

	
var csuszcsusz_0301 = 0
var legend_0301 = svg_0301.selectAll(".legend_0301")
.data(color_0301.domain().slice().reverse())
.enter().append("g")
.attr("class", function (d) {
	legendClassArray_0301.push(d.replace(/\s+|[,.]+\s/g, '').replace(/[\(\)]/g, "")); //remove spaces
	legendClassArray_0301_orig.push(d); //remove spaces
	return "legend_0301";
})
;

//reverse order to match order in which bars are stacked
legendClassArray_0301 = legendClassArray_0301.reverse();
legendClassArray_0301_orig = legendClassArray_0301_orig.reverse();

legend_0301.append("rect")
    .attr("y", 5)
	.attr("x", width_0301 - width_abs_0301/(1200/415))
	.attr("width", width_abs_0301/(1200/18))
	.attr("height", width_abs_0301/(1200/18))
	.style("fill", color_0301)
	.attr("transform", function(d, i) {
		var hossz_0301 = Math.ceil(((d.length)/50)-1)
		csuszcsusz_0301 = csuszcsusz_0301 + hossz_0301/2		
		var coord_0301 = i * 23 + csuszcsusz_0301*11
		csuszcsusz_0301 = csuszcsusz_0301 + hossz_0301/2	
		return "translate(0," + coord_0301 + ")"; 
		})
	.attr("id", function (d, i) {
	return "id_0301" + d.replace(/\s+|[,.]+\s/g, '').replace(/[\(\)]/g, "");
})
	.on("mouseover",function(){
	if (active_link_0301 === "0") d3.select(this).style("cursor", "pointer");
	else {
		if (active_link_0301.split("class").pop() === this.id.split("id_0301").pop()) {
			d3.select(this).style("cursor", "pointer");
		} else d3.select(this).style("cursor", "auto");
	}
})
	.on("click",function(d){

	if (active_link_0301 === "0") { //nothing selected, turn on this selection
		d3.select(this)
			.style("stroke", "black")
			.style("stroke-width", 2);
		active_link_0301 = this.id.split("id_0301").pop();
		plotSingle(this);
		//gray out the others
		for (i_0301 = 0; i_0301 < legendClassArray_0301.length; i_0301++) {
			if (legendClassArray_0301[i_0301] != active_link_0301) {
				d3.select("#id_0301" + legendClassArray_0301[i_0301])
					.style("opacity", 0.5);
			} else  sortBy_0301 = i_0301//save index for sorting in change()
		}

	} else { //deactivate
		if (active_link_0301 === this.id.split("id_0301").pop()) {//active square selected; turn it OFF
			d3.select(this)
				.style("stroke", "none");
			//restore remaining boxes to normal opacity
			for (i_0301 = 0; i_0301 < legendClassArray_0301.length; i_0301++) {
				d3.select("#id_0301" + legendClassArray_0301[i_0301])
					.style("opacity", 1);
			};



			change();

			restorePlot(d);
			active_link_0301 = "0"; //reset
		}
	} //end active_link_0301 check
});


legend_0301.append("text")
	.attr("class", "legend_0301")
    .attr("y", -76)
	.attr("x", width_0301-width_abs_0301/(1200/200))
	.attr("dy", "0.32em")
    .attr("font-size", width_abs_0301/(1200/14))
.attr("transform", function(d, i) {
		var hossz_0301 = Math.ceil(((d.length)/50)-1)
		var coord_0301 = i * 23 + csuszcsusz_0301*11
		csuszcsusz_0301 = csuszcsusz_0301 + hossz_0301	
		return "translate(0," + coord_0301 + ")"; 
		})	
	.attr("text-anchor", "start")
	.each(function (d, i) {
		newline_0301 = [];
		if (d.length < 52){
			newline_0301.push(d) 
		}else{
			  var lines_0301 = d.split(/\s+/)
			  var res_0301 = lines_0301[0]
			  res_0301 = res_0301.concat(" ")
			  for (var i = 1; i < lines_0301.length; i++){
				   res_0301 = res_0301.concat(lines_0301[i])
				  res_0301 = res_0301.concat(" ")
				   if (res_0301.length > 52){
				   newline_0301.push(res_0301)
				   res_0301 = ""
				  } else if (res_0301.length < 52 && i === (lines_0301.length)-1) {
				   newline_0301.push(res_0301)
				   res_0301 = ""					  
				  }
			   }
		}
		  for (var i = 0; i < newline_0301.length; i++) {
			d3.select(this).append("tspan")
				.attr("dy",15)
				.attr("x",function(d) { 
				   return d.children1 || d._children1 ? -10 : width_0301-width_abs_0301/(1200/380); })
				  .text(newline_0301[i])
		  }
     })
	
	
	
// restore graph after a single selection
function restorePlot(d) {
	//restore graph after a single selection
	d3.selectAll(".bars:not(.class" + class_keep_0301 + ")")
		.transition()
		.duration(1000)
		.delay(function() {
		if (restoreXFlag_0301) return 1300;
		else return 0;
	})
		.attr("width", x_0301.bandwidth()) //restore bar width
		.style("opacity", 1);

	//translate bars back up to original y-posn
	d3.selectAll(".class" + class_keep_0301)
		.attr("x", function(d) { return x_0301(d.myregion_0301); })
		.transition()
		.duration(1000)
		.delay(function () {
		if (restoreXFlag_0301) return 1300; //bars have to be restored to orig posn
		else return 0;
	})
		.attr("y", function(d) {
		return y_0301(d.y1_0301); //not exactly correct since not based on raw data value
		//return d.y_corrected_0301;
	});

	//reset
	restoreXFlag_0301 = false;
}


function plotSingle(d) {

	class_keep_0301 = d.id.split("id_0301").pop();
	idx_0301 = legendClassArray_0301.indexOf(class_keep_0301);
	//erase all but selected bars by setting opacity to 0
	d3.selectAll(".bars:not(.class" + class_keep_0301 + ")")
		.transition()
		.duration(1000)
		.attr("width", 0) // use because svg has no zindex to hide bars so can't select visible bar underneath
		.style("opacity", 0);


	var state_0301 = d3.selectAll(".g_0301");
	state_0301.nodes().forEach(function(d, i) {
		var nodes_0301 = d.childNodes;
		//get height and y posn of base bar and selected bar
		h_keep_0301 = d3.select(nodes_0301[idx_0301]).attr("height");
		y_keep_0301 = d3.select(nodes_0301[idx_0301]).attr("y");

		h_base_0301 = d3.select(nodes_0301[0]).attr("height");
		y_base_0301 = d3.select(nodes_0301[0]).attr("y");

		h_shift = h_keep_0301 - h_base_0301;
		y_new_0301 = y_base_0301 - h_shift;

		d3.select(nodes_0301[idx_0301])
		//  .transition()
		//  .ease("bounce")
		//  .duration(1000)
		//  .delay(750)
			.attr("y", y_new_0301);
	});
}


//adapted change() fn in http://bl.ocks.org/mbostock/3885705
function change() {
	data_0301.sort(function (a,b) {return d3.ascending(a.type, b.type);});


	if (this.checked) sortDescending_0301 = true;
	else sortDescending_0301 = false;

	colName_0301 = legendClassArray_0301_orig[sortBy_0301];
	var x0_0301 = x_0301.domain(data_0301.sort(sortDescending_0301
									  ? function(a, b) { return b[colName_0301] - a[colName_0301]; }
									  : function(a, b) { return d3.ascending(a.type, b.type); })
						 .map(function(d,i) { return d.type; }))
	.copy();


	state_0301.selectAll(".class" + active_link_0301)
		.sort(function(a, b) {
		return x0_0301(a.myregion_0301) - x0_0301(b.myregion_0301);
	});

	var transition = svg_0301.transition().duration(750),
		delay = function(d, i) { return i * 20; };

	//sort bars
	transition.selectAll(".class" + active_link_0301)
		.delay(delay)
		.attr("x", function(d) {
		return x0_0301(d.myregion_0301);
	});

	//sort x-labels accordingly
	transition.select(".x.axis")
		.call(xAxis_0301)
		.selectAll("g")
		.delay(delay);


	//sort x-labels accordingly
	transition.select(".axis_0301")
		.call(xAxis_0301)
		.selectAll("g")
		.delay(delay);
}		

});