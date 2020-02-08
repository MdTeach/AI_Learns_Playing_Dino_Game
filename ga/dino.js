function Dino(x, y, radius) {
	this.x = x;
	this.y = y;
	this.yVelocity = 0;
	this.speed = 1
	this.onGround = true;
	this.score = 0;
	
	// size of circle
	this.radius = radius;
	
	//init the nn
	//nearest box x & y
	this.brain = new NeuralNetwork(2,4,2)
}

/**
*handle y values/ apply gravity
*/
Dino.prototype.update = function(platform,nearestX) {
	
	if(frameCount%10===0){
		this.score++;
	}
	
	if(this.onGround){
		//jumps based on nn op
		this.jump(nearestX);
	}
	var bottom = this.y + this.radius; // bottom pixel of circle
	var nextBottom = bottom + this.yVelocity; // calculate next frame's bottom

	if (bottom <= platform && nextBottom >= platform) { // next frame will be on platform

		this.yVelocity = 0; // reset velocity
		this.y = platform - this.radius; // don't go past platform
		this.onGround = true;
	} else if (platform - bottom > 1) { // nowhere near platform

		this.yVelocity += this.speed; // increase velocity
		this.onGround = false;
	}
	/* movement */
	this.y += this.yVelocity;
};

/**
* make the dino jump
*/
Dino.prototype.jump = function(nearestX) {
	//get the op from the nn
	//set x and y of the nearest obastacle
	let nnOutput = this.brain.predict([nearestX[0],nearestX[1]])
	if(nnOutput[0]>0.5 && nnOutput[1]>0){
		//jump
		this.yVelocity = -(this.radius * 0.7)
	}; 
};

Dino.prototype.draw = function() {
	fill('#999999');
 	stroke(255);
	strokeWeight(2);
	ellipse(this.x, this.y, this.radius * 2);
};


//checking for the obstacles hit
Dino.prototype.hits = function(obstacles) {
	for (let obstacle of obstacles){

		// closest before collision
		var halfSize = obstacle.size / 2;
		var minimumDistance = halfSize + (this.radius); 

		/* find center coordinates */
		var xCenter = obstacle.x + halfSize;
		var yCenter = obstacle.y + halfSize;

		// calculate distance from centers
		var distance = dist(xCenter, yCenter, this.x, this.y);
		
		// return result
		if (distance < minimumDistance) return true; 
	}
	return false;
};

//crossover with another Dinos
Dino.prototype.crossover = function(patner){
	//make its hidden variable with of patner
	this.brain.weights_ih.data = patner.brain.weights_ih.data 
}

//mutate
Dino.prototype.mutate = function(){
	//make its hidden variable with of patner
	this.brain.mutate()
}

