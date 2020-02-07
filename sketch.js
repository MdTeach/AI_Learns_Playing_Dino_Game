var horizon;
var obstacleSpeed;

var score;
var obstacles = [];

var dino;
let population
const num_population = 100;
let dinos = []

function setup() {
	
	//setting up
	createCanvas(600, 200);
	textAlign(CENTER);
	horizon = height - 40;
	score = 0;
	obstacleSpeed = 6;
	var size = 20;

	//generate the dinos
	let dino_info = {
		x: size * 2,
		y: height - horizon,
		radius: size
	}

	population = new Population(num_population,0.01,dino_info)

	
	//dino = new TRex(size * 2, height - horizon, size);
	textSize(20);	
}

function draw() {
	background(51);
	drawHUD();
	handleLevel(frameCount);

	//update the dinos
	population.update(horizon,getNearestBox()); 	
	
	//dino.update(horizon);
	handleObstacles();
}

/**
* draws horizon & score
*/
function drawHUD() {
  	/* draw horizon */
	stroke(255);
	strokeWeight(2);
  	line(0, horizon, width, horizon);

	/* draw score */
	noStroke();
  	text("Score: " + score, width / 2, 30);

	/* draw T-Rex */
	// for(let i=0;i<population;i++){
	// 	dinos[i].draw()
	// }
	population.draw()
	//dino.draw();
}

/**
*updates, draws, and cleans out the obstacles
*/
function handleObstacles() {

  for (var i = obstacles.length - 1; i >= 0; i--) {

		obstacles[i].update(obstacleSpeed);
		obstacles[i].draw();
		// if (obstacles[i].hits(dino)) // if there's a collision
		// 	endGame();

		if (!obstacles[i].onScreen) // if it's no longer showing
			obstacles.splice(i, 1); // delete from array
  }
  
	// for(let i=0;i<population;i++){
	population.hits(obstacles); 	
	// }
}


/**
* speeds game up, pushes new obstacles, & handles score
*/
function handleLevel(n) {

	// every 0.5 seconds	
	if (n % 30 === 0) { 
	var n = noise(n); // noisey

	if (n > 0.5)
		newObstacle(n); // push new obstacle
		if (n % 120 === 0) // every 2 seconds
		obstacleSpeed *= 1.05; // speed up
	}
	score++;
}

/**
* pushes random obstacle
*/
function newObstacle(n) {
	//get random color
	var col = color(random(255), random(255), random(255));
	
	//random random size
	var size = random(30) + 20;	

	//get new obs of 
	var obs = new Obstacle(width + size, size, horizon, col);
	obstacles.push(obs);
}

//get the nearest obs
function getNearestBox(){
	const minPad = 45
	let nearestObstacle;
	let max = Infinity
	for(collider of obstacles){
		if (collider.x < max && collider.x > minPad){
			nearestObstacle = collider
		}
	}
	return (nearestObstacle) ? nearestObstacle.x : width/2;
}

//Freeze the key press :D
// function keyPressed() {
// 	if ((keyCode === UP_ARROW || keyCode === 32) && dinos[0].onGround) // jump if possible
// 	for(let i=0;i<population;i++){
// 		dinos[i].jump(); 	
// 	}	
	
// }

function endGame() {
	noLoop();
	noStroke();
	textSize(40);
	text("GAME OVER", width / 2, height / 2);
	textSize(20);
	text("Press f5 to restart", width / 2, height / 2 + 20);
}


