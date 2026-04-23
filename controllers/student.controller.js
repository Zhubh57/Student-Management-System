const StudentService = require('../services/student.service');
const sendResponse = require('../utils/responseHandler');

/**
 * Controller for Student related operations
 */
class StudentController {
  /**
   * Get all students
   */
  static async getAllStudents(req, res, next) {
    try {
      const result = await StudentService.getAllStudents(req.query);
      sendResponse(res, 200, 'success', result.data, 'Students fetched successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get student by ID
   */
  static async getStudentById(req, res, next) {
    try {
      const student = await StudentService.getStudentById(req.params.id);
      sendResponse(res, 200, 'success', student, 'Student fetched successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create new student
   */
  static async createStudent(req, res, next) {
    try {
      const newStudent = await StudentService.createStudent(req.body);
      sendResponse(res, 201, 'success', newStudent, 'Student created successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update student
   */
  static async updateStudent(req, res, next) {
    try {
      const updatedStudent = await StudentService.updateStudent(req.params.id, req.body);
      sendResponse(res, 200, 'success', updatedStudent, 'Student updated successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete student
   */
  static async deleteStudent(req, res, next) {
    try {
      const deletedStudent = await StudentService.deleteStudent(req.params.id);
      sendResponse(res, 200, 'success', deletedStudent, 'Student deleted successfully');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = StudentController;
