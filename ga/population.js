class Population{
  constructor(n_size,dino){
    //to hold the current population
    this.num_populations = n_size;
    this.dino_info = dino
    
    // ArrayList which we will use for our "mating pool"
    this.matingPool; 

    // Number of generations
    this.generations = 0;

    
    //array holds the many population
    this.population = [];
    
    //fill the population with the random elements
    for (let i = 0; i < this.num_populations; i++) {
      this.population[i] = new Dino(dino.x,dino.y,dino.radius);
    }
    
    this.matingPool = [];
  }

  //update the chlids
  update(horizon,getNearestBox){
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].update(horizon,getNearestBox);
    }
  }

  //selection
  selection(){
      this.population = []
      this.rejectionSampling(this.matingPool)
      this.matingPool = []
  }

  //draw the chlid
  draw(){
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].draw();
    }
  }

  //check if it hits the obstacle
  hits(obstacles){
    let temp = []
    for (let i = 0; i < this.population.length; i++) {
      let dino = this.population[i];
      if(dino.hits(obstacles)){
        this.matingPool.push(dino)
      }else{
        temp.push(dino);
      }
    }
    this.population = temp;
  }


  //selects the two el from population with their score as probability
  //crossover and mutate them to get new one
  //add the new child to the population
  rejectionSampling(pops_given){
    //getting the max pop
    let max_score = 0
    for(let pop of pops_given){if(pop.score>max_score){max_score=pop.score}}
    console.log("Max Score:",max_score)
    for(let i=0;i<pops_given.length;i++){
      let pop1 = this.pickUpRandomly(pops_given,max_score);
      let pop2 = this.pickUpRandomly(pops_given,max_score);
      pop1.crossover(pop2)
      pop1.mutate()
      let child = new Dino(this.dino_info.x,this.dino_info.y,this.dino_info.radius)
      child.brain = pop1.brain;
      this.population.push(child)
    }
  }

  pickUpRandomly(pops,max_score){
    let i = floor(random(pops.length))
    let score = floor(random(max_score))

    let flag = true
    let counter = 0;

    while(flag){
      let pop = pops[i]
      if(pop.score>= score || counter>1000){
        return pop;
      }
      counter++;
    }
    
  }
}