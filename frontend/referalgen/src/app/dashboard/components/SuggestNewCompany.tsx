'use client'
import React, { useState } from 'react';
import { Company } from '../../types/types';

const SuggestNewCompany = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState<Company>({
    idCompanies: 0,
    companyName: '',
    productName: '',
    linkFormat: '',
    country: '',
    approval: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const countries =["Canada", "US"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit new company request: ${errorText}`);
      }

      alert('Request submitted successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'Failed to submit the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card bg-white w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-ymblue mb-4">Request New Company and Product</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="text-base text-gray">Company Name</span>
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="e.g., Amazon, Netflix"
                value={formData.companyName}
                onChange={handleChange}
                className="input input-bordered w-full bg-white text-black"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-base text-gray">Product Name</span>
              </label>
              <input
                type="text"
                name="productName"
                placeholder="e.g., Prime, Standard Subscription"
                value={formData.productName}
                onChange={handleChange}
                className="input input-bordered w-full bg-white text-black"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-base text-gray">Link Format</span>
              </label>
              <input
                type="url"
                name="linkFormat"
                placeholder="https://example.com/ref={referralCode}"
                value={formData.linkFormat}
                onChange={handleChange}
                className="input input-bordered w-full bg-white text-black"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-base text-gray">Country</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="select select-bordered w-full bg-white text-black"
                required
              >
                <option value="" disabled>Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="alert alert-error">
                <p>{error}</p>
              </div>
            )}

            <div className="card-actions justify-end mt-6">
              <button 
                type="button"
                className="btn bg-gray hover:bg-opacity-90 text-white"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="btn bg-cerulean hover:bg-opacity-90 text-white"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuggestNewCompany;