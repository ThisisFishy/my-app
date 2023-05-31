import React, { useState, useEffect } from 'react';
import axios from 'axios';
import netlifyIdentity from 'netlify-identity-widget';

const HomePage = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize Netlify Identity
    netlifyIdentity.init();

    // Event listener for user change
    netlifyIdentity.on('login', user => {
      setUser(user);
    });

    // Event listener for user logout
    netlifyIdentity.on('logout', () => {
      setUser(null);
    });
  }, []);

  const submitData = async () => {
    await axios.post('/api/submit', { name, number });
  };

  const viewData = async () => {
    const response = await axios.get('/api/view');
    setData(response.data.data);
  };

  const handleLogin = () => {
    netlifyIdentity.open();
  };

  const handleLogout = () => {
    netlifyIdentity.logout();
  };

  return (
    <div>
      <p>google sheet test</p>
      {user ? (
        <div>
          <p>Welcome, {user.user_metadata.full_name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={number} onChange={e => setNumber(e.target.value)} placeholder="Number" />
      <button onClick={submitData}>Submit</button>
      <button onClick={viewData}>View</button>
      {data && data.map((row, index) => (
        <div key={index}>
          <p>Name: {row[0]}</p>
          <p>Number: {row[1]}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
