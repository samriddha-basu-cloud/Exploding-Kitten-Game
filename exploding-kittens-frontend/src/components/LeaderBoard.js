import React, { useState, useEffect } from 'react';

function LeaderBoard({ userName, points }) {
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = () => {
    fetch('http://localhost:8080/api/leaderboard')
      .then(response => response.json())
      .then(data => {
        setLeaderBoardData(data);
        const currentUser = data.find(user => user.username === userName);
        if (!currentUser) {
          setCurrentUserData({ username: userName, points: points, rank: data.length + 1 });
        } else {
          setCurrentUserData(currentUser);
        }
      })
      .catch(error => console.error('Error fetching leaderboard data:', error));
  };

  return (
    <div className="leaderboard-container">
      <h2>Leader Board</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoardData.slice(0, 5).map((user, index) => (
            <tr key={index} className={user.username === userName ? 'highlight' : ''}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.points}</td>
            </tr>
          ))}
          {currentUserData && currentUserData.rank > 5 && (
            <tr className="highlight">
              <td>{currentUserData.rank}</td>
              <td>{currentUserData.username}</td>
              <td>{currentUserData.points}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoard;