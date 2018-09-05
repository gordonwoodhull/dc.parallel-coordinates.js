dc_parcoords.parallelCoords = function(selector, chartGroup) {
    var _parallelCoords = {}, // this object
        _parcoords, // syntagmatic parallel-coordinates object
        _root, // parent div
        _dimensions; // array of crossfilter dimensions

    var _width = 400, _height = 300,
        _colorAccessor, _colorScale;

    _parallelCoords.parcoords = function() {
        if(!_parcoords)
            _parcoords = ParCoords()(selector);
        if(_dimensions && _dimensions.length) {
            _parcoords
                .data(_dimensions[0].top(Infinity));
        }
        return _parcoords;
    };

    _parallelCoords.render = function() {
        _root = d3.select(selector);
        _root
            .style('height', _height + 'px')
            .style('width', _width + 'px')
            .classed('parcoords', true);
        var parcoords = _parallelCoords.parcoords();
        parcoords
            .width(_width)
            .height(_height);
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
        return _parallelCoords.redraw();
    };

    _parallelCoords.redraw = function() {
        _parcoords
            .data(_dimensions[0].top(Infinity))
            .render();
        return this;
    };

    _parallelCoords.dimensions = function(_) {
        if(!arguments.length)
            return _dimensions;
        _dimensions = _;
        return this;
    };

    _parallelCoords.width = function(_) {
        if(!arguments.length)
            return _width;
        _width = _;
        return this;
    };

    _parallelCoords.height = function(_) {
        if(!arguments.length)
            return _height;
        _height = _;
        return this;
    };

    _parallelCoords.colorAccessor = function(_) {
        if(!arguments.length)
            return _colorAccessor;
        _colorAccessor = _;
        return this;
    };

    _parallelCoords.colors = function(_) {
        if(!arguments.length)
            return _colorScale;
        _colorScale = _;
        return this;
    };

    dc.registerChart(_parallelCoords, chartGroup);

    return _parallelCoords;
};
