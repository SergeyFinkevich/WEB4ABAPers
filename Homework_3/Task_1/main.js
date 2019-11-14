"use strict";

function matchExpression(name) {
    var rgularExp = {
        containsNumber: /\d+/,
    }

    var resultString = "";
    if (rgularExp.containsNumber.test(name)) {

        for (var i = 0; i <= name.length - 1; i++) {
            if (i % 2 == 0) {
                resultString += name[i].toUpperCase();
            } else {
                resultString += name[i].toLowerCase();
            }
        }
    } else {
        resultString = ReverseString(name);
    }
    return resultString;
}

function ReverseString(str) {
    var reverseString = "";

    for (var i = str.length - 1; i >= 0; i--) {
        reverseString += str[i];
    }
    return reverseString;

}

document.getElementById('name').innerHTML = matchExpression(prompt('Fill up your name:', 'Sergey Finkevich'))