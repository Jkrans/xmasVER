import React, { useState, useEffect } from 'react';
import Jackstein from '../images/jackstein.png'

const TryAgainMessage = ({ message, isDisplayed, color, marginTop }) => {
  const [visibility, setVisibility] = useState(isDisplayed ? 'visible' : 'hidden');  
  
  useEffect(() => {
      let timer;
      
      if (isDisplayed) {
          setVisibility('visible');
          timer = setTimeout(() => {
              setVisibility('hidden');
            }, 10000); // hide after 10 seconds
        } else setVisibility('hidden');
        
    return () => clearTimeout(timer); // clear timeout on component unmount
  }, [isDisplayed]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', 
      marginTop: marginTop, 
      visibility: visibility, }}>
      <img src={Jackstein} width='30px'/>
      <p style = {{ color: color, fontSize: '1rem' }}className='speech-bubble'>{message}</p>

    </div>
  );
}

export default TryAgainMessage;
