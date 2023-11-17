import { useState, useEffect } from 'react';

import corncob from '../images/corn-cob.png'
import greenbeans from '../images/green-beans.png'
import mashed from '../images/mashed-potato.png'
import pumpkin from '../images/pumpkin.png'
import pie from '../images/pumpkin-pie.png'
import ImageRow from './ImageRow';
import TryAgain from './TryAgainMessage';

const getRandomNumber = () => Math.floor(Math.random() * 25) + 1;

const ImageEquationRow = ({ onPass }) => {

  const [inputValues, setInputValues] = useState(Array(5).fill(''));
  const [items, setItems] = useState([]);
  const [tryAgainMessage, setTryAgainMessage] = useState(false);


  useEffect(() => {
    if (items.length === 0) {
      setItems([
        { img: pie, value: getRandomNumber() },
        { img: greenbeans, value: getRandomNumber() },
        { img: corncob, value: getRandomNumber() },
        { img: pumpkin, value: getRandomNumber() },
        { img: mashed, value: getRandomNumber() },
      ]);
    }
  }, [items.length]);

  const updateBorderColor = (input, index) => {
    if (parseInt(input.value) === items[index].value) {
      input.style.borderBottom = '2px solid rgb(97, 147, 0)'; // Correct answer, green
    } else if (input.value !== '' && parseInt(input.value) !== items[index].value) {
      input.style.borderBottom = '2px solid rgb(255, 25, 25)'; // Incorrect answer, red
    } else if (document.activeElement === input) {
      input.style.borderBottom = '2px solid rgb(255, 100, 25'; // Focused input, orange
    } else {
      input.style.borderBottom = '2px solid rgb(0, 0, 0)'; // Unfocused empty input, black
    }
  };

  const handleInputChange = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);

    updateBorderColor(event.target, index);
  };

  const handleInputFocus = (index, event) => {
    updateBorderColor(event.target, index);
  };

  const handleInputBlur = (index, event) => {
    updateBorderColor(event.target, index);
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
      {items && items.length === 5 ? ( // Check if 'items' exists and has at least 5 elements
        <>
          <div className="imageAndInput">
            <div>
              <img src={items[2].img} alt="corncob icon" />
              <input
                type="text"
                value={inputValues[2]}
                onChange={(event) => handleInputChange(2, event)}
                onFocus={(event) => handleInputFocus(2, event)}
                onBlur={(event) => handleInputBlur(2, event)}
                maxLength={2}
              />
            </div>
            <div>
              <img src={items[0].img} alt="" />
              <input
                type="text"
                value={inputValues[0]}
                onChange={(event) => handleInputChange(0, event)}
                onFocus={(event) => handleInputFocus(0, event)}
                onBlur={(event) => handleInputBlur(0, event)}
                maxLength={2}
              />
            </div>
            <div>
              <img src={items[4].img} alt="" />
              <input
                type="text"
                value={inputValues[4]}
                onChange={(event) => handleInputChange(4, event)}
                onFocus={(event) => handleInputFocus(4, event)}
                onBlur={(event) => handleInputBlur(4, event)}
                maxLength={2}
              />
            </div>
            <div>
              <img src={items[3].img} alt="" />
              <input
                type="text"
                value={inputValues[3]}
                onChange={(event) => handleInputChange(3, event)}
                onFocus={(event) => handleInputFocus(3, event)}
                onBlur={(event) => handleInputBlur(3, event)}
                maxLength={2}
              />
            </div>
            <div>
              <img src={items[1].img} alt="" />
              <input
                type="text"
                value={inputValues[1]}
                onChange={(event) => handleInputChange(1, event)}
                onFocus={(event) => handleInputFocus(1, event)}
                onBlur={(event) => handleInputBlur(1, event)}
                maxLength={2}
              />
            </div>
          </div>
          <button className='brew-btn' onClick={checkValues}>SUBMIT CODE</button>
          <TryAgain
            message='Please Try Again'
            isDisplayed={tryAgainMessage}
            color='black'
            marginTop='1rem'
          />
          <ImageRow
            firstImage={items[2].img}
            secondImage={items[0].img}
            thirdImage={items[0].img}
            fourthImage={items[0].img}
            firstValue={items[2].value}
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



        </>
      ) : (
        "Loading..."
      )}

    </>
  )
}

export default ImageEquationRow
