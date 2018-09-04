const dotenv = require('dotenv');
const ClearRoad = require('@clearroad/api/node').ClearRoad;

const { sync } = require('./src/sync');
const { query } = require('./src/query');

dotenv.config();

const url = process.env.CLEARROAD_URL;
const accessToken = process.env.CLEARROAD_ACCESS_TOKEN;
const options = {
  type: 'dropbox',
  accessToken: process.env.CLEARROAD_STORAGE_ACCESS_TOKEN
};
const cr = new ClearRoad(url, accessToken, options);

const run = async () => {
  await sync(cr);

  const documents = await query(cr);
  console.log(documents.data.rows);
};

run();
