// components/UserLinks.tsx

import React, { useState, useEffect } from 'react';

// Define the type for each link
interface Link {
  id: number;
  companyName: string;
  productName: string;
  url: string;
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
        const response = await fetch('/api/user-links'); // Replace with your actual API route
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error('Error fetching links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  // Edit link handler
  const handleEdit = (linkId: number) => {
    console.log(`Edit link with ID: ${linkId}`);
    // Implement the logic to edit the link
  };

  // Delete link handler
  const handleDelete = (linkId: number) => {
    console.log(`Delete link with ID: ${linkId}`);
    // Implement the logic to delete the link
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
              <tr key={link.id}>
                <td>{link.companyName}</td>
                <td>{link.productName}</td>
                <td>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </td>
                <td>{link.seen}</td>
                <td>{link.used}</td>
                <td>
                  <button onClick={() => handleEdit(link.id)}>Edit</button>
                  <button onClick={() => handleDelete(link.id)}>Delete</button>
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
