const dotenv = require('dotenv');
const ClearRoad = require('@clearroad/api/node').ClearRoad;

const { sync } = require('./src/sync');
const { query } = require('./src/query');

dotenv.config();

const url = process.env.CLEARROAD_URL;
const login = process.env.CLEARROAD_LOGIN;
const pwd = process.env.CLEARROAD_PWD;
const options = {
  type: 'dropbox',
  accessToken: process.env.CLEARROAD_STORAGE_ACCESS_TOKEN
};
const cr = new ClearRoad(url, login, pwd, options);

const run = async () => {
  await sync(cr);

  const documents = await query(cr);
  console.log(documents.data.rows);
};

run();
