const { mysqlClient } = require("../dbConnection");

// Main handler function
const search = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = event.pathParameters;
  const { includeAccount } = event?.queryStringParameters ?? false;

  let query = `SELECT u.* FROM user u WHERE id = ${id}`;

  if (includeAccount) {
    query = `SELECT u.*, a.id as 'accountId', a.total FROM user u INNER JOIN account a on u.id = a.user_id WHERE u.id = ${id}`;
  }

  const user = await mysqlClient.query(query);

  await mysqlClient.end();

  return  user.map((row) => Object.assign({}, row))[0];
};

module.exports = {
  search,
};
