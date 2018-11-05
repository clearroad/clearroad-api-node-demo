const dotenv = require('dotenv');
const { ClearRoad, jIO, PortalTypes } = require('@clearroad/api');
const mariadbStorage = require('@clearroad/api-storage-mariadb').default;
const mongodbStorage = require('@clearroad/api-storage-mongodb').default;
const pgStorage = require('@clearroad/api-storage-postgresql').default;

const { sync } = require('./src/sync');
const { query } = require('./src/query');
const { getReportFromRequest } = require('./src/report');

dotenv.config();

const url = process.env.CLEARROAD_URL;
const accessToken = process.env.CLEARROAD_ACCESS_TOKEN;

// --- Memory (disk)
const options = {
  localStorage: {
    type: 'memory'
  }
};

// --- Dropbox
// const options = {
//   localStorage: {
//     type: 'dropbox',
//     accessToken: process.env.DROPBOX_ACCESS_TOKEN
//   }
// };

// --- MariaDB
// const options = {
//   localStorage: {
//     type: mariadbStorage,
//     host: process.env.MARIADB_HOST,
//     user: process.env.MARIADB_USER,
//     password: process.env.MARIADB_PASSWORD,
//     database: 'crapi-node-samples'
//   },
//   useQueryStorage: true
// };

// --- MongoDB
// const options = {
//   localStorage: {
//     type: mongodbStorage,
//     url: process.env.MONGODB_URL,
//     database: 'crapi-node-samples'
//   }
// };

// --- PostgreSQL
// const options = {
//   localStorage: {
//     type: pgStorage,
//     host: process.env.PG_HOST,
//     port: 5432,
//     ssl: true,
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     database: 'crapi-node-samples'
//   }
// };

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
  }
};

const run = async () => {
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
};

run();
