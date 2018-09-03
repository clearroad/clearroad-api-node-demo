# ClearRoad API Node Samples

Samples using the ClearRoad API for node

# Usage

1. Run `$ npm install`
2. Create a `.env` file containing:
```
CLEARROAD_URL=<url>
CLEARROAD_LOGIN=<login>
CLEARROAD_PWD=<password>
CLEARROAD_STORAGE_ACCESS_TOKEN=<access token>
```

3. Get a [dropbox access token](#dropbox)
4. Run `$ node index.js`

Alternatively, you can use Google Drive as a storage account: modify `options.type` in `index.js` and set it to `gdrive`. You will need to get an access token as well.

## <a name="dropbox"></a> Using with Dropbox

1. Create an app on your dropbox account that can access it on the [app console](https://www.dropbox.com/developers/apps)
2. Choose the "Dropbox API"
3. Choose "App Folder"
4. Name your app and click on "Create"
6. Generate an access token, save the token in your `.env` file as `CLEARROAD_STORAGE_ACCESS_TOKEN`.
