import { useState, useEffect, useRef } from 'react';
import { Link, Company } from '../types/types';

export const useLinkGeneration = (company: Company | null) => {
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [showLink, setShowLink] = useState<boolean>(false);

  // Cache for previously fetched links by company and product combination
  const cache = useRef<Record<string, Link[]>>({});

  const handleGenerateLink = async () => {
    if (!company) return;

    const cacheKey = `${company.companyName}-${company.productName}`;

    // Check cache first
    if (cache.current[cacheKey]) {
      // Sort and set selected link from cache
      const sortedLinks = cache.current[cacheKey].sort((a, b) => {
        if (a.used !== b.used) return a.used - b.used;
        if (a.seen !== b.seen) return a.seen - b.seen;
        return new Date(a.updated).getTime() - new Date(b.updated).getTime();
      });
      setSelectedLink(sortedLinks[0] || null);
      setShowLink(true);
      return;
    }

    try {
      const response = await fetch(`/api/company/links/?company=${company.companyName}&product=${company.productName}`);
      if (!response.ok) throw new Error('Failed to get company links');

      const linkData: Link[] = await response.json();
      
      // Cache the fetched data
      cache.current[cacheKey] = linkData;

      // Sort and set selected link
      const sortedLinks = linkData.sort((a, b) => {
        if (a.used !== b.used) return a.used - b.used;
        if (a.seen !== b.seen) return a.seen - b.seen;
        return new Date(a.updated).getTime() - new Date(b.updated).getTime();
      });
      setSelectedLink(sortedLinks[0] || null);
      setShowLink(true);
    } catch (error) {
      console.error(error);
    }
  };

  return { selectedLink, showLink, handleGenerateLink };
};
