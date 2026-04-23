import React from 'react';
import { Edit2, Trash2, BookOpen, Clock } from 'lucide-react';
import Button from './ui/Button';

const StudentCard = ({ student, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="h-12 w-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
            <span className="text-xl font-bold">{student.name.charAt(0)}</span>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-slate-400 hover:text-primary-400" 
              onClick={() => onEdit(student)}
            >
              <Edit2 size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
              onClick={() => onDelete(student._id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">{student.name}</h3>
        <p className="text-slate-400 text-sm mb-4">Student ID: {student._id.substring(student._id.length - 8)}</p>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-slate-300">
            <BookOpen size={14} className="mr-2 text-primary-500" />
            <span>Course: <span className="font-medium text-white">{student.course}</span></span>
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary-500"></div>
            <span>Age: <span className="font-medium text-white">{student.age} Years</span></span>
          </div>
          <div className="flex items-center text-sm text-slate-400 pt-3 border-t border-slate-700/50">
            <Clock size={14} className="mr-2" />
            <span>Added on {formatDate(student.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
