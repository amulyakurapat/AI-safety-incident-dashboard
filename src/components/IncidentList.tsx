import React, { useMemo } from 'react';
import { useIncidents } from '../context/IncidentContext';
import IncidentItem from './IncidentItem';
import { Incident } from '../types/incident';

const IncidentList: React.FC = () => {
  const { incidents, filterType, sortDirection } = useIncidents();

  const filteredAndSortedIncidents = useMemo(() => {
    // Filter incidents
    const filtered = filterType === 'All' 
      ? incidents 
      : incidents.filter(incident => incident.severity === filterType);

    // Sort incidents
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortDirection === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [incidents, filterType, sortDirection]);

  if (filteredAndSortedIncidents.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">No incidents found matching the current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAndSortedIncidents.map((incident: Incident) => (
        <IncidentItem key={incident.id} incident={incident} />
      ))}
    </div>
  );
};

export default IncidentList;