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

function createBall() {
    const boardRect = board.getBoundingClientRect();
    const ball = document.createElement("div");
    const kg = Math.floor(Math.random() * 10) + 1;
    const size = 20 + (kg * 4);

    ball.style.left = (boardRect.left + boardRect.width / 2 - size / 2) + 'px';
    ball.className = "weight-ball";
    ball.innerText = kg + "kg";
    ball.dataset.kg = kg;
    currentKgSpan.innerText = kg;
    ball.style.position = "fixed";
    ball.style.height = size + "px";
    ball.style.width = size + "px";
    ball.style.visibility = "hidden";
    ball.style.backgroundColor = colors[kg - 1];

    currentSize = size;
    currentBall = ball;

    document.body.appendChild(ball);
}

document.addEventListener('mousemove', function(e) {
    const boardRect = board.getBoundingClientRect();
    if (e.clientX >= boardRect.left && e.clientX <= boardRect.right) {
        currentBall.style.visibility = 'visible';
        lastX = e.clientX - boardRect.left;
        currentBall.style.left = e.clientX + 'px';
        currentBall.style.top = (boardRect.top - currentSize - 100) + 'px';
    } else {
        currentBall.style.visibility = "hidden";
    }
});

document.addEventListener("click", function(e) {
    const boardRect = board.getBoundingClientRect();
    if (e.clientX >= boardRect.left && e.clientX <= boardRect.right) {
        currentBall.style.position = "";
        currentBall.style.left = lastX + "px";
        currentBall.style.top = "";
        board.appendChild(currentBall);
        createBall();
        calculateTorque();
    }
});

createBall();

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
