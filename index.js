module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Welcome to Payments API!",
      input: event,
    }),
  };
};
