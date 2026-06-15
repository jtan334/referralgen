'use client';

import React, { useState } from 'react';
import { Link } from '../types/types';

interface FriendData {
    id: string;
    name: string;
    links: Link[];
}

const FriendsList = () => {
    const [friends, setFriends] = useState<FriendData[]>([]);
    const [expandedFriends, setExpandedFriends] = useState<Set<string>>(new Set());
    const [showAddModal, setShowAddModal] = useState(false);
    const [newFriendId, setNewFriendId] = useState('');
    const [error, setError] = useState('');

    // TODO: Add your API call to fetch friends
    // useEffect(() => {
    //     fetchFriends();
    // }, []);

    const toggleExpand = (friendId: string) => {
        const newExpanded = new Set(expandedFriends);
        if (newExpanded.has(friendId)) {
            newExpanded.delete(friendId);
        } else {
            newExpanded.add(friendId);
        }
        setExpandedFriends(newExpanded);
    };

    const handleAddFriend = async () => {
        if (!newFriendId.trim()) {
            setError('Please enter a friend ID');
            return;
        }

        try {
            // TODO: Replace with your API call to add friend
            // const response = await fetch('/api/friends/add', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ friendId: newFriendId }),
            // });

            setNewFriendId('');
            setShowAddModal(false);
            setError('');
        } catch (err) {
            setError('Failed to add friend');
            console.error(err);
        }
    };

    const handleDeleteFriend = async (friendId: string) => {
        if (!confirm('Are you sure you want to remove this friend?')) return;

        try {
            // TODO: Replace with your API call to delete friend
            // const response = await fetch(`/api/friends/remove`, {
            //     method: 'DELETE',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ friendId }),
            // });

            setFriends(friends.filter(f => f.id !== friendId));
            setError('');
        } catch (err) {
            setError('Failed to remove friend');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-base-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-base-content">Friends Network</h1>
                        <p className="text-sm text-base-content/60 mt-2">
                            {friends.length} friend{friends.length !== 1 ? 's' : ''} connected
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="btn btn-primary btn-lg gap-2 w-full sm:w-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Friend
                    </button>
                </div>

                {/* Error Alert */}
                {error && (
                    <div role="alert" className="alert alert-error mb-6 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m8-2l2 2m0 0l2 2m-2-2l-2 2m2-2l2-2" />
                        </svg>
                        <span>{error}</span>
                        <button
                            onClick={() => setError('')}
                            className="btn btn-sm btn-ghost"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Add Friend Modal */}
                {showAddModal && (
                    <dialog open className="modal modal-open">
                        <div className="modal-box w-full max-w-sm">
                            <form method="dialog" className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg">Add New Friend</h3>
                                <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                            </form>

                            <div className="form-control mb-6">
                                <input
                                    type="text"
                                    placeholder="Enter friend's user ID"
                                    value={newFriendId}
                                    onChange={(e) => setNewFriendId(e.target.value)}
                                    className="input input-bordered w-full"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddFriend()}
                                    autoFocus
                                />
                            </div>

                            <div className="modal-action gap-3">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddFriend}
                                    disabled={!newFriendId.trim()}
                                    className="btn btn-primary"
                                >
                                    Add Friend
                                </button>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => setShowAddModal(false)}>close</button>
                        </form>
                    </dialog>
                )}

                {/* Friends List */}
                {friends.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM4 20h16c1.1 0 2-.9 2-2v-2a6 6 0 00-12 0v2c0 1.1.9 2 2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-base-content mb-2">No friends yet</h3>
                        <p className="text-base-content/60 mb-6">Start building your network by adding friends</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn btn-primary"
                        >
                            Add Your First Friend
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {friends.map((friend) => (
                            <div key={friend.id} className="card bg-base-200 shadow-md border border-base-300 transition-all hover:shadow-lg">
                                {/* Friend Header */}
                                <div className="card-body p-0">
                                    <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-base-100 transition-colors">
                                        {/* Expand Button */}
                                        <button
                                            onClick={() => toggleExpand(friend.id)}
                                            className="btn btn-ghost btn-sm btn-circle"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-5 w-5 transition-transform ${
                                                    expandedFriends.has(friend.id) ? 'rotate-90' : ''
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        {/* Friend Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-base-content truncate">{friend.name}</h3>
                                            <p className="text-sm text-base-content/60 truncate">{friend.id}</p>
                                        </div>

                                        {/* Link Count Badge */}
                                        <div className="badge badge-primary badge-lg gap-1">
                                            {friend.links.length}
                                            <span className="text-xs">
                                                link{friend.links.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteFriend(friend.id)}
                                            className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error/20"
                                            title="Remove friend"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Friend Links (Expandable) */}
                                    {expandedFriends.has(friend.id) && (
                                        <div className="border-t border-base-300 p-4 space-y-3 bg-base-100/50">
                                            {friend.links.length === 0 ? (
                                                <div className="text-center py-8 text-base-content/50">
                                                    <p className="text-sm">No referral links yet</p>
                                                </div>
                                            ) : (
                                                friend.links.map((link) => (
                                                    <div key={link.uid} className="card bg-base-100 border border-base-300 p-4 hover:shadow-md transition-shadow">
                                                        {/* Link Header */}
                                                        <div className="flex items-start justify-between gap-3 mb-3">
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-semibold text-base-content truncate">
                                                                    {link.companyName}
                                                                </h4>
                                                                <p className="text-sm text-base-content/60 truncate">
                                                                    {link.productName}
                                                                </p>
                                                            </div>
                                                            {/* Status Badge */}
                                                            <div className="badge gap-1 whitespace-nowrap"
                                                                style={{
                                                                    backgroundColor: link.active ? '#dcfce7' : '#fee2e2',
                                                                    color: link.active ? '#15803d' : '#b91c1c',
                                                                }}
                                                            >
                                                                <span>{link.active ? '🟢' : '🔴'}</span>
                                                                <span>{link.active ? 'Active' : 'Inactive'}</span>
                                                            </div>
                                                        </div>

                                                        {/* Link Metrics */}
                                                        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-base-300">
                                                            <div className="text-center">
                                                                <p className="text-xs font-semibold text-base-content/50 uppercase mb-1">Seen</p>
                                                                <p className="text-xl font-bold text-primary">{link.seen}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-xs font-semibold text-base-content/50 uppercase mb-1">Used</p>
                                                                <p className="text-xl font-bold text-primary">{link.used}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-xs font-semibold text-base-content/50 uppercase mb-1">Country</p>
                                                                <p className="text-lg font-bold text-primary">{link.country}</p>
                                                            </div>
                                                        </div>

                                                        {/* View Link Button */}
                                                        <a
                                                            href={link.refLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-primary btn-sm btn-block gap-2"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                            View Link
                                                        </a>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendsList;