'use strict'

function CurrentAccount() {
    flush_errors_from_main()
    flush_messages_from_main();

    hideDisplayCurrentAccountForm();

    set_screen_for_accounts();

    set_borders_blue();

    setStylesForElementOnFormCurrentAccountsCreation();

    showDisplayCurrentAccountButton();
}

function DisplayCurrentAccounts() {
    flush_errors_from_main()
    flush_messages_from_main();
    hide_form();

    showDisplayCurrentAccountForm();

    setStylesForFormDisplay();

    setStylesForTip();

    setTip();

}

function ShowEnteredCurrentAccounts(accountID) {

    const accountChecked = checkCurrentAccountExistance(accountID);

    let ifCurrentAccountExists = accountChecked();

    if (ifCurrentAccountExists == true) {
        hideTips();

        // alert("Hi, guys!");

    } else {
        setStylesForTip();
        return;
    };
};

let checkCurrentAccountExistance = (accountID) => {

    return function () {
        let findSuccess = false;
        currentAccounts.forEach(function (item, i) {
            for (let key in currentAccounts[i]) {
                if (currentAccounts[i][key] == accountID && key == "AccountID") {
                    findSuccess = true;
                    break;
                }
            }
        })
        if (findSuccess == true) {
            return true;
        } else {
            return false;
        }
    };
}


function SavingsAccount() {
    flush_errors_from_main();
    flush_messages_from_main();
    hideDisplayCurrentAccountButton();
    hideDisplayCurrentAccountForm();
    hide_form();
    set_screen_for_accounts();
    document.getElementById("currencyFromJSON").style.display = 'block';
    loadJSON();
}

function loadJSON() {
    const hackers = "(Unfortunately, server was attacked by Hackers. So, that's all information about your account that is still available)";
    let xobj = new XMLHttpRequest();
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            let actual_JSON = JSON.parse(this.responseText);
            document.getElementById("currencyFromJSON").innerHTML = actual_JSON.posts[0].title + "<br>" + " " + hackers;
        }
    }
    xobj.open('GET', 'https://my-json-server.typicode.com/typicode/demo/db', true);
    xobj.send();
}



function CreateAccount(createDate) {

    let errorsArr = [];

    //  Set error for FIRST NAME
    try {
        CheckFirstName(errorsArr);
        set_border_color("firstName", "rgb(22, 71, 204)");
    } catch (errorFirstName) {
        set_border_color("firstName", "red");
    }


    //  Set error for LAST NAME
    try {
        CheckLastName(errorsArr);
        set_border_color("lastName", "rgb(22, 71, 204)");
    } catch (errorLastName) {
        set_border_color("lastName", "red");
    }

    try {
        checkBalanceisNan(errorsArr);
        CheckBalanceMinlimit(errorsArr);
        CheckBalanceNotInitial(errorsArr);

        set_border_color("Balance", "rgb(22, 71, 204)");
    } catch (errorBalance) {
        set_border_color("Balance", "red");
    }

    //  Set error for REFINANCING RATE
    if (isNaN((Number((document.getElementById("RefRate").value)))) &&
        document.getElementById("RefRate").value.length > 0) {

        errorsArr.push('Refinancing rate can be only a namber');
        document.getElementById("test_col").style.marginTop = "30px";
        set_border_color("RefRate", "red");
    } else {
        set_border_color("RefRate", "rgb(22, 71, 204)");
    }

    if (document.getElementById("RefRate").value.length == 0) {
        errorsArr.push('Refinancing rate can not be initial');
        set_border_color("RefRate", "red");
    }


    document.getElementById("error_messages_on_main").innerHTML = "";
    document.getElementById("test_col").style.marginTop = "0px";

    let fullName = [];
    fullName.push(document.getElementById("firstName").value, document.getElementById("lastName").value);


    const curr_account = new Current_accounts({
        AccountID: getRandomInt(1000000),
        AccountType: 'Current',
        pin: 7348,
        AccountBalance: document.getElementById("Balance").value,
        AccCurrency: document.getElementById("listOfCurrencies").value,
        AccountCreaDate: createDate,
        AccountOwnerName: fullName,
        passportID: 'MB1992819',
        AccountStatus: 'active',
        AccountHistory: document.getElementById("textAreaAccountHistory").value,
    })

    if (errorsArr.length !== 0) {
        curr_account.setListOfErrors(errorsArr);
        set_error_message_style("error_messages_on_main", "15px", "left", "2px double #A52A2A", "10px", "0px", "27px");
        return;
    } else {
        setStylesForCreatedCurrAccount();

        setCreatedCurrentAccount(curr_account);
    }


}




