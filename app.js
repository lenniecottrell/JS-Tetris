document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10;
    
    //The Tetrominoes
    //each inner array is a rotation
    const lTetromino = [
        [1, width+1, width*2+1, 2], //1, 11, 21, 2
        [width, width+1, width+2, width*2+2], //10, 11, 12, 22
        [1, width+1, width*2+1, width*2], //1, 11, 21, 20
        [width, width*2, width*2+1, width*2+2] //10, 20, 21, 22
    ]
    
    const zTetromino = [
        [0, width, width+1, width*2+1], //0, 10, 11, 21
        [width+1, width+2, width*2, width*2+1],// 11, 12, 20, 21
        [0, width, width+1, width*2+1], //0, 10, 11, 21
        [width+1, width+2, width*2, width*2+1],// 11, 12, 20, 21
    ]
    
    const tTetromino = [
        [1, width, width+1, width+2], //1, 10, 11, 12
        [1, width+1, width+2, width*2+1], //1, 11, 12, 21
        [width, width+1, width+2, width*2+1], //10, 11, 12, 21
        [1, width, width+1, width*2+1] //1, 10, 11, 21
    ]
    
    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]
    
    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]
    //This is an array of arrays
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    
    console.log(theTetrominoes)
    
    let currentPosition = 4
    let currentRotation = 0
    
    
    //randomly select a Tetromino and its first rotation
    //Math.random()*theTetrominoes.length multiplies the length of the tetrominos array times a random number between 0 and 1.
    let random = Math.floor(Math.random()*theTetrominoes.length)
    
    console.log(random) //check which tetromino was selected
    
    let current = theTetrominoes[random][currentRotation] //current = a random Tetromino, always starting at rotation [currentRotation], all of which which is in an array called theTetrominos.
    //Another way of thinking about it is 
    //current = theTetrominoes[tetromino][rotationNumber]
    
    
    //draw the tetromino
    //We made an array of <div>s called squares
    //to get the right position, we find the index of the current <div> plus the current position, and add the class "tetromino" to that <div>
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }
    draw();
    
    // undraw the chosen tetromino
    function undraw() {
        //for each item in the 'current' array
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }
    
    //make the tetromino move down every second
    timerId = setInterval(moveDown, 1000)
    
    //assign functions to keyCodes
    function control(event) {
        if (event.keyCode === 37) {
            moveLeft()
        } else if (event.keycode === 38) {
            rotate()
        } else if (event.keyCode === 39) {
            moveRight()
        } else if (event.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)// params are ('event', function)
    
    //move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }
    moveDown()
    
    //freeze function
    //this checks if any of the squares are below the play grid (index > 200). if they do, it adds the 'taken' class to those squares and it 'freezes' it where it is.
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino
            random = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }
    
    //move the tetromino left, unless it is on the edge
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        
        if(!isAtLeftEdge) currentPosition -= 1
        
        if (current.some(index => square[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }
        
        draw()
        
    }
    
    //move the tetromino right, unless it is on the edge
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        
        if(!isAtRightEdge) currentPosition += 1
        
        if (current.some(index => square[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }
        draw()
        
    }
    
    // rotate the tetromino
    function rotate() {
        undraw()
        currentRotation ++
        if(currentRotation === current.length) { //if the current rotation gets to 4, set it back to 0
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }
    
    
    
    
    
    
    
    
    
    
})