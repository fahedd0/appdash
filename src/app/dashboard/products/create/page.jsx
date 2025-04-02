import Link from 'next/link';

export default function CreateProductPage() {
        {/* Section Template */}
        const sectionClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-300 dark:border-gray-700";
        const inputClasses = "w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
        const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";
  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link href="/dashboard/products" className="text-sm text-blue-600 hover:underline">
          ← Back to Products
        </Link>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Create Product</h2>


      {/* Base Information */}
      <section className={sectionClasses}>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Base Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Plan Name', 'Plan Code', 'Policy SDK No.', 'Category'].map((label) => (
            <div key={label}>
              <label className={labelClasses}>{label}</label>
              <input type="text" placeholder={`Enter ${label}`} className={inputClasses} />
            </div>
          ))}
          {['Third Party Administrator', 'Coverage Area'].map((label) => (
            <div key={label}>
              <label className={labelClasses}>{label}</label>
              <select className={inputClasses}>
                <option>Select an option</option>
              </select>
            </div>
          ))}
          <div className="md:col-span-2">
            <label className={labelClasses}>Allowed Sponsor Types</label>
            <select className={inputClasses}>
              <option>Select an option</option>
            </select>
          </div>
        </div>
      </section>

      {/* Birth Certificate Settings */}
      <section className={sectionClasses}>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Birth Certificate Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Type', 'Max Age'].map((label, idx) => (
            <div key={label}>
              <label className={labelClasses}>{label}</label>
              {idx === 0 ? (
                <select className={inputClasses}>
                  <option>Select Type</option>
                </select>
              ) : (
                <input type="text" className={inputClasses} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Plan Configuration */}
      <section className={sectionClasses}>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Plan Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            'Annual financial limit pppy',
            'Co insurance in patient',
            'Co insurance out patient',
            'Co insurance diagnosis',
            'Co insurance medicine',
            'Pharmacy annual limit',
            'Chronic disease coverage limit',
            'Chronic disease co insurance',
            'Room type'
          ].map((label) => (
            <div key={label}>
              <label className={labelClasses}>{label}</label>
              <input type="text" className={inputClasses} />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <label className={labelClasses}>Special Conditions</label>
          <textarea className={inputClasses}></textarea>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {[
            'Required Medical Application Form For Sponsor',
            'Required Medical Application Form For Member',
            'Sell via Cash',
            'Require KYC',
            'Allow Bulk Member Import',
            'Push To ICP',
            'Notify Quote Creation',
            'Is Disabled',
            'Enable Commission',
            'Enable OCR'
          ].map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Attachments */}
      <section className={sectionClasses}>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Attachments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Network</label>
            <select className={inputClasses}>
              <option>Select Network</option>
            </select>
          </div>
          <div className="text-sm text-blue-500 flex items-end">Make sure to select TPA before selecting the network</div>
          {[
            'Table of Benefits',
            'Medical Insurance Form For Sponsor',
            'Medical Insurance Form For Member'
          ].map((label) => (
            <div key={label}>
              <label className={labelClasses}>{label}</label>
              <input type="file" className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 text-white dark:text-gray-200" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer Actions */}
      <div className="flex gap-4">
        <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Create</button>
        <button className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">Create & Create Another</button>
        <button className="px-5 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">Cancel</button>
      </div>
    </div>
  );
}
