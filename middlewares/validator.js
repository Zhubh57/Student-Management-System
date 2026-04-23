const { validateStudent } = require('../models/student.model');
const AppError = require('../utils/AppError');

/**
 * Validation Middleware for Student creation/update
 */
const validateStudentInput = (req, res, next) => {
  // Methods that require body validation
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const { isValid, errors } = validateStudent(req.body);

    if (!isValid) {
      return next(new AppError(errors.join('. '), 400));
    }
  }
  next();
};

module.exports = {
  validateStudentInput
};
