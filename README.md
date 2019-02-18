# ClearRoad API Node Samples

[![Build Status](https://gitlab.com/clearroad/api-node-samples/badges/master/pipeline.svg)](https://gitlab.com/clearroad/api-node-samples/commits/master)

Samples using the ClearRoad API for node

# Usage

1. Run `$ npm install`
2. Create a `.env` file containing:
```
CLEARROAD_URL=<url>
CLEARROAD_ACCESS_TOKEN=<access token>
CLEARROAD_STORAGE=memory
```

3. Run `$ node index.js`

Alternatively, you can use Google Drive as a storage account: modify `options.localStorage.type` in [index.js](index.js#L15): and set it to `gdrive`. You will need to get an access token as well.

## <a name="dropbox"></a> Using with Dropbox

1. Create an app on your dropbox account that can access it on the [app console](https://www.dropbox.com/developers/apps)
2. Choose the "Dropbox API"
3. Choose "App Folder"
4. Name your app and click on "Create"
6. Generate an access token
7. Save the token in the `.env` file and set the storage as `dropbox`
```
CLEARROAD_STORAGE=dropbox
DROPBOX_ACCESS_TOKEN=<access token>
```

## <a name="mariadb"></a> Using with MariaDB

1. Save your mariadb connection params in the `.env` file:
```
CLEARROAD_STORAGE=mariadb
DB_NAME=clearroad-api-node-samples
DB_HOST=<host>
DB_USER=<user>
DB_PASSWORD=<password>
DB_PORT=<port>
```

## <a name="mongodb"></a> Using with MongoDB

1. Save your mongodb connection string in the `.env` file:
```
CLEARROAD_STORAGE=mongodb
DB_NAME=clearroad-api-node-samples
DB_URL=mongodb://<user>:<password>@<host>:<port>
```

## <a name="mssql"></a> Using with Microsoft SQL Server

1. Save your sql server connection params in the `.env` file:
```
CLEARROAD_STORAGE=mssql
DB_NAME=clearroad-api-node-samples
DB_HOST=<host>
DB_USER=<user>
DB_PASSWORD=<password>
DB_USE_SSL=true/false
```

## <a name="postgresql"></a> Using with PostgreSQL

1. Save your postgresql connection params in the `.env` file:
```
CLEARROAD_STORAGE=postgresql
DB_NAME=clearroad-api-node-samples
DB_HOST=<host>
DB_USER=<user>
DB_PASSWORD=<password>
DB_PORT=<port>
DB_USE_SSL=true/false
```
