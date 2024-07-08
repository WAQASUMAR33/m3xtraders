"use client"
import React from 'react';

const InvoiceList = ({ invoices }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Team Invoice</h3>
      {invoices.map((invoice) => (
        <div key={invoice.name} className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img src={invoice.avatar} alt={invoice.name} className="h-10 w-10 rounded-full mr-2" />
            <p className="text-sm">{invoice.name}</p>
          </div>
          <p className={`text-sm ${invoice.status === 'Paid' ? 'text-green-500' : invoice.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>{invoice.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
