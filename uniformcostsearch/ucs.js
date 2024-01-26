class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(element, priority) {
      this.queue.push({ element, priority });
      this.queue.sort((a, b) => a.priority - b.priority);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.queue.shift().element;
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  }
  
  class Graph {
    constructor() {
      this.nodes = {};
    }
  
    addNode(name, neighbors) {
      this.nodes[name] = neighbors;
    }
  
    uniformCostSearch(startNode, goalNode) {
      const explored = new Set();
      const priorityQueue = new PriorityQueue();
  
      priorityQueue.enqueue({ node: startNode, cost: 0 }, 0);
  
      while (!priorityQueue.isEmpty()) {
        const { node, cost } = priorityQueue.dequeue();
  
        if (!explored.has(node)) {
          console.log(`Exploring node ${node} with cost ${cost}`);
          explored.add(node);
  
          if (node === goalNode) {
            console.log(`Goal node ${goalNode} found with cost ${cost}`);
            return;
          }
  
          const neighbors = this.nodes[node];
  
          for (const neighbor in neighbors) {
            const newCost = cost + neighbors[neighbor];
            priorityQueue.enqueue({ node: neighbor, cost: newCost }, newCost);
          }
        }
      }
  
      console.log(`Goal node ${goalNode} not reachable from ${startNode}`);
    }
  }
  
  // Example Usage:
  const graph = new Graph();
  
  // Define nodes and their neighbors with associated costs
  graph.addNode('A', { B: 4, C: 2 });
  graph.addNode('B', { A: 4, D: 5 });
  graph.addNode('C', { A: 2, D: 8 });
  graph.addNode('D', { B: 5, C: 8 });
  
  // Start Uniform Cost Search from node 'A' to node 'D'
  graph.uniformCostSearch('A', 'D');
  