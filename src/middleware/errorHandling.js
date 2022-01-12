const errorLogger = (err, req, res, next) => {
  console.error("\x1b[31m", err);
  next(err);
};

const errorResponder = (err, req, res, next) => {
  res.status(err.statusCode).send(JSON.stringify(err, null, 4));
};
const invalidPathHandler = (req, res, next) => {
  res.redirect("/error");
};

module.exports = { errorLogger, errorResponder, invalidPathHandler };
