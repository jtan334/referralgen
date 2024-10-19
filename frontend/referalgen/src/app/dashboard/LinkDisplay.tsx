import React from 'react';

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

interface LinkDisplayProps {
  selectedLink: Link | null;
}

const LinkDisplay = ({ selectedLink }: LinkDisplayProps) => {
  return (
    <div className="mt-4">
      {selectedLink ? (
        <div>
          <h3 className="text-xl font-bold text-black">Referral Link:</h3>
          <p className="text-black">{selectedLink.refLink}</p>
          <h3 className="text-xl font-bold text-black">Shared By:</h3>
          <p className="text-black">{selectedLink.owner}</p>
        </div>
      ) : (
        <p className="text-red-500 text-lg mt-4">
          There are no links for this company and product yet!
        </p>
      )}
    </div>
  );
};

export default LinkDisplay;
