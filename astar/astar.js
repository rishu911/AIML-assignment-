class Node {
    constructor(x, y, cost, heuristic) {
        this.x = x;
        this.y = y;
        this.cost = cost;
        this.heuristic = heuristic;
        this.parent = null;
    }

    get priority() {
        return this.cost + this.heuristic;
    }
}

function astar(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const startNode = new Node(start[0], start[1], 0, 0);
    const endNode = new Node(end[0], end[1], 0, 0);

    const openSet = [startNode];
    const closedSet = new Set();

    while (openSet.length > 0) {
        openSet.sort((a, b) => a.priority - b.priority);
        const currentNode = openSet.shift();

        if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
            const path = [];
            let current = currentNode;
            while (current) {
                path.unshift([current.x, current.y]);
                current = current.parent;
            }
            return path;
        }

        closedSet.add(`${currentNode.x},${currentNode.y}`);

        for (const [dx, dy] of directions) {
            const newX = currentNode.x + dx;
            const newY = currentNode.y + dy;

            if (
                newX >= 0 && newX < rows &&
                newY >= 0 && newY < cols &&
                grid[newX][newY] !== 1 &&
                !closedSet.has(`${newX},${newY}`)
            ) {
                const newCost = currentNode.cost + 1;
                const heuristic = Math.abs(newX - endNode.x) + Math.abs(newY - endNode.y);
                const newNode = new Node(newX, newY, newCost, heuristic);
                newNode.parent = currentNode;

                openSet.push(newNode);
            }
        }
    }

    return null; // No path found
}

// Example usage:
const grid = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
];

const start = [0, 0];
const end = [4, 4];

const path = astar(grid, start, end);

if (path) {
    console.log("Shortest Path:", path);
} else {
    console.log("No path found.");
}
