'use client';

import React, { useState } from 'react';

interface Friend {
    id: string;
    name: string;
    email: string;
}

const FriendsList = () => {
    const [friends, setFriends] = useState<Friend[]>([
        { id: '1', name: 'Alice', email: 'alice@example.com' },
        { id: '2', name: 'Bob', email: 'bob@example.com' },
        { id: '3', name: 'Charlie', email: 'charlie@example.com' },
    ]);

    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

    const toggleFriend = (id: string) => {
        setSelectedFriends(prev =>
            prev.includes(id)
                ? prev.filter(friendId => friendId !== id)
                : [...prev, id]
        );
    };

    return (
        <div>
            <h2>Friends List</h2>
            <ul>
                {friends.map(friend => (
                    <li key={friend.id}>
                        <input
                            type="checkbox"
                            checked={selectedFriends.includes(friend.id)}
                            onChange={() => toggleFriend(friend.id)}
                        />
                        <span>{friend.name} ({friend.email})</span>
                    </li>
                ))}
            </ul>
            <p>Selected: {selectedFriends.length} friends</p>
        </div>
    );
};

export default FriendsList;