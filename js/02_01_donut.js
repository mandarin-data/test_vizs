var donut = BarChart()
d3.tsv("../../data/02_lakasminoseg_energiaszegenyseg/02_01_01_komfort_fokozat.tsv", function (error, data) {
    if (error) throw error;
    d3.select('#chart')
        .datum(data) // bind data to the div
        .call(donut); // draw chart in div
});


d3.select("select")
    .on("change", function (d) {
        var selected = d3.select("#d3-dropdown").node().value;

        var str;
        if (selected == "02_01_01_komfort_fokozat") {
            str = "../../data/02_lakasminoseg_energiaszegenyseg/02_01_01_komfort_fokozat.tsv";
        } else if (selected == "02_01_02_infra_hiany") {
            str = "../../data/02_lakasminoseg_energiaszegenyseg/02_01_02_infra_hiany.tsv";
        } else {
            str = "../../data/02_lakasminoseg_energiaszegenyseg/02_01_03_felujitas.tsv";
        }
        console.log(str)
        var donut = BarChart()
        d3.tsv(str, function (error, data) {
            if (error) throw error;
            d3.select('#chart')
                .datum(data) // bind data to the div
                .call(donut); // draw chart in div
        });
    })
