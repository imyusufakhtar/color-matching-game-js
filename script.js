const colors = ["#ff5722", "#ff9800", "#ffc107", "#ffeb3b", "#cddc39", "#4caf50", "#2196f3", "#9c27b0"];
let gameColors = [];
let score = 0;
let timer = 30;
let selectedColors = [];
let level = 1;
let round = 1;
let interval;

function initializeGame() {
    gameColors = generateRandomColors();
    createBoard();
    updateScore();
    updateRound();
    startTimer();
}

function generateRandomColors() {
    let levelColors = colors.slice(0, level + 2);
    return [...levelColors, ...levelColors].sort(() => Math.random() - 0.5);
}

function createBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    gameColors.forEach((color, index) => {
        const tile = document.createElement("div");
        tile.classList.add("color-tile");
        tile.dataset.color = color;
        tile.style.backgroundColor = "#3c4043"; // Hide color initially
        tile.addEventListener("click", () => handleTileClick(tile, index));
        gameBoard.appendChild(tile);
    });
}

function handleTileClick(tile, index) {
    if (selectedColors.length < 2 && !tile.classList.contains("matched")) {
        tile.style.backgroundColor = gameColors[index];
        selectedColors.push({ tile, color: gameColors[index] });
        if (selectedColors.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [first, second] = selectedColors;
    if (first.color === second.color) {
        first.tile.classList.add("matched");
        second.tile.classList.add("matched");
        score += 10;
        updateScore();
        checkWin();
    } else {
        setTimeout(() => {
            first.tile.style.backgroundColor = "#3c4043";
            second.tile.style.backgroundColor = "#3c4043";
        }, 500);
    }
    selectedColors = [];
}

function checkWin() {
    const matchedTiles = document.querySelectorAll(".matched");
    if (matchedTiles.length === gameColors.length) {
        level++;
        round++;
        clearInterval(interval);
        document.getElementById("status").textContent = "Level Up! Starting next level...";
        setTimeout(() => {
            timer = 30;
            initializeGame();
        }, 1000);
    }
}

function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
}

function updateRound() {
    document.getElementById("round").textContent = `Round: ${round}`;
}

function startTimer() {
    document.getElementById("timer").textContent = `Time: ${timer}`;
    interval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = `Time: ${timer}`;
        if (timer <= 0) {
            clearInterval(interval);
            document.getElementById("status").textContent = "Game Over!";
            disableBoard();
        }
    }, 1000);
}

function disableBoard() {
    const tiles = document.querySelectorAll(".color-tile");
    tiles.forEach(tile => {
        tile.removeEventListener("click", handleTileClick);
    });
}

function resetGame() {
    score = 0;
    timer = 30;
    level = 1;
    round = 1;
    selectedColors = [];
    clearInterval(interval);
    document.getElementById("status").textContent = "";
    initializeGame();
}

function showAboutModal() {
    document.getElementById("about-modal").style.display = "flex";
}

function closeAboutModal() {
    document.getElementById("about-modal").style.display = "none";
}

function startGame() {
    document.getElementById("play-button").style.display = "none";
    document.getElementById("game-board").style.display = "grid";
    document.getElementById("score").style.display = "block";
    document.getElementById("timer").style.display = "block";
    document.getElementById("round").style.display = "block";
    document.getElementById("status").style.display = "block";
    document.getElementById("reset-button").style.display = "inline-block";
    initializeGame();
}

document.getElementById("play-button").addEventListener("click", startGame);
document.getElementById("reset-button").addEventListener("click", resetGame);
document.getElementById("about-button").addEventListener("click", showAboutModal);
document.getElementById("modal-close").addEventListener("click", closeAboutModal);

// Initialize the game interface
document.getElementById("game-board").style.display = "none";
document.getElementById("score").style.display = "none";
document.getElementById("timer").style.display = "none";
document.getElementById("round").style.display = "none";
document.getElementById("status").style.display = "none";
document.getElementById("reset-button").style.display = "none";
