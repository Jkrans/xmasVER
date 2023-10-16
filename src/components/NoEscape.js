import { useEffect } from "react";
import Reaper from '../images/reaper.png';
import Pumpkin from '../images/pumpkin-looking2.gif';

const NoEscape = ({ onPass }) => {

    useEffect(() => {
        // Set styles when the component mounts
        document.body.style.background = 'linear-gradient(rgb(26, 31, 50) 45%, white) ';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(26, 31, 50)";
        });
        
      
        return () => {
          // Remove styles when the component unmounts
          document.body.style.backgroundColor = '';
        };
      }, []);

      const handleTryAgain = () => {
        onPass(true);
      }

  return (
    <div className="main--witch">
      <div className='centerItems failed'>
            <img id='success-img' className='' src={Reaper}/>
            <img id='success-img' className='pumpkin-looking' src={Pumpkin} width='20%'/>
            <div className='failed-text centerItems'>
                <h1>No Escape</h1>
                <p>Nice try. Join the spirits in the graveyard or...</p>
                {/* <img src={Pumpkin} width='250px'/> */}
                <button onClick={handleTryAgain}>Try Again</button>
            </div>
        </div>
    </div>
  )
}

export default NoEscape
