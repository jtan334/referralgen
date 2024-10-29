import React, { useState } from 'react';
import AddNewLink from './components/AddNewLink';  // Import the AddNewLink component
import {Link, Company} from '../types/types'


interface UserLinksProps {
  links: Link[];
  companies: Company[];
}

function UserLinks({ links, companies }: UserLinksProps) {  // Correctly destructure here
  const [showAddLink, setShowAddLink] = useState(false);  // State to manage the AddNewLink visibility

  const refreshLinks = async () => {
    try {
      const data = await fetch(`/api/user/?userId=test`);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLink = async (linkId: string) => {
    const response = await fetch(`/api/links?id=${linkId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete link');
    }

    await refreshLinks();
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

    await refreshLinks();
  };

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

    await refreshLinks();
  };

  const addNewLink = async (newLink: Link) => {
    const response = await fetch(`/api/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLink),
    });

    if (!response.ok) {
      throw new Error('Failed to add new link');
    }

    await refreshLinks();
    setShowAddLink(false);  // Hide AddNewLink after successfully adding a link
  };

  const handleAddLinkClick = () => {
    setShowAddLink(true);  // Show the AddNewLink component
  };

  return (
    <div>
      {links.length > 0 ? (
        <table className="mx-auto w-full md:w-3/4 border-collapse border border-gray-300">
          <thead className="text-xl text-center text-black">
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
              <tr key={link.uid} className="text-xl text-center">
                <td>{link.companyName}</td>
                <td>{link.productName}</td>
                <td>
                  <a href={link.refLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {link.refLink}
                  </a>
                </td>
                <td>{link.seen}</td>
                <td>{link.used}</td>
                <td>
                  <button className="mx-4 bg-saffron text-black rounded-md py-2 px-4 hover:bg-saffron-dark" onClick={() => editLink(link)}>Edit</button>
                  <button className="bg-red-300 text-black rounded-md py-2 px-4 hover:bg-red-400" onClick={() => deleteLink(link.uid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">You don't have any links yet!</p>
      )}
      <div className="flex justify-center items-center my-10">
        {!showAddLink && (
          <button className="btn btn-primary" onClick={handleAddLinkClick}>Add New Link</button>
        )}
      </div>
      {showAddLink && (
        <AddNewLink
          onClose={() => setShowAddLink(false)}
          onAddLink={addNewLink}
          companies={companies}  // Pass the companies correctly here
        />
      )}
    </div>
  );
}

export default UserLinks;
