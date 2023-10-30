
const ImageRow = (props) => {
  const {
    firstImage, secondImage, thirdImage, fourthImage,
    firstValue, totalValue
  } = props;

  return (
    <div className="image--row">
      <div>
        <img src={firstImage} alt="" />
        <p id="given-number">{firstValue}</p>
      </div>
      <p>+</p>
      <div>
        <img src={secondImage} alt="" />
      </div>
      <p>+</p>
      <div>
        <img src={thirdImage} alt="" />
      </div>
      <p>+</p>
      <div>
        <img src={fourthImage} alt="" />
      </div>
      <p>=</p>
      <div>
        <p>{totalValue}</p>
      </div>
    </div>
  )
}

export default ImageRow
