var rentshare = {
    PROD_URL: 'https://api.rentshare.com',
    TEST_URL: 'https://staging-api.rentshare.com',
}

rentshare.api_url = rentshare.PROD_URL;
rentshare.api_key = null;

module.exports = rentshare;

var Client = require('./Client')
var resources = require('./resources')

for (var resource in resources)
    rentshare[resource] = resources[resource]

rentshare.default_client = new Client();