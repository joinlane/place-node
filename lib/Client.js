var place = require("./place");

class Client {
  constructor(api_key, api_url) {
    this._api_key = api_key;
    this._api_url = api_url;
  }

  get api_key() {
    return this._api_key || place.api_key;
  }

  get api_url() {
    if (this._api_url) return this._api_url;
    if (
      this.api_key &&
      this.api_key.startsWith("test_") &&
      place.api_url == place.PROD_URL
    )
      return place.TEST_URL;

    return place.api_url;
  }

  place() {
    return place;
  }
}

module.exports = Client;
