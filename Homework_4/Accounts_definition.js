class Accounts {

    constructor(options) {
        this.AccountID = options.AccountID;
        this.AccountType = options.AccountType;
        this.pin = options.pin;
        this.AccountBalance = options.AccountBalance;
        this.AccCurrency = options.AccCurrency;
        this.AccountCreaDate = options.AccountCreaDate;
        this.AccountOwnerName = options.AccountOwnerName;
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
        return this.AccountBalance * (this._refinancing_rate / 100) + ' ' + this.AccCurrency;
    }

    set refinancingRate(value) {
        this._refinancing_rate = value;
    }

    set AccountOwnerName(value) {
        this._AccountOwnerName = value[0] + " " + value[1];
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