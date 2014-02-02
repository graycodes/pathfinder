var wrapper = function() {

    var TYPES = ['empty', 'starting', 'wall', 'path'];
        
    function GridSquare(x, y, context) {
        this.x = x;
        this.y = y;
        this.ctx = context;
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = "#eeeeee";
        this.ctx.strokeStyle = "#666666";
        this.type = TYPES[0];
        this.size = 40;// width and height in px.
        
        this.render();
    };

    GridSquare.prototype.render = function() {
        this.ctx.fillRect((this.x*this.size),
                          (this.y*this.size),
                          this.size,
                          this.size);
        this.ctx.strokeRect((this.x*this.size),
                            (this.y*this.size),
                            this.size,
                            this.size);
    };

    return GridSquare;
    
};

if (typeof define !== 'undefined') {
    define([], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports.GridSquare = wrapper();
    }
}
