import React, { useState } from "react";
import AddNewLink from "./components/AddNewLink";
import { Link, Company } from "../types/types";

interface UserLinksProps {
  loadedLinks: Link[];
  companies: Company[];
  refresh: (userId: string) => Promise<Link[]>;
}

function UserLinks({ companies, loadedLinks, refresh }: UserLinksProps) {
  const [links, setLinks] = useState<Link[]>(loadedLinks);
  const [showAddLink, setShowAddLink] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [editedLink, setEditedLink] = useState<Link | null>(null);

  const refreshLinks = async () => {
    try {
      const updatedLinks = await refresh("test");
      setLinks(updatedLinks);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLink = async (linkId: string) => {
    const response = await fetch(`/api/links?id=${linkId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to delete link");
    }

    await refreshLinks();
  };

  const activateLink = async (linkId: number) => {
    const response = await fetch(`/api/links?editType=activate`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: linkId }),
    });

    if (!response.ok) {
      throw new Error("Failed to activate link");
    }

    await refreshLinks();
  };

  const editLink = async (updatedLink: Link) => {
    const response = await fetch(`/api/links`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLink),
    });

    if (!response.ok) {
      throw new Error("Failed to update link");
    }

    await refreshLinks();
    setEditingLinkId(null); // Exit edit mode
    setEditedLink(null); // Clear the edited link state
  };

  const addNewLink = async (newLink: Link) => {
    const response = await fetch(`/api/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLink),
    });

    if (!response.ok) {
      throw new Error("Failed to add new link");
    }

    await refreshLinks();
    setShowAddLink(false);
  };

  const handleAddLinkClick = () => setShowAddLink(true);

  const handleEditClick = (linkId: string) => {
    setEditingLinkId(linkId);
    const currentLink = links.find((link) => link.uid === linkId);
    if (currentLink) {
      setEditedLink({ ...currentLink });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedLink) return;
    setEditedLink({ ...editedLink, refLink: e.target.value });
  };

  const hasChanges = (original: Link, edited: Link): boolean => {
    return original.refLink !== edited.refLink;
  };

  const handleSaveClick = () => {
    if (editingLinkId && editedLink) {
      const currentLink = links.find((link) => link.uid === editingLinkId);
      if (currentLink && hasChanges(currentLink, editedLink)) {
        editLink(editedLink);
      } else {
        // Exit edit mode without sending a request
        setEditingLinkId(null);
        setEditedLink(null);
      }
    }
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.uid} className="text-xl text-center">
                <td>{link.companyName}</td>
                <td>{link.productName}</td>
                <td>
                  {editingLinkId === link.uid ? (
                    <input
                      value={editedLink?.refLink || ""}
                      onChange={handleInputChange}
                      className="border p-1"
                    />
                  ) : (
                    <a
                      href={link.refLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {link.refLink}
                    </a>
                  )}
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
                <td>{link.active ?
                  "Active":"Inactive"}</td>
                <td>
                  {editingLinkId === link.uid ? (
                    <button
                      className="mx-4 bg-green-500 text-black rounded-md py-2 px-4 hover:bg-green-600"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="mx-4 bg-saffron text-black rounded-md py-2 px-4 hover:bg-saffron-dark"
                      onClick={() => handleEditClick(link.uid)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-300 text-black rounded-md py-2 px-4 hover:bg-red-400"
                    onClick={() => deleteLink(link.uid)}
                  >
                    Deactivate
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
          companies={companies}
        />
      )}
    </div>
  );
}

export default UserLinks;
