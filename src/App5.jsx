import React, { useState } from 'react';
import './App5.css';

function App5() {
  const [points, setPoints] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [clickedBox, setClickedBox] = useState(null);

  const toggleBorder = (boxClass, boxId) => {
    if (boxClass === 'common') {
      // Correct answer
      setPoints((prevPoints) => prevPoints + 10);
      setClickedBox(boxId);
    } else {
      // Incorrect answer
      setShowPopup(true);
      setClickedBox('incorrect');
    }
  };

  const handleNextQuestion = () => {
    setShowPopup(false);
    setClickedBox(null);
    setPoints(0);
  };

  return (
    <div className="App5">
      {/* <div className="title">Pick the correct Rhyming words</div> */}

      {/* Left container with one box */}
      <div className="left-container">
        <div
          className={`box ${clickedBox === 'box4' ? 'green-border' : ''}`}
          id="box4"
          onClick={() => toggleBorder('common', 'box4')}
        >
          <img src="/Components/bat.jpg" alt="Bell" />
          <div className="name">Bat</div>
        </div>
      </div>

      {/* Right container with three stacked boxes */}
      <div className="right-container">
        <div
          className={`box ${clickedBox === 'box1' ? 'red-border-no-transition'  : ''} ${clickedBox && clickedBox !== 'box1' ? 'disappear' : ''}`}
          id="box1"
          onClick={() => toggleBorder('uncommon', 'box1')}
        >
          <img src="/Components/cup.png" alt="Well" />
          <div className="name">Cup</div>
        </div>
        <br />
        <div
          className={`box ${clickedBox === 'box2' ? 'green-border'  : ''} ${clickedBox && clickedBox !== 'box2' ? 'disappear' : ''}`}
          id="box2"
          onClick={() => toggleBorder('common', 'box2')}
        >
          <img src="/Components/rat.jpg" alt="Call" />
          <div className="name">Rat</div>
        </div>
        <br />
        <div
          className={`box ${clickedBox === 'box3' ? 'red-border-no-transition' : ''} ${clickedBox && clickedBox !== 'box3' ? 'disappear' : ''}`}
          id="box3"
          onClick={() => toggleBorder('another', 'box3')}
        >
          <img src="/Components/fan.jpeg" alt="Walk" />
          <div className="name">Fan</div>
        </div>
      </div>

      {/* Popup Text */}
      {showPopup && <div className="popup">BETTER TRY NEXT QUESTION!</div>}

      {/* Points Display */}
      <div className="points">Points: {points}</div>
      <button className="next" onClick={handleNextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default App5;