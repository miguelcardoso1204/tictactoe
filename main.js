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

    console.log(data);
});
