const express = require('express');
const StudentController = require('../controllers/student.controller');
const { validateStudentInput } = require('../middlewares/validator');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * Student Routes
 * Base Path: /api/students
 */

// Protect all routes below this middleware
router.use(protect);

router
  .route('/')
  .get(StudentController.getAllStudents)
  .post(validateStudentInput, StudentController.createStudent);

router
  .route('/:id')
  .get(StudentController.getStudentById)
  .put(validateStudentInput, StudentController.updateStudent)
  .delete(StudentController.deleteStudent);

module.exports = router;
