import React, { useState, useEffect } from 'react';

const TryAgainMessage = ({ message, isDisplayed, color, marginTop }) => {
  const [visibility, setVisibility] = useState(isDisplayed ? 'visible' : 'hidden');  
  
  useEffect(() => {
      let timer;
      
      if (isDisplayed) {
          setVisibility('visible');
          timer = setTimeout(() => {
              setVisibility('hidden');
              console.log('set hidden')
            }, 10000); // hide after 10 seconds
        } else setVisibility('hidden');
        
    return () => clearTimeout(timer); // clear timeout on component unmount
  }, [isDisplayed]);

  return (
    <p style={{
        color: color, 
        marginTop: marginTop, 
        visibility: visibility,
    }}>{message}</p>
  );
}

export default TryAgainMessage;
