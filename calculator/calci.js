const display = document.getElementById("display")

function appendToDisplay(input){
    display.value = display.value + input;
  }

function clearDisplay()
{
    display.value="0"
}

function result(){
    try{
        display.value = eval(display.value)
    }
    catch{
        display.value="Error"
    }
}

function clearLastElement(){
    display.value = display.value.slice(0, -1)
}