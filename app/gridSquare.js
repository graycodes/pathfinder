var wrapper = function() {

    var TYPES = ['empty', 'ends', 'wall', 'path'];
        
    function GridSquare(x, y, context, window, squareSize) {
        this.x = x;
        this.y = y;
        this.ctx = context;
        this.type = 0;
        this.size = squareSize;// width and height in px.
        this.hovering = false;
        this.parsed = false;
        this.from = {};

        window.events.on('hover', this.unhover.bind(this));

        this.draw();
    };

    GridSquare.prototype.draw = function() {
        this.setStyle(this.type, this.hovering);
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

    GridSquare.prototype.setStyle = function(type, hover) {
        
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = (hover ? '#bff' : '#666');

        switch (type) {
        case 0:
            this.ctx.fillStyle = "#f9f9f9";
            break;
        case 1:
            this.ctx.fillStyle = "#bff";
            break;
        case 2:
            this.ctx.fillStyle = "#666";
            break;
        case 3:
            this.ctx.fillStyle = "#0cd";
            break;
        default:
            this.ctx.fillStyle = "#ff0";
        }
    };

    GridSquare.prototype.setType = function(type) {
        this.type = type;
        this.setStyle(this.type, this.hovering);
        this.render();
    };

    GridSquare.prototype.hover = function() {
        this.hovering = true;
        this.setStyle(this.type, this.hovering);
        this.render();
    };

    GridSquare.prototype.unhover = function() {
        if (this.hovering) {
            this.hovering = false;
            this.draw();
        }
    };

    GridSquare.prototype.setWall = function() {
        if (this.type === 2) { // Wall
            this.type = 0;
        } else if (this.type !== 1) {
            this.type = 2;
        }

        this.draw();
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
