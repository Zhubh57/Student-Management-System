const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [5, 'Age must be at least 5']
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('Student', studentSchema);

const validateStudent = (student) => {
  const errors = [];

  if (!student.name || student.name.trim().length < 3) {
    errors.push('Name is required and must be at least 3 characters long');
  }

  if (!student.age || typeof student.age !== 'number' || student.age < 5) {
    errors.push('Age is required and must be a number greater than or equal to 5');
  }

  if (!student.course || student.course.trim().length === 0) {
    errors.push('Course is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  Student,
  validateStudent
};
