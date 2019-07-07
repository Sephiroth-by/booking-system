const sendBadRequest = (res, errorMessage) => {
  res.status(400).json({
    error: errorMessage,
  });
};

module.exports = {
  sendBadRequest,
};
