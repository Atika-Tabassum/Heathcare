import React, { useState } from 'react';

const ToggleSwitch = () => {
  const [isCheckedRound, setIsCheckedRound] = useState(false);

  const handleToggleRound = () => {
    setIsCheckedRound(!isCheckedRound);
  };

  const switchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '34px'
  };

  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isCheckedRound ? '#2196F3' : '#ccc',
    transition: '.4s',
    borderRadius: '34px'
  };

  const sliderBeforeStyle = {
    position: 'absolute',
    content: '""',
    height: '26px',
    width: '26px',
    left: '4px',
    bottom: '4px',
    backgroundColor: 'white',
    transition: '.4s',
    transform: isCheckedRound ? 'translateX(26px)' : 'translateX(0)',
    borderRadius: '50%'
  };

  return (
    <div>      
      <label style={switchStyle}>
        <input 
          type="checkbox" 
          checked={isCheckedRound} 
          onChange={handleToggleRound} 
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={sliderStyle}>
          <span style={sliderBeforeStyle}></span>
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