function Internet_banking() {
    flush_messages_from_main();
    hide_form();

    const err_mess = "Unfortunately, this functionality has not been released yet.";

    document.getElementById("error_messages_on_main").innerHTML = err_mess;
    set_error_message_style("error_messages_on_main", "30px", "center", "none", "0px", "30px", "17px");
    set_screen_for_accounts();

    document.getElementsByClassName('column middle')[0].style.backgroundImage = 'url("./images/not_found.jpg")';
    document.getElementsByClassName('column middle')[0].style.backgroundRepeat = 'no-repeat'
    document.getElementsByClassName('column middle')[0].style.backgroundPosition = '140px'
    document.getElementsByClassName('column middle')[0].style.backgroundPositionY = '50px'
    // document.body.style.backgroundRepeat = 'no-repeat';
    hideDisplayCurrentAccountButton();
    hideDisplayCurrentAccountForm();
}




function set_screen_for_accounts() {

    document.getElementsByClassName('column middle')[0].style.backgroundImage = 'none';

    document.getElementsByClassName('column middle')[0].style.background = "none";
    document.getElementsByClassName('column middle')[0].style.padding = "2px";
    document.getElementsByClassName('column middle')[0].style.width = "65%";
    document.getElementById("myDIV").style.borderRadius = "none";
    document.getElementsByClassName('column middle')[0].style.marginRight = "0px";
    document.getElementsByClassName('column middle')[0].style.marginLeft = "0px";
}

let hide_form = () => {
    document.getElementById("test_col").style.display = 'none';
}

let hide_currency = () => {
    document.getElementById("curr_show").innerHTML = ' ';
}

function flush_errors_from_main() {

    document.getElementById("error_messages_on_main").innerHTML = "";
    document.getElementById("error_messages_on_main").style.border = 'none';
    document.getElementById("error_messages_on_main").style.fontSize = 'none';
    document.getElementById("error_messages_on_main").style.padding = '0';
    document.getElementById("error_messages_on_main").style.fontSize = '0';
}

function set_error_message_style(id_message, fontSize, textAlign, styleBorder = "none", padding, marginTop = "5px", marginBottom) {
    const ERROR_COLOR = '#A52A2A';

    document.getElementById(id_message).style.color = 'red';
    document.getElementById(id_message).style.fontSize = fontSize;
    document.getElementById(id_message).style.fontWeight = 'bold';
    document.getElementById(id_message).style.textAlign = textAlign;
    document.getElementById(id_message).style.border = styleBorder;
    document.getElementById(id_message).style.padding = padding;
    document.getElementById(id_message).style.marginTop = marginTop;
    document.getElementById(id_message).style.marginBottom = marginBottom;
}

let flush_messages_from_main = () => {
    document.getElementById("nameAccountOwner").style.display = 'none';
    document.getElementById("AccountBalance").style.display = 'none';
    document.getElementById("annualProfit").style.display = 'none';
    document.getElementById("monthProfit").style.display = 'none';
    document.getElementById("currencyFromJSON").style.display = 'none';
    document.getElementById("CreationDate").style.display = 'none';
    document.getElementById("ClosureDate").style.display = 'none';
    document.getElementById("accountHistory").style.display = 'none';

    document.getElementById("tipsAvailableAccounts").style.border = 'none';
    document.getElementById("tipsAvailableAccounts").style.margin = '0';
    document.getElementById("tipsAvailableAccounts").style.padding = '0';
    document.getElementById("tipsAvailableAccounts").innerHTML = '';


    document.getElementById("accFormAfterCreation").style.paddingBottom = "0px";
}

