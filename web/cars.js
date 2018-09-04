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
    var blue_to_brown = d3.scaleLinear()
            .domain([9, 50])
            .range(["steelblue", "brown"])
            .interpolate(d3.interpolateLab);
    par
        .width(600)
        .height(300)
        .dimensions([economyDim])
        .colorAccessor(d => d['economy (mpg)'])
        .colors(blue_to_brown);

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
