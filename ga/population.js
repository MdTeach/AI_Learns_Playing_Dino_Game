class Population{
  constructor(n_size,mutation_rate=0.01,dino){
    //to hold the current population
    this.num_populations = n_size;

    // ArrayList which we will use for our "mating pool"
    this.matingPool; 

      // Number of generations
    this.generations = 0;

    // Mutation rate
    this.mutationRate = mutation_rate; 
    
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
      //1 select two pops from the mating poop
      //2 crossover two pops two get new one
      //3 mutate formed child
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
}