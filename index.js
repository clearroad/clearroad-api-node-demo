const dotenv = require('dotenv');
const ClearRoad = require('@clearroad/api/node').ClearRoad;

dotenv.config();

const url = process.env.CLEARROAD_URL;
const login = process.env.CLEARROAD_LOGIN;
const pwd = process.env.CLEARROAD_PWD;
const options = {
  type: 'dropbox',
  accessToken: process.env.CLEARROAD_STORAGE_ACCESS_TOKEN
};

const cr = new ClearRoad(url, login, pwd, options);

const now = new Date();
console.log('Starting sync...');

cr.sync()
  .push(result => {
    console.log('success', result);
  }, err => {
    console.error(err);
  })
  .push(() => {
    console.log(`Done syncing in ${(new Date().getTime() - now.getTime()) / 1000}s`);
  });
