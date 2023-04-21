const { mysqlClient } = require("../dbConnection");

const search = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = event.pathParameters;
  const query = `SELECT a.* FROM account a WHERE a.id = ${id}`;
  const account = await mysqlClient.query(query);
  await mysqlClient.end();

  return account;
};

module.exports = {
  search,
};
