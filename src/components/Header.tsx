import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-indigo-200" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Secure Chain</h1>
            <p className="text-xs md:text-sm text-indigo-200">AI Safety Incident Dashboard</p>
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default Header;