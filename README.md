# Place Node.js Library

A Node library for interfacing with the Place API

## Installation

To install using [npm](https://www.npmjs.com/):

```bash
npm install place-api
```

## Basic usage

```javascript

var place = require('place-api');

// set your api key
place.api_key = = 'private_key_6fsMi3GDxXg1XXSluNx1sLEd';

var account = place.Account.create({
  email: 'joe.schmoe@example.com',
  full_name: 'Joe Schmoe',
  user_type: 'payer'
}).then(function(account) {
  console.log(account.id)
});
```

## Documentation
Read the [docs](https://developer.placepay.com/?javascript)
