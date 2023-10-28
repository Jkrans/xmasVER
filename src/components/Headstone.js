import React from 'react'
import turkey from '../images/turkey.png'

const Headstone = (props) => {
  const { isGlowing } = props;
  return (
    <div>
      <img src={turkey}></img>
      <div className={isGlowing ? 'headstone-glow' : ''}></div>
    </div>
  )
}

export default Headstone
