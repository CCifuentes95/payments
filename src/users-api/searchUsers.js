const { mysqlClient } = require("../dbConnection");

const search = async (_event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Seaching users");
  const results = await mysqlClient.query("SELECT u.* FROM user u");

  await mysqlClient.end();

  return results;
};

module.exports = {
  search,
};
