//first step, we need to attach event (submit) listener to the form to get user data

// attach event (click) listers to each "game square"

//next, initialize the game

//next, we need to check which gamemode we're playing

// we need to set win conditions

// we need to determine current player

// after each move, check win conditions and if not met, set other player as active

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
const newGameBtn = document.querySelector("#restartBtn");

const resetGameBtn = document.querySelector("#resetBtn");

newGameBtn.addEventListener("click", () => {
    location.reload();
});

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
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
};
const resetDom = () => {
    document.querySelectorAll(".square").forEach((square) => {
        square.className = "square";
        square.textContent = "";
    });
};

const addEventListenersToGameBoard = (data) => {
    document.querySelectorAll(".square").forEach((square) => {
        square.addEventListener("click", (event) => {
            playMove(event.target, data);
        });
    });
    resetGameBtn.addEventListener("click", () => {
        initializeVariables(data);
        resetDom();
        adjustDom("displayTurn", `${data.player1name}'s turn`);
    });
};

const initializeGame = (data) => {
    //initialize game variables

    adjustDom("displayTurn", `${data.player1name}'s turn`);
    initializeVariables(data);

    addEventListenersToGameBoard(data);
};

const playMove = (square, data) => {
    console.log(data.gameOver);
    //is game over? If game over, don't do anything
    if (data.gameOver || data.round > 8) {
        return;
    }
    //check if game square has a letter in it, if so, don't do anything
    if (data.board[square.id] === "X" || data.board[square.id] === "O") {
        return;
    }

    //adjust the DOM for player move, and then check win conditions

    data.board[square.id] = data.currentPlayer;
    square.textContent = data.currentPlayer;
    square.classList.add(data.currentPlayer === "X" ? "player1" : "player2");
    //increase the round #
    data.round++;

    //check end conditions
    if (endConditions(data)) {
        return;
    }

    //change current player
    //change the dom, and change data.currentplayer
    if (data.gamemode === 0) {
        changePlayer(data);
    } else if (data.gamemode === 1) {
        //easy ai
        changePlayer(data);
        easyAiMove(data);
        if (endConditions(data)) {
            return;
        }
        changePlayer(data);

        //change back to player1
    } else if (data.gamemode === 2) {
        changePlayer(data);
        impossibleAIMove(data);
        if (endConditions(data)) {
            return;
        }
        changePlayer(data);
    }
};

const endConditions = (data) => {
    //3 potential options,
    //winner
    //tie
    //game not over yet
    if (checkWinner(data, data.currentPlayer)) {
        //adjust the dom to reflect win
        let winnerName =
            data.currentPlayer === "X" ? data.player1name : data.player2name;
        adjustDom("displayTurn", winnerName + " has won the game");
        data.gameOver = true;
        return true;
    } else if (data.round === 9) {
        adjustDom("displayTurn", "It's a Tie!");
        data.gameOver = true;
        //adjust the dom to reflect tie
        return true;
    }
    return false;
};

const checkWinner = (data, player) => {
    let result = false;
    winningConditions.forEach((condition) => {
        if (
            data.board[condition[0]] === player &&
            data.board[condition[1]] === player &&
            data.board[condition[2]] === player
        ) {
            result = true;
        }
    });
    return result;
};

const adjustDom = (className, textContent) => {
    const elem = document.querySelector(`.${className}`);
    elem.textContent = textContent;
};

const changePlayer = (data) => {
    data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
    //adjust the dom
    let displayTurnText =
        data.currentPlayer === "X" ? data.player1name : data.player2name;
    adjustDom("displayTurn", `${displayTurnText}'s turn`);
};

const easyAiMove = (data) => {
    changePlayer(data);

    data.round++;
    let availableSpaces = data.board.filter(
        (space) => space !== "X" && space !== "O"
    );
    let move =
        availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    data.board[move] = data.player2;
    setTimeout(() => {
        let square = document.getElementById(`${move}`);
        square.textContent = data.player2;
        square.classList.add("player2");
    }, 200);

    changePlayer(data);
};

const impossibleAIMove = (data) => {
    data.round++;
    //get best possible move from minimax algorithm
    const move = minimax(data, "O").index;
    data.board[move] = data.player2;
    let square = document.getElementById(`${move}`);
    square.textContent = data.player2;
    square.classList.add("player2");

    console.log(data);
};

const minimax = (data, player) => {
    let availableSpaces = data.board.filter(
        (space) => space !== "X" && space !== "O"
    );
    if (checkWinner(data, data.player1)) {
        return {
            score: -100,
        };
    } else if (checkWinner(data, data.player2)) {
        return {
            score: 100,
        };
    } else if (availableSpaces.length === 0) {
        return {
            score: 0,
        };
    }
    //check if winner, if player1 wins set score to -100
    //if tie, set score to 0
    //if win set score to 100
    const potentialMoves = [];
    //loop over available spaces to get list of all potential moves and check if wins
    for (let i = 0; i < availableSpaces.length; i++) {
        let move = {};
        move.index = data.board[availableSpaces[i]];
        data.board[availableSpaces[i]] = player;
        if (player === data.player2) {
            move.score = minimax(data, data.player1).score;
        } else {
            move.score = minimax(data, data.player2).score;
        }
        //reset the move on the board
        data.board[availableSpaces[i]] = move.index;
        //push the potential move to the array
        potentialMoves.push(move);
    }
    let bestMove = 0;
    if (player === data.player2) {
        let bestScore = -10000;
        for (let i = 0; i < potentialMoves.length; i++) {
            if (potentialMoves[i].score > bestScore) {
                bestScore = potentialMoves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < potentialMoves.length; i++) {
            if (potentialMoves[i].score < bestScore) {
                bestScore = potentialMoves[i].score;
                bestMove = i;
            }
        }
    }
    return potentialMoves[bestMove];
};
