import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = (value) => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 200);
    
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else if (value === '=') {
      calculateResult();
    } else {
      setInput((prev) => prev + value);
    }
  };

  const calculateResult = () => {
    try {
      const evaluated = Function(`"use strict"; return (${input})`)();
      setResult(evaluated.toString());
    } catch {
      setResult('Error');
    }
  };

  const handleKeyDown = (e) => {
    const allowedKeys = '0123456789+-*/().%';
    if (allowedKeys.includes(e.key)) {
      setInput((prev) => prev + e.key);
    } else if (e.key === 'Enter') {
      calculateResult();
    } else if (e.key === 'Backspace') {
      setInput((prev) => prev.slice(0, -1));
    } else if (e.key === 'Escape') {
      setInput('');
      setResult('');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const buttons = [
    'C', 'DEL', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '(', ')',
    '='
  ];

  return (
    <div className="calc-page-container">
      <div className="calc-content-wrapper">
        <div className="calc-info-section">
          <h1 className="calc-main-heading">Advanced React Calculator</h1>
          <p className="calc-description">
            Experience the power of modern web technology with this feature-rich calculator built using React.
            Perform all basic arithmetic operations with ease and enjoy the smooth animations.
          </p>
          <div className="calc-features">
            <h2 className="calc-feature-heading">Key Features:</h2>
            <ul className="calc-feature-list">
              <li>Keyboard and click input support</li>
              <li>Real-time calculation</li>
              <li>Beautiful animations and transitions</li>
              <li>Responsive design for all devices</li>
              <li>Error handling for invalid expressions</li>
            </ul>
          </div>
        </div>
        
        <div className="calc-container">
          <div className={`calc-main ${isActive ? 'calc-active' : ''}`}>
            <div className="calc-display">
              <div className="calc-input">{input || '0'}</div>
              <div className="calc-result">{result ? `= ${result}` : ''}</div>
            </div>
            <div className="calc-buttons">
              {buttons.map((btn, idx) => (
                <button
                  key={idx}
                  className={`calc-btn ${btn === '=' ? 'calc-equal' : ''} ${btn === 'C' || btn === 'DEL' ? 'calc-func' : ''}`}
                  onClick={() => handleButtonClick(btn)}
                >
                  <span className="calc-btn-content">{btn}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="calc-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="calc-particle"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;