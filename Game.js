const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Paddle
const paddleWidth = 10;
const paddleHeight = 100;

// Player paddle
const player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 0
};

// Computer paddle
const computer = {
    x: canvas.width - 20,
    y: canvas.height / 2 - paddleHeight / 2
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    dx: 4,
    dy: 4
};

// Draw rectangle
function drawRect(x, y, w, h, color = "white") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// Draw ball
function drawBall() {
    drawRect(ball.x, ball.y, ball.size, ball.size);
}

// Update game
function update() {
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (top/bottom)
    if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
        ball.dy *= -1;
    }

    // Player paddle collision
    if (
        ball.x <= player.x + paddleWidth &&
        ball.y >= player.y &&
        ball.y <= player.y + paddleHeight
    ) {
        ball.dx *= -1;
    }

    // Computer paddle collision
    if (
        ball.x + ball.size >= computer.x &&
        ball.y >= computer.y &&
        ball.y <= computer.y + paddleHeight
    ) {
        ball.dx *= -1;
    }

    // Reset if ball goes out
    if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }

    // Simple AI (computer follows ball)
    computer.y += (ball.y - (computer.y + paddleHeight / 2)) * 0.05;
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(player.x, player.y, paddleWidth, paddleHeight);
    drawRect(computer.x, computer.y, paddleWidth, paddleHeight);
    drawBall();
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

// Controls
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") player.dy = -6;
    if (e.key === "ArrowDown") player.dy = 6;
});

document.addEventListener("keyup", () => {
    player.dy = 0;
});

// Move player paddle
function movePlayer() {
    player.y += player.dy;

    // Limit movement
    if (player.y < 0) player.y = 0;
    if (player.y + paddleHeight > canvas.height)
        player.y = canvas.height - paddleHeight;
}

// Update player movement separately
setInterval(movePlayer, 1000 / 60);