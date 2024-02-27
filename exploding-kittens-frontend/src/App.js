import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CardBlock from './components/CardBlock';
import Toast from './components/Toast';
import NameForm from './components/NameForm';
import LeaderBoard from './components/LeaderBoard';

function App() {
  const [points, setPoints] = useState(0);
  const [updatedPoints, setUpdatedPoints] = useState(0);
  const [count, setCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [flippedArray, setFlippedArray] = useState([]);
  const [allCardsDrawn, setAllCardsDrawn] = useState(false);

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/points?name=${userName}`);
        console.log('Fetching user points for:', userName);
        
        if (!response.ok) {
          console.error('Server responded with status:', response.status);
          return;
        }
    
        const data = await response.json();
        console.log('Received user data:', data);
        setPoints(data); 
      } catch (error) {
        console.error('Error fetching user points:', error);
      }
    };

    if (gameStarted) {
      generateCards();
      fetchUserPoints();
    }
  }, [gameStarted, userName]);
  
  

  useEffect(() => {
    setFlippedArray(Array(cards.length).fill(false));
  }, [cards]);

  const generateCards = () => {
    const cardTypes = ['cat', 'defuse', 'exploding', 'shuffle'];
    const newCards = Array.from({ length: 5 }, () => {
      return cardTypes[Math.floor(Math.random() * cardTypes.length)];
    });
    setCards(newCards);
  };

  const handleNameSubmit = (name) => {
    setUserName(name);
    setGameStarted(true);
  };

  const handleCardFlip = (index, cardType) => {
    setTimeout(() => {
      switch (cardType) {
        case 'defuse':
          setCount(count + 1);
          setToastMessage('You can defuse an exploding kitten now!');
          break;
        case 'cat':
          setToastMessage('Meow! one step ahead to win!');
          break;
        case 'shuffle':
          setCount(0);
          setToastMessage('All Cards are shuffled, start from the beginning');
          generateCards();
          return;
        case 'exploding':
          if (count > 0) {
            setCount(count - 1);
            setToastMessage('Oops! You defused the bomb, but be cautious!');
          } else {
            setToastMessage('Game Over! You drew an exploding kitten and you have no defuse card.');
            setGameStarted(false);
            window.location.reload();
          
          }
          break;
        default:
          setToastMessage('All Cards drawn successfully!');
        
          break;
      }

      const newCards = [...cards];
      newCards.splice(index, 1);
      setCards(newCards);

      const newFlippedArray = [...flippedArray];
      newFlippedArray[index] = true;
      setFlippedArray(newFlippedArray);

      
      if (newCards.length === 0) {
        setAllCardsDrawn(true);
      }
    }, 700);
  };


  useEffect(() => {
    const updateUserPoints = async () => {
      try {
        await fetch('http://localhost:8080/api/user/points', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: userName })
        });
      } catch (error) {
        console.error('Error updating user points:', error);
      }
    };

    if (allCardsDrawn) {
      updateUserPoints();
    }
  }, [allCardsDrawn, userName]);

  useEffect(() => {
    const updateUserPoints = async () => {
      try {
        await fetch('http://localhost:8080/api/user/points', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: userName })
        });
  
        
        const response = await fetch(`http://localhost:8080/api/user/points?name=${userName}`);
        const data = await response.json();
        setUpdatedPoints(data);
      } catch (error) {
        console.error('Error updating user points:', error);
      }
    };
  
    if (allCardsDrawn) {
      updateUserPoints();
    }
  }, [allCardsDrawn, userName]);
  

  return (
    <div className="App">
      {gameStarted ? (
        <>
          <Navbar points={updatedPoints || points} userName={userName} />
          <div className="card-container">
            {cards.map((card, index) => (
              <CardBlock key={index} cardType={card} index={index} onCardFlip={handleCardFlip} flippedArray={flippedArray} />
            ))}
          </div>
          {toastMessage && <Toast message={toastMessage} />}
        </>
      ) : (
        <>
          <NameForm onNameSubmit={handleNameSubmit} />
        </>
      )}
      {allCardsDrawn && <LeaderBoard points={points} userName={userName} />}
    </div>
  );
}

export default App;