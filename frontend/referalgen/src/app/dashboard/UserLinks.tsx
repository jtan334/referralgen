import React, { useState, useEffect } from "react";
import AddNewLink from "./components/AddNewLink"; // Import the AddNewLink component
import { Link, Company } from "../types/types";

interface UserLinksProps {
  loadedLinks: Link[];
  companies: Company[];
  refresh: (userId: string) => Promise<Link[]>;
}

function UserLinks({ companies, loadedLinks, refresh }: UserLinksProps) {
  const [links, setLinks] = useState<Link[]>(loadedLinks); // State to store the links
  const [showAddLink, setShowAddLink] = useState(false); // State to manage the AddNewLink visibility

    // Refresh links using the passed refresh method
    const refreshLinks = async () => {
      try {
        const updatedLinks = await refresh("test");
        setLinks(updatedLinks);
      } catch (error) {
        console.error(error);
      }
    };

  // Delete link
  const deleteLink = async (linkId: string) => {
    const response = await fetch(`/api/links?id=${linkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete link");
    }

    await refreshLinks(); // Refresh links after deletion
  };

  // Activate link
  const activateLink = async (linkId: number) => {
    const response = await fetch(`/api/links?editType=activate`, {
      method: "PATCH", // Use PATCH for activation
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: linkId }),
    });

    if (!response.ok) {
      throw new Error("Failed to activate link");
    }

    await refreshLinks(); // Refresh links after activation
  };

  // Edit link
  const editLink = async (updatedLink: Link) => {
    const response = await fetch(`/api/links`, {
      method: "PUT", // Use PUT for full update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLink),
    });

    if (!response.ok) {
      throw new Error("Failed to update link");
    }

    await refreshLinks(); // Refresh links after editing
  };

  // Add new link
  const addNewLink = async (newLink: Link) => {
    const response = await fetch(`/api/links`, {
      method: "POST", // Use POST for adding new link
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLink),
    });

    if (!response.ok) {
      throw new Error("Failed to add new link");
    }

    await refreshLinks(); // Refresh links after adding
    setShowAddLink(false); // Hide AddNewLink after adding
  };

  const handleAddLinkClick = () => {
    setShowAddLink(true); // Show the AddNewLink component
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
              <th>Date Created</th>
              <th>Date Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.uid} className="text-xl text-center">
                <td>{link.companyName}</td>
                <td>{link.productName}</td>
                <td>
                  <a
                    href={link.refLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {link.refLink}
                  </a>
                </td>
                <td>{link.seen}</td>
                <td>{link.used}</td>
                <td>
                  {new Date(link.created + "Z").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td>
                  {new Date(link.updated + "Z").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>

                <td>
                  <button
                    className="mx-4 bg-saffron text-black rounded-md py-2 px-4 hover:bg-saffron-dark"
                    onClick={() => editLink(link)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-300 text-black rounded-md py-2 px-4 hover:bg-red-400"
                    onClick={() => deleteLink(link.uid)}
                  >
                    Delete
                  </button>
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
          <button className="btn btn-primary" onClick={handleAddLinkClick}>
            Add New Link
          </button>
        )}
      </div>
      {showAddLink && (
        <AddNewLink
          onClose={() => setShowAddLink(false)}
          onAddLink={addNewLink}
          companies={companies} // Pass the companies correctly here
        />
      )}
    </div>
  );
}

export default UserLinks;
