class Population{
  constructor(n_size,mutation_rate=0.01,dino){
    //to hold the current population
    this.populations = n_size;

    // ArrayList which we will use for our "mating pool"
    this.matingPool; 

      // Number of generations
    this.generations = 0;

    // Mutation rate
    this.mutationRate = mutation_rate; 
    
    //array holds the may population
    this.population = [];
    for (let i = 0; i < this.populations; i++) {
      this.population[i] = new Dino(dino.x,dino.y,dino.radius);
    }
    
    this.matingPool = [];
    //this.calcFitness();
    //population.update(horizon,getNearestBox())
  }

  update(horizon,getNearestBox){
    for (let i = 0; i < this.populations; i++) {
      this.population[i].update(horizon,getNearestBox);
    }
  }

  draw(){
    for (let i = 0; i < this.populations; i++) {
      this.population[i].draw();
    }
  }
}