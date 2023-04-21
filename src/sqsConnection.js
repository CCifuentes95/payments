const AWS = require("aws-sdk");

const sqs = new AWS.SQS({ region: "us-east-1" });
const paymentsQueue = "paymentsQueue";
const accountId = process.env.AWS_ACCOUNT_ID;
const queueUrl = `https://sqs.us-east-1.amazonaws.com/${accountId}/${paymentsQueue}`;

module.exports = { sqsClient: sqs, queueUrl };
