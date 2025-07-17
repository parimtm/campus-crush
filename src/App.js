import React, { useState } from 'react';
import profiles from './profiles';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

function App() {
  const [current, setCurrent] = useState(0);
  const profile = profiles[current];
  const likedBy = 'test-user-123'; // Hardcoded current user (will replace later with auth)

  const handleLike = async () => {
    const likedUser = profile.id;

    try {
      // 1. Save the like
      await addDoc(collection(db, 'likes'), {
        likedBy,
        likedUser,
        timestamp: Date.now(),
      });

      // 2. Check if the other user liked back
      const q = query(
        collection(db, 'likes'),
        where('likedBy', '==', likedUser),
        where('likedUser', '==', likedBy)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        // 3. It's a match!
        await addDoc(collection(db, 'matches'), {
          users: [likedBy, likedUser],
          timestamp: Date.now(),
        });
        alert(`💘 You matched with ${profile.name}!`);
      }
    } catch (error) {
      console.error('Error handling like/match:', error);
    }

    nextProfile();
  };

  const handleSkip = () => {
    console.log('Skipped:', profile.name);
    nextProfile();
  };

  const nextProfile = () => {
    if (current < profiles.length - 1) {
      setCurrent(current + 1);
    } else {
      alert('No more profiles!');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Campus Crush 💘</h2>
      <img

