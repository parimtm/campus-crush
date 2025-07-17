import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function AdminPanel() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const likeData = [];
      const querySnapshot = await getDocs(collection(db, 'likes'));

      querySnapshot.forEach(doc => {
        likeData.push(doc.data());
      });

      const mutuals = [];

      likeData.forEach(like1 => {
        likeData.forEach(like2 => {
          if (
            like1.likedBy === like2.profileId &&
            like1.profileId === like2.likedBy
          ) {
            mutuals.push([like1.likedBy, like1.profileId]);
          }
        });
      });

      const uniqueMatches = Array.from(
        new Set(mutuals.map(JSON.stringify))
      ).map(JSON.parse);

      setMatches(uniqueMatches);
    };

    fetchMatches();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Panel - Matches</h2>
      {matches.length === 0 ? (
        <p>No matches yet.</p>
      ) : (
        <ul>
          {matches.map(([userA, userB], index) => (
            <li key={index}>{userA} ❤️ {userB}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminPanel;
