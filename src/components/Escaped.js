import { useEffect, useState, useRef } from 'react'
// import Cloak from '../images/cloak.png'
// import Gate from '../images/gate.png'
// import Pumpkin from '../images/pumpkin2.gif'
import Story from './Story'



const Escaped = ({ formattedTime }) => {

    const [img, setImg] = useState('')
    const hasTriggered = useRef(false);

    // Set styles when the component mounts
    useEffect(() => {
        document.body.style.background = 'linear-gradient(rgb(138, 164, 255), rgb(255 255 255))';
        document.querySelector('.header--h1').style.color = 'rgb(255, 255, 255, 0.8)'
        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(138, 164, 255)";
        });

        // Remove styles when the component unmounts
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    // fade out image and then fade in new images when user reaches certain scroll point.    
    const handleScroll = () => {
        if (hasTriggered.current) return;

        const successImg = document.querySelector('#success-img');

        if (window.scrollY > 400) {
            hasTriggered.current = true;

            setTimeout(() => {
                successImg.classList.add('fade-out');

                setTimeout(() => {
                    setImg('');
                    successImg.classList.replace('fade-out', 'fade-in');
                }, 2000);
            }, 2000);
            window.removeEventListener('scroll', handleScroll);
        }
    }
    // add scroll event to window
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <div className="main--witch">
            <Story title='Escaped' width='75%' />
            <div className='centerItems success'>
                <img id='success-img' className='' src={img} alt="" />
                <div className='success-text centerItems'>
                    <h1 style={{ fontFamily: 'Young Serif' }}>gobble wobble</h1>
                    <p>With a display of wit and cunning, you made your escape with <span style={{ color: '#002473' }}>{formattedTime}</span> to spare. That was seriously impressive!</p>
                    <img src={''} width='250px' alt="" />
                </div>
            </div>
        </div>
    )
}

export default Escaped
