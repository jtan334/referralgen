'use client';
import React, { useState, useEffect } from 'react';

interface Company {
  idCompanies: number;
  companyName: string;
  productName: string;
  linkFormat: string;
  country: string;
}

interface Link {
  uid: string;
  owner: string;
  companyName: string;
  productName: string;
  country: string;
  active: boolean;
  refLink: string;
  seen: number;
  used: number;
}

interface SelectedCompanyProps {
  company: Company | null;
}

const SelectedCompany = ({ company }: SelectedCompanyProps) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null); // Store the selected link
  const [showLink, setShowLink] = useState<boolean>(false); // Control visibility of the link section

  useEffect(() => {
    if (company) {
      setVisible(true); // Reset visibility when a new company is selected
    }
  }, [company]);

  const handleGenerateLink = async () => {
    console.log(`Generating link for ${company?.companyName} - ${company?.productName}`);

    if (!company) {
      console.error('Company is null or undefined');
      return; // Early return to prevent execution if company is null
    }

    try {
      const response = await fetch(`/api/company/links/?company=${company.companyName}&product=${company.productName}`);
      
      if (!response.ok) {
        throw new Error('Failed to get company links');
      }

      const linkData: Link[] = await response.json(); // Parse the JSON response properly
      
      // Sort links by 'seen' and 'used', prioritize by least 'seen' and 'used'
      const sortedLinks = linkData.sort((a, b) => {
        if (a.seen === b.seen) {
          return a.used - b.used; // If 'seen' is the same, compare by 'used'
        }
        return a.seen - b.seen; // Otherwise, compare by 'seen'
      });

      const leastSeenAndUsedLink = sortedLinks[0] || null; // Get the link with the least 'seen' and 'used'

      setSelectedLink(leastSeenAndUsedLink); // Set the selected link
      setShowLink(true); // Show the link section after sorting and selection

      console.log(leastSeenAndUsedLink);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    setVisible(false); // Hide the component when 'X' is clicked
  };

  if (!visible || !company) return null;

  return (
    <div className="my-10 mx-10 py-5 px-5 border rounded bg-customwhite relative">
      <button
        className="absolute top-2 right-2 text-xl text-black hover:text-gray-700"
        onClick={handleClear}
      >
        X
      </button>
      <h2 className="text-xl font-bold text-black">{company.companyName}</h2>
      <p className="text-lg">{company.productName}</p>
      <div className="flex justify-center items-center h-full">
        <button onClick={handleGenerateLink} className="btn btn-primary mt-2 content-center">
          Generate Link
        </button>
      </div>

      {/* Selected Link Section */}
      {showLink && (
        <div className="mt-4">
          {selectedLink ? (
            <div>
              <h3 className="text-xl font-bold text-black">Priority Link:</h3>
              <p className="text-black">RefLink: {selectedLink.refLink}</p>
            </div>
          ) : (
            <p className="text-red-500 text-lg mt-4">There are no links for this company and product yet!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectedCompany;
