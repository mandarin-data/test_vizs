// initialize map values
var width = window.innerWidth;
var height = window.innerHeight;
var f = width + height * 10; // works on desktop, laptop, probably it isn't that good on mobile
var map_06_02_svg = d3.select("#map-wit-time-slider")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
// set Mercator projection
var projection = d3.geoMercator()
    .center([19.5, 47]) // roughly the center of Hungary
    .translate([width / 2, height / 2])
    .scale(f);

var geoPath = d3.geoPath()
    .projection(projection);


var g = map_06_02_svg.append("g");
g.selectAll("path")
    .data(habitat.features)
    .enter()
    .append("path")
    .attr("fill", initialState)
    .attr("stroke", "#333")
    .attr("d", geoPath);
// set slider values
var inputValue = null;
var time = ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];

// when the input range changes update the rectangle
d3.select("#timeslide").on("input", function () {
    update(+this.value);
});

function update(value) {
    document.getElementById("range").innerHTML = time[value];
    inputValue = time[value];
    d3.selectAll("path")
        .style("fill", timeMatch);
}

// this is where we group the prices and set their color
// TODO: group prices according to the example
function timeMatch(data) {
    if (inputValue == "2007") {
        if (data.properties.time_corrected_2007_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    } else if (inputValue == "2008") {
        if (data.properties.time_corrected_2008_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    } else if (inputValue == "2009") {
        if (data.properties.time_corrected_2009_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    } else if (inputValue == "2010") {
        if (data.properties.time_corrected_2010_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    } else if (inputValue == "2011") {
        if (data.properties.y2011 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    } else if (inputValue == "2012") {
        if (data.properties.time_corrected_2012_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    } else if (inputValue == "2013") {
        if (data.properties.time_corrected_2013_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    } else if (inputValue == "2014") {
        if (data.properties.time_corrected_2010_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    } else if (inputValue == "2015") {
        if (data.properties.time_corrected_2015_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    } else if (inputValue == "2016") {
        if (data.properties.time_corrected_2016_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    } else if (inputValue == "2017") {
        if (data.properties.time_corrected_2017_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    };
}

function initialState(data) {
    if (document.getElementById("range").innerHTML == 2007) {
        if (data.time_corrected_2007_1 > 5) {
            return '#084594'
        } else {
            return '#cb181d'
        }
    };
}
