import React, { useState } from 'react';
import { Incident, Severity } from '../types/incident';
import { useIncidents } from '../context/IncidentContext';
import { ChevronDown, ChevronUp, Clock, Pencil, Trash2, X, Check } from 'lucide-react';
import SeverityBadge from './SeverityBadge';

interface IncidentItemProps {
  incident: Incident;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const { expandedIncidentIds, toggleExpand, editIncident, deleteIncident } = useIncidents();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(incident.title);
  const [editedDescription, setEditedDescription] = useState(incident.description);
  const [editedSeverity, setEditedSeverity] = useState<Severity>(incident.severity);
  const isExpanded = expandedIncidentIds.has(incident.id);

  const handleSave = () => {
    if (editedTitle.trim() && editedDescription.trim()) {
      editIncident(incident.id, {
        title: editedTitle,
        description: editedDescription,
        severity: editedSeverity,
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      deleteIncident(incident.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-4 transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <h3 className="text-lg font-medium text-slate-900">{incident.title}</h3>
          )}
          <div className="flex items-center gap-3">
            {isEditing ? (
              <div className="flex gap-2">
                {(['Low', 'Medium', 'High'] as Severity[]).map((level) => (
                  <label
                    key={level}
                    className={`cursor-pointer ${
                      editedSeverity === level ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`severity-${incident.id}`}
                      value={level}
                      checked={editedSeverity === level}
                      onChange={() => setEditedSeverity(level)}
                      className="sr-only"
                    />
                    <SeverityBadge severity={level} />
                  </label>
                ))}
              </div>
            ) : (
              <SeverityBadge severity={incident.severity} />
            )}
            <div className="flex items-center text-xs text-slate-500">
              <Clock className="h-3 w-3 mr-1" />
              {formatDate(incident.reported_at)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={() => toggleExpand(incident.id)}
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Hide Details</span>
                <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                <span>View Details</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-1 text-emerald-600 hover:text-emerald-800 transition-colors"
                  title="Save changes"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setEditedTitle(incident.title);
                    setEditedDescription(incident.description);
                    setEditedSeverity(incident.severity);
                    setIsEditing(false);
                  }}
                  className="p-1 text-slate-600 hover:text-slate-800 transition-colors"
                  title="Cancel editing"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                  title="Edit incident"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-rose-600 hover:text-rose-800 transition-colors"
                  title="Delete incident"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 text-slate-700 border-t border-slate-200 mt-1 animate-[fadeIn_0.2s_ease-in-out]">
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 mt-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="py-3">{incident.description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default IncidentItem;