var svg3 = d3.select("#topic02-vis03"),
    margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
    },
    width = +svg3.node().getBoundingClientRect().width - margin.left - margin.right,
    height = +svg3.attr("height") - margin.top - margin.bottom,
    g3 = svg3.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y%m%d");

var x3 = d3.scaleTime().range([0, width]),
    y3 = d3.scaleLinear().range([height, 0]),
    z3 = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function (ds) {
        return x3(ds.date);
    })
    .y(function (ds) {
        return y3(ds.arany);
    });

d3.tsv("/wp-habitat/data/02_lakasminoseg_energiaszegenyseg/02_03_01_gaz_vs_fa_idosor_arany.tsv", type, function (error, data) {
    if (error) throw error;

    var futesmodok = data.columns.slice(1).map(function (id) {
        return {
            id: id,
            values: data.map(function (ds) {
                return {
                    date: ds.date,
                    arany: ds[id]
                };
            })
        };
    });

    x3.domain(d3.extent(data, function (ds) {
        return ds.date;
    }));

    y3.domain([0, 1]);

    z3.domain(futesmodok.map(function (c) {
        return c.id;
    }));

    g3.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x3));

    g3.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y3))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("Adott fűtési módot használó háztartások aránya");

    var futesmod = g3.selectAll(".futesmod")
        .data(futesmodok)
        .enter().append("g")
        .attr("class", "futesmod");

    futesmod.append("path")
        .attr("class", "line")
        .attr("d", function (d) {
            return line(d.values);
        })
        .style("stroke", function (ds) {
            return z3(ds.id);
        });

    futesmod.append("text")
        .datum(function (ds) {
            return {
                id: ds.id,
                value: ds.values[ds.values.length - 1]
            };
        })
        .attr("transform", function (ds) {
            return "translate(" + (x3(ds.value.date) + 30) + "," + y3(ds.value.arany) + ")";
        })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "10px sans-serif")
        .text(function (ds) {
            return ds.id;
        });

    var mouseG = g3.append("g")
        .attr("class", "mouse-over-effects");
    /*
        mouseg3.append("path") // this is the black vertical line to follow mouse
          .attr("class", "mouse-line")
          .style("stroke", "black")
          .style("stroke-width", "1px")
          .style("opacity", "0");

        var lines = document.getElementsByClassName('line');

        var mousePerLine = mouseg3.selectAll('.mouse-per-line')
          .data(cities)
          .enter()
          .append("g")
          .attr("class", "mouse-per-line");

        mousePerLine.append("circle")
          .attr("r", 7)
          .style("stroke", function(d) {
            return z(d.id);
          })
          .style("fill", "none")
          .style("stroke-width", "1px")
          .style("opacity", "0");

        mousePerLine.append("text")
          .attr("transform", "translate(10,3)");

        mouseg3.append('svg3:rect') // append a rect to catch mouse movements on canvas
          .attr('width', width) // can't catch mouse events on a g element
          .attr('height', height)
          .attr('fill', 'none')
          .attr('pointer-events', 'all')
          .on('mouseout', function() { // on mouse out hide line, circles and text
            d3.select(".mouse-line")
              .style("opacity", "0");
            d3.selectAll(".mouse-per-line circle")
              .style("opacity", "0");
            d3.selectAll(".mouse-per-line text")
              .style("opacity", "0");
          })
          .on('mouseover', function() { // on mouse in show line, circles and text
            d3.select(".mouse-line")
              .style("opacity", "1");
            d3.selectAll(".mouse-per-line circle")
              .style("opacity", "1");
            d3.selectAll(".mouse-per-line text")
              .style("opacity", "1");
          })
          .on('mousemove', function() { // mouse moving over canvas
            var mouse = d3.mouse(this);
            d3.select(".mouse-line")
              .attr("d", function() {
                var d = "M" + mouse[0] + "," + height;
                d += " " + mouse[0] + "," + 0;
                return d;
              });

            d3.selectAll(".mouse-per-line")
              .attr("transform", function(d, i) {
                console.log(width/mouse[0])
                var xDate = x3.invert(mouse[0]),
                    bisect = d3.bisector(function(d) { return d.date; }).right;
                    idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = lines[i].getTotalLength(),
                    target = null;

                while (true){
                  target = Math.floor((beginning + end) / 2);
                  pos = lines[i].getPointAtLength(target);
                  if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                      break;
                  }
                  if (pos.x > mouse[0])      end = target;
                  else if (pos.x < mouse[0]) beginning = target;
                  else break; //position found
                }

                d3.select(this).select('text')../../data/02_lakasminoseg_energiaszegenyseg/
                  .text(y3.invert(pos.y).toFixed(2));

                return "translate(" + mouse[0] + "," + pos.y +")";
              });
          });*/
});

function type(ds, _, columns) {
    ds.date = parseTime(ds.date);
    for (var i = 1, n = columns.length, c; i < n; ++i) ds[c = columns[i]] = +ds[c];
    return ds;
}
