'use client';

import FilterableTable from './FilterableTable';

export default function UpdateAdmin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-7xl p-8 space-y-3 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Update Admin</h1>
        <FilterableTable />
      </div>
    </div>
  );
}
