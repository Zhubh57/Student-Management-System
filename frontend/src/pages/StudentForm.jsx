import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { studentService } from '../services/studentService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ChevronLeft, Save, GraduationCap } from 'lucide-react';

const StudentForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      if (location.state?.student) {
        setFormData(location.state.student);
      } else {
        fetchStudent();
      }
    }
  }, [id]);

  const fetchStudent = async () => {
    setFetching(true);
    try {
      const result = await studentService.getStudentById(id);
      setFormData(result.data);
    } catch (err) {
      setError('Failed to fetch student data: ' + err.message);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.name === 'age' ? parseInt(e.target.value) || '' : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEdit) {
        await studentService.updateStudent(id, formData);
      } else {
        await studentService.createStudent(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong while saving.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex h-96 items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 -ml-4 text-slate-400 hover:text-white"
        >
          <ChevronLeft size={20} /> Back to Dashboard
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-primary-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <GraduationCap size={120} />
            </div>
            <h2 className="text-3xl font-bold mb-2">{isEdit ? 'Update Student' : 'Add New Student'}</h2>
            <p className="text-primary-100 italic">Fill in the details below to {isEdit ? 'update the existing record' : 'create a new academic record'}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <Input 
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
              minLength={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 20"
                required
                min={5}
              />
              <Input 
                label="Course Name"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                required
              />
            </div>

            <div className="pt-6 flex gap-4">
              <Button 
                type="submit" 
                className="flex-1 h-12 flex items-center justify-center gap-2"
                isLoading={loading}
              >
                <Save size={20} /> {isEdit ? 'Update Student' : 'Save Student'}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                className="flex-1 h-12"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
