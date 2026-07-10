const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.originalUrl} not found on this server`
  });
};

module.exports = notFound;
