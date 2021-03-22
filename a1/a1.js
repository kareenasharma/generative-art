var goodnight = true;
let button = document.getElementById("weather");

document.addEventListener('DOMContentLoaded', function() {
    console.log("Hello World");
    document.body.style.backgroundColor = "#FFF2E5";
    });

function weather() {
    if (goodnight == true) {
        goodnight = false;
        console.log("Goodnight");
        document.body.style.backgroundColor = "black";
        document.getElementById("text").style.color = "white";
    }

    else {
        goodnight = true;
        console.log("Good Morning")
        document.body.style.backgroundColor = "#FFF2E5";
        document.getElementById("text").style.color = "black";
    }
   




}