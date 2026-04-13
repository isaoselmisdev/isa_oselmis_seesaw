const board = document.getElementById("board");
const colors = [
    '#3498db',  // 1kg
    '#2ecc71',  // 2kg
    '#1abc9c',  // 3kg
    '#f1c40f',  // 4kg
    '#e67e22',  // 5kg
    '#e74c3c',  // 6kg
    '#9b59b6',  // 7kg
    '#e91e63',  // 8kg
    '#795548',  // 9kg
    '#37474f',  // 10kg
];

const currentKgSpan = document.getElementById('current-kg');
const leftTorqueSpan = document.getElementById('left-torque');
const rightTorqueSpan = document.getElementById('right-torque');
const leftWeightSpan = document.getElementById('left-weight');
const rightWeightSpan = document.getElementById('right-weight');
const angleSpan = document.getElementById('angle');

let currentBall = null;
let currentSize = 0;
let lastX = 0;
let boardRect = board.getBoundingClientRect();

window.addEventListener('resize', function() {
    boardRect = board.getBoundingClientRect();
});

function createBall() {
    const ball = document.createElement("div");
    const kg = Math.floor(Math.random() * 10) + 1;
    const size = 20 + (kg * 4);

    ball.style.left = (boardRect.left + boardRect.width / 2 - size / 2) + 'px';
    ball.style.top = (boardRect.top - size - 100) + 'px';
    ball.className = "weight-ball";
    ball.innerText = kg + "kg";
    ball.dataset.kg = kg;
    currentKgSpan.innerText = kg;
    ball.style.position = "fixed";
    ball.style.height = size + "px";
    ball.style.width = size + "px";
    ball.style.visibility = "visible";
    ball.style.backgroundColor = colors[kg - 1];

    currentSize = size;
    currentBall = ball;

    document.body.appendChild(ball);
}

document.addEventListener('mousemove', function(e) {
    if (e.clientX >= boardRect.left && e.clientX <= boardRect.right) {
        currentBall.style.visibility = 'visible';
        const boardCenterX = boardRect.left + boardRect.width / 2;
        lastX = (e.clientX - boardCenterX) + 200;
        currentBall.style.left = e.clientX + 'px';
        currentBall.style.top = (boardRect.top - currentSize - 100) + 'px';
    } else {
        currentBall.style.visibility = "hidden";
    }
});

document.addEventListener("click", function(e) {
    if (e.clientX >= boardRect.left && e.clientX <= boardRect.right) {
        currentBall.style.position = "";
        currentBall.style.left = lastX + "px";
        currentBall.style.top = "";
        board.appendChild(currentBall);
        createBall();
        boardRect = board.getBoundingClientRect();
        calculateTorque();
        saveState();
    }
});

function saveState() {
    const balls = board.querySelectorAll('.weight-ball');
    const state = [];
    balls.forEach(function(ball) {
        state.push({
            kg: parseInt(ball.dataset.kg),
            left: ball.style.left
        });
    });
    localStorage.setItem('seesawState', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('seesawState');
    if (!saved) return;
    const state = JSON.parse(saved);
    state.forEach(function(item) {
        const size = 20 + (item.kg * 4);
        const ball = document.createElement('div');
        ball.className = 'weight-ball';
        ball.innerText = item.kg + 'kg';
        ball.dataset.kg = item.kg;
        ball.style.left = item.left;
        ball.style.width = size + 'px';
        ball.style.height = size + 'px';
        ball.style.backgroundColor = colors[item.kg - 1];
        board.appendChild(ball);
    });
    calculateTorque();
}

function calculateTorque() {
    const balls = board.querySelectorAll(".weight-ball");
    let leftTorque = 0;
    let rightTorque = 0;
    let leftWeight = 0;
    let rightWeight = 0;

    balls.forEach(function(ball) {
        const kg = parseInt(ball.dataset.kg);
        const distance = parseFloat(ball.style.left) - 200;

        if (distance < 0) {
            leftWeight += kg;
            leftTorque += kg * Math.abs(distance);
        } else {
            rightWeight += kg;
            rightTorque += kg * distance;
        }
    });

    const angle = Math.max(-15, Math.min(15, (rightTorque - leftTorque) / 100));
    board.style.transform = `rotate(${angle}deg)`;
    leftTorqueSpan.innerText = Math.round(leftTorque);
    rightTorqueSpan.innerText = Math.round(rightTorque);
    leftWeightSpan.innerText = leftWeight;
    rightWeightSpan.innerText = rightWeight;
    angleSpan.innerText = angle.toFixed(1);
}

document.getElementById('reset-btn').addEventListener('click', function() {
    board.querySelectorAll('.weight-ball').forEach(function(ball) {
        ball.remove();
    });
    board.style.transform = 'rotate(0deg)';
    localStorage.removeItem('seesawState');
    leftTorqueSpan.innerText = 0;
    rightTorqueSpan.innerText = 0;
    leftWeightSpan.innerText = 0;
    rightWeightSpan.innerText = 0;
    angleSpan.innerText = '0.0';
});

loadState();
createBall();
