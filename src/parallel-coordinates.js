dc_parcoords.parallelCoords = function(selector, chartGroup) {
    var _chart = {}, // this object
        _parcoords, // syntagmatic parallel-coordinates object
        _root, // parent div
        _dimension; // array of crossfilter dimensions

    var _width = 400, _height = 300,
        _keyAccessor,
        _colorAccessor, _colorScale,
        _hideAxis;

    var NO;

    _chart.parcoords = function() {
        if(!_parcoords) {
            _parcoords = ParCoords()(selector);
            _parcoords.on('brush', function(d) {
                if(_dimension && _keyAccessor) {
                    if(!d || !d.length)
                        _dimension.filter(null);
                    else {
                        var keys = d.map(_keyAccessor);
                        _dimension.filter(function(k2) {
                            return keys.indexOf(k2) !== -1;
                        });
                        NO=true;
                        dc.redrawAll(chartGroup);
                        NO=false;
                    }
                }
                console.log(d);
            });
        }
        if(_dimension) {
            _parcoords
                .data(_dimension.top(Infinity));
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

    var foo;
    _chart.redraw = function() {
        if(NO) return this;
        _parcoords
            .data(_dimension.top(Infinity))
            .render();
        if(!foo)
            _parcoords.createAxes();
        else
            _parcoords.updateAxes();
        foo = true;
        return this;
    };

    _chart.dimension = function(_) {
        if(!arguments.length)
            return _dimension;
        _dimension = _;
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

    _chart.keyAccessor = function(_) {
        if(!arguments.length)
            return _keyAccessor;
        _keyAccessor = _;
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
