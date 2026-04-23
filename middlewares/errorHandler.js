const { NODE_ENV } = require('../config');

/**
 * Global Error Handling Middleware
 */
const globalErrorHandler = (err, req, res, next) => {
  console.error('ERROR 💥:', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production: Don't leak stack trace
    res.status(err.statusCode).json({
      status: err.status,
      message: err.isOperational ? err.message : 'Something went very wrong!'
    });
  }
};

/**
 * Not Found Middleware (404)
 */
const notFoundHandler = (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'fail';
  res.status(404).json({
    status: 'fail',
    message: err.message
  });
};

module.exports = {
  globalErrorHandler,
  notFoundHandler
};
