// import the readline module into our file
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let secretNumber;
let numAttempts = 5; // number of attemps to guess the secretNumber;

// Checks if number is close to the secretNumber and provides feedback
function checkGuess (guess) {
    if (secretNumber < guess) {
        console.log("Too high.");
        return false;
    } else if (secretNumber > guess) {
        console.log("Too low.");
        return false;
    } else {
        console.log("You got it!");
        return true;
    };
};

// Ask user to enter a guess and checks if the guess is close to the secretNumber
function askGuess (numGuess) {
    numAttempts--;

    rl.question("Enter a guess: ", numGuess => {
        let stringToNum = Number(numGuess);
        let check = checkGuess(stringToNum);
        if (check === true) {
            console.log("You win! 😀");
            rl.close();
        } else if (numAttempts > 0) {
        askGuess();
        } else if (numAttempts === 0) {
            console.log("You Lose 🙁");
            rl.close();
        };
    });
};

// Ask user to enter min and max numbers
function askRange () {
    rl.question("Enter a min number: ", firstAnswer => {
        // only after the user responds to question one, then ask question two
        let minNum = Number(firstAnswer);
        rl.question("Enter a max number: ", secondAnswer => {
            let maxNum = Number(secondAnswer);

            // assign secretNumber to a random number between min to max (inclusive)
            secretNumber = randomInRange(minNum, maxNum);
            console.log("I'm thinking of a number between " + firstAnswer + " and " + secondAnswer + ". 🤔");

            askGuess();
        });
    });
};

// Generates random whole number between min and max numbers (inclusive)
function randomInRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// To start the game
askRange();
