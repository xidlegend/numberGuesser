/*
GAME FUNCTION
- Player Guesses a Number Between a min and a max
- Player gets a certain amount of guesses
- Notify Player of Guesses remaining
- Notidy Player of the correct answer of loose
- Let player choose to play again
*/

//Game Values
let min = 10,
    max = 30,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'),
      shadow = document.getElementById('number-shadow'),
      modal = document.querySelector('.modal');
      
var sound;

//Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;
shadow.textContent = winningNum;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className == 'retry'){
    window.location.reload();
  }
  
})

// Listen for guess 
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value); 
  // Validate
  if (isNaN(guess) || guess <min || guess > max){
    setMessage(`Please enter a number betwween ${min} and ${max}`, 'red')
  } else{
    //Check if Won
    if (guess == winningNum){
      // Disable Input
      guessInput.disabled = true;
      guessInput.style.borderColor = 'green';
      //Set Message
      gameover(true, `${winningNum} is correct!`, 'green')
      // Yay Sound
      sound = new sound("yay.mp3")
      sound.play();

      startConfetti();
    } else 
    { // Wrong Number
      guessesLeft -= 1;
      if (guessesLeft === 0){
        //Game Over - Lost
        gameover(false, `The Correct Number was ${winningNum} !`, 'red')
        // Aww Sound
        sound = new sound("aww.mp3")
        sound.play();
      } else {
        //Game continues - answer wrong
        guessInput.style.borderColor = 'red';
        //Clear Input
        guessInput.value = '';
        setMessage(`Incorrect! You have ${guessesLeft} guesses left` /* + randomStatement()*/ )
      }
    }}
})


function gameover (won, msg){
  let color, text;
  won === true ? color ='green' : color = 'red';
  won === true ? text ='Play Again' : text = 'Retry';
  // Disable input
  guessInput.disabled = 'true';
  //Change Border Color
  guessInput.style.borderColor = color
  // Set text color
  setMessage(msg,color)
  // Reveal Number:
  shadow.style.textShadow= `0 0 0px ${color}`;
  // Play again
  guessBtn.innerHTML = `${text} <i class="fas fa-undo-alt"></i>`
  guessBtn.className += 'retry'
}

// Get Winning Number
function getRandomNum(min, max){
  return(Math.floor(Math.random()*(max-min+1)+min));

}

function setMessage (msg, color){
  message.style.color = color;
  message.textContent = msg
}

// Sound Constructor
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  // Add play stop functions
  this.play = function(){
    this.sound.play();
  }
  this.pause = function(){
    this.sound.pause();
  }    
}




/*
- Start with a modal, where player can set the difficulty, and the Lucky Number
- Add a Yay, confetti effect wit sfx
- Add an Aww if they lose


*/