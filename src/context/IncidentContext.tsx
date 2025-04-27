import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Incident, FilterType, SortDirection } from '../types/incident';
import { mockIncidents } from '../data/mockData';
import toast from 'react-hot-toast';

interface IncidentContextProps {
  incidents: Incident[];
  addIncident: (incident: Omit<Incident, 'id' | 'reported_at'>) => void;
  editIncident: (id: number, incident: Partial<Omit<Incident, 'id' | 'reported_at'>>) => void;
  deleteIncident: (id: number) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
  expandedIncidentIds: Set<number>;
  toggleExpand: (id: number) => void;
}

const IncidentContext = createContext<IncidentContextProps | undefined>(undefined);

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};

interface IncidentProviderProps {
  children: ReactNode;
}

export const IncidentProvider: React.FC<IncidentProviderProps> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [filterType, setFilterType] = useState<FilterType>('All');
  const [sortDirection, setSortDirection] = useState<SortDirection>('newest');
  const [expandedIncidentIds, setExpandedIncidentIds] = useState<Set<number>>(new Set());

  const addIncident = (incident: Omit<Incident, 'id' | 'reported_at'>) => {
    const newIncident: Incident = {
      ...incident,
      id: Math.max(0, ...incidents.map(i => i.id)) + 1,
      reported_at: new Date().toISOString()
    };
    setIncidents([newIncident, ...incidents]);
    toast.success('Incident reported successfully');
  };

  const editIncident = (id: number, updatedFields: Partial<Omit<Incident, 'id' | 'reported_at'>>) => {
    setIncidents(prevIncidents => 
      prevIncidents.map(incident => 
        incident.id === id 
          ? { ...incident, ...updatedFields }
          : incident
      )
    );
    toast.success('Incident updated successfully');
  };

  const deleteIncident = (id: number) => {
    setIncidents(prevIncidents => prevIncidents.filter(incident => incident.id !== id));
    setExpandedIncidentIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    toast.success('Incident deleted successfully');
  };

  const toggleExpand = (id: number) => {
    setExpandedIncidentIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const value = {
    incidents,
    addIncident,
    editIncident,
    deleteIncident,
    filterType,
    setFilterType,
    sortDirection,
    setSortDirection,
    expandedIncidentIds,
    toggleExpand,
  };

  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
};