const { mysqlClient } = require("../dbConnection");

const search = async (_event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const results = await mysqlClient.query("SELECT a.* FROM account a");
  await mysqlClient.end();

  return results;
};

module.exports = {
  search,
};
