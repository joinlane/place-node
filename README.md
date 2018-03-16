# RentShare Node.js Library

A Node library for interfacing with the RentShare API

## Installation

To install using [npm](https://www.npmjs.com/):

```bash
npm install git+ssh://git@github.com/rentshare/rentshare-node.git
```

## Basic usage

```javascript

var rentshare = require('rentshare');

// set your api key
rentshare.api_key = = 'private_key_6fsMi3GDxXg1XXSluNx1sLEd';

var account = await rentshare.Account.create({
  email: 'joe.schmoe@example.com',
  full_name: 'Joe Schmoe',
  user_type: 'payer'
}).then(function(account) {
  console.log(account.id)
});
```

## Documentation
Read the [docs](https://developer.rentshare.com/?node)
