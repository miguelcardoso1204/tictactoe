//attach event (submit) listener to the form to get user data

//attach event (click) listeners to each square

//initialize the game

// check which gamemode we are on

// set win conditions

// determine current player

// after each move, check if win conditions have been met, if not, set other player as active

// human vs human, next implement easy ai, next impossible ai

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
    data.gameOver = "false";
};

const initializeGame = (data) => {
    //initialize game variables
    initializeVariables(data);
    //add event listeners to the game
};
