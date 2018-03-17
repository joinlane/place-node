var rentshare = require('./rentshare');

class Client {

    constructor(api_key, api_url) {
        this._api_key = api_key;
        this._api_url = api_url;
    }

    get api_key() {
        return this._api_key || rentshare.api_key;
    }

    get api_url() {
        return this._api_url || rentshare.api_url;
    }

    rentshare() {
        return rentshare
    }
}

module.exports = Client