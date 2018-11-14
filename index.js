const dotenv = require('dotenv');
const { ClearRoad, PortalTypes } = require('@clearroad/api');
const { jIO } = require('jio');
const mariadbStorage = require('@clearroad/api-storage-mariadb').default;
const mongodbStorage = require('@clearroad/api-storage-mongodb').default;
const sqlStorage = require('@clearroad/api-storage-mssql').default;
const pgStorage = require('@clearroad/api-storage-postgresql').default;

const { sync } = require('./src/sync');
const { query } = require('./src/query');
const { getReportFromRequest } = require('./src/report');

dotenv.config();

const url = process.env.CLEARROAD_URL;
const accessToken = process.env.CLEARROAD_ACCESS_TOKEN;

const options = {};
const storage = process.env.CLEARROAD_STORAGE || 'memory';

switch (storage) {
  // --- MariaDB
  case mariadbStorage:
    options.localStorage = {
      type: storage,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    };
    options.useQueryStorage = true;
    break;
  // --- MongoDB
  case mongodbStorage:
    options.localStorage = {
      type: storage,
      url: process.env.DB_URL,
      database: process.env.DB_NAME
    };
    break;
  // --- MSSQL
  case sqlStorage:
    options.localStorage = {
      type: storage,
      server: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      encrypt: process.env.DB_USE_SSL === 'true'
    };
    options.useQueryStorage = true;
    break;
  // --- PostgreSQL
  case pgStorage:
    options.localStorage = {
      type: storage,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      ssl: process.env.DB_USE_SSL === 'true'
    };
    break;
  case 'dropbox':
    options.localStorage = {
      type: storage,
      accessToken: process.env.DROPBOX_ACCESS_TOKEN
    };
    break;
  default:
    options.localStorage = {
      type: storage
    };
}

const cr = new ClearRoad(url, accessToken, options);

const runSafe = async (func) => {
  try {
    await func();
  }
  catch (err) {
    console.error('An error occured:', 'message' in err ? err.message : err);
    if (err.stack) {
      console.error(err.stack);
    }
    if (process.env.CI) {
      throw err;
    }
  }
};

const run = async () => {
  try {
    await runSafe(async () => {
      await sync(cr);
    });

    await runSafe(async () => {
      const documents = await query(cr, {
        query: `portal_type: "${PortalTypes.RoadMessage}"`,
        select_list: ['source_reference']
      });
      console.log(documents.data.rows);
    });

    await runSafe(async () => {
      const documents = await query(cr, {
        query: 'portal_type: "Road Account"',
        select_list: ['reference', 'registrations']
      });
      console.log(documents.data.rows);
    });

    await runSafe(async () => {
      const reports = await query(cr, {
        query: `grouping_reference: "report" AND portal_type: "${PortalTypes.RoadReportRequest}"`,
        select_list: ['source_reference']
      });
      console.log(reports.data.rows);
      const report = await getReportFromRequest(cr, reports.data.rows[0].value.source_reference);
      console.log(jIO.util.stringify(report));
    });

    process.exit(0);
  }
  catch (err) {
    process.exit(1);
  }
};

run();
