'use client'
import React, { useState } from 'react';
import SuggestNewCompany from './SuggestNewCompany';

const SuggestNewCompanyButton = () => {
  const [showNewCompany, setShowNewCompany] = useState(false);

  const handleNewCompany = () => {
    setShowNewCompany((prev) => !prev); 
  };

  return (
    <div className="flex justify-center items-center flex-col mt-4">
      <button className="btn btn-primary mb-4" onClick={handleNewCompany}>
        {showNewCompany ? 'Close' : 'Request New Company and Product'}
      </button>
      {showNewCompany && (
        <SuggestNewCompany />
      )}
    </div>
  );
};

export default SuggestNewCompanyButton;
