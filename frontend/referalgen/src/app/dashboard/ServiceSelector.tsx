'use client'
import React, { useState } from 'react'
import SearchCompanies from '../components/SearchCompanies'
import UserLinks from './UserLinks'




const ServiceSelector = () => {
    const [selectedHeading, setSelectedHeading] = useState<string | null>(null);

    const renderContent = () => {
        switch (selectedHeading) {
          case 'Generate Links':
            return <SearchCompanies />;
          case 'My Links':
            return <UserLinks />;
          default:
            return <p>Select a Service</p>;
        }
    };

    return (
        <div className="flex flex-col items-center justify-start w-full h-auto p-4">
            {/* Centered Tabs */}
            <div className="flex items-center justify-center space-x-5 w-[80%]"> {/* Use justify-center here */}
                <span
                    className={`cursor-pointer text-2xl font-bold ${
                        selectedHeading === 'Generate Links' ? 'text-cerulean' : 'text-ymblue'
                    }`}
                    onClick={() => setSelectedHeading('Generate Links')}
                >
                    Generate Links
                </span>
                <div className="h-8 w-px bg-gray-400"></div>
                <span
                    className={`cursor-pointer text-2xl font-bold ${
                        selectedHeading === 'My Links' ? 'text-cerulean' : 'text-ymblue'
                    }`}
                    onClick={() => setSelectedHeading('My Links')}
                >
                    My Links
                </span>
            </div>

            {/* Fixed height to prevent resizing */}
            <div className="mt-6 w-full min-h-[300px]"> {/* Set min-height as per your content size */}
                {renderContent()}
            </div>
        </div>
    )
}

export default ServiceSelector
