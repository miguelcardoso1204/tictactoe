//attach event (submit) listener to the form to get user data

//attach event (click) listeners to each square

//initialize the game

// check which gamemode we are on

// set win conditions

// determine current player

// after each move, check if win conditions have been met, if not, set other player as active

// human vs human, next implement easy ai, next impossible ai

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const form = document.querySelector("#settings");

form.addEventListener("submit", (event) => {
    //prevent page refresh
    event.preventDefault();

    //initialize user form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    document.querySelector("#menu").style.display = "none";

    initializeGame(data);
});

const initializeVariables = (data) => {
    data.gamemode = +data.gamemode;
    data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    data.player1 = "X";
    data.player2 = "0";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
};

const addEventListenerToGameboard = (data) => {
    document.querySelectorAll(".square").forEach((square) => {
        square.addEventListener("click", (event) => {
            playMove(event.target, data);
        });
    });
};

const initializeGame = (data) => {
    //initialize game variables
    initializeVariables(data);
    //add event listeners to the gameboard
    addEventListenerToGameboard(data);
};

const playMove = (square, data) => {
    //is game  over? if game over, don't do anything

    if (data.gameOver || data.round > 8) {
        return;
    }
    //check if game box has a letter in it, if so, don't do anything
    if (data.board[square.id] === "X" || data.board[square.id] === "O") {
        console.log(data, square);
        return;
    }

    //adjust the DOM for player move
    data.board[square.id] = data.currentPlayer;
    square.textContent = data.currentPlayer;
    square.classList.add(data.currentPlayer === "X" ? "player1" : "player2");

    //increase the round
    data.round++;

    //check win conditions
    if (endConditions(data)) {
        //adjust DOM to reflect conditions
    }

    const endConditions = (data) => {};
};
