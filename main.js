'use strict';

//HTML elements 
const bill = document.getElementById("bill-input");
const tip = document.getElementsByClassName("choose-tip-amount");
const custom = document.getElementById("custom-percent");
const peopleAmount= document.getElementById("people-amount-input");
const resetButton = document.getElementsByClassName("resset-button");
let error = document.getElementById("error");
let percent;

bill.addEventListener("input", function () {
    calculate();
} )

// Change the buttons color on click
let clickedButton;

for (let i = 0; i < tip.length; i++) { 

    tip[i].addEventListener("click", function (event) {
        custom.value = "";
        if ( clickedButton != undefined ) {
            clickedButton.style.backgroundColor = "hsla(183, 100%, 15%, 1)";
            clickedButton.style.color = "white";
        }
        event.target.style.backgroundColor = "#26C2AE";
        event.target.style.color = "hsla(183, 100%, 15%, 1)";
        clickedButton = event.target;
        percent = clickedButton.value;
        calculate();
    });
}
peopleAmount.addEventListener("input", function (event) {
    if(+peopleAmount.value === 0 ) {
        error.style.display = "block";
        console.log("morning");
        peopleAmount.style.border = "2px solid hsla(13, 70%, 60%, 1)";
    // } else if (peopleAmount.value == "") { 
    //     error.style.display = "none";
    //     peopleAmount.style.border = "none";
    // 0-ს რომ წაშლის მომხმარებელი custom-იდან, როგორ გავაქრო ერორი?
    } 
    if ( +peopleAmount.value !== 0 || peopleAmount.value == "") {
        error.style.display = "none";
        peopleAmount.style.border = "";
    }
    console.log(Boolean(+peopleAmount.value), Boolean(0));

    calculate();    
})

let clickedCustom;

// Sets the default color to the buttons and calculates the custom percent
custom.addEventListener("focus", () => {
    if ( clickedButton != undefined ) {
        clickedButton.style.backgroundColor = "hsla(183, 100%, 15%, 1)";
        clickedButton.style.color = "white";
    }
    if (!(custom.value > 0)) { 
        document.getElementById("resulted-tip").innerHTML = "$" + "0.00";
        document.getElementById("resulted-total").innerHTML = "$" + "0.00";
    }
});

custom.addEventListener("input", function (event) {
    clickedCustom = event.target;
    percent = custom.value;
    calculate();
} );

// Calculates tip amount and total bill per person

function calculate() {
    if (bill.value > 0 && percent > 0 && peopleAmount.value > 0) {

        let totalTip = Number(bill.value) * Number(percent) / 100;
        let tipPerPerson = totalTip / Number(peopleAmount.value);
        let billPerPerson = Number(bill.value) / Number(peopleAmount.value);
        let totalPerPerson = tipPerPerson + billPerPerson;
        document.getElementById("resulted-tip").innerHTML = "$"+(new Number(tipPerPerson)).toFixed(2);
        document.getElementById("resulted-total").innerHTML = "$"+(new Number(totalPerPerson)).toFixed(2);
        document.querySelector(".reset-button").style.backgroundColor="#26C2AE";
    }else {
        document.getElementById("resulted-tip").innerHTML = "$" + "0.00";
        document.getElementById("resulted-total").innerHTML = "$" + "0.00";
    }
}

function calculateCustom() {
    if (bill.value > 0 && percent > 0 && peopleAmount.value > 0) {
        let totalTip = Number(bill.value) * Number(percent) / 100;
        let tipPerPerson = totalTip / Number(peopleAmount.value);
        let billPerPerson = Number(bill.value) / Number(peopleAmount.value);
        let totalPerPerson = tipPerPerson + billPerPerson;
        document.getElementById("resulted-tip").innerHTML = "$" + (new Number(tipPerPerson)).toFixed(2);
        document.getElementById("resulted-total").innerHTML = "$" + (new Number(totalPerPerson)).toFixed(2);
        document.querySelector(".reset-button").style.backgroundColor="#26C2AE";
    }
}

function setResultZero() {
    document.getElementById("resulted-tip").innerHTML = "$" + "0.00";
    document.getElementById("resulted-total").innerHTML = "$" + "0.00";
    document.querySelector(".reset-button").style.backgroundColor="#0D686D";
    if ( clickedButton != undefined ) {
        clickedButton.style.backgroundColor = "hsla(183, 100%, 15%, 1)";
        clickedButton.style.color = "white";
    }
}
