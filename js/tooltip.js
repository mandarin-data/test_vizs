d3.tooltip = function() {

    var frameOfReference,
        extent = new Array([[0,0],[960,500]]),
        tips = new Array([]),
        tipNames = new Array([]),
        tipFormats = new Array([]),
        margin = new Array([10,10]),
        padding = new Array([4,4]),
        translation = new Array([0,0]),
        tooltipDims =  new Array([0,0]),
        fontSize = new Array([]),
        format = "percent",
        visName = new Array([]);

    var tooltipGroup = d3.select(null),
        tooltipRect = d3.select(null),
        tooltipText = d3.select(null);
    
    var tooltip =  function(context) { 
 
        tooltipGroup.remove();

        frameOfReference = context.node()

        tooltipGroup = context.append("g")
            .classed("d3Tooltip",true)
            .style("display","none");

        tooltipRect = tooltipGroup.append("rect")
            .attr("width",100)
            .attr("height",100)
            .style("fill","white")
            .style("fill-opacity",.80)
            .style("stroke", "#666")
            .style("stroke-width", "0.5px")
            
        tooltipText = tooltipGroup.append("text")
            .style("fill", "black")
            .style("font-family", "NeueHaasGroteskDisp Pro, Arial, Helvetica, sans-serif")
            .style("align", "center")
            .attr("font-size", function() {
                if (d3.select(visName).node().getBoundingClientRect().width <= 500) {return (d3.select(visName).node().getBoundingClientRect().width * 0.0005 + 0.5) + "em"}
                else 	{ return "13px" }
            ;});

    };

    function displayTooltip(d) {

        tooltipGroup.style("display",null);

        tooltipText.selectAll("tspan")
            .remove();

        tooltipText.attr("y", padding[1])
            .attr("class", "tooltip_xyz")
            .selectAll("tspan")
            .data(tips)
            .enter()
            .append("tspan")
            .attr("x",padding[0])
            .attr("dy",fontSize*.9)
            .text(function(e,i) { 
                var val;
                if(e != "median" & typeof d[e] == 'undefined') {
                    val = d.data[e];
                } else {
                    if (e == "median") {
                        val = formatThousands_tooltip(search(d["value"], medianlist_0304)) + " Ft";
                    }
                    else {
                        val = d[e]; 
                    }
                }
                if(format == "percent" & e != "median"){
                    val = formatPercentDecimal_tooltip(val)
                }
                if(tipFormats[i]) {
                    val = tipFormats[i](val);
                }
                return tipNames[i]  + val;
            });

        updateTooltipDims();

        tooltipRect.attr("width", tooltipDims[0])
            .attr("height", tooltipDims[1])

        updateTranslation();

        tooltipGroup.attr("transform","translate(" + translation[0] + "," + translation[1] + ")")
            
    }

    function hideTooltip() {

        tooltipGroup.style("display","none")

    }

    
    function moveTooltip() {

        updateTranslation();
        tooltipGroup.attr("transform","translate(" + translation[0] + "," + translation[1] + ")");
    }

    tooltip.events = function() {


        var me = d3.select(this).on("mouseenter") || function() {};
        var ml = d3.select(this).on("mouseleave") || function() {};
        var mm = d3.select(this).on("mousemove") || function() {};


        d3.select(this)
            .on("mouseenter", function(d,i) { me(d,i); displayTooltip(d,i);})
            .on("mouseleave", function(d,i) { ml(d,i); hideTooltip(d,i); })
            .on("mousemove", function(d,i) { mm(d,i); moveTooltip(d,i)});

    }

    tooltip.extent = function(_extent){

        extent = _extent || extent;
        return tooltip;

    }

    tooltip.fontSize  = function(_fontSize) {
        fontSize = _fontSize || fontSize;
        return tooltip;
    }


    tooltip.margin = function(_margin) {
        margin = _margin || margin;
        return tooltip;
    }

    tooltip.padding = function(_padding) {
        padding = _padding || padding;
        return tooltip;
    }

    tooltip.tips = function(_tips,_tipNames,_tipFormats) {

        tips = _tips || tips;
        tipNames = _tipNames || tips;
        tipFormats = _tipFormats || tips.map(function(d) { return null});
        return tooltip;

    }
    
    tooltip.format = function(_format) {
        format = _format || format;
        return tooltip;
    }
    
    tooltip.visName = function(_visName) {
        visName = _visName || visName;
        return tooltip;
    }

    function updateTooltipDims() {
        var bb = tooltipText.node().getBBox();
        tooltipDims = [bb.width + padding[0]*2, bb.height + padding[1]*2];
    }

    function updateTranslation() {
        
        var mouseCoordinates = d3.mouse(frameOfReference);

        var quad = [0,0];
        
        if(mouseCoordinates[0] > (extent[1][0] - extent[0][0])/2) quad[0] = 1;
        if(mouseCoordinates[1] > (extent[1][1] - extent[0][1])/2) quad[1] = 1;

        if(quad[0] == 1) {
            translation[0] = mouseCoordinates[0] - tooltipDims[0] - margin[0];
        } else {
            translation[0] = mouseCoordinates[0] + margin[0];
        }

        if(quad[1] == 1) {
            translation[1] = mouseCoordinates[1] - tooltipDims[1] - margin[1];
        } else {
            translation[1] = mouseCoordinates[1] + margin[1];
        }
    }



    return tooltip; 
}

//Source: http://blockbuilder.org/TommyCoin80/b2dbfadc95b2b1f58b8ff307c2414a49

var locale_tooltip = {
  "decimal": ",",
  "thousands": "\u00a0",
  "grouping": [3],
  "currency": ["", "\u00a0Ft"]
};
d3.formatDefaultLocale(locale_tooltip);
var formatPercentDecimal_tooltip = d3.format(",.2%"),
    formatPercentDecimal1_tooltip = d3.format(",.1%"),
    formatPercent_tooltip = d3.format("." + (d3.precisionFixed(0.05) - 2) + "%"),
    formatThousands_tooltip = d3.format(",");

var medianlist_0304 = [
   {arany: 0.206, median: 5330000},
   {arany: 0.255, median: 3000000},
   {arany: 0.207, median: 3000000},
   {arany: 0.164, median: 3500000},
   {arany: 0.172, median: 3500000},
   {arany: 0.361, median: 500000},
   {arany: 0.295, median: 260000},
   {arany: 0.26, median: 380000},
   {arany: 0.254, median: 260000},
   {arany: 0.201, median: 400000}
];

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].arany === nameKey) {
            return myArray[i]["median"];
        }
    }
}