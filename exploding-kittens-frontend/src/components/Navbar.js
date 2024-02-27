
import React from 'react';


function Navbar({ userName, points }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Exploding Kittens 😸</h1>
      </div>
      <div className="navbar-right">
        <p>User: {userName}</p>
        <p>Points: {points}</p>
      </div>
    </nav>
  );
}

export default Navbar;
