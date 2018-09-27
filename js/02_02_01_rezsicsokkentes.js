var data = [
    {
        Tized: "1",
        "Egy főre eső éves energiaköltségek": 65179,
        "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)": -16088.3986240604
    },
    {
        Tized: "2",
        "Egy főre eső éves energiaköltségek": 86691,
        "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)": -19832.6566791511
    },
    {
        Tized: "3",
        "Egy főre eső éves energiaköltségek": 96460,
        "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)": -23456.4920976439
    },
    {
        Tized: "4",
        "Egy főre eső éves energiaköltségek": 115823,
        "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)": -29469.4207506574
    },

    {
        Tized: "5",
        "Egy főre eső éves energiaköltségek": 125555,
        "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)": -32002.8898982655
    },
    {
        Tized: "6",
        "Egy főre eső éves energiaköltségek": 136803,
        "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)": -34740.7822137222
    }, {
        Tized: "7",
        "Egy főre eső éves energiaköltségek": 147818,
        "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)": -39432.3431349112
    },
    {
        Tized: "8",
        "Egy főre eső éves energiaköltségek": 166016,
        "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)": -45045.2848832576
    },
    {
        Tized: "9",
        "Egy főre eső éves energiaköltségek": 168159,
        "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)": -48450.259542593
    },
    {
        Tized: "10",
        "Egy főre eső éves energiaköltségek": 184693,
        "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)": -55388.1784205913
    }
];

var series_020201 = d3.stack()
    .keys(["Egy főre eső éves energiaköltségek", "Egy főre eső rezsicsökkentésből származó éves energiakiadás-megtakarítás (2012-höz képest)"])
    .offset(d3.stackOffsetDiverging)
    (data);

var margin_020201 = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 20
    },
    width_020201 = d3.select("#vis-020201").node().getBoundingClientRect().width - margin_020201.left - margin_020201.right,
    height_020201 = 450 - margin_020201.top - margin_020201.bottom;


var svg_020201 = d3.select("#vis-020201").append("svg")
    .attr("width", width_020201 + margin_020201.left + margin_020201.right)
    .attr("height", height_020201 + margin_020201.top + margin_020201.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_020201.left + "," + margin_020201.top + ")");

var x_020201 = d3.scaleBand()
    .domain(data.map(function (d) {
        return d.Tized;
    }))
    .rangeRound([0, width_020201 - 150])
    .padding(0.15)
.align(1);

var y_020201 = d3.scaleLinear()
    .domain([d3.min(series_020201, stackMin), d3.max(series_020201, stackMax)])
    .rangeRound([height_020201 - margin_020201.bottom, margin_020201.top]);

var z_020201 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A"]);

svg_020201.append("g")
    .selectAll("g")
    .data(series_020201)
    .enter().append("g")
    .attr("fill", function (d) {
        return z_020201(d.key);
    })
    .selectAll("rect")
    .data(function (d) {
        return d;
    })
    .enter().append("rect")
    .attr("width", x_020201.bandwidth)
    .attr("x", function (d) {
        return x_020201(d.data.Tized);
    })
    .attr("y", function (d) {
        return y_020201(d[1]);
    })
    .attr("height", function (d) {
        return y_020201(d[0]) - y_020201(d[1]);
    })
    .attr("width", x_020201.bandwidth())
    .on("mouseover", function () {
        tooltip_020201.style("display", null);
    })
    .on("mouseout", function () {
        tooltip_020201.style("display", "none");
    })
    .on("mousemove", function (d) {
        console.log(d);
        var xPosition_020201 = d3.mouse(this)[0] - 5;
        var yPosition_020201 = d3.mouse(this)[1] - 5;
        tooltip_020201.attr("transform", "translate(" + (xPosition_020201 + 15) + "," + (yPosition_020201 + 15) + ")");
        tooltip_020201.select("text").text(((d[1] - d[0])).toFixed(0));
    });

