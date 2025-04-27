import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import { Severity } from '../types/incident';
import { AlertCircle, ChevronDown, ChevronUp, Plus } from 'lucide-react';

const NewIncidentForm: React.FC = () => {
  const { addIncident } = useIncidents();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>('Medium');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addIncident({
        title,
        description,
        severity,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setSeverity('Medium');
      setErrors({});
      
      // Optional: Close form after submission
      setIsFormVisible(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 overflow-hidden">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full p-4 text-left flex justify-between items-center bg-indigo-50 hover:bg-indigo-100 transition-colors"
      >
        <div className="flex items-center">
          <Plus className="h-5 w-5 text-indigo-600 mr-2" />
          <span className="font-medium text-indigo-900">Report New Incident</span>
        </div>
        {isFormVisible ? (
          <ChevronUp className="h-5 w-5 text-indigo-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-indigo-600" />
        )}
      </button>
      
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="p-4 animate-[fadeIn_0.3s_ease-in-out]">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.title ? 'border-rose-300' : 'border-slate-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-rose-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.title}
              </p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border ${
                errors.description ? 'border-rose-300' : 'border-slate-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-rose-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.description}
              </p>
            )}
          </div>
          
          <div className="mb-4">
            <span className="block text-sm font-medium text-slate-700 mb-1">Severity</span>
            <div className="flex gap-3">
              {(['Low', 'Medium', 'High'] as Severity[]).map((level) => (
                <label
                  key={level}
                  className={`flex-1 flex items-center justify-center px-3 py-2 border ${
                    severity === level
                      ? level === 'Low'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : level === 'Medium'
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-rose-50 border-rose-300 text-rose-800'
                      : 'bg-slate-50 border-slate-300 text-slate-700'
                  } rounded-md cursor-pointer transition-colors hover:bg-opacity-80`}
                >
                  <input
                    type="radio"
                    name="severity"
                    value={level}
                    checked={severity === level}
                    onChange={() => setSeverity(level)}
                    className="sr-only"
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Submit Incident
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewIncidentForm;