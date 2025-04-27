import React from 'react';
import Header from './Header';
import Controls from './Controls';
import IncidentList from './IncidentList';
import NewIncidentForm from './NewIncidentForm';
import { IncidentProvider } from '../context/IncidentContext';
import { Toaster } from 'react-hot-toast';

const Dashboard: React.FC = () => {
  return (
    <IncidentProvider>
      <div className="min-h-screen bg-slate-50">
        <Toaster position="top-right" />
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Incident Reports</h2>
            <NewIncidentForm />
            <Controls />
            <IncidentList />
          </div>
        </main>
      </div>
    </IncidentProvider>
  );
};

export default Dashboard;