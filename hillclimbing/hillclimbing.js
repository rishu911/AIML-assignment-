// Define the objective function (mountain-like function in this case)
function objectiveFunction(x) {
    return -1 * (x * x); // Negate for maximizing, change accordingly for minimizing
  }
  
  // Hill climbing algorithm
  function hillClimbing(initialPosition, stepSize, maxIterations) {
    let currentPosition = initialPosition;
    let currentObjectiveValue = objectiveFunction(currentPosition);
  
    for (let iteration = 0; iteration < maxIterations; iteration++) {
      // Generate neighbors
      const neighbor1 = currentPosition + stepSize;
      const neighbor2 = currentPosition - stepSize;
  
      // Evaluate neighbors
      const value1 = objectiveFunction(neighbor1);
      const value2 = objectiveFunction(neighbor2);
  
      // Find the neighbor with the highest objective value
      if (value1 > currentObjectiveValue) {
        currentPosition = neighbor1;
        currentObjectiveValue = value1;
      } else if (value2 > currentObjectiveValue) {
        currentPosition = neighbor2;
        currentObjectiveValue = value2;
      } else {
        // If neither neighbor is better, break the loop
        break;
      }
    }
  
    return currentPosition;
  }
  
  // Example usage
  const initialPosition = 2; // Starting position
  const stepSize = 0.1;      // Step size for neighbors
  const maxIterations = 100; // Maximum number of iterations
  
  const result = hillClimbing(initialPosition, stepSize, maxIterations);
  console.log(`Optimal position: ${result}`);
  console.log(`Optimal value: ${objectiveFunction(result)}`);
  