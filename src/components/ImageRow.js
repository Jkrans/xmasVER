
const ImageRow = (props) => {
    const { 
        firstImage, secondImage, thirdImage, fourthImage, 
        firstValue, totalValue
    } = props;

  return (
    <div className="image--row">
      <div>
        <img src={firstImage}/>
        <p id="given-number">{firstValue}</p>
      </div>
        <p>+</p>
      <div>
        <img src={secondImage}/>
      </div>
        <p>+</p>
      <div>
        <img src={thirdImage}/>
      </div>
        <p>+</p>
      <div>
        <img src={fourthImage}/>
      </div>
        <p>=</p>
      <div>
        <p>{totalValue}</p>
      </div>
    </div>
  )
}

export default ImageRow
