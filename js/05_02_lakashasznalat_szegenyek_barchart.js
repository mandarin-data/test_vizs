var svg_0502 = d3.select("#topic05-vis02"),
    margin_0502 = {
        top: 20,
        right: 20,
        bottom: 70,
        left: 40
    },
    width_0502 = +svg_0502.node().getBoundingClientRect().width - margin_0502.left - margin_0502.right,
    height_0502 = +svg_0502.node().getBoundingClientRect().height - margin_0502.top - margin_0502.bottom,
    g_0502 = svg_0502.append("g").attr("transform", "translate(" + margin_0502.left + "," + margin_0502.top + ")");

var x0_0502 = d3.scaleBand()
    .rangeRound([0, width_0502])
    .paddingInner(0.1);

var x1_0502 = d3.scaleBand()
    .padding(0.05);

var y_0502 = d3.scaleLinear()
    .rangeRound([height_0502, 0]);

var z_0502 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A"]);

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

    g_0502.append("g")
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
        });

    g_0502.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height_0502 + ")")
        .call(d3.axisBottom(x0_0502))
        .selectAll(".tick text")
        .call(wrap_0502, x0_0502.bandwidth());

    g_0502.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y_0502).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y_0502(y_0502.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("%");

    var legend_0502 = g_0502.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys_0502.slice().reverse())
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

// Source: https://gist.github.com/guypursey/f47d8cd11a8ff24854305505dbbd8c07
function wrap_0502(text, width) {
  text.each(function() {
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