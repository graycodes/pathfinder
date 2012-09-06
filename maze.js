var canvas,ctx;
var debug, debugStatusBar;
var gridSize = 9;
var squareSize = 50;//50
var gridMargin = 10;
var g = new Array();
var xPos = 0, yPos = 4;
var xEnd = 8, yEnd = 4;
var c = new Array(gridSize);
for (var x = 0;x<c.length;x++) {
	c[x] = new Array(gridSize);
}
var _parent = this;
var q = new Array();
q[0] = new Array();
q[0][0] = xPos;
q[0][1] = yPos;

function initialise() {
	debug = document.getElementById("debug");
	debugStatusBar = document.getElementById("debugStatusBar");
	canvas = document.getElementById("canvas");	
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgb(180,200,220)";
	ctx.globalAlpha = 1;
	trace("Debug:");
	for (var x=0;x<gridSize; x++) {
		g[x] = new Array();
		for (var y=0;y<gridSize; y++) {
			g[x][y] = 0;
			this["gs_"+x+"_"+y] = new gridSquare(x,y,0);
			this["gs_"+x+"_"+y].initialise();
		}
	}
	g[xPos][yPos] = 1;
	hit(xPos,yPos);
	hit(xEnd, yEnd);
}

function gridSquare(x, y, hoverState) {
	this.x = x;
	this.y = y;
	this.hoverState = hoverState;
	this.initialise = initialise;
	function initialise() {
		ctx.lineWidth = 2;
		ctx.fillStyle = "#eeeeee";
		ctx.strokeStyle = "#666666";
		ctx.fillRect((this.x*squareSize),(this.y*squareSize),squareSize,squareSize);
		ctx.strokeRect((this.x*squareSize),(this.y*squareSize),squareSize,squareSize);
	}
	this.hover = hover;
	function hover(on) {		
		if (on != this.hoverState) {
			if (on) {
				canvas.style.cursor = "pointer";
				ctx.strokeStyle = "#99bbdd";	
			} else {
				canvas.style.cursor = "";
				ctx.strokeStyle = "#666666";		
			}
			ctx.strokeRect((this.x*squareSize),(this.y*squareSize),squareSize,squareSize);
			this.hoverState = on;
		}
	}	
	this.clicked = clicked;
	function clicked() {
		g[this.x][this.y] = 2;
		ctx.strokeStyle = "#666666";
		ctx.fillStyle = "#dd0000";
		ctx.fillRect((this.x*squareSize),(this.y*squareSize),squareSize,squareSize);			
		ctx.strokeRect((this.x*squareSize),(this.y*squareSize),squareSize,squareSize);			
	}	
	this.setPath = setPath;
	function setPath() {
		ctx.strokeStyle = "#666666";
		ctx.fillStyle = "#ff77ff";
		ctx.fillRect((this.x*squareSize),(this.y*squareSize),squareSize,squareSize);			
		ctx.strokeRect((this.x*squareSize),(this.y*squareSize),squareSize,squareSize);			
	}
}

