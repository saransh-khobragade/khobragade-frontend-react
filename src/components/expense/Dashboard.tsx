import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { Charts } from './Charts';

export function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Expense Tracker</h1>
          <p className="text-muted-foreground">Upload your bank statement to track expenses</p>
        </div>

        {/* File Upload */}
        <FileUpload onUploadSuccess={handleUploadSuccess} />

        {/* Charts */}
        <Charts refreshKey={refreshKey} />
      </div>
    </div>
  );
}


