import React from 'react'
import Grave from '../images/grave.png'

const Headstone = (props) => {
    const { isGlowing } = props;
  return (
    <div>
        <img src={Grave}></img>
        <div className={isGlowing ? 'headstone-glow' : ''}></div>
    </div>
  )
}

export default Headstone
