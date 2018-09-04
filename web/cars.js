d3.csv('cars.csv').then(function(data) {
    var numeric = ['cylinders','displacement (cc)','power (hp)','weight (lb)','0-60 mph (s)','year'];
    data.forEach(function(d) {
        numeric.forEach(function(f) {
            d[f] = +d[f];
        });
    });

    var cf = crossfilter(data);
    var economyDim = cf.dimension(d => d['economy (mpg)']);

    var par = dc_parcoords.parallelCoords('#parcoords');
    par
        .width(600)
        .height(300)
        .dimensions([economyDim]);

    var yearDim = cf.dimension(d => d.year),
        yearWeightGroup = yearDim.group().reduceSum(d => d['weight (lb)']);

    var pie = dc.pieChart('#pie');
    pie
        .width(250)
        .height(250)
        .dimension(yearDim)
        .group(yearWeightGroup);

    dc.renderAll();
});
