class Population{
  constructor(n_size,dino){
    //to hold the current population
    this.num_populations = n_size;

    // ArrayList which we will use for our "mating pool"
    this.matingPool; 

      // Number of generations
    this.generations = 0;

    
    //array holds the may population
    this.population = [];
    for (let i = 0; i < this.num_populations; i++) {
      this.population[i] = new Dino(dino.x,dino.y,dino.radius);
    }
    
    this.matingPool = [];
    //this.calcFitness();
    //population.update(horizon,getNearestBox())
  }

  update(horizon,getNearestBox){
    //if the pops endded
    if(this.population.length === 0){
      this.population = []
      print("Gen")
      this.rejectionSampling(this.matingPool)
      this.matingPool = []
    }


    for (let i = 0; i < this.population.length; i++) {
      this.population[i].update(horizon,getNearestBox);
    }
  }

  draw(){
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].draw();
    }
  }

  hits(obstacles){
    for (let i = 0; i < this.population.length; i++) {
      let dino = this.population[i];
      if(dino.hits(obstacles)){
        this.matingPool.push(this.population.splice(i,1)[0])
        console.log("No!!")
      }//else{console.log("Hitt")}
    
    }
    //this.population = newPop;
  }

  rejectionSampling(pops_given){
    //getting the max pop
    let max_score = 0
    for(pop of pops_given){if(pop.score>max_score){max_score=pop.score}}

    for(pop of pops_given){
      let pop1 = this.pickUpRandomly(pops_given,max_score);
      let pop2 = this.pickUpRandomly(pops_given,max_score);
      pop1.crossover(pop2)
      pop1.mutate()
      this.population.push(pop1)
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