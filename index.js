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

const sync = async (cr) => {
  const now = new Date();
  try {
    console.log('Starting sync...');
    await cr.sync((name) => {
      console.log(`Finished sync of ${name}...`);
    });
  }
  catch (err) {
    console.error('An error occured:', 'message' in err ? err.message : err);
    if (err.stack) {
      console.error(err.stack);
    }
  }
  console.log(`Done syncing in ${(new Date().getTime() - now.getTime()) / 1000}s`);
};

const run = async () => {
  const cr = new ClearRoad(url, login, pwd, options);
  await sync(cr);

  const documents = await cr.allDocs();
  console.log(documents.data.rows);
};

run();
