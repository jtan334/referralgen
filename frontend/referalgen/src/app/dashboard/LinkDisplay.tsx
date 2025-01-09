import React, { useState, useEffect } from 'react';
import { Link } from '../types/types';

interface LinkDisplayProps {
  selectedLink: Link | null;
}

const LinkDisplay = ({ selectedLink }: LinkDisplayProps) => {
  const [usedLink, setUsedLink] = useState<boolean | null>(null);
  const [showReportDialog, setShowReportDialog] = useState<boolean>(false);
  const [reportType, setReportType] = useState<string>('none');
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (selectedLink) {
      resetState(true);
    }
  }, [selectedLink]);

  const resetState = (keepVisible: boolean = false) => {
    if (!keepVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setShowReportDialog(false);
    setUsedLink(null);
    setReportType('none');
  };

  const handleSubmit = () => {
    if (!usedLink) {
      setShowReportDialog(true);
    } else {
      console.log('Link was used');
      resetState();
    }
  };

  const handleReportSubmit = () => {
    console.log('Report submitted:', reportType);
    resetState();
  };

  if (!selectedLink) {
    return (
      <p className="text-red-500 text-lg mt-4">
        There are no links for this company and product yet!
      </p>
    );
  }

  return (
    <div className="mt-4">
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card bg-base-100 w-full max-w-md shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Here is your link for {selectedLink.companyName}-{selectedLink.productName}!</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg mb-1">Referral Link:</h3>
                  <a href={selectedLink.refLink} className="text-lg underline text-blue-600 hover:text-blue-800 visited:text-purple-600">{selectedLink.refLink}</a>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Shared By:</h3>
                  <p className="text-sm opacity-70">{selectedLink.owner}</p>
                </div>
                
                <div className="form-control">
                  <h3 className="font-medium mb-2">Did you use this link?</h3>
                  <div className="space-y-2">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="radio"
                        name="usedLink"
                        className="radio"
                        value="yes"
                        checked={usedLink === true}
                        onChange={() => setUsedLink(true)}
                      />
                      <span className="label-text">Yes</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="radio"
                        name="usedLink"
                        className="radio"
                        value="no"
                        checked={usedLink === false}
                        onChange={() => setUsedLink(false)}
                      />
                      <span className="label-text">No</span>
                    </label>
                  </div>
                </div>

                {/* Render report options if 'No' is selected */}
                {usedLink === false && (
                  <div className="form-control">
                    <h3 className="font-medium mb-2">What was the reason?</h3>
                    <select 
                      className="select select-bordered w-full"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                    >
                      <option value="none">Select a report type</option>
                      <option value="invalid">Invalid Link/404 Not Found</option>
                      <option value="wrong">Wrong Link</option>
                      <option value = "expired">Expired Link</option>
                      <option value="changed">Changed My Mind</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div className="card-actions justify-end mt-4">
                <button 
                  className="btn btn-ghost"
                  onClick={() => resetState()}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleSubmit}
                  disabled={usedLink === null || (usedLink === false && reportType === 'none')}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkDisplay;
