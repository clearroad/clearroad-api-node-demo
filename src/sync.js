const sync = async (cr) => {
  const now = new Date();
  try {
    console.log('Starting sync...');
    await cr.sync(name => {
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

module.exports = {
  sync
};
