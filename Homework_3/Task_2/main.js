
document.getElementById("ButtonLink").addEventListener("click", function() { myFunctionLink() });

document.getElementById("ButtonClear").addEventListener("click", function() { myFunctionClear() });

function myFunctionLink() {
    document.location.href = "https://www.w3schools.com/";
}

function myFunctionClear() {
    document.body.innerHTML = '';
}