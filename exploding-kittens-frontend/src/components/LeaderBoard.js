import React, { useState, useEffect } from 'react';

function LeaderBoard() {
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null); 

  useEffect(() => {
    fetchLeaderboard(); 
  }, []);

  useEffect(() => {
    
    if (currentUserData && currentUserData.rank > 5) {
      
      const leaderboardContainer = document.getElementById('leaderboard-container');
      leaderboardContainer.scrollTop = leaderboardContainer.scrollHeight;
    }
  }, [currentUserData]);

  const fetchLeaderboard = () => {
    fetch('http://localhost:8080/api/leaderboard')
      .then(response => response.json())
      .then(data => {
        setLeaderBoardData(data);
        
        const currentUser = data.find(user => user.username === 'CURRENT_USER_USERNAME');
        setCurrentUserData(currentUser);
      })
      .catch(error => console.error('Error fetching leaderboard data:', error));
  };

  const handleNewGame = () => {
    window.location.reload();
  };

  return (
    <div id="leaderboard-container" className="leaderboard-container">
      <h2>Leader Board</h2>
      <div className="scrollable-leaderboard">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th> {}
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoardData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {}
                <td>{user.username}</td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button
          type="button"
          onClick={handleNewGame}
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bolder',
            marginTop: '20px'
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default LeaderBoard;
