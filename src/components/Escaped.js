import { useEffect } from 'react'
// import whitehouse from '../images/white-house.png'
import winningturkey from '../images/winningturkey.png'

import medal from '../images/medal.png'
import Story from './Story'



const Escaped = ({ formattedTime }) => {
    // const hasTriggered = useRef(false);

    // Set styles when the component mounts
    useEffect(() => {
        document.body.style.background = 'linear-gradient(rgb(97, 200, 255) 60%, rgb(0, 73, 10) 80%)';
        document.querySelector('.header--h1').style.color = 'rgb(255, 255, 255, 0.8)'
        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(0, 73, 10)";
        });

        // Remove styles when the component unmounts
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="main--witch">
            <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/5" color="black" width="78%" />
            <div className='success'>


                <div className='success-medal flex-center' >
                    <img src={medal} alt='' />
                    <div className='success-blob'>
                        <h1>Pardoned!</h1>
                        <h2>with {formattedTime} to spare.</h2>
                    </div>
                </div>

                <div className='success-icon-container'>
                    <img src={winningturkey} alt='' />
                </div>


            </div>
        </div>
    )
}

export default Escaped
