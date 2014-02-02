var wrapper = function() {

    var TYPES = ['empty', 'starting', 'wall', 'path'];
        
    function GridSquare(x, y, context, window) {
        this.x = x;
        this.y = y;
        this.ctx = context;
        this.type = 0;
        this.size = 40;// width and height in px.
        this.hovering = false;
        
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
        this.ctx.strokeStyle = (hover ? '#0ff' : '#666666');

        switch (type) {
        case 0:
            this.ctx.fillStyle = "#eeeeee";
            break;
        case 1:
            this.ctx.fillStyle = "#0f0";
            break;
        case 2:
            this.ctx.fillStyle = "#f00";
            break;
        case 3:
            this.ctx.fillStyle = "#00f";
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

    return GridSquare;

};

if (typeof define !== 'undefined') {
    define([], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports.GridSquare = wrapper();
    }
}
