
import React, { useState } from 'react';
import axios from 'axios';

function NameForm({ onNameSubmit }) {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/user', { name });
      onNameSubmit(name); 
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting name:', error);
      setErrorMessage('Failed to submit name. Please try again.');
    }
  };

  return (

    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      <div className="nameformTitle">
        <h1>Exploding Kittens 😸</h1>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Your Name"
        style={{
          backgroundColor: 'transparent',
          border: '1px solid red',
          color: 'red',
          padding: '8px',
          borderRadius: '5px',
          marginBottom: '10px',
          width: '200px',
          outline: 'none',
        }}
      />
      <br />
      <button
        type="submit"
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bolder'
        }}
      >
        Game on
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}

export default NameForm;
