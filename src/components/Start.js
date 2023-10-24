import {useEffect} from 'react'
import HauntedHouse from '../images/haunted-house.png'

const Start = ({onPass}) => {

  useEffect(() => {
    // Set styles when the component mounts
    document.body.style.background = 'linear-gradient(rgb(0, 164, 33), rgb(117, 0, 180))';

    const footerLinks = document.querySelectorAll('.footer a, .footer p');
    footerLinks.forEach(link => {
        link.style.color = "rgb(117, 0, 180)";
    })


    return () => {
    // Remove styles when the component unmounts
    document.body.style.backgroundColor = '';
        };
});

    const enter = () => {onPass(true)}
  return (
      <div className="start-page">
        {/* <img src={slime}/> */}
        <div>
            <h1>The Haunted Mansion Escape</h1>
            <button onClick={enter}>Enter</button>                    
        </div>
      <img src={HauntedHouse}/>
    </div>
  )
}

export default Start
