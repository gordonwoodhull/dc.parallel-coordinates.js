// Expose d3 and crossfilter, so that clients in browserify
// case can obtain them if they need them.
dc_parcoords.crossfilter = crossfilter;

return dc_parcoords;}
    if(typeof define === "function" && define.amd) {
        define(["dc_parcoords"], _dcpc);
    } else if(typeof module === "object" && module.exports) {
        var _dc = require('dc');
        module.exports = _dcpc(_dc);
    } else {
        this.dc_parcoords = _dcpc(dc);
    }
}
)();
