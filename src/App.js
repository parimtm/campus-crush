import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, 'students'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(data);
    };
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <h1>IHM-B Crush 💖</h1>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <h2>{student.name}</h2>
            <p>{student.course}</p>
            <p>{student.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
