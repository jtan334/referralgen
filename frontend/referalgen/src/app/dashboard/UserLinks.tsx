"use client";

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

interface UserLinksProps {
  links: Link[];
}
const refreshLinks = async () => {
  try {
      const data = fetch(`/api/user/?userId=test`);
  } catch (error) {
      console.error(error);
  } 
}

function UserLinks({ links }: UserLinksProps) {

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
      <div className ="flex justify-center items-center my-10">
        <button className ="btn btn-primary">Add New Link</button>
      </div>
    </div>
  );
}

export default UserLinks;
