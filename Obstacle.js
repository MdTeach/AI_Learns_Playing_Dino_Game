//width + size, size, horizon, col
function Obstacle(x, size, horizon, color) {
	this.x = x;
	this.y = horizon - size;
	this.size = size;
	this.color = color;
	this.onScreen = true;
}

/**
*handle x and onScreen values
*/
Obstacle.prototype.update = function(speed) {
	/* check if offscreen */
	this.onScreen = (this.x > -this.size);

	/* movement */
	this.x -= speed;
};

Obstacle.prototype.draw = function() {
	fill(this.color);
	stroke(255);
	strokeWeight(2);
	rect(this.x, this.y, this.size, this.size);
};

