var margin_0502 = {
    top: 80,
    right: 20,
    bottom: 75,
    left: 40
};

var width_0502 = d3.select("#topic05-vis02").node().getBoundingClientRect().width - margin_0502.left - margin_0502.right;
var height_0502 = d3.select("#topic05-vis02").node().getBoundingClientRect().height - margin_0502.top - margin_0502.bottom;

var x0_0502 = d3.scaleBand()
    .rangeRound([0, width_0502])
    .paddingInner(0.1);

var x1_0502 = d3.scaleBand()
    .padding(0.05);

var y_0502 = d3.scaleLinear()
    .rangeRound([height_0502, 0]);

var z_0502 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A", "#00AFD7", "#C4D600"]);

var svg_0502 = d3.select("#topic05-vis02").append("svg")
    .attr("width", width_0502 + margin_0502.left + margin_0502.right)
    .attr("height", height_0502 + margin_0502.top + margin_0502.bottom)
    .append("g")
    .attr("transform", "translate("+margin_0502.left +", "+margin_0502.top+")")

var tooltip_0502 = d3.tooltip() // returns the tooltip function
    .extent([[0,0],[width_0502,height_0502]]) // tells the tooltip how much area it has to work with
    //.tips(["value", "search(d.value, medianlist_0304)"],["Részvételi arány: ", "Medián (forint): "])
    .tips(["value"],[""])// tells the tooltip which properties to display in the tip and what to label thme
    .fontSize(13) // sets the font size for the tooltip
    .padding([8,4]) // sets the amount of padding in the tooltip rectangle
    .margin([10,10]); // set the distance H and V to keep the tooltip from the mouse pointer

d3.tsv("../../data/05_alberlet_also_szegmense/05_02_szegenyek_nagyobb_aranyban_alberletben.tsv", function (d, i, columns) {
    for (var i_0502 = 1, n = columns.length; i_0502 < n; ++i_0502) d[columns[i_0502]] = +d[columns[i_0502]];
    return d;
}, function (error, data) {
    if (error) throw error;

    var keys_0502 = data.columns.slice(1);

    x0_0502.domain(data.map(function (d) {
        return d.lakashasznalati_jogcim_2017;
    }));
    x1_0502.domain(keys_0502).rangeRound([0, x0_0502.bandwidth()]);
    y_0502.domain([0, d3.max(data, function (d) {
        return d3.max(keys_0502, function (key) {
            return d[key];
        });
    })]).nice();

    svg_0502.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {
            return "translate(" + x0_0502(d.lakashasznalati_jogcim_2017) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
            return keys_0502.map(function (key) {
                return {
                    key: key,
                    value: d[key]
                };
            });
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x1_0502(d.key);
        })
        .attr("y", function (d) {
            return y_0502(d.value);
        })
        .attr("width", x1_0502.bandwidth())
        .attr("height", function (d) {
            return height_0502 - y_0502(d.value);
        })
        .attr("fill", function (d) {
            return z_0502(d.key);
        })
        .each(tooltip_0502.events);
    
    svg_0502.call(tooltip_0502)

    svg_0502.append("g")
        .attr("class", "xaxis_0502")
        .attr("transform", "translate(0," + height_0502 + ")")
        .call(d3.axisBottom(x0_0502))
        .selectAll(".tick text")
        .call(wrap_0502, x0_0502.bandwidth());

    svg_0502.append("g")
        .attr("class", "yaxis_0502")
        .call(d3.axisLeft(y_0502).tickFormat(formatPercent_tooltip))

    var legend_0502 = svg_0502.append("g")
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys_0502.slice())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend_0502.append("rect")
        .attr("x", width_0502 - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z_0502);

    legend_0502.append("text")
        .attr("x", width_0502 - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });
    
    svg_0502.append("text")
        .attr("class", "title_0502")
        .attr("x", (width_0502 / 2))             
        .attr("y", 0 - (margin_0502.top / 2))
        .attr("text-anchor", "middle")
        .text("Lakáshasználati típusok a legalacsonyabb jövedelműek között (2017)");
    
    svg_0502.append("text")
        .attr("class", "data_source_0502")
        .attr("x", width_0502 - 80)
        .attr("y", height_0502 + 70)
        .style("text-anchor", "middle")
        .text("Adatok forrása: KSH 2018b.")
        .on('click', function(d) {
		window.open(
            'https://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_zhc019a.html'
		);
        })
        .on('mouseover', function(d){
            d3.select(this).style("cursor", "pointer"); 
        })

        .on("mouseout", function() { d3.select(this).style("cursor", "default"); })
        .on("mousemove", function(d) {
        d3.select(this).style("cursor", "pointer"); 
        });

    // Source: https://gist.github.com/guypursey/f47d8cd11a8ff24854305505dbbd8c07
    function wrap_0502(text, width) {
        text.each(function () {
            var text_0502 = d3.select(this),
                words_0502 = text_0502.text().split(/\s+/).reverse(),
                word_0502,
                line_0502 = [],
                lineNumber_0502 = 0,
                lineHeight_0502 = 1.1, // ems
                y_0502 = text_0502.attr("y"),
                dy_0502 = parseFloat(text_0502.attr("dy")),
                tspan_0502 = text_0502.text(null).append("tspan").attr("x", 0).attr("y", y_0502).attr("dy", dy_0502 + "em")
            while (word_0502 = words_0502.pop()) {
                line_0502.push(word_0502)
                tspan_0502.text(line_0502.join(" "))
                if (tspan_0502.node().getComputedTextLength() > width) {
                    line_0502.pop()
                    tspan_0502.text(line_0502.join(" "))
                    line_0502 = [word_0502]
                    tspan_0502 = text_0502.append("tspan").attr("x", 0).attr("y", y_0502).attr("dy", `${++lineNumber_0502 * lineHeight_0502 + dy_0502}em`).text(word_0502)
                }
            }
        })
    }
});
