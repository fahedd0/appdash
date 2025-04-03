'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Eye, Plus, RefreshCcw } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { useModal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const { openModal } = useModal();
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load products from localStorage on component mount
  useEffect(() => {
    loadProducts();
  }, []);
  
  // Function to load products from localStorage
  const loadProducts = () => {
    setIsLoading(true);
    
    // Default mock products if nothing in localStorage
    const mockProducts = [
      { id: 1, name: 'Auto Insurance Pro', category: 'Auto', status: 'Active', premium: 1200, sales: 256 },
      { id: 2, name: 'Home Protection Plus', category: 'Home', status: 'Active', premium: 950, sales: 189 },
      { id: 3, name: 'Health Care Premier', category: 'Health', status: 'Pending', premium: 2100, sales: 134 },
      { id: 4, name: 'Life Security Max', category: 'Life', status: 'Active', premium: 850, sales: 212 },
      { id: 5, name: 'Travel Essentials', category: 'Travel', status: 'Inactive', premium: 350, sales: 78 },
    ];
    
    // Load products from local storage
    setTimeout(() => {
      try {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          setProducts(parsedProducts);
        } else {
          // If no products in localStorage, set mock data
          setProducts(mockProducts);
          localStorage.setItem('products', JSON.stringify(mockProducts));
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts(mockProducts);
      }
      
      setIsLoading(false);
    }, 500); // Simulated loading delay
  };
  
  // Delete a product
  const deleteProduct = (productId) => {
    try {
      const updatedProducts = products.filter(product => product.id !== productId);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      addToast('Product deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      addToast('Failed to delete product', 'error');
    }
  };
  
  // Table columns definition
  const columns = [
    { 
      key: 'name', 
      header: 'Product Name', 
      sortable: true 
    },
    { 
      key: 'category', 
      header: 'Category', 
      sortable: true 
    },
    { 
      key: 'premium', 
      header: 'Premium', 
      sortable: true,
      render: (row) => `$${row.premium?.toLocaleString() || '0'}`
    },
    { 
      key: 'sales', 
      header: 'Sales', 
      sortable: true,
      render: (row) => row.sales?.toLocaleString() || '0'
    },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
            : row.status === 'Pending' 
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}>
          {row.status}
        </span>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions', 
      render: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleView(row);
            }}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Eye size={16} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];
  
  // Action handlers
  const handleView = (product) => {
    // Open a modal with product details
    openModal(
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
              <p>{product.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p>{product.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Premium</p>
              <p>${product.premium?.toLocaleString() || '0'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sales</p>
              <p>{product.sales?.toLocaleString() || '0'}</p>
            </div>
          </div>
          
          {product.roomType && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Room Type</p>
              <p>{product.roomType}</p>
            </div>
          )}
          
          {product.specialConditions && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Special Conditions</p>
              <p>{product.specialConditions}</p>
            </div>
          )}
          
          {product.createdAt && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Created At</p>
              <p>{new Date(product.createdAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>,
      { title: 'Product Details' }
    );
  };
  
  const handleEdit = (product) => {
    // Redirect to edit page
    window.location.href = `/dashboard/products/edit/${product.id}`;
  };
  
  const handleDelete = (product) => {
    // Show confirmation modal
    openModal(
      ({ onClose }) => (
        <div className="p-6">
          <p className="mb-6">Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.</p>
          <div className="flex justify-end space-x-4">
            <button 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                deleteProduct(product.id);
                onClose();
              }} 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { title: 'Confirm Deletion' }
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Products</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your product catalog and offerings here.
          </p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={loadProducts}
            className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCcw size={16} className="mr-1" />
            Refresh
          </motion.button>
          <Link href="/dashboard/products/create">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              New Product
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Product table */}
      <DataTable
        data={products}
        columns={columns}
        searchable={true}
        searchKeys={['name', 'category', 'status']}
        searchPlaceholder="Search products..."
        pagination={true}
        onRowClick={handleView}
        loadingState={isLoading}
        emptyMessage="No products found. Click 'New Product' to create one."
      />
    </div>
  );
}