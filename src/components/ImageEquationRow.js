import { useState, useEffect } from 'react';

import purplePotion from '../images/purple-potion.png'
import spider from '../images/spider.png'
import fingers from '../images/fingers.png'
import eyeball from '../images/eyeball.png'
import greenPotion from '../images/green-potion.png'
import ImageRow from './ImageRow';
import TryAgain from './TryAgainMessage';

const getRandomNumber = () => Math.floor(Math.random() * 25) + 1;

const ImageEquationRow = ({onPass}) => {

  const [inputValues, setInputValues] = useState(Array(5).fill(''));
  const [items, setItems] = useState([]);
  const [tryAgainMessage, setTryAgainMessage] = useState(false);
  

  useEffect(() => {
    if (items.length === 0) {
      setItems([
        { img: purplePotion, value: getRandomNumber() },
        { img: spider, value: getRandomNumber() },
        { img: fingers, value: getRandomNumber() },
        { img: eyeball, value: getRandomNumber() },
        { img: greenPotion, value: getRandomNumber() },
      ]);
    }
  }, []);

  const handleInputChange = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  const checkValues = () => {
    let timer;
    for (let i = 0; i < items.length; i++) {
      if (parseInt(inputValues[i]) !== items[i].value) {
        setTryAgainMessage(true)
        timer = setTimeout(() => {
          setTryAgainMessage(false);
        }, 10000);
        return;
      } 
      else setTryAgainMessage(false)
    }
    onPass(true);
    return () => clearTimeout(timer); // clear timeout on component unmount
  };

  return (
    <>
    {items && items.length == 5 ? ( // Check if 'items' exists and has at least 5 elements
    <>
    <ImageRow 
      firstImage={items[2].img} 
      secondImage={items[0].img} 
      thirdImage={items[0].img} 
      fourthImage={items[0].img} 
      firstValue = {items[2].value} 
      totalValue={items[2].value + (items[0].value * 3)}
    />
    <ImageRow 
      firstImage={items[0].img} 
      secondImage={items[2].img} 
      thirdImage={items[0].img} 
      fourthImage={items[4].img} 
      totalValue={items[2].value + items[4].value + (items[0].value * 2)}
    />
    <ImageRow 
      firstImage={items[4].img} 
      secondImage={items[3].img} 
      thirdImage={items[2].img} 
      fourthImage={items[3].img} 
      totalValue={items[2].value + items[4].value + (items[3].value * 2)}
    />
    <ImageRow 
      firstImage={items[3].img} 
      secondImage={items[1].img} 
      thirdImage={items[1].img} 
      fourthImage={items[2].img} 
      totalValue={items[2].value + items[3].value + (items[1].value * 2)}
    />
    
    <div className="image--row">
        <div>
          <img src={items[2].img} />
          <input type="text"  value={inputValues[2]} onChange={(event) => handleInputChange(2, event)} maxLength={2}/>
        </div>
        <div>
          <img src={items[0].img} />
          <input type="text"  value={inputValues[0]} onChange={(event) => handleInputChange(0, event)} maxLength={2}/>
        </div>
        <div>
          <img src={items[4].img} />
          <input type="text"  value={inputValues[4]} onChange={(event) => handleInputChange(4, event)} maxLength={2}/>
        </div>
        <div>
          <img src={items[3].img} />
          <input type="text"  value={inputValues[3]} onChange={(event) => handleInputChange(3, event)} maxLength={2}/>
        </div>
        <div>
          <img src={items[1].img} />
          <input type="text"  value={inputValues[1]} onChange={(event) => handleInputChange(1, event)} maxLength={2}/>
        </div>
      </div>
      <button className='brew-btn' onClick={checkValues}>Brew</button>
      <TryAgain 
        message = 'Please Try Again' 
        isDisplayed={tryAgainMessage} 
        color='black' 
        marginTop='1rem'
      />
      </>
      ):(
        "Loading..."
    )}

    </>
  )
}

export default ImageEquationRow
