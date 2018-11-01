const dotenv = require('dotenv');
const { ClearRoad, PortalTypes } = require('@clearroad/api');

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
  await sync(cr);

  runSafe(async () => {
    const documents = await query(cr, {
      query: `portal_type:"${PortalTypes.RoadMessage}"`,
      select_list: ['source_reference']
    });
    console.log(documents.data.rows);
  });

  runSafe(async () => {
    const reports = await query(cr, {
      query: `grouping_reference:"report" AND portal_type:"${PortalTypes.RoadReportRequest}"`,
      select_list: ['source_reference']
    });
    const report = await getReportFromRequest(cr, reports.data.rows[0].value.source_reference);
    console.log(report);
  });
};

run();
