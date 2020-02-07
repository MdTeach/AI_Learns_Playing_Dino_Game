class Population{
    constructor(n_size,mutation_rate=0.01){
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
        for (let i = 0; i < num; i++) {
          this.population[i] = new DNA(this.target.length);
        }
        this.matingPool = [];
        this.calcFitness();
    }
}