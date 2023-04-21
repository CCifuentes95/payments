const { mysqlClient } = require("../dbConnection");

const SELECT_MOVEMENTS_WITH_ID =
  "SELECT m.* FROM movements m WHERE m.account_id = ";

// Main handler function
const search = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { resultType, includeAll } = event?.queryStringParameters ?? {};
  const { id } = event.pathParameters;

  let query = `${SELECT_MOVEMENTS_WITH_ID} ${id} and m.result = 'Successful'`;

  if (includeAll) {
    query = `${SELECT_MOVEMENTS_WITH_ID} ${id}`;
  }

  if (resultType) {
    query = `${SELECT_MOVEMENTS_WITH_ID} ${id} and m.result = '${resultType}'`;
  }
  const user = await mysqlClient.query(query);

  await mysqlClient.end();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
    },
    body: JSON.stringify(user),
  };;
};

module.exports = {
  search,
};
