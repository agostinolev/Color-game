var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var messageDisplay = document.getElementById("message");
var resetBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var colorDisplay = document.getElementById("colorDisplay");

init();

function init() {
    setupModeButtons();

    setupSquares();

    reset();
}

function setupModeButtons() {
    for (var i=0;i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            numSquares = this.textContent === "Easy" ? 3 : 6;
            reset();
        });
    };
};

function setupSquares(){
    for (var i = 0; i<squares.length; i++){
        //add click listeners to squares
        squares[i].addEventListener("click", function() {
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor;
    
            //compare color
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                changeColors(pickedColor);
                resetBtn.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            };
    
        });
    };
}


function reset() {
    // generate new colors
    colors = generateRandomColors(numSquares);

    //pick new random color
    pickedColor = pickColor();

    // colorDisplay match picked color
    colorDisplay.textContent = pickedColor;

    //change the color of squares
    for (var i = 0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    };
    document.querySelector("h1").style.backgroundColor = "steelblue";
    resetBtn.textContent = "New Colors";
    messageDisplay.textContent = "";
};


resetBtn.addEventListener("click", function() {
    reset();
});




function changeColors(color) {
    //all squares changed to the matched color
    for (var i = 0; i<squares.length; i++){
        squares[i].style.backgroundColor = color;
    };
    document.querySelector("h1").style.backgroundColor = color;
};

function pickColor() {
    return colors[Math.floor(Math.random() * colors.length)];
};

function generateRandomColors(num){
    // make an array
    var arr = [];

    //add num random color to arr
    for (var i=0; i< num; i++){
        //get random color and push in arr
        arr.push(randomColor());
    }

    return arr;
};

function randomColor(){
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}