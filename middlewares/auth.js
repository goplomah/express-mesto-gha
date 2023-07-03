const jwt = require('jsonwebtoken');
const UnauthorizationError = require('../errors/UnauthorizationError');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizationError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
