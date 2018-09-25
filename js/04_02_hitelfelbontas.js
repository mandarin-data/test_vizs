
if (d3.select("#chart-treemap").node().getBoundingClientRect().width < 450){
    var abs_width_treemap = 450
} else {
    if (d3.select("#chart-treemap").node().getBoundingClientRect().width < 1200){

               var abs_width_treemap = d3.select("#chart-treemap").node().getBoundingClientRect().width

    } else {
      var abs_width_treemap = 1200
    }
}


function MyTitle(){

    var width_treemap = abs_width_treemap
    var margin_kozmu_p2 = {top: 30, right: 10, bottom: 20, left: 0},
        width_kozmu_p2 = width_treemap ,
        height_kozmu_p2 = 600 - margin_kozmu_p2.top - margin_kozmu_p2.bottom,
        formatNumber_kozmu_p2 = d3.format(",");


	var svg_treemap_title = d3.select("#svg_treemap_title")
	.attr("width", width_kozmu_p2 + margin_kozmu_p2.left + margin_kozmu_p2.right)
	.attr("height", 30);

	svg_treemap_title.append('text')
		.attr('id', 'treemap_title')
		.attr("x",  (width_kozmu_p2)/2 )
		.attr("y", 15)
        .attr("font-size", 	"19px")
		.text("A háztartások hitelállománya");
};




