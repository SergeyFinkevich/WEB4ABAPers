'use strict'

document.getElementById("curr").addEventListener("click", function () {
  CurrentAccount()
});

document.getElementById("save").addEventListener("click", function () {
  SavingsAccount()
});

document.getElementById("submit").addEventListener("click", function () {
  Upload_currency_rates()
});

document.getElementById("IB").addEventListener("click", function () {
  Internet_banking()
});

document.getElementById("dep").addEventListener("click", function () {
  Internet_banking()
});

document.getElementById("cred").addEventListener("click", function () {
  Internet_banking()
});

document.getElementById("create_curr").addEventListener("click", function () {
  CreateAccount()
});