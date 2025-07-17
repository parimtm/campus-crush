import React, { useState } from 'react';
import profiles from './profiles';

function App() {
  const [current, setCurrent] = useState(0);
  const profile = profiles[current];

  const handleLike = () => {
    console.log('Liked:', profile.name);
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
      <img src={profile.image} alt={profile.name} style={{ width: '200px', borderRadius: '50%' }} />
      <h3>{profile.name}, {profile.age}</h3>
      <p>{profile.bio}</p>
      <button onClick={handleLike}>❤️ Like</button>
      <button onClick={handleSkip} style={{ marginLeft: '10px' }}>❌ Skip</button>
    </div>
  );
}

export default App;
