# SMART COMMUTE BACKEND SERVICE

This service is the smart commute backend service

## Requirements

- node.js v12.12
- npm 6.12

## How it works
To run in local:
create a file `local.js` in /config
```
const config = {
  mongodbUrl: 'yourMongoDbUrl',
};
module.exports = config;
```

Start a local server:
```
node index.js
```

Server will run at localhost:3000




```
| - route
|     - event
| - middleware
|     - auth
| - middleware
|     - auth
| - model
|     - database
|     - event
```
## Deploy

`git push heroku master`

