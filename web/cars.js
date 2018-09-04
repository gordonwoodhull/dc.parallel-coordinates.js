d3.csv('cars.csv').then(function(data) {
    var cf = crossfilter(data);
    var economyDim = cf.dimension(d => d['economy (mpg)']);

    var pc = dc_parcoords.parallelCoords('#parcoords')
        .width(600)
        .height(300)
        .dimensions([economyDim]);

    dc.renderAll();
});