function Mytreemap(str) {
    d3.select("#vis-treemap").remove();
    var width_treemap = abs_width_treemap
    var margin_kozmu_p2 = {top: 30, right: 0, bottom: 0, left: 0},
        width_kozmu_p2 = width_treemap ,
        height_kozmu_p2 = 600 - margin_kozmu_p2.top - margin_kozmu_p2.bottom,
        formatNumber_kozmu_p2 = d3.format(","),
        transitioning;



    // sets x and y scale to determine size of visible boxes
    var x_kozmu_p2 = d3.scaleLinear()
        .domain([0, width_kozmu_p2])
        .range([0, width_kozmu_p2]);

    var y_kozmu_p2 = d3.scaleLinear()
        .domain([0, height_kozmu_p2])
        .range([0, height_kozmu_p2]);

    var treemap_kozmu_p2 = d3.treemap()
            .size([width_kozmu_p2, height_kozmu_p2])
            .paddingInner(0)
            .round(false);

    var svg_treemap = d3.select("#chart-treemap").append("svg")
        .attr("id", "vis-treemap")
        .attr("width", width_kozmu_p2 + margin_kozmu_p2.left + margin_kozmu_p2.right)
        .attr("height", height_kozmu_p2 + margin_kozmu_p2.bottom + margin_kozmu_p2.top)
        .style("margin_kozmu_p2-left", -margin_kozmu_p2.left + "px")
        .style("margin_kozmu_p2.right", -margin_kozmu_p2.right + "px")
        .append("g")
            .attr("transform", "translate(" + margin_kozmu_p2.left + "," + margin_kozmu_p2.top + ")")
            .style("shape-rendering", "crispEdges");




    var grandparent = svg_treemap.append("g")
            .attr("class", "grandparent");
        grandparent.append("rect")
            .attr("y", -margin_kozmu_p2.top)
            .attr("width", width_kozmu_p2)
            .attr("height", margin_kozmu_p2.top)
            .attr("fill", '#385988');
        grandparent.append("text")
            .attr("x", 6)
            .attr("y", 6 - margin_kozmu_p2.top)
            .attr("dy", ".75em");

    d3.json(str, function(data) {
        var root_kozmu_p2 = d3.hierarchy(data);
        console.log(root_kozmu_p2);
        treemap_kozmu_p2(root_kozmu_p2
            .sum(function (d) {
                return d.value;
            })
            .sort(function (a, b) {
                return b.height - (a.height ) || b.value - (a.value )
            })
        );
        display(root_kozmu_p2);

        function display(d) {



            // write text into grandparent
            // and activate click's handler
            grandparent
                .datum(d.parent)
                .on("click", transition)
                .select("text")
                .attr("text-anchor", "end")
                .attr("x", width_kozmu_p2 - 10)
                 .attr("y", "-1.38em")
                .text(name(d));

            d3.select("#treemap_foszoveg").remove();
            grandparent.append("text")
                .attr("id", "treemap_foszoveg")
                .attr("text-anchor", "start")
                .attr("y", "-0.55em")
                .attr("x", "5px")
                .text("Az összes háztartásból...");

            // grandparent color
            grandparent
                .datum(d.parent)
                .select("rect")
                .attr("fill", function () {
                    return '#bbbbbb'
                });
            var g1 = svg_treemap.insert("g", ".grandparent")
                .datum(d)
                .attr("class", "depth");
            var g = g1.selectAll("g")
                .data(d.children)
                .enter().
                append("g");
            // add class and click handler to all g's with children
            g.filter(function (d) {
                return d.children;
            })
                .classed("children", true)
                .on("click", transition);
            g.selectAll(".child")
                .data(function (d) {
                    return d.children || [d];
                })
                .enter().append("rect")
                .attr("class", "child")
                .call(rect);
            // add title to parents
            g.append("rect")
                .attr("class", "parent")
                .call(rect)
                .append("title")
                .text(function (d){
                    return d.data.name;
                });


            /* Adding a foreign object instead of a text object, allows for text wrapping */
            g.append("foreignObject")
                .call(rect)
                .attr("class", "foreignobj")
                .append("xhtml:div")
                .attr("dy", ".75em")
                .html(function (d) {
                    return '' +
                        '<p class="title" style="font-family:NeueHaasGroteskDisp Pro, Arial, Helvetica, sans-serif;font-weight:bold;font-size:calc(10px + .3vw)"> ' + d.data.name + ":" + '</p>' +
                        '<p style="font-family:NeueHaasGroteskDisp Pro, Arial, Helvetica, sans-serif;font-size:calc(10px + .3vw);">' + formatNumber_kozmu_p2(d.value) + " százalék" + '</p>'


                    ;
                })
                .attr("class", "textdiv"); //textdiv class allows us to style the text easily with CSS


            function transition(d) {
                if (transitioning || !d) return;
                transitioning = true;
                var g2 = display(d),
                    t1 = g1.transition().duration(650),
                    t2 = g2.transition().duration(650);
                // Update the domain only after entering new elements.
                x_kozmu_p2.domain([d.x0, d.x1]);
                y_kozmu_p2.domain([d.y0, d.y1]);
                // Enable anti-aliasing during the transition.
                svg_treemap.style("shape-rendering", null);
                // Draw child nodes on top of parent nodes.
                svg_treemap.selectAll(".depth").sort(function (a, b) {
                    return a.depth - b.depth;
                });
                // Fade-in entering text.
                g2.selectAll("text").style("fill-opacity", 0);
                g2.selectAll("foreignObject div").style("display", "none");
                /*added*/
                // Transition to the new view.
                t1.selectAll("text").call(text).style("fill-opacity", 0);
                t2.selectAll("text").call(text).style("fill-opacity", 1);
                t1.selectAll("rect").call(rect);
                t2.selectAll("rect").call(rect);
                /* Foreign object */
                t1.selectAll(".textdiv").style("display", "none");
                /* added */
                t1.selectAll(".foreignobj").call(foreign);
                /* added */
                t2.selectAll(".textdiv").style("display", "block");
                /* added */
                t2.selectAll(".foreignobj").call(foreign);
                /* added */
                // Remove the old node when the transition is finished.
                t1.on("end.remove", function(){
                    this.remove();
                    transitioning = false;
                });
            }
            return g;


        }

        function text(text) {
            text.attr("x", function (d) {
                return x_kozmu_p2(d.x) + 6;
            })
                .attr("y", function (d) {
                    return y_kozmu_p2(d.y) + 6;
                });
        }

        function rect(rect) {
            rect
                .attr("x", function (d) {
                    return x_kozmu_p2(d.x0);
                })
                .attr("y", function (d) {
                    return y_kozmu_p2(d.y0);
                })
                .attr("width", function (d) {
                    return x_kozmu_p2(d.x1) - x_kozmu_p2(d.x0);
                })
                .attr("height", function (d) {
                    return y_kozmu_p2(d.y1) - y_kozmu_p2(d.y0);
                })
                .attr("fill", function (d) {
                    return d.data.color;
                });
        }

        function foreign(foreign) { /* added */
            foreign
                .attr("x", function (d) {
                    return x_kozmu_p2(d.x0);
                })
                .attr("y", function (d) {
                    return y_kozmu_p2(d.y0);
                })
                .attr("width", function (d) {
                    return x_kozmu_p2(d.x1) - x_kozmu_p2(d.x0);
                })
                .attr("height", function (d) {
                    return y_kozmu_p2(d.y1) - y_kozmu_p2(d.y0);
                });
        }

        function name(d) {
            return breadcrumbs(d) +
                (d.parent
                ? "Visszalépéshez kattintson ide!"
                : "Nagyításhoz kattintson a négyzetekre!");
        }

        function breadcrumbs(d) {
            var res_kozmu_p2 = "";
            var sep_kozmu_p2 = " > ";
            d.ancestors().reverse().forEach(function(i){
                res_kozmu_p2 += i.data.name + sep_kozmu_p2;
            });
            res_kozmu_p2 = " "
            return res_kozmu_p2
                ;
        }



    });
}
