class Accounts {

    constructor(options) {
        this.AccountID = options.AccountID;
        this.AccountType = options.AccountType;
        this.pin = options.pin;
        this.AccountBalance = options.AccountBalance;
        this.AccCurrency = options.AccCurrency;
        this.AccountCreaDate = options.AccountCreaDate;
        this.AccountOwnerName = options.AccountOwnerName;
        this.passportID = options.passportID;
        this.AccountStatus = options.AccountStatus;
        this.AccountHistory = options.AccountHistory;
    }

    get annual_profit() {
        return this.AccountBalance * 0.1 + ' ' + this.AccCurrency;
    }

    set refinancingRate(value) {
        [this.refinancing_rate] = value;
    }
};

class Current_accounts extends Accounts {

    constructor(options) {
        super(options);
    }

    get annual_profit() {

        let koefOfCurrency = 0;
        switch (this.AccCurrency) {
            case 'BYN':
                koefOfCurrency = 1;
                break;
            case 'USD':
                koefOfCurrency = 0.1;
                break;
            case 'EUR':
                koefOfCurrency = 0.1;
                break;
            default:
                break;
        }

        return (this.AccountBalance * ((this._refinancing_rate / 100) * koefOfCurrency)).toFixed(2) + ' ' + this.AccCurrency;
    }

    get monthly_profit() {
        let koefOfCurrency = 0;
        switch (this.AccCurrency) {
            case 'BYN':
                koefOfCurrency = 1;
                break;
            case 'USD':
                koefOfCurrency = 0.1;
                break;
            case 'EUR':
                koefOfCurrency = 0.1;
                break;
            default:
                break;
        }

        return ((this.AccountBalance * (this._refinancing_rate / 100) * koefOfCurrency) / 12).toFixed(2) + ' ' + this.AccCurrency;
    }

    set refinancingRate(value) {
        this._refinancing_rate = value;
    }

    set AccountOwnerName(value) {
        this._AccountOwnerName = value[0] + " " + value[1];
    }

    myFunction(item, index) {
        document.getElementById("error_messages_on_main").innerHTML += (index + 1) + ")" + " " + item + "<br>";
    }

    setListOfErrors(arrErrors) {

        arrErrors.forEach(this.myFunction);
    }

    getDateAccountCreation() {

        let date = new Date();

        var options = {
            // era: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            // weekday: 'long',
            timezone: 'UTC',
            // hour: 'numeric',
            // minute: 'numeric',
            // second: 'numeric'
        };

        return (date.toLocaleString("en-US", options));
    };

    getDateAccountClosure() {
        let date = new Date();

        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
        };

        date.setFullYear(date.getFullYear() + 1);

        return (date.toLocaleString("en-US", options));
    }

};

class Savings_accounts extends Accounts {

    constructor(options) {
        super(options);
    }

    get annual_profit() {
        return this.AccountBalance * 0.2 * 0.87 + ' ' + this.AccCurrency;
    }
};