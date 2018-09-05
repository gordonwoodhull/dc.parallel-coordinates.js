dc_parcoords.parallelCoords = function(selector, chartGroup) {
    var _chart = {}, // this object
        _parcoords, // syntagmatic parallel-coordinates object
        _root, // parent div
        _dimensions; // array of crossfilter dimensions

    var _width = 400, _height = 300,
        _colorAccessor, _colorScale,
        _hideAxis;

    _chart.parcoords = function() {
        if(!_parcoords)
            _parcoords = ParCoords()(selector);
        if(_dimensions && _dimensions.length) {
            _parcoords
                .data(_dimensions[0].top(Infinity));
        }
        return _parcoords;
    };

    _chart.render = function() {
        _root = d3.select(selector);
        _root
            .style('height', _height + 'px')
            .style('width', _width + 'px')
            .classed('parcoords', true);
        var parcoords = _chart.parcoords();
        parcoords
            .width(_width)
            .height(_height);
        if(_chart.hideAxis())
            parcoords.hideAxis(_chart.hideAxis());
        if(_colorAccessor) {
            if(_colorScale)
                parcoords.color(function(d) {
                    return _colorScale(_colorAccessor(d));
                });
            else
                parcoords.color(function(d) {
                    return _colorAccessor(d);
                });
        }
        return _chart.redraw();
    };

    _chart.redraw = function() {
        _parcoords
            .data(_dimensions[0].top(Infinity))
            .render();
         _parcoords.createAxes();
       return this;
    };

    _chart.dimensions = function(_) {
        if(!arguments.length)
            return _dimensions;
        _dimensions = _;
        return this;
    };

    _chart.width = function(_) {
        if(!arguments.length)
            return _width;
        _width = _;
        return this;
    };

    _chart.height = function(_) {
        if(!arguments.length)
            return _height;
        _height = _;
        return this;
    };

    _chart.colorAccessor = function(_) {
        if(!arguments.length)
            return _colorAccessor;
        _colorAccessor = _;
        return this;
    };

    _chart.colors = function(_) {
        if(!arguments.length)
            return _colorScale;
        _colorScale = _;
        return this;
    };

    _chart.hideAxis = function(_) {
        if(!arguments.length)
            return _hideAxis;
        _hideAxis = _;
        return this;
    };

    dc.registerChart(_chart, chartGroup);

    return _chart;
};
