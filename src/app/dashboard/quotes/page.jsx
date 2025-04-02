'use client';
import { useState } from 'react';

export default function QuotesPage() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Pending', 'Approved', 'Disabled', 'Renewal', 'Validation'];

  // Example quotes with different statuses
  const quotes = [
    { id: 'Q-10548', customer: 'John Doe', amount: 1500, date: '2025-04-01', status: 'Approved' },
    { id: 'Q-10549', customer: 'Jane Smith', amount: 2300, date: '2025-04-02', status: 'Pending' },
    { id: 'Q-10550', customer: 'Mark Lee', amount: 1750, date: '2025-04-03', status: 'Draft' },
    { id: 'Q-10551', customer: 'Emily Wong', amount: 1980, date: '2025-04-04', status: 'Validation' },
    { id: 'Q-10552', customer: 'Carlos Diaz', amount: 2650, date: '2025-04-05', status: 'Disabled' },
  ];

  // Filter quotes based on active tab
  const filteredQuotes = activeTab === 'All'
    ? quotes
    : quotes.filter((q) => q.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-blue-500 space-x-1">
        <span>Quotes</span>
        <span>&gt;</span>
        <span className="text-gray-600 dark:text-gray-400">List</span>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Quotes</h1>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 inline-flex flex-wrap gap-2 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? 'bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-white'
                : 'text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Quotes Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {['Quote #', 'Customer', 'Amount', 'Date', 'Status'].map((heading) => (
                <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredQuotes.map((q) => (
              <tr key={q.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{q.id}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{q.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">${q.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{new Date(q.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    q.status === 'Approved'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : q.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : q.status === 'Disabled'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {q.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredQuotes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No quotes found for <strong>{activeTab}</strong>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
