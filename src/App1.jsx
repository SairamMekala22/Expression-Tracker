import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './App1.css';

function App1() {
  const handleNext = () => {
    window.location.href = '/App2';
  };
  
  const [points, setPoints] = useState(0);
  let counter = 0;
  const [showPopup, setShowPopup] = useState(false);
  const [clickedBox, setClickedBox] = useState(null);

  // Function to handle button click and navigate to App2
  // const handleButtonClick = () => {
  //   navigate('/app2'); // Navigate to /app2 when button is clicked
  // };

  // Function to toggle border and handle points
  const toggleBorder = (boxClass, boxId) => {
    if (boxClass === 'common') {
      // Correct answer
      if (counter < 1) {
        setPoints((prevPoints) => prevPoints + 10);
        counter++;
      }
      
      setClickedBox(boxId);
    } else {
      // Incorrect answer
      setShowPopup(true);
      setClickedBox('incorrect');
    }
  };

  // Function to reset question
  const handleNextQuestion = () => {
    setShowPopup(false);
    setClickedBox(null);
    setPoints(0);
  };

  return (
    <div className="App1">
      <div className="title">Pick the correct Rhyming words</div>

      {/* Left container with one box */}
      <div className="left-container">
        <div
          className={`box ${clickedBox === 'box4' ? 'green-border' : ''}`}
          id="box4"
          onClick={() => toggleBorder('common', 'box4')}
        >
          <img src="/Components/bell.jpeg" alt="Bell" />
          <div className="name">Bell</div>
        </div>
      </div>

      {/* Right container with three stacked boxes */}
      <div className="right-container">
        <div
          className={`box ${clickedBox === 'box1' ? 'green-border' : ''} ${clickedBox && clickedBox !== 'box1' ? 'disappear' : ''}`}
          id="box1"
          onClick={() => toggleBorder('common', 'box1')}
        >
          <img src="/Components/well.jpeg" alt="Well" />
          <div className="name">Well</div>
        </div>
        <br />
        <div
          className={`box ${clickedBox === 'box2' ? 'red-border-no-transition' : ''} ${clickedBox && clickedBox !== 'box2' ? 'disappear' : ''}`}
          id="box2"
          onClick={() => toggleBorder('unique', 'box2')}
        >
          <img src="/Components/call.png" alt="Call" />
          <div className="name">Call</div>
        </div>
        <br />
        <div
          className={`box ${clickedBox === 'box3' ? 'red-border-no-transition' : ''} ${clickedBox && clickedBox !== 'box3' ? 'disappear' : ''}`}
          id="box3"
          onClick={() => toggleBorder('another', 'box3')}
        >
          <img src="/Components/walk.png" alt="Walk" />
          <div className="name">Walk</div>
        </div>
      </div>

      {/* Popup Text */}
      {showPopup && <div className="popup">BETTER TRY NEXT QUESTION!</div>}

      {/* Points Display */}
      <div className="points">Points: {points}</div>
      <button className="next" onClick={handleNext}>
        Next Question
      </button>
    </div>
  );
}

export default App1;
