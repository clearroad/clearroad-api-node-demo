const query = async (cr, options = {}) => {
  const now = new Date();
  const results = await cr.allDocs(options);
  console.log(`Done querying in ${(new Date().getTime() - now.getTime()) / 1000}s`);
  return results;
};

module.exports = {
  query
};
