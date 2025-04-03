'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast';
import { motion } from 'framer-motion';

export default function EditProductPage({ params }) {
  const router = useRouter();
  const { addToast } = useToast();
  const productId = params?.id;
  
  // Define form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    policyNo: '',
    category: '',
    administrator: '',
    coverageArea: '',
    sponsorTypes: '',
    certificateType: '',
    maxAge: '',
    annualLimit: '',
    coInsuranceInPatient: '',
    coInsuranceOutPatient: '',
    coInsuranceDiagnosis: '',
    coInsuranceMedicine: '',
    pharmacyLimit: '',
    chronicLimit: '',
    chronicCoInsurance: '',
    roomType: '',
    specialConditions: '',
    // Checkboxes
    requireMedicalFormSponsor: false,
    requireMedicalFormMember: false,
    sellViaCash: false,
    requireKYC: false,
    allowBulkMemberImport: false,
    pushToICP: false,
    notifyQuoteCreation: false,
    isDisabled: false,
    enableCommission: false,
    enableOCR: false,
    // Network and attachments
    network: '',
    tableOfBenefits: null,
    medicalFormSponsor: null,
    medicalFormMember: null,
  });
  
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // Load product data when component mounts
  useEffect(() => {
    if (!productId) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    
    // Get products from localStorage
    try {
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        const product = products.find(p => p.id.toString() === productId.toString());
        
        if (product) {
          // Convert any potential nulls or undefined values to empty strings
          const cleanProduct = Object.fromEntries(
            Object.entries(product).map(([key, value]) => [
              key, 
              value === null || value === undefined ? '' : value
            ])
          );
          
          setFormData(cleanProduct);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      addToast('Failed to load product data', 'error');
    }
    
    setLoading(false);
  }, [productId, addToast]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.category) {
      addToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Update product in localStorage
    try {
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        let products = JSON.parse(savedProducts);
        
        // Find the product and update it
        const updatedProducts = products.map(product => {
          if (product.id.toString() === productId.toString()) {
            // Preserve the original id, sales, and creation date
            return {
              ...formData,
              id: product.id,
              sales: product.sales || 0,
              createdAt: product.createdAt,
              updatedAt: new Date().toISOString(),
              status: formData.isDisabled ? 'Inactive' : 'Active'
            };
          }
          return product;
        });
        
        // Save back to localStorage
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        
        // Show success message
        addToast(`Product "${formData.name}" updated successfully`, 'success');
        
        // Redirect to products list
        router.push('/dashboard/products');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      addToast('Failed to update product', 'error');
    }
  };
  
  // CSS Classes for inputs and sections
  const sectionClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-300 dark:border-gray-700";
  const inputClasses = "w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  // Show not found state
  if (notFound) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-700 text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Product Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The product you're looking for doesn't exist or has been deleted.
        </p>
        <Link href="/dashboard/products">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Return to Products
          </button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link href="/dashboard/products" className="text-sm text-blue-600 hover:underline">
          ← Back to Products
        </Link>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Edit Product: {formData.name}</h2>

      <form onSubmit={handleSubmit}>
        {/* Base Information */}
        <section className={`${sectionClasses} mb-8`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Base Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Plan Name *</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Plan Name" 
                className={inputClasses} 
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Plan Code</label>
              <input 
                type="text" 
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter Plan Code" 
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Policy SDK No.</label>
              <input 
                type="text" 
                name="policyNo"
                value={formData.policyNo}
                onChange={handleChange}
                placeholder="Enter Policy SDK No." 
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Category *</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="">Select a category</option>
                <option value="Auto">Auto Insurance</option>
                <option value="Home">Home Insurance</option>
                <option value="Health">Health Insurance</option>
                <option value="Life">Life Insurance</option>
                <option value="Travel">Travel Insurance</option>
                <option value="Business">Business Insurance</option>
                <option value="Pet">Pet Insurance</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Third Party Administrator</label>
              <select 
                name="administrator"
                value={formData.administrator}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select an option</option>
                <option value="TPA1">Administrator 1</option>
                <option value="TPA2">Administrator 2</option>
                <option value="TPA3">Administrator 3</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Coverage Area</label>
              <select 
                name="coverageArea"
                value={formData.coverageArea}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select an option</option>
                <option value="Local">Local</option>
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Allowed Sponsor Types</label>
              <select 
                name="sponsorTypes"
                value={formData.sponsorTypes}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select an option</option>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
        </section>

        {/* Birth Certificate Settings */}
        <section className={`${sectionClasses} mb-8`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Birth Certificate Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Type</label>
              <select 
                name="certificateType"
                value={formData.certificateType}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select Type</option>
                <option value="Type1">Type 1</option>
                <option value="Type2">Type 2</option>
                <option value="Type3">Type 3</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Max Age</label>
              <input 
                type="number" 
                name="maxAge"
                value={formData.maxAge}
                onChange={handleChange}
                placeholder="Enter Max Age" 
                className={inputClasses} 
              />
            </div>
          </div>
        </section>

        {/* Plan Configuration */}
        <section className={`${sectionClasses} mb-8`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Plan Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClasses}>Annual financial limit pppy</label>
              <input 
                type="number" 
                name="annualLimit"
                value={formData.annualLimit}
                onChange={handleChange}
                placeholder="Enter amount" 
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Co insurance in patient (%)</label>
              <input 
                type="number" 
                name="coInsuranceInPatient"
                value={formData.coInsuranceInPatient}
                onChange={handleChange}
                placeholder="Enter percentage" 
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Co insurance out patient (%)</label>
              <input 
                type="number" 
                name="coInsuranceOutPatient"
                value={formData.coInsuranceOutPatient}
                onChange={handleChange}
                placeholder="Enter percentage" 
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Co insurance diagnosis (%)</label>
              <input 
                type="number" 
                name="coInsuranceDiagnosis"
                value={formData.coInsuranceDiagnosis}
                onChange={handleChange}
                placeholder="Enter percentage" 
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Co insurance medicine (%)</label>
              <input 
                type="number" 
                name="coInsuranceMedicine"
                value={formData.coInsuranceMedicine}
                onChange={handleChange}
                placeholder="Enter percentage" 
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Pharmacy annual limit</label>
              <input 
                type="number" 
                name="pharmacyLimit"
                value={formData.pharmacyLimit}
                onChange={handleChange}
                placeholder="Enter amount" 
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Chronic disease coverage limit</label>
              <input 
                type="number" 
                name="chronicLimit"
                value={formData.chronicLimit}
                onChange={handleChange}
                placeholder="Enter amount" 
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Chronic disease co insurance (%)</label>
              <input 
                type="number" 
                name="chronicCoInsurance"
                value={formData.chronicCoInsurance}
                onChange={handleChange}
                placeholder="Enter percentage" 
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Room type</label>
              <input 
                type="text" 
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                placeholder="Enter room type" 
                className={inputClasses} 
              />
            </div>
          </div>
          <div className="mt-6">
            <label className={labelClasses}>Special Conditions</label>
            <textarea 
              name="specialConditions"
              value={formData.specialConditions}
              onChange={handleChange}
              className={inputClasses}
              rows={4}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {[
              { name: 'requireMedicalFormSponsor', label: 'Required Medical Application Form For Sponsor' },
              { name: 'requireMedicalFormMember', label: 'Required Medical Application Form For Member' },
              { name: 'sellViaCash', label: 'Sell via Cash' },
              { name: 'requireKYC', label: 'Require KYC' },
              { name: 'allowBulkMemberImport', label: 'Allow Bulk Member Import' },
              { name: 'pushToICP', label: 'Push To ICP' },
              { name: 'notifyQuoteCreation', label: 'Notify Quote Creation' },
              { name: 'isDisabled', label: 'Is Disabled' },
              { name: 'enableCommission', label: 'Enable Commission' },
              { name: 'enableOCR', label: 'Enable OCR' }
            ].map((checkbox) => (
              <label key={checkbox.name} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name={checkbox.name}
                  checked={formData[checkbox.name] || false}
                  onChange={handleChange}
                  className="accent-blue-600" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{checkbox.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Attachments */}
        <section className={`${sectionClasses} mb-8`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Attachments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Network</label>
              <select 
                name="network"
                value={formData.network}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select Network</option>
                <option value="Network1">Network 1</option>
                <option value="Network2">Network 2</option>
                <option value="Network3">Network 3</option>
              </select>
            </div>
            <div className="text-sm text-blue-500 flex items-end">Make sure to select TPA before selecting the network</div>
            {[
              { name: 'tableOfBenefits', label: 'Table of Benefits' },
              { name: 'medicalFormSponsor', label: 'Medical Insurance Form For Sponsor' },
              { name: 'medicalFormMember', label: 'Medical Insurance Form For Member' }
            ].map((attachment) => (
              <div key={attachment.name}>
                <label className={labelClasses}>{attachment.label}</label>
                <input 
                  type="file" 
                  name={attachment.name}
                  onChange={handleChange}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 text-white dark:text-gray-200" 
                />
                {formData[attachment.name] && typeof formData[attachment.name] === 'string' && (
                  <p className="mt-1 text-sm text-gray-500">Current file: {formData[attachment.name]}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex gap-4">
          <motion.button 
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Save Changes
          </motion.button>
          <Link href="/dashboard/products">
            <motion.button 
              type="button"
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Cancel
            </motion.button>
          </Link>
        </div>
      </form>
    </div>
  );
}