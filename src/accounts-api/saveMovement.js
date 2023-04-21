const { mysqlClient } = require("../dbConnection");

const updateSql = "UPDATE account SET total = ? WHERE id = ?";
const insertSql =
  "INSERT INTO movements(account_id, type, amount, result) VALUES (?, ?, ?, ?)";
const getMovementById =
  "SELECT m.id, m.type, m.result FROM movements m WHERE m.id = ?";
const getAccountById = "SELECT a.* FROM account a WHERE a.id = ?";

const save = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { account_id, type, amount } = JSON.parse(event.body);

  const account = await getAccount(account_id);
  const [_rows, fields] = await saveMovement(account, type, amount);

  await mysqlClient.end();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
    },
    body: JSON.stringify(fields),
  };
};

async function getAccount(account_id) {
  const response = await mysqlClient.query(getAccountById, [account_id]);
  return response.map((row) => Object.assign({}, row))[0];
}

async function saveMovement(account, type, amount) {
  const { id, total } = account;
  const { status, totalToUpdate } = getUpdateValues(type, amount, total);

  await mysqlClient.query(updateSql, [totalToUpdate, id]);

  return await mysqlClient
    .transaction()
    .query(insertSql, [id, type, amount, status])
    .query((r) => [getMovementById, r.insertId])
    .commit();
}

function getUpdateValues(type, amount, total) {
  if (type === "Add") {
    const result = parseFloat(total) + parseFloat(amount) ;

    console.log(type, amount, total, result);

    return buildResult("Successful", result);
  } else {
    const result = parseFloat(total) - parseFloat(amount) ;

    return result < 0
      ? buildResult("Declined", total)
      : buildResult("Successful", result);
  }
}

function buildResult(statusOperation, value) {
  return {
    status: statusOperation,
    totalToUpdate: value,
  };
}

module.exports = {
  save,
};
