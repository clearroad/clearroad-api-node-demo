const getReport = async (cr, id) => {
  const now = new Date();
  const report = await cr.getReport(id);
  console.log(`Done get report in ${(new Date().getTime() - now.getTime()) / 1000}s`);
  return report;
};

module.exports = {
  getReport
};
