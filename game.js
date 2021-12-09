let gameOver = false
let currentPlayer = 'user'
const startButton = document.querySelector('#start_game')
const playerText = document.querySelector('.player')
const userGoals = document.querySelector('.your_goals')
const compGoals = document.querySelector('.comp_goals')
const info = document.querySelector('.information')
/* let userCounter = 0
let compCounter = 0
userGoals.textContent = userCounter
compGoals.textContent = compCounter */

const game = () => {
    if(gameOver){
        return
    }
    if(currentPlayer === 'user'){
        playerText.textContent = 'Your turn'
        compSquares.forEach(square =>{
            square.addEventListener('click',(e)=>{
                showSquare(square)
            })
        })
    }
    if(currentPlayer==='computer'){
        playerText.textContent = "computer's turn"
        setTimeout(compPlay, 1000)
    }
}


let twoDeckShip = 0
let firstThreeDeckShip = 0
let secondThreeDeckShip = 0
let fourDeckShip = 0
function showSquare(squre){
    if(!squre.classList.contains('red') && !squre.classList.contains('black')){
        if(squre.classList.contains('twoDeckShip')) twoDeckShip++
        if(squre.classList.contains('firstThreeDeckShip')) firstThreeDeckShip++
        if(squre.classList.contains('secondThreeDeckShip')) secondThreeDeckShip++
        if(squre.classList.contains('fourDeckShip')) fourDeckShip++
        squre.classList.add('red')       
    }
    if(!squre.classList.contains('taken')){ 
        squre.classList.add('black')    
    }
    isWinner()
    currentPlayer = 'computer'
    game()
}

let compTwoDeckShip = 0
let compFirstThreeDeckShip = 0
let compSecondThreeDeckShip = 0
let compFourDeckShip = 0

function compPlay(){
    let arr = []
    let shot = Math.floor(Math.random() * userSquares.length)
    /* arr.forEach(item => {
        if(item !== shot) arr.push(shot)
        if(item === shot)
    }) */
    console.log(shot)
    if(!userSquares[shot].classList.contains('red') && !userSquares[shot].classList.contains('black')){
        if(userSquares[shot].classList.contains('destroy')) compTwoDeckShip++
        if(userSquares[shot].classList.contains('submarine')) compFirstThreeDeckShip++
        if(userSquares[shot].classList.contains('cruiser')) compSecondThreeDeckShip++
        if(userSquares[shot].classList.contains('battleship')) compFourDeckShip++
            //compCounter++
        if(userSquares[shot].classList.contains('taken')) userSquares[shot].classList.add('red')
        if(!userSquares[shot].classList.contains('taken'))userSquares[shot].classList.add('black')
    }
    info.textContent = ''
    isWinner()
    currentPlayer = 'user'
    game()
}

function isWinner() {
    if(twoDeckShip === 2){
        info.textContent='Congrats! The twoDeckShip is destroyed'
        twoDeckShip = 10
    } 
    if(firstThreeDeckShip === 3){
        info.textContent='Congrats! The firstThreeDeckShip is destroyed'
        firstThreeDeckShip = 10
    }
    if(secondThreeDeckShip === 3){
        info.textContent='Congrats! The secondThreeDeckShip is destroyed'
        secondThreeDeckShip = 10
    }
    if(fourDeckShip === 4){
        info.textContent='Congrats! The fourDeckShip is destroyed'
        fourDeckShip = 10
    }
    if(compTwoDeckShip === 2){
        info.textContent='Oops! Your twoDeckShip is destroyed'
        compTwoDeckShip = 10
    } 
    if(compFirstThreeDeckShip === 3){
        info.textContent='Oops! Your firstThreeDeckShip is destroyed'
        compFirstThreeDeckShip = 10
    }
    if(compSecondThreeDeckShip === 3){
        info.textContent='Oops! Your secondThreeDeckShip is destroyed'
        compSecondThreeDeckShip = 10
    }
    if(compFourDeckShip === 4){
        info.textContent='Oops! Your fourDeckShip is destroyed'
        compFourDeckShip = 10
    }
    if(fourDeckShip + secondThreeDeckShip + firstThreeDeckShip + twoDeckShip === 40){
        info.textContent='Congrats! You win'
    }
    if(compFourDeckShip + compSecondThreeDeckShip + compFirstThreeDeckShip + compTwoDeckShip === 40){
        info.textContent='You loose'
    }
    
}
startButton.addEventListener('click', game)
function end() {
    gameOver = true
}