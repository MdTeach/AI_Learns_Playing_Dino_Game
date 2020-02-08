class ActivationFunction {
    constructor(func, dfunc) {
      this.func = func;
      this.dfunc = dfunc;
    }
}
  
let sigmoid = new ActivationFunction(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
);

let tanh = new ActivationFunction(
    x => Math.tanh(x),
    y => 1 - (y * y)
);

class NeuralNetwork {
    /*
    * if first argument is a NeuralNetwork the constructor clones it
    * USAGE: cloned_nn = new NeuralNetwork(to_clone_nn);
    */
    constructor(in_nodes, hid_nodes, out_nodes) {
      if (in_nodes instanceof NeuralNetwork) {
        let a = in_nodes;
        this.input_nodes = a.input_nodes;
        this.hidden_nodes = a.hidden_nodes;
        this.output_nodes = a.output_nodes;
  
        this.weights_ih = a.weights_ih.copy();
        this.weights_ho = a.weights_ho.copy();
  
        this.bias_h = a.bias_h.copy();
        this.bias_o = a.bias_o.copy();
      } else {
        this.input_nodes = in_nodes;
        this.hidden_nodes = hid_nodes;
        this.output_nodes = out_nodes;
  
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();
  
        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
      }

      //set activation function
      this.setActivationFunction();
  
    }
  
    predict(input_array) {
  
      // Generating the Hidden Outputs
      let inputs = Matrix.fromArray(input_array);
      let hidden = Matrix.multiply(this.weights_ih, inputs);
      hidden.add(this.bias_h);
      // activation function!
      hidden.map(this.activation_function.func);
  
      // Generating the output's output!
      let output = Matrix.multiply(this.weights_ho, hidden);
      output.add(this.bias_o);
      output.map(this.activation_function.func);
  
      // Sending back to the caller!
      return output.toArray();
    }

    setActivationFunction(func = sigmoid) {
        this.activation_function = func;
    }

    mutate(){
      this.weights_ih.map(this.mutate_func);
      this.weights_ho.map(this.mutate_func);
      this.bias_h.map(this.mutate_func);
      this.bias_o.map(this.mutate_func);
    }


    // Mutation function to be passed into bird.brain
    mutate_func(x) {
      if (random(1) < 0.2) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
      } else {
        return x;
      }
    }
}