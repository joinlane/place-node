var place = {
  PROD_URL: "https://api.placepay.com",
  TEST_URL: "https://test-api.placepay.com",
};

place.api_url = place.PROD_URL;
place.api_key = null;

module.exports = place;

var Client = require("./Client");
var resources = require("./resources");

for (var resource in resources) place[resource] = resources[resource];

place.default_client = new Client();
