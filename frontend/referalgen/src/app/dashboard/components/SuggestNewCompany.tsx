import React, { useState } from 'react';
import {Company} from '../../types/types'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      alert('Failed to submit the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center p-4 border border-gray-300 rounded"
    >
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full text-black bg-white placeholder-gray-400"
        required
      />
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={formData.productName}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full text-black bg-white placeholder-gray-400"
        required
      />
      <input
        type="url"
        name="linkFormat"
        placeholder="Link Format (e.g., https://example.com/{ref})"
        value={formData.linkFormat}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full text-black bg-white placeholder-gray-400"
        required
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full text-black bg-white placeholder-gray-400"
        required
      />
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default SuggestNewCompany;