'use strict'

let currentAccounts = [];

let hideDisplayCurrentAccountForm = () => {
  document.getElementById("idAccount").style.display = 'none';
  document.getElementById("labelIdAccount").style.display = 'none';
  document.getElementById("buttonIDAccount").style.display = 'none';
}

// hideDisplayCurrentAccountForm();

document.getElementById("curr").addEventListener("click", function () {
  CurrentAccount()
});

document.getElementById("save").addEventListener("click", function () {
  SavingsAccount()
});

document.getElementById("disp").addEventListener("click", function () {
  DisplayCurrentAccounts()
});

document.getElementById("buttonIDAccount").addEventListener("click", function () {
  ShowEnteredCurrentAccounts(document.getElementById("idAccount").value)
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