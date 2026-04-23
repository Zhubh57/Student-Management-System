import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';
import StudentCard from '../components/StudentCard';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { Plus, Search, RefreshCw, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchStudents = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const result = await studentService.getAllStudents(query);
      setStudents(result.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch students. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(`?name=${searchTerm}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        setStudents(students.filter(s => s._id !== id));
      } catch (err) {
        alert('Failed to delete student: ' + err.message);
      }
    }
  };

  const handleEdit = (student) => {
    navigate(`/edit-student/${student._id}`, { state: { student } });
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
          <p className="text-slate-400">Manage your students and their academic records</p>
        </div>
        
        <Button onClick={() => navigate('/add-student')} className="flex items-center gap-2 h-12 px-6">
          <Plus size={20} /> Add New Student
        </Button>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <form onSubmit={handleSearch} className="lg:col-span-3 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-slate-500 group-focus-within:text-primary-500 transition-colors" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search by student name..." 
            className="w-full h-14 pl-12 pr-4 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="hidden">Search</button>
        </form>
        
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Total Students</p>
            <p className="text-2xl font-bold text-white">{students.length}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
            <RefreshCw 
              size={20} 
              className={`cursor-pointer ${loading ? 'animate-spin' : ''}`} 
              onClick={() => fetchStudents()}
            />
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
          <p className="text-red-400 mb-6">{error}</p>
          <Button variant="secondary" onClick={() => fetchStudents()}>Try Again</Button>
        </div>
      )}

      {/* Loading State */}
      {loading && !error && <Loader />}

      {/* Empty State */}
      {!loading && !error && students.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
          <div className="h-20 w-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-slate-500" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No students found</h3>
          <p className="text-slate-400 mb-8 max-w-sm mx-auto">
            {searchTerm ? "We couldn't find any student matching your search." : "You haven't added any students yet. Start by creating a new record."}
          </p>
          {searchTerm && <Button variant="secondary" onClick={() => {setSearchTerm(''); fetchStudents();}}>Clear Search</Button>}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && students.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map(student => (
            <StudentCard 
              key={student._id} 
              student={student} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
