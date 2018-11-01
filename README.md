# ClearRoad API Node Samples

Samples using the ClearRoad API for node

# Usage

1. Run `$ npm install`
2. Create a `.env` file containing:
```
CLEARROAD_URL=<url>
CLEARROAD_ACCESS_TOKEN=<access token>
```

3. Get a [dropbox access token](#dropbox)
4. Run `$ node index.js`

Alternatively, you can use Google Drive as a storage account: modify `options.localStorage.type` in [index.js](index.js#L15): and set it to `gdrive`. You will need to get an access token as well.

## <a name="dropbox"></a> Using with Dropbox

1. Create an app on your dropbox account that can access it on the [app console](https://www.dropbox.com/developers/apps)
2. Choose the "Dropbox API"
3. Choose "App Folder"
4. Name your app and click on "Create"
6. Generate an access token, save the token in your `.env` file as `DROPBOX_ACCESS_TOKEN`.
7. Update the storage options in [index.js](index.js#L15):
```javascript
const options = {
  localStorage: {
    type: 'dropbox',
    accessToken: process.env.DROPBOX_ACCESS_TOKEN
  }
};
```

## <a name="mariadb"></a> Using with MariaDB

1. Save your mariadb connection params in the `.env` file:
```
MARIADB_HOST=<host>
MARIADB_USER=<user>
MARIADB_PASSWORD=<password>
```

2. Update the storage options in [index.js](index.js#L15):
```javascript
const options = {
  localStorage: {
    type: 'mariadb',
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: 'clearroad-api-node-samples'
  },
  useQueryStorage: true
};
```

## <a name="mongodb"></a> Using with MongoDB

1. Save your mongodb connection string in the `.env` file:
```
MONGODB_URL=mongodb://<user>:<password>@<host>:<port>
```

2. Update the storage options in [index.js](index.js#L15):
```javascript
const options = {
  localStorage: {
    type: 'mongodb',
    url: process.env.MONGODB_URL,
    database: 'clearroad-api-node-samples'
  }
};
```

Alternatively, you can pass in your `user` and `password` in the `clientOptions` options:
```javascript
const options = {
  localStorage: {
    type: 'mongodb',
    url: 'mongodb://<host>:<port>',
    clientOptions: {
      auth: {
        user: 'user',
        password: 'password'
      }
    },
    database: 'clearroad-api-node-samples'
  }
};
```
