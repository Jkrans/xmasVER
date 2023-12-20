import { useEffect } from 'react'

import gold from '../images/golden-ornament.png'

import Story from './Story'



const Escaped = ({ formattedTime }) => {
    // const hasTriggered = useRef(false);

    // Set styles when the component mounts
    useEffect(() => {
        document.body.style.background = 'linear-gradient(rgb(19, 56, 58), rgb(0, 250, 255) 80%)';
        document.querySelector('.header--h1').style.color = 'rgb(150, 216, 255, .8)'
        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(0, 250, 255)";
        });

        // Remove styles when the component unmounts
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="main--witch">
            <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/11" color="white" width="78%" />
            <div className='success'>


                <div className='success-medal flex-center' >
                    {/* <img src={gold} alt='' /> */}
                    <div className='success-blob'>
                        <h1>Congratulations!</h1>
                        <h2>You saved Christmas with {formattedTime} before Santa has to deliver the first presents. Enjoy this break, just {formattedTime} before your preparations start for next year!</h2>
                    </div>
                </div>
                <div className='success-icon-container'>
                    <img src={gold} alt='' />
                </div>





            </div>
        </div>
    )
}

export default Escaped
