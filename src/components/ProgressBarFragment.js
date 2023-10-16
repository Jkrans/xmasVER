import React from 'react'

const ProgressBarFragment = (props) => {
    const {backgroundColorBubble, backgroundColorLine, imgVisibility, img, imgPixels, lineDisplay} = props

  return (
    <>
      <div className={`progress-bar-bubble ${backgroundColorBubble}`}>
        <img className={imgVisibility} src={img} width={imgPixels} height={imgPixels} />
      </div>
      <div className={`progress-bar-line ${backgroundColorLine}`} style={{display: lineDisplay}}></div>
    </>
  )
}

export default ProgressBarFragment
