const userField = document.querySelector('.user_grid')
const compField = document.querySelector('.comp_grid')
const shipContainer = document.querySelector('.grid_display')
const ships = document.querySelectorAll('.ship')
const boat = document.querySelector('.boat_container')
const submarine = document.querySelector('.submarine_container')
const cruiser = document.querySelector('.cruiser_container')
const battleship = document.querySelector('.battleship_container')
const rotateButton = document.querySelector('#rotate')
const width = 10
const addButton = document.querySelector('#add')
let modalShow = document.querySelector('.modal_wrapper')
const userSquares = []
const compSquares = []
let isHorizontal = true
const createBoard = (grid,squares) => {
    for(let i=0; i<width*width; i++){
        const square = document.createElement('div')
        square.dataset.id = i
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard(userField, userSquares)
createBoard(compField, compSquares)

const shipsArray=[
    {
        name: 'twoDeckShip',
        directions:[
            [0, 1],
            [0, width]
        ]
    },
    {
        name: 'firstThreeDeckShip',
        directions:[
            [0, 1, 2],
            [0, width, width*2]
        ]
    },
    {
        name: 'secondThreeDeckShip',
        directions:[
            [0, 1, 2],
            [0, width, width*2]
        ]
    },
    {
        name: 'fourDeckShip',
        directions:[
            [0, 1, 2, 3],
            [0, width, width*2, width*3]
        ]
    }
]
function generate(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) direction = 1
    if (randomDirection === 1) direction = 10
    let randomStart = Math.abs(Math.floor(Math.random() * compSquares.length - (ship.directions[0].length * direction)))
    const isTaken = current.some(index => compSquares[randomStart + index].classList.contains('taken'))
    if (!isTaken) current.forEach(index => compSquares[randomStart + index].classList.add('taken', ship.name))
    else generate(ship)
  }
generate(shipsArray[0])
generate(shipsArray[1])
generate(shipsArray[2])
generate(shipsArray[3])

const rotate = () =>{
    if(isHorizontal){
        boat.classList.toggle('boat_container_vert')
        submarine.classList.toggle('submarine_container_vert')
        cruiser.classList.toggle('cruiser_container_vert')
        battleship.classList.toggle('battleship_container_vert')
        shipContainer.style.display = 'flex'
        isHorizontal = false
        console.log(isHorizontal)
        return
    }
    if(!isHorizontal){
        boat.classList.toggle('boat_container_vert')
        submarine.classList.toggle('submarine_container_vert')
        cruiser.classList.toggle('cruiser_container_vert')
        battleship.classList.toggle('battleship_container_vert')
        shipContainer.style.display = 'block'
        isHorizontal = true
        console.log(isHorizontal)
        return
    }

}
rotateButton.addEventListener('click',rotate)
const addPlayer = () => {
    modalShow.classList.add('show_modal')
    document.querySelector('.er_message').classList.add('show_modal')
}
document.addEventListener('click',(e)=> {
    if(e.target.closest('span')){
        modalShow.classList.remove('show_modal')
        document.querySelector('.er_message').classList.remove('show_modal')
    }
})
addButton.addEventListener('click', addPlayer)
//let dataset_num = 1
let draggableShip = null
let draggableShipLength = null
let draggableShipName = null

function dragStart(){
    draggableShip = this 
    draggableShipLength = this.children.length
    console.log(draggableShipLength)
    /*  setTimeout(()=>{
        this.style.display="none"
    },0) */ 
}
function dragEnd(){
    draggableShip = this
    //console.log(this.dataset.id)
     /* setTimeout(()=>{
        this.style.display="block"
    },0)   */  
}
function dragOver(e){
    e.preventDefault()

}
function dragEnter(){
    console.log('dragenter')
}
function dragLeave(){
    console.log('dragleave')
}
function dragDrop(){
    let lastShipNameId = draggableShip.lastElementChild.id
    let shipClass =  lastShipNameId.slice(0, -1)
    console.log(shipClass)
    let lastShipIndex = parseInt( lastShipNameId.substr(-1))
    let shipLastId = lastShipIndex + parseInt(this.dataset.id)
    console.log(shipLastId)
    selectedShipIndex = parseInt(draggableShipName.substr(-1))
    shipLastId = shipLastId - selectedShipIndex 
    if (isHorizontal) {
        for (let i=0; i < draggableShipLength; i++) {
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', shipClass)
        } 
    } else if(!isHorizontal){
        for (let i=0; i < draggableShipLength; i++) {
            userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', shipClass)
        }
    } else return

        
    shipContainer.removeChild(draggableShip)
    console.log("dragDrop")
}


ships.forEach((ship)=>{
    ship.addEventListener('mousedown', (e) => {
        draggableShipName = e.target.id
        console.log(draggableShipName)
    })
    ship.addEventListener('dragstart', dragStart)
    ship.addEventListener('dragend', (e)=>{
        dragEnd(e)
        
    })
})
userSquares.forEach(square=> square.addEventListener('dragstart', dragStart))
userSquares.forEach(square=> square.addEventListener('dragover', dragOver))
userSquares.forEach(square=> square.addEventListener('dragenter', dragEnter))
userSquares.forEach(square=> square.addEventListener('dragleave', dragLeave))
userSquares.forEach(square=> square.addEventListener('dragend', dragEnd))
userSquares.forEach(square=> square.addEventListener('drop', dragDrop))


const shipsArrayUser=[
    {
        name: 'boat',
        directions:[
            [0, 1],
            [0, width]
        ]
    },
    {
        name: 'submarine',
        directions:[
            [0, 1, 2],
            [0, width, width*2]
        ]
    },
    {
        name: 'cruiser',
        directions:[
            [0, 1, 2],
            [0, width, width*2]
        ]
    },
    {
        name: 'battleship',
        directions:[
            [0, 1, 2, 3],
            [0, width, width*2, width*3]
        ]
    }
]
function generateUserShip(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) direction = 1
    if (randomDirection === 1) direction = 10
    let randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (ship.directions[0].length * direction)))
    const isTaken = current.some(index => userSquares[randomStart + index].classList.contains('taken'))
    if (!isTaken) current.forEach(index => userSquares[randomStart + index].classList.add('taken', ship.name))
    else generate(ship)
  }
  document.querySelector('#random').addEventListener('click', (e)=>{
    generateUserShip(shipsArrayUser[0])
    generateUserShip(shipsArrayUser[1])
    generateUserShip(shipsArrayUser[2])
    generateUserShip(shipsArrayUser[3])
    shipContainer.innerHTML=''
  })