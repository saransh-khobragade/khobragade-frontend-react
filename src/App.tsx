import './App.css';
import type { ReactElement } from 'react';
import { Dashboard } from '@/components/expense/Dashboard';
import { Toaster } from '@/components/ui/sonner';

function App(): ReactElement {
  return (
    <div className="min-h-screen bg-background">
      <Dashboard />
      <Toaster />
    </div>
  );
}

export default App;