svg_020201.append("g")
    .attr("class", "axis_020201")

    .attr("transform", "translate(0," + y_020201(0) + ")")
    .call(d3.axisBottom(x_020201));

var locale = d3.formatLocale({
    decimal: "",
});

var format = locale.format(",.1f");
svg_020201.append("g")
    .attr("class", "axis_020201")

    .attr("transform", "translate(" + margin_020201.left + ",0)")
    .call(d3.axisLeft(y_020201).tickFormat(function (d) {
        if (this.parentNode.nextSibling) {
            return format(d / 10000) + " e"
        } else {
            return format(d / 10000) + " e"
        }
    }))
            .append("text")
            .attr("x", 2)
            .attr("dy", "0.32em")
            .attr("text-anchor", "start");

svg_020201.append('text')
    .attr('id', '020201_title')
    .attr('x', (width_020201 / 2 - 85))
    .attr('y', 0)
    .attr("text-anchor", "middle")
    .style("font-size", '18px')
    .text("Az energiaköltségek és a rezsicsökkentés hatása jövedelmi tizedek szerint (Ft, 2016)");


svg_020201.append("text")
    .attr("class", "020201_forras")
    .attr("x", width_020201 - 260)
    .attr("y", height_020201)
    .style("text-anchor", "middle")
    .style("font-size", '13px')
    .style('text-decoration', 'underline')
    .style('font-style', 'italic')
    .text("Adatok forrása: KSH 2018c, ")
    .on('click', function (d) {
        window.open(
            'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_zhc025a.html'
        );
    })
    .on('mouseover', function (d) {
        d3.select(this).style("cursor", "pointer");
    })

    .on("mouseout", function () {
        d3.select(this).style("cursor", "default");
    })
    .on("mousemove", function (d) {
        d3.select(this).style("cursor", "pointer");
    });

svg_020201.append("text")
    .attr("class", "020201_forras")
    .attr("x", width_020201 - 165)
    .attr("y", height_020201)
    .style("text-anchor", "middle")
    .style("font-size", '13px')
    .style('text-decoration', 'underline')
    .style('font-style', 'italic')
    .text("2018d.")
    .on('click', function (d) {
        window.open(
            'http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_zhc021a.html?down=29008'
        );
    })
    .on('mouseover', function (d) {
        d3.select(this).style("cursor", "pointer");
    })

    .on("mouseout", function () {
        d3.select(this).style("cursor", "default");
    })
    .on("mousemove", function (d) {
        d3.select(this).style("cursor", "pointer");
    });

svg_020201.append('text')
    .attr("id", "020201_ytitle")
    .attr("x", (width_020201 / 2) - 70)
    .attr("y", height_020201)
    .style("text-anchor", "middle")
    .style("font-size", '14px')
    .text("Jövedelmi tized");

// Prep the tooltip bits, initial display is hidden
var tooltip_020201 = svg_020201.append("g")
    .attr("class", "tooltip_020201")
    .style("display", "none");

tooltip_020201.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .attr("stroke", "#666")
    .attr("stroke-width", "0.5px");


tooltip_020201.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font", "sans-serif");


var legend_020201 = svg_020201.append("g")
    .attr("font-family", "NeueHaasGroteskDisp Pro")
    .attr("font-size", '13px')
    .attr("text-anchor", "start")
    .selectAll("g")
    .data(series_020201)
    .enter().append("g")
    .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
    });

legend_020201.append("rect")
    .attr("x", 50)
    .attr("y", 15)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", z_020201);

legend_020201.append("text")
    .attr("class", "legend_020201")
    .attr("x", 75)
    .attr("y", 24)
    .attr("dy", "0.32em")
    .text(function (d) {
        return d.key
    })
    .call(wrap, 400);


function stackMin(serie) {
    return d3.min(serie, function (d) {
        return d[0];
    });
}

function stackMax(serie) {
    return d3.max(serie, function (d) {
        return d[1];
    });
}

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}