let setStylesForCreatedCurrAccount = () => {
    document.getElementById("error_messages_on_main").style.marginBottom = "0px";
    document.getElementById("accFormAfterCreation").style.margin = "30px";
    document.getElementById("accFormAfterCreation").style.marginRight = "100px";
    document.getElementById("accFormAfterCreation").style.marginTop = "0px";
    document.getElementById("accFormAfterCreation").style.paddingBottom = "170px";
    document.getElementById("accFormAfterCreation").style.maxHeight = "400px";
    document.getElementById("accFormAfterCreation").style.backgroundImage = 'url("./images/account_created.png")';
    document.getElementById("accFormAfterCreation").style.backgroundRepeat = 'no-repeat';
    document.getElementById("accFormAfterCreation").style.backgroundSize = "500px";
    document.getElementById("accFormAfterCreation").style.backgroundPosition = "right";
    document.getElementById("accFormAfterCreation").style.backgroundPositionY = "top";
}

let setStylesForTip = () => {
    document.getElementById("tipsAvailableAccounts").style.display = "block";
    document.getElementById("tipsAvailableAccounts").style.paddingLeft = '20px';
    document.getElementById("tipsAvailableAccounts").style.position = 'relative';
    document.getElementById("tipsAvailableAccounts").style.top = '400px';
    document.getElementById("buttonIDAccount").style.top = "450px";
}

let hideTips = () => {
    document.getElementById("tipsAvailableAccounts").style.display = "none";
    document.getElementById("buttonIDAccount").style.display = "none";

    document.getElementById("idAccount").style.display = 'none';
    document.getElementById("labelIdAccount").style.display = 'none';

    document.getElementById("idAccount").value = "";

    // document.getElementById("buttonIDAccount").style.top = "473px";

    // document.getElementById("tipsAvailableAccounts").style.margin = '120px';
    // document.getElementById("tipsAvailableAccounts").style.paddingLeft = '120px';
    // document.getElementById("tipsAvailableAccounts").style.padding = '120px';
}

let hideFromDisplay = () => {

}

let setTip = () => {

    let text = '';
    let NumberOfObjects = currentAccounts.length;
    currentAccounts.forEach(function (item, i, arr) {
        if (NumberOfObjects != (i + 1)) {
            text += currentAccounts[i].AccountID.toString() + ',' + ' ';
        } else {
            text += currentAccounts[i].AccountID.toString() + '.';
        }
    });

    document.getElementById("tipsAvailableAccounts").innerHTML = `Remark(available Accounts ID): ${text}`;
}

let setStylesForFormDisplay = () => {
    document.getElementsByClassName('column middle')[0].style.background = "#f2f2f2";
    document.getElementsByClassName('column middle')[0].style.padding = "20px";
    document.getElementsByClassName('column middle')[0].style.width = "62.78%";
    document.getElementById("myDIV").style.borderRadius = "50px";
    document.getElementsByClassName('column middle')[0].style.marginRight = "20px";
    document.getElementsByClassName('column middle')[0].style.marginLeft = "20px";
}

let flush_current_account_info = () => {
    document.getElementById("error_messages_on_main").innerHTML = "";
}

let showDisplayCurrentAccountForm = () => {
    document.getElementById("idAccount").style.display = 'inline-block';
    document.getElementById("labelIdAccount").style.display = 'block';
    document.getElementById("buttonIDAccount").style.display = 'block';

}

function flush_currency_error_message() {
    document.getElementById("currency_error_message").innerHTML = "";
    document.getElementById("currency_error_message").style.border = "none";
}

let set_border_color = (elementName, borderColor) => {
    document.getElementById(elementName).style.borderColor = borderColor;
}

let hideDisplayCurrentAccountButton = () => {
    document.getElementById("disp").style.display = 'none';
}

let showDisplayCurrentAccountButton = () => {

    if (currentAccounts.length !== 0) {
        document.getElementById("disp").style.display = 'block';
    }
}

let set_borders_blue = () => {
    document.getElementsByClassName('fields')[0].style.borderColor = 'rgb(22, 71, 204)';
    document.getElementsByClassName('fields')[2].style.borderColor = 'rgb(22, 71, 204)';
    document.getElementsByClassName('fields_name')[0].style.borderColor = 'rgb(22, 71, 204)';
    document.getElementsByClassName('fields_name')[1].style.borderColor = 'rgb(22, 71, 204)';
}

