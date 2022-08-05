var display = document.querySelector("#display");
var grid = document.querySelector("#buttons-grid");
addButtons();

function addButtons(){ //add html and functionality of buttons
    
    var curNum = 1; //Variable that holds the current number being added

    for(var i = 4; i > 0 ; i--){
        var row = document.createElement('div');
        row.className = 'row';
        for(var j = 0; j < 4; j++){
            if(i != 4){
                var button = document.createElement('div');
                if(j != 3){ //if isn't the last button of the row, the current button is a number
                    button.className = 'button number';
                    button.innerHTML = `${curNum}`; 
                    curNum++;
                }else{//last button of the row represents an operation, such as subtraction, multiplication and division
                    switch(i){
                        case 3:
                           button.className = 'button minus';
                           button.innerHTML =  '-';
                            break;
                        case 2:
                            button.className = 'button multiplication';
                            button.innerHTML = 'x';
                            break;
                        case 1:
                            button.className = 'button division';
                            button.innerHTML = '/';
                            break;
                    }
                }
            }else{ //Adding buttons of first row, such as reset, equal, the number 0 and the plus symbol
                var button = document.createElement('div');
                switch(j){
                    case 0:
                        button.className = 'button reset';
                        button.innerHTML = 'C';
                        break;
                    case 1:
                        button.className = 'button zero';
                        button.innerHTML = 0;
                        break;
                    case 2:
                        button.className = 'button equal';
                        button.innerHTML = '=';
                        break;
                    case 3:
                        button.className = 'button plus';
                        button.innerHTML = '+';
                        break;
                }
            }
            row.appendChild(button);
        }
        grid.appendChild(row);
    }



    document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", function(e){
            switch(e.target.classList[1]){ //switch case, depending on the name of the second class
                case 'number':
                    text = document.createTextNode(e.target.innerHTML);
                    break;
                case 'plus':
                    text = document.createTextNode("+");
                    break;
                case 'minus':
                    text = document.createTextNode("-");
                    break;
                case 'multiplication':
                    text = document.createTextNode("x");
                    break;
                case 'division':
                    text = document.createTextNode("/");
                    break;
                case 'zero':
                    text = document.createTextNode('0');
                    break;
                case 'reset':
                    text = "";
                    display.innerHTML = "";
                    break;
            }
            display.appendChild(text);
        });
    });
}