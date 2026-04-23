import fetchWithAuth from './api';

export const studentService = {
  getAllStudents: async (query = '') => {
    return await fetchWithAuth(`/students${query}`);
  },

  getStudentById: async (id) => {
    return await fetchWithAuth(`/students/${id}`);
  },

  createStudent: async (studentData) => {
    return await fetchWithAuth('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  },

  updateStudent: async (id, studentData) => {
    return await fetchWithAuth(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  },

  deleteStudent: async (id) => {
    return await fetchWithAuth(`/students/${id}`, {
      method: 'DELETE',
    });
  },
};
