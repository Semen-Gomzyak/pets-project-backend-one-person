function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    return next();
  };
}

const removePngFromString = string => {
  const words = string.split('.');
  words.pop();
  return words.join('.');
};

function extractValue(str) {
  const [, value] = str.match(/"(.*?)"/);
  return value;
}

module.exports = {
  tryCatchWrapper,
  HttpError,
  validateBody,
  removePngFromString,
  extractValue
};
