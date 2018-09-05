d3.csv('cars.csv').then(function(data) {
    var numeric = ['cylinders','displacement (cc)','power (hp)','weight (lb)','0-60 mph (s)','year'];
    data.forEach(function(d) {
        numeric.forEach(function(f) {
            d[f] = +d[f];
        });
    });

    var cf = crossfilter(data);
    var car_key = d => d.name + ' ' + d.year;
    var nameDim = cf.dimension(car_key);

    var par = dc_parcoords.parallelCoords('#parcoords');
    var blue_to_brown = d3.scaleLinear()
            .domain([9, 50])
            .range(["steelblue", "brown"])
            .interpolate(d3.interpolateLab);
    par
        .width(600)
        .height(300)
        .dimension(nameDim)
        .keyAccessor(car_key)
        .colorAccessor(d => d['economy (mpg)'])
        .colors(blue_to_brown)
        .hideAxis(['name']);

    par.parcoords().margin({top:20, left:50, right:20, bottom: 20});

    var yearDim = cf.dimension(d => d.year),
        yearWeightGroup = yearDim.group().reduceSum(d => d['weight (lb)']);

    var pie = dc.pieChart('#pie');
    pie
        .width(250)
        .height(250)
        .dimension(yearDim)
        .group(yearWeightGroup)
        .minAngleForLabel(0.01);

    var powerDim = cf.dimension(d => d['power (hp)']),
        powerAccelGroup = powerDim.group(p => Math.floor(p/25)*25).reduce(
            function(p, v) { // add
                ++p.n;
                p.tot += v['0-60 mph (s)'];
                return p;
            },
            function(p, v) { // remove
                --p.n;
                p.tot -= v['0-60 mph (s)'];
                return p;
            },
            function() {
                return {n: 0, tot: 0};
            }
        );
    var line = dc.lineChart('#line');
    line
        .width(400)
        .height(200)
        .xAxisLabel('power (hp)')
        .yAxisLabel('avg 0-60 mph (s)')
        .dimension(powerDim)
        .group(powerAccelGroup)
        .valueAccessor(kv => kv.value.n && kv.value.tot/kv.value.n)
        .x(d3.scaleLinear()).elasticX(true)
        .elasticY(true);

    dc.renderAll();

    par.parcoords()
        .brushMode('1D-axes');
});
