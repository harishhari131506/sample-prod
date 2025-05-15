// src/App.js

import React, { useEffect, useState } from 'react';
// import './App.css';
import ThreeScene from './ThreeScene';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error('API call failed:', err);
        setMessage('Failed to fetch message');
      });
  }, []);
  return (
    <div className="App">
      <h2>MHello from API:</h2>
      <p>{message}</p>
      <ThreeScene />
    </div>
  );
}

export default App;
