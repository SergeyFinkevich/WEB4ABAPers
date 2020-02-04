'use strict'

function CurrentAccount() {
    flush_errors()
    flush_messages_from_main();

    set_screen_for_accounts();

    document.getElementById("form_login").style.display = 'block';
};

function SavingsAccount() {
    flush_errors();
    hide_form();
    set_screen_for_accounts();

    loadJSON();
};

function loadJSON() {
    const hackers = "(Unfortunately, server was attacked by Hackers. So, that's all information about your account that is still available)";
    let xobj = new XMLHttpRequest();
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            let actual_JSON = JSON.parse(this.responseText);
            document.getElementById("currencyFromJSON").innerHTML = actual_JSON.posts[0].title + "<br>" + " " + hackers;
        }
    };
    xobj.open('GET', 'https://my-json-server.typicode.com/typicode/demo/db', true);
    xobj.send();
};

function flush_errors() {

    document.getElementById("currency_error_message").innerHTML = "";
    document.getElementById("error_messages_on_main").innerHTML = "";
};

function set_error_message_style(id_message, fontSize, leftProperty) {
    const ERROR_COLOR = '#42B4C5';

    document.getElementById(id_message).style.color = ERROR_COLOR;
    document.getElementById(id_message).style.fontSize = fontSize;
    document.getElementById(id_message).style.fontWeight = 'bold';
    document.getElementById(id_message).style.left = leftProperty;
};

function set_errors_on_main(error_message) {

    document.getElementById("error_messages_on_main").innerHTML = error_message;
    set_error_message_style("error_messages_on_main", "30px", "762px");
}

let flush_messages_from_main = () => {
    document.getElementById("nameAccountOwner").style.display = 'none';
    document.getElementById("annualProfit").style.display = 'none';
};

function Internet_banking() {
    // flush_errors();
    flush_messages_from_main();
    hide_form();
    const err_mess = "Unfortunately, this functionality is not released yet.";
    document.getElementById("error_messages_on_main").innerHTML = err_mess;
    set_error_message_style("error_messages_on_main", "30px", "850px");
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundImage = 'url("./images/not_found.jpg")';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = '640px 200px';
};

function set_screen_for_accounts() {
    document.body.style.backgroundImage = 'none';
}

let hide_form = () => {
    document.getElementById("form_login").style.display = 'none';
};

function CreateAccount() {

    if (document.getElementById("firstName").value === "" ||
        document.getElementById("lastName").value === "") {
        set_errors_on_main("Please fill out both name and surname fields");
        return;
    };

    if (Number(document.getElementById("RefRate")) == NaN) {
        set_errors_on_main("Only nambers psz");
        return;
    }


    hide_form();

    document.getElementById("error_messages_on_main").innerHTML = "";


    let fullName = [];
    fullName.push(document.getElementById("firstName").value, document.getElementById("lastName").value);

    const curr_account = new Current_accounts({
        AccountID: '123343',
        AccountType: 'S',
        pin: 7348,
        AccountBalance: 3000,
        AccCurrency: 'BYN',
        AccountCreaDate: '10.12.2019',
        AccountOwnerName: fullName,
        AccountStatus: 'active',
        AccountHistory: '01.01.2019 - changed',
    });

    document.getElementById("nameAccountOwner").style.display = 'block';
    document.getElementById("nameAccountOwner").innerHTML = curr_account._AccountOwnerName;

    curr_account.refinancingRate = Number(document.getElementById("RefRate").value)
    document.getElementById("annualProfit").style.display = 'block';
    document.getElementById("annualProfit").innerHTML = curr_account.annual_profit;


};