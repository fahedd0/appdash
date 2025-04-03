// src/components/ui/data-table.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Search } from 'lucide-react';

export function DataTable({
  data = [],
  columns = [],
  searchable = true,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  pagination = true,
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 10,
  onRowClick,
  emptyMessage = 'No data available',
  className = '',
  loadingState = false,
}) {
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  // Filter data based on search term
  const filteredData = searchable && searchTerm 
    ? data.filter(item => {
        return searchKeys.some(key => {
          const value = item[key];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      })
    : data;
  
  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortConfig.direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    });
  }, [filteredData, sortConfig]);
  
  // Get paginated data
  const currentData = pagination 
    ? sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : sortedData;
  
  // Calculate total pages
  const totalPages = pagination 
    ? Math.ceil(sortedData.length / rowsPerPage) 
    : 1;
  
  // Handle sort request
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Search and pagination controls */}
      {(searchable || pagination) && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          {searchable && (
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          
          {pagination && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-md px-2 py-1"
              >
                {rowsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {/* Table header */}
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer select-none' : ''}
                  `}
                  onClick={() => column.sortable && requestSort(column.key)}
                >
                  <div className="flex items-center">
                    <span>{column.header}</span>
                    {column.sortable && sortConfig.key === column.key && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Table body */}
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loadingState ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 dark:border-blue-400"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : currentData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              currentData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`
                    ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
                  `}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination controls */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
              let pageNumber;
              
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`
                    h-8 w-8 rounded-md 
                    ${currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}