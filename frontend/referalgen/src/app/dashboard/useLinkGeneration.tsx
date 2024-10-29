import { useState } from 'react';
import {Link, Company} from '../types/types'


export const useLinkGeneration = (company: Company | null) => {
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [showLink, setShowLink] = useState<boolean>(false);

  const handleGenerateLink = async () => {
    if (!company) return;

    try {
      const response = await fetch(`/api/company/links/?company=${company.companyName}&product=${company.productName}`);
      if (!response.ok) throw new Error('Failed to get company links');

      const linkData: Link[] = await response.json();
      const sortedLinks = linkData.sort((a, b) => a.seen === b.seen ? a.used - b.used : a.seen - b.seen);
      setSelectedLink(sortedLinks[0] || null);
      setShowLink(true);
    } catch (error) {
      console.error(error);
    }
  };

  return { selectedLink, showLink, handleGenerateLink };
};
