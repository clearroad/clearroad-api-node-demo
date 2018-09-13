const dotenv = require('dotenv');
const ClearRoad = require('@clearroad/api/node').ClearRoad;

const { sync } = require('./src/sync');
const { query } = require('./src/query');
const { getReportFromRequest } = require('./src/report');

dotenv.config();

const url = process.env.CLEARROAD_URL;
const accessToken = process.env.CLEARROAD_ACCESS_TOKEN;
const storageOptions = {
  type: 'dropbox',
  accessToken: process.env.CLEARROAD_STORAGE_ACCESS_TOKEN
};
const cr = new ClearRoad(url, accessToken, {
  localStorage: storageOptions
});

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
      query: 'portal_type:"Road Message"',
      select_list: ['source_reference']
    });
    console.log(documents.data.rows);
  });

  runSafe(async () => {
    const reports = await query(cr, {
      query: 'grouping_reference: "report" AND portal_type:"Road Report Request"',
      select_list: ['source_reference']
    });
    const report = await getReportFromRequest(cr, reports.data.rows[0].value.source_reference);
    console.log(report);
  });
};

run();
