(function() {

    function GridSquare(x, y, hoverState) {
        this.x = x;
        this.y = y;
        this.hoverState = hoverState;
    };

    GridSquare.prototype.initialise = function() {
        
    };

    if (typeof module != 'undefined') {
        module.exports.GridSquare = GridSquare;
    }

    return GridSquare;
}());
