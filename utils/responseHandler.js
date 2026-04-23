/**
 * Standardized JSON response handler
 */
const sendResponse = (res, statusCode, status, data, message = '') => {
  res.status(statusCode).json({
    status: status,
    message: message,
    results: Array.isArray(data) ? data.length : undefined,
    data: data,
  });
};

module.exports = sendResponse;
