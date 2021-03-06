let gameOver = false
let currentPlayer = 'user'
const startButton = document.querySelector('#start_game')
const playerText = document.querySelector('.player')
const userGoals = document.querySelector('.your_goals')
const compGoals = document.querySelector('.comp_goals')
const info = document.querySelector('.information')
let currentFlag = 0
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
        currentFlag = 1
    }
    if(currentPlayer==='computer'){
        playerText.textContent = "computer's turn"
        if(currentFlag){
            setTimeout(compPlay, 1000)
            currentFlag = 0
        }
    }
}


let twoDeckShip = 0
let firstThreeDeckShip = 0
let secondThreeDeckShip = 0
let fourDeckShip = 0
function showSquare(squre){
    if(!squre.classList.contains('red') && !squre.classList.contains('black')){
        if(squre.classList.contains('twoDeckShip')){
            twoDeckShip++
            if(twoDeckShip ===2 ){
                document.querySelectorAll('.twoDeckShip').forEach(item => item.style.backgroundColor = 'grey')
            }
        }
        
        if(squre.classList.contains('firstThreeDeckShip')){
            firstThreeDeckShip++
            if(firstThreeDeckShip === 3 ){
                document.querySelectorAll('.firstThreeDeckShip').forEach(item => item.style.backgroundColor = 'grey')
            }
        } 
        if(squre.classList.contains('secondThreeDeckShip')){
            secondThreeDeckShip++
            if(secondThreeDeckShip === 3 ){
                document.querySelectorAll('.secondThreeDeckShip').forEach(item => item.style.backgroundColor = 'grey')
            }
        } 
        if(squre.classList.contains('fourDeckShip')){
            fourDeckShip++
            if(fourDeckShip === 4 ){
                document.querySelectorAll('.fourDeckShip').forEach(item => item.style.backgroundColor = 'grey')
            }
        } 
        if(squre.classList.contains('taken')) squre.classList.add('red')   
        if(!squre.classList.contains('taken')){ 
            squre.classList.add('black')    
        }    
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
        if(userSquares[shot].classList.contains('boat')){
            compTwoDeckShip++
            if(compTwoDeckShip ===2 ){
                document.querySelectorAll('.boat').forEach(item => item.style.backgroundColor = 'grey')
            }
        }
        if(userSquares[shot].classList.contains('submarine')){
            compFirstThreeDeckShip++
            if(compFirstThreeDeckShip === 3 ){
                document.querySelectorAll('.submarine').forEach(item => item.style.backgroundColor = 'grey')
            }
        } 
        if(userSquares[shot].classList.contains('cruiser')){
            compSecondThreeDeckShip++
            if(compSecondThreeDeckShip === 3 ){
                document.querySelectorAll('.cruiser').forEach(item => item.style.backgroundColor = 'grey')
            }
        } 
        if(userSquares[shot].classList.contains('battleship')){
            compFourDeckShip++
            if(compFourDeckShip === 4 ){
                document.querySelectorAll('.battleship').forEach(item => item.style.backgroundColor = 'grey')
            }
        } 
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
        playerText.textContent='Congrats! You win'
        end()
    }
    if(compFourDeckShip + compSecondThreeDeckShip + compFirstThreeDeckShip + compTwoDeckShip === 40){
        playerText.textContent="You've lost"
        end()
    }
    
}
startButton.addEventListener('click', (e)=>{
   if(shipContainer.children.length!==0) playerText.textContent = 'put all your ships'
   if(shipContainer.children.length ===0){
    playerText.textContent = 0
    shipContainer.style.display = 'none'
    game()
   }
})
function end() {
    gameOver = true
    startButton.removeEventListener('click', game)
}