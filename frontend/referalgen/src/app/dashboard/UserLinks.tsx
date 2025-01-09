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
    <div className="w-full p-4">
    {links.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-base bg-transparent text-black">
              <th className="table-cell">Company</th>
              <th className="table-cell">Product</th>
              <th>Link</th>
              <th className="hidden lg:table-cell">Seen</th>
              <th className="hidden lg:table-cell">Used</th>
              <th className="hidden xl:table-cell">Created</th>
              <th className="hidden xl:table-cell">Updated</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr 
                key={link.uid} 
                className="bg-transparent text-black"
              >
                <td className="table-cell">{link.companyName}</td>
                <td className="table-cell">{link.productName}</td>
                <td className="max-w-xs overflow-hidden text-ellipsis">
                  {editingLinkId === link.uid ? (
                    <input
                      value={editedLink?.refLink || ""}
                      onChange={handleInputChange}
                      className="input input-bordered w-full max-w-xs bg-white text-black"
                    />
                  ) : (
                    <a
                      href={`//${link.refLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary text-black"
                    >
                      {link.refLink}
                    </a>
                  )}
                </td>
                <td className="hidden lg:table-cell">{link.seen}</td>
                <td className="hidden lg:table-cell">{link.used}</td>
                <td className="hidden xl:table-cell">
                  {new Date(link.created + "Z").toLocaleDateString()}
                </td>
                <td className="hidden xl:table-cell">
                  {new Date(link.updated + "Z").toLocaleDateString()}
                </td>
                <td>
                  <div className={`badge ${link.active ? 'badge-success' : 'badge-error'}`}>
                    {link.active ? "Active" : "Inactive"}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col md:flex-row gap-2">
                    {editingLinkId === link.uid ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEditClick(link.uid)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => deleteLink(link.uid)}
                    >
                      Deactivate
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="text-center py-8">
        <p className="text-lg">You don't have any links yet!</p>
      </div>
    )}
    
    <div className="flex justify-center mt-8">
      {!showAddLink && (
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddLink(true)}
        >
          Add New Link
        </button>
      )}
    </div>
</div>
  );
}

export default UserLinks;
