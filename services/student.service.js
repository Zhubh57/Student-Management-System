const { Student } = require('../models/student.model');
const AppError = require('../utils/AppError');

/**
 * Student Service handles all business logic and data source interactions
 */
class StudentService {
  /**
   * Get all students with optional search and pagination
   */
  static async getAllStudents(query) {
    const { name, page = 1, limit = 10 } = query;
    
    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const students = await Student.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(filter);

    return {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: students
    };
  }

  /**
   * Get student by ID
   */
  static async getStudentById(id) {
    const student = await Student.findById(id);
    if (!student) {
      throw new AppError(`Student with ID ${id} not found`, 404);
    }
    return student;
  }

  /**
   * Create new student
   */
  static async createStudent(studentData) {
    const student = await Student.create(studentData);
    return student;
  }

  /**
   * Update existing student
   */
  static async updateStudent(id, updateData) {
    const student = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!student) {
      throw new AppError(`Student with ID ${id} not found`, 404);
    }

    return student;
  }

  /**
   * Delete student
   */
  static async deleteStudent(id) {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      throw new AppError(`Student with ID ${id} not found`, 404);
    }
    return student;
  }
}

module.exports = StudentService;
