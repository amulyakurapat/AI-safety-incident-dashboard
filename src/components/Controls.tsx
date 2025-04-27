import React from 'react';
import { FilterType, SortDirection } from '../types/incident';
import { useIncidents } from '../context/IncidentContext';
import { ListFilter, ArrowUpDown } from 'lucide-react';

const Controls: React.FC = () => {
  const { filterType, setFilterType, sortDirection, setSortDirection } = useIncidents();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 bg-white p-3 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center mb-2">
          <ListFilter className="h-4 w-4 text-indigo-600 mr-2" />
          <h3 className="text-sm font-medium text-slate-700">Filter by Severity</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['All', 'Low', 'Medium', 'High'] as const).map((severity) => (
            <button
              key={severity}
              onClick={() => setFilterType(severity)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterType === severity
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {severity}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white p-3 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center mb-2">
          <ArrowUpDown className="h-4 w-4 text-indigo-600 mr-2" />
          <h3 className="text-sm font-medium text-slate-700">Sort by Date</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortDirection('newest')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md flex-1 transition-all ${
              sortDirection === 'newest'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Newest First
          </button>
          <button
            onClick={() => setSortDirection('oldest')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md flex-1 transition-all ${
              sortDirection === 'oldest'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Oldest First
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;