'use client';

import React, { useState } from 'react';
import { Link } from '../types/types';



const FriendsList = () => {
    const [friends, setFriends] = useState<string[]>([]);

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