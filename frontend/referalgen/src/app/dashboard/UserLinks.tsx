// components/UserLinks.tsx

import React, { useState, useEffect } from 'react';

// Define the type for each link

interface Link {
  UID: number;
  owner: string;
  companyName: string;
  productName: string;
  country: string;
  active: boolean;
  refLink: string;
  seen: number;
  used: number;
}

const UserLinks: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the user links (replace with actual API endpoint)
  useEffect(() => {
    
    const fetchLinks = async () => {
      try {
        
        const response = fetchUserLinks("Test"); 
        const data =  await response;
        setLinks(data);
      } catch (error) {
        console.error('Error fetching links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const fetchUserLinks = async (userId: string) => {
    
    const response = await fetch(`/api/user/?userId=${userId}`);
    
    if (!response.ok) throw new Error('Failed to fetch user links');
    return await response.json();
  };

// Example for activating a link
const deleteLink = async (linkId: number) => {
  const response = await fetch(`/api/links/delete`, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: linkId }),
  });

  if (!response.ok) {
    throw new Error('Failed to activate link');
  }
  const data = await response.json();
  return data;
};

const activateLink = async (linkId: number) => {
  const response = await fetch(`/api/links?editType=activate`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: linkId }),
  });

  if (!response.ok) {
    throw new Error('Failed to activate link');
  }
  const data = await response.json();
  return data;
};


// Example for editing a link
const editLink = async (updatedLink: Link) => {
  const response = await fetch(`/api/links`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedLink),
  });

  if (!response.ok) {
    throw new Error('Failed to update link');
  }
  const data = await response.json();
  return data;
};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {links.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Product Name</th>
              <th>Link</th>
              <th>Seen</th>
              <th>Used</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.UID}>
                <td>{link.companyName}</td>
                <td>{link.productName}</td>
                <td>
                  <a href={link.refLink} target="_blank" rel="noopener noreferrer">
                    {link.refLink}
                  </a>
                </td>
                <td>{link.seen}</td>
                <td>{link.used}</td>
                <td>
                  <button onClick={() => editLink(link)}>Edit</button>
                  <button onClick={() => deleteLink(link.UID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You don't have any links yet!</p>
      )}
    </div>
  );
};

export default UserLinks;