let setStylesForElementOnFormCurrentAccountsCreation = () => {

    document.getElementById("test_col").style.display = 'block';
    document.getElementById("error_messages_on_main").style.marginTop = "0px";
    document.getElementById("error_messages_on_main").style.marginBottom = "17px";
    document.getElementById("test_col").style.marginTop = "0px";
    document.getElementById("accFormAfterCreation").style.marginBottom = "0px";
}

function clear_values_from_imput_fields() {
    document.getElementsByClassName('fields')[0].value = "";
    document.getElementsByClassName('fields_name')[0].value = "";
    document.getElementsByClassName('fields_name')[1].value = "";
    document.getElementById('textAreaAccountHistory').value = "";
}

function checkBalanceisNan(errorsArr) {

    if (isNaN((Number((document.getElementById("Balance").value)))) &&
        document.getElementById("Balance").value.length > 0) {

        errorsArr.push('Balance of account can be only a namber');
        document.getElementById("test_col").style.marginTop = "30px";
        set_border_color("Balance", "red");
        throw errorBalance;
    }
}

function CheckBalanceMinlimit(errorsArr) {
    if (document.getElementById("Balance").value < 50 &&
        document.getElementById("listOfCurrencies").value === "BYN" &&
        document.getElementById("Balance").value.length !== 0) {

        errorsArr.push('Banance must be more then 50 BYN');
        set_border_color("Balance", "red");

        document.getElementById("test_col").style.marginTop = "30px";
        throw errorBalance;
    }
}

function CheckBalanceNotInitial(errorsArr) {
    if (document.getElementById("Balance").value.length == 0) {
        errorsArr.push('Balance of account can not be initial');
        set_border_color("Balance", "red");
        throw errorBalance;
    }
}

function CheckLastName(errorsArr) {

    if (document.getElementById("lastName").value === "") {

        errorsArr.push('Please fill in your surname');

        document.getElementById("test_col").style.marginTop = "30px";
        set_border_color("lastName", "red");
        throw errorLastName;
    }
}

function CheckFirstName(errorsArr) {
    if (document.getElementById("firstName").value === "") {

        errorsArr.push('Please fill in your first name');

        document.getElementById("test_col").style.marginTop = "30px";
        set_border_color("firstName", "red");
        throw errorFirstName;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function setCreatedCurrentAccount(curr_account) {

    hide_form();

    document.getElementById("nameAccountOwner").style.display = 'block';
    document.getElementById("nameAccountOwner").innerHTML = "<span class='select'>Full Name:</span>" + " " + curr_account._AccountOwnerName;

    document.getElementById("AccountBalance").style.display = 'block';
    document.getElementById("AccountBalance").innerHTML = "<span id='secondLine'>Account Balance:</span>" + " " + curr_account.AccountBalance + " " + curr_account.AccCurrency;

    curr_account.refinancingRate = Number(document.getElementById("RefRate").value)
    document.getElementById("annualProfit").style.display = 'block';
    document.getElementById("annualProfit").innerHTML = "<span id='thirdLine'>Annual profit:</span>" + " " + curr_account.annual_profit;

    document.getElementById("monthProfit").style.display = 'block';
    document.getElementById("monthProfit").innerHTML = "<span id='fourthLine'>Monthly profit:</span>" + " " + curr_account.monthly_profit;

    document.getElementById("CreationDate").style.display = 'block';
    let dateCreate = curr_account.getDateAccountCreation();
    curr_account.AccountCreaDate = dateCreate;
    document.getElementById("CreationDate").innerHTML = "<span id='fifthLine'>Date opening:</span>" + " " + dateCreate;

    document.getElementById("ClosureDate").style.display = 'block';
    let dateClosure = curr_account.getDateAccountClosure();
    document.getElementById("ClosureDate").innerHTML = "<span id='sixthLine'>Date closure:</span>" + " " + dateClosure;

    if (curr_account.AccountHistory !== "") {
        document.getElementById("accountHistory").style.display = 'block';
        document.getElementById("accountHistory").innerHTML = "<span id='seventhLine'>Account history:</span><br><div id='textHistory'>" + curr_account.AccountHistory + "</div>";
    }

    currentAccounts.push(curr_account);
    showDisplayCurrentAccountButton();

    flush_errors_from_main();
    clear_values_from_imput_fields();
}