function trace(str,tabs) {
	var tab = "";
	for (var i=0;i<tabs;i++) {
		tab+="&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	debug.innerHTML += tab + str + "<br />";
}

function traceS(str) {
	debugStatusBar.innerHTML = str;
}

function hit(x,y) {
	trace("Hit: "+x+", "+y, 1);
	ctx.fillStyle = "#00ff00";
	ctx.fillRect(x*squareSize,y*squareSize,squareSize,squareSize);
	g[x][y] = 3;
}

function path() {
	var foundRoute = 0;
	var z = q.shift();
	var x = z[0];
	var y = z[1];
	//change state to processed
	g[x][y] = 4;
	
	/*ctx.fillStyle = "#ff7f00";
	ctx.fillRect(x*squareSize,y*squareSize,squareSize,squareSize);*/
	//add neighbors to queue (and save where you were);
	var order = getOrder(x,y);
	while (order.length > 0) {
		var xNew = order[0][0];
		var yNew = order[0][1];
		order.shift();
		
		if ((xNew>=0) && (yNew>=0) && (xNew<gridSize) && (yNew<gridSize)) {
			if ((g[xNew][yNew] == 0) || (g[xNew][yNew] == 3)) {
				addQ(xNew,yNew);
				c[xNew][yNew] = new Array(2);
				c[xNew][yNew] = [x,y]
				if (g[xNew][yNew] == 3) {
					foundRoute = 1;
				}			
			}
		}
	}
	
	if (foundRoute) {
		trace("Success",2);
		showRoute();
		pathShortest();
	} else if (q.length == 0) {
		trace("No route found",2);
	} else {
		path();
	}
}

function addQ(x,y) {
	var addIt = 1;
	for(i=0;i<q.length;i++) {
		if (String(q[i])==String([x,y])) {
			addIt = 0;
		}
	}
	if (addIt && x>=0 && x<gridSize && y>=0 && y<gridSize) {	
		q[q.length] = [x,y];
	}
}

function showRoute() {
	var x,y;
	z = c[xEnd][yEnd];
	x = z[0];
	y = z[1];
	while (x != -1) {
		if (c[x][y] != undefined) {
			this["gs_"+x+"_"+y].setPath();
		}
		z = c[x][y];
		if (z != undefined) {
			x = z[0];
			y = z[1];
		} else {
			x = -1;//done	
		}
	}
}

function getOrder(x,y) {
	var directions = new Array([x+1,y],[x-1,y],[x,y+1],[x,y-1]/*, [x+1,y+1], [x-1,y+1], [x-1, y-1], [x+1, y-1]*/);//diagonals mess it up
	var order = new Array();
	var dir;
	
	while(directions.length > 0) {
		dir = getDir(directions);	
		order.push(dir[0]);
	}
	return order;
}

function getDir(dirs) {
	var r = Math.floor(Math.random() * dirs.length);
	return dirs.splice(r,1);
}

function pathShortest() {//useless function to draw a line from the last square to the first along your fastest path.
	var x,y;
	z = c[xEnd][yEnd];
	x = z[0];
	y = z[1];
	ctx.strokeStyle = "#ff7f00";
	ctx.moveTo(xEnd*squareSize+(squareSize/2),yEnd*squareSize+(squareSize/2));
	while (x != -1) {
		if (c[x][y] != undefined) {
			ctx.lineTo(x*squareSize+(squareSize/2),y*squareSize+(squareSize/2));	
			trace("line: "+x+", "+y,3);		
		}
		z = c[x][y];
		if (z != undefined) {
			x = z[0];
			y = z[1];
		} else {
			x = -1;//done	
		}
	}
	ctx.lineTo(xPos*squareSize+(squareSize/2),yPos*squareSize+(squareSize/2));
	ctx.stroke();		
}

function drawLine(x,y) {
	
}
var gridX_old, gridY_old;
function ctx_mouseMove(e) {
	var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
	
	var gridX, gridY;
	gridX = Math.floor(mouseX / squareSize);
	gridY = Math.floor(mouseY / squareSize);
	traceS(gridX+","+gridY);
	if ((gridX != gridX_old) || (gridY != gridY_old)) {
		if (gridX_old!=undefined) {
			this["gs_"+gridX_old+"_"+gridY_old].hover(0);
		}
		this["gs_"+gridX+"_"+gridY].hover(1);
	}
	gridX_old = gridX || 0;
	gridY_old = gridY || 0;
}


function ctx_mouseUp(e) {
	var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
	
	var gridX, gridY;
	gridX = Math.floor(mouseX / squareSize);
	gridY = Math.floor(mouseY / squareSize);
	//g[gridX][gridY] = 2;//make a tower
	//showPath(g);
	this["gs_"+gridX+"_"+gridY].clicked();		
}
function showPath(gridArr) {
	var hitList = new Array();	
	for (var x=0;x<gridArr.length;x++) {
		for (var y=0;y<gridArr[x].length;y++) {
			if (gridArr[x][y] == 2) {
				hitList.push([x,y]);
			}
		}	
	}
	initialise();
	for (var x=0;x<hitList.length;x++) {
		this["gs_"+hitList[x][0]+"_"+hitList[x][1]].clicked();	
	}	
	path();
}