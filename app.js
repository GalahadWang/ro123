const gridSize = 5;
let robot = {
    x: 0,
    y: 0,
    direction: 'NORTH'
};

function initGrid() {
    const app = document.getElementById('app');
    let gridHtml = '<table>';
    for (let i = 0; i < gridSize; i++) {
        gridHtml += '<tr>';
        for (let j = 0; j < gridSize; j++) {
            gridHtml += `<td id="cell-${i}-${j}" class="grid-cell"></td>`;
        }
        gridHtml += '</tr>';
    }
    gridHtml += '</table>';
    app.innerHTML = gridHtml;
    updateRobotPosition();
}

function updateRobotPosition() {
    // Clear previous robot position and direction
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('robot', 'north', 'east', 'south', 'west');
    });

    // Get the cell where the robot is located
    const robotCell = document.getElementById(`cell-${robot.y}-${robot.x}`);
    robotCell.classList.add('robot');

    // Add the appropriate class based on the robot's direction
    switch (robot.direction) {
        case 'NORTH':
            robotCell.classList.add('north');
            break;
        case 'EAST':
            robotCell.classList.add('east');
            break;
        case 'SOUTH':
            robotCell.classList.add('south');
            break;
        case 'WEST':
            robotCell.classList.add('west');
            break;
    }
}

function moveForward() {
    switch (robot.direction) {
        case 'NORTH':
            if (robot.y > 0) robot.y--;  // Decrease y-coordinate when moving north
            break;
        case 'EAST':
            if (robot.x < gridSize - 1) robot.x++;
            break;
        case 'SOUTH':
            if (robot.y < gridSize - 1) robot.y++;  // Increase y-coordinate when moving south
            break;
        case 'WEST':
            if (robot.x > 0) robot.x--;
            break;
    }
    updateRobotPosition();
}

function rotateLeft() {
    switch (robot.direction) {
        case 'NORTH':
            robot.direction = 'WEST';
            break;
        case 'EAST':
            robot.direction = 'NORTH';
            break;
        case 'SOUTH':
            robot.direction = 'EAST';
            break;
        case 'WEST':
            robot.direction = 'SOUTH';
            break;
    }
    updateRobotPosition();  // Update position after rotating
}

function rotateRight() {
    switch (robot.direction) {
        case 'NORTH':
            robot.direction = 'EAST';
            break;
        case 'EAST':
            robot.direction = 'SOUTH';
            break;
        case 'SOUTH':
            robot.direction = 'WEST';
            break;
        case 'WEST':
            robot.direction = 'NORTH';
            break;
    }
    updateRobotPosition();  // Update position after rotating
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveForward();
            break;
        case 'ArrowLeft':
            rotateLeft();
            break;
        case 'ArrowRight':
            rotateRight();
            break;
    }
});

window.onload = initGrid;
