
import React, { useState, useEffect } from 'react';
import cat1 from '../assets/cat1.png';
import cat2 from '../assets/cat2.png';
import cat3 from '../assets/cat3.png';
import cat4 from '../assets/cat4.png';

function CardBlock({ cardType, index, onCardFlip, flippedArray }) {
  const [flipped, setFlipped] = useState(flippedArray[index]);

  useEffect(() => {
    setFlipped(flippedArray[index]);
  }, [flippedArray, index]);

  const handleClick = () => {
    if (!flipped) {
      setFlipped(true);
      onCardFlip(index, cardType);
    }
  };

  const getBackImage = () => {
    switch (cardType) {
      case 'cat':
        return cat1;
      case 'defuse':
        return cat2;
      case 'shuffle':
        return cat3;
      case 'exploding':
        return cat4;
      default:
        return '';
    }
  };

  return (
    <div className={`card-block ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-front"></div>
      <div className="card-back" style={{ backgroundImage: `url(${getBackImage()})`, backgroundSize: '80%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        {flipped} {}
      </div>
    </div>
  );
}

export default CardBlock;
