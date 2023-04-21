const mysql = require("serverless-mysql")({
  config: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_SECRET,
  },
});

module.exports = { mysqlClient: mysql };
