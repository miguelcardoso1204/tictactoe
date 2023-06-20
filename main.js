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
        return;
    }

    //change current player

    //change the dom and change data.currentPlayer

    changePlayer(data);
};

const endConditions = (data) => {
    //3 potential options,
    //winner
    //tie
    //game not over yet
    if (checkWinner(data)) {
        //adjust DOM to reflect win
        let winTextContent =
            data.currentPlayer === "X"
                ? data.player1name + " won the game!"
                : data.player2name + " won the game!";
        adjustDOM("displayTurn", winTextContent);
        return true;
    } else if (data.round === 9) {
        //adjust DOM to reflect tie
        adjustDOM("displayTurn", "The game was a tie");
        data.gameOver = true;
        return true;
    }
    return false;
};

const checkWinner = (data) => {
    let result = false;
    winningConditions.forEach((condition) => {
        if (
            data.board[condition[0]] === data.board[condition[1]] &&
            data.board[condition[1]] === data.board[condition[2]]
        ) {
            data.gameOver = true;
            result = true;
        }
    });

    return result;
};

const adjustDOM = (className, textContent) => {
    const elem = document.querySelector(`.${className}`);
    elem.setAttribute("display", "block");
    elem.textContent = textContent;
};

const changePlayer = (data) => {
    data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
    //Adjust DOM
    let displayTurnText =
        data.currentPlayer === "X" ? data.player1name : data.player2name;
    adjustDOM("displayTurn", `${displayTurnText}'s turn`);
};
