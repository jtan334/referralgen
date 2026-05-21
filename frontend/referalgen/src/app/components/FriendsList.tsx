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

            <p>Selected: {selectedFriends.length} friends</p>
        </div>
    );
};

export default FriendsList;