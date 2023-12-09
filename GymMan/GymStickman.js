const words = [
    'PROTEIN',
    'TRICEP',
    'CALVES',
    'GLUTES',
    'BARBELL',
    'DUMBBELL',
    'SQUAT'
];

// Define the maximum number of incorrect guesses allowed
const maxWrongGuesses = 5;

let wordToGuess = '';
let guessedLetters = [];
let wrongGuesses = 0;
let imageCount = 1;


//Select random word from the list
function selectRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  //initialize the game
  function initializeGame() {
    wordToGuess = selectRandomWord();
    guessedLetters = Array(wordToGuess.length).fill('_');
    wrongGuesses = 0;
  
    // Update the word display
    updateWordDisplay();
  
    updateGymStickmanGraphic();
  
    // Remove any previously generated buttons
    const lettersContainer = document.querySelector('.letters');
    while (lettersContainer.firstChild) {
      lettersContainer.removeChild(lettersContainer.firstChild);
    }
  
    // Generate the letter buttons
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);
      const button = document.createElement('button');
      button.innerText = letter;
      button.addEventListener('click', function () {
        handleGuess(letter);
      });
      lettersContainer.appendChild(button);
    }
  
    // Clear any previous win/lose message
    const messageContainer = document.querySelector('.message');
    messageContainer.innerText = '';
  }

  // Update the word display
  function updateWordDisplay() {
    const wordContainer = document.querySelector('.word');
    wordContainer.innerText = guessedLetters.join(' ');
  }

  // Handle a letter guess
  function handleGuess(letter) {
    // If the letter has already been guessed, do nothing
    if (guessedLetters.includes(letter)) {
      return;
    }
  
    // Add the letter to the list of guessed letters
    guessedLetters.forEach((guessedLetter, index) => {
      if (wordToGuess[index] === letter) {
        guessedLetters[index] = letter;
      }
    });
  
    // If the letter is not in the hidden word, increment the wrong guesses count and update the Melting Snowman graphic
    if (!wordToGuess.includes(letter)) {
      wrongGuesses++;
      updateGymStickmanGraphic();
    }
  
    // Update the word display
    updateWordDisplay();
  
    // Check if the game has been won or lost
    checkWinOrLose();
  } 

 // update the gym stickman graphic
  function updateGymStickmanGraphic() {
    const gymStickmanContainer = document.querySelector('.GymStickman');
    gymStickmanContainer.innerHTML = `<img src="C:/Subodh Files/Personal Work/Projects/GymStickman/GymStickman${imageCount}.png" alt="GymStickman ${imageCount}"
    width="200"
    height="300" >`;
    imageCount++;
  }

// Check if the game has been won or los
  function checkWinOrLose() {
    if (guessedLetters.join('') === wordToGuess) {
      const messageContainer = document.querySelector('.message');
      messageContainer.innerText = 'You win!';
      const letterButtons = document.querySelectorAll('.letters button');
      letterButtons.forEach(button => {
        button.disabled = true;
        button.removeEventListener('click', handleGuess);
      });
    } else if (wrongGuesses >= maxWrongGuesses) {
      const messageContainer = document.querySelector('.message');
      messageContainer.innerText = `You lose! The word was "${wordToGuess}".`;
      const gymStickmanContainer = document.querySelector('.GymStickman');
      gymStickmanContainer.innerHTML = `<img src="C:/Subodh Files/Personal Work/Projects/GymStickman/LossStickman.png" alt="gameover"
      width="250"
      height="300">`;
      const letterButtons = document.querySelectorAll('.letters button');
      letterButtons.forEach(button => {
        button.disabled = true;
        button.removeEventListener('click', handleGuess);
      });
    }
  }
  // Initialize the game when the page loads
window.addEventListener('load', initializeGame);
