import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [data, setData] = useState([]);

  const submitData = async () => {
    await axios.post('/api/submit', { name, number });
  };

  const viewData = async () => {
    const response = await axios.get('/api/view');
    setData(response.data.data);
  };

  return (
    <div>
      <p>google sheet test</p>
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
