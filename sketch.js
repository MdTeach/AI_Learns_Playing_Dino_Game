//GAME variables
var horizon;
var obstacleSpeed;
var score;
var generation;
var obstacles = [];

//Setting our player 
var dino;
let population
const num_population = 15;
let dinos = []

//init
function setup() {
	
	//setting up
	createCanvas(600, 200);
	textAlign(CENTER);
	horizon = height - 40;
	obstacleSpeed = 6;
	 
	//Setting our player
	score = 0;
	generation = 1;
	var size = 20;

	//generate the dinos
	let dino_info = {
		x: size * 2,
		y: height - horizon,
		radius: size
	}

	//init the population
	population = new Population(num_population,dino_info)

	
	//dino = new TRex(size * 2, height - horizon, size);
	textSize(20);	
}


//updates each frame
function draw() {
	background(51);
	drawHUD();
	handleLevel(frameCount);

	//update the dinos
	population.update(horizon,getNearestBox()); 	
	
	//dino.update(horizon);
	handleObstacles();

	//reload con
	if(population.population.length === 0){
		console.log("Gen",generation+1)
		score = 0;
		obstacles = [];
		population.selection()
		generation+=1;	
	}
}

/**
* draws horizon & score
*/
function drawHUD() {
  	/* draw horizon */
	stroke(255);
	strokeWeight(1);
  	line(0, horizon, width, horizon);

	/* draw score */
	noStroke();
	text("Generation: " + generation+"  Score: " + score, width / 2, 30);

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

		if (!obstacles[i].onScreen) // if it's no longer showing
			obstacles.splice(i, 1); // delete from array
  	}
  
	//handle collosions
	population.hits(obstacles); 	
	
}


/**
* speeds game up, pushes new obstacles, & handles score
*/
function handleLevel(n) {

	// every 0.5 seconds	
	if (n % 31 === 0) { 
	var n = noise(n); // noisey

	if (n > random(0.2,0.8))
		newObstacle(n); // push new obstacle
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
	for(let collider of obstacles){
		if (collider.x < max && collider.x > minPad){
			nearestObstacle = collider
		}
	}
	return (nearestObstacle) ? [nearestObstacle.x,nearestObstacle.y] : [Infinity,0];
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


