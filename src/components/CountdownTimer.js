import { useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion"

const CountdownTimer = ({ onCountdownEnd, onTimeUpdate }) => {
    const [timer, setTimer] = useState(60 * 60);
    const fullBodyConstraint = {
        top: 0,
        right: 200,
        bottom: window.innerHeight - 225,
        left: -20,
    };

    const hasEnded = useRef(false); // to help ensure onCountdownEnd is only called once

    // Function to format the time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 0) {
                    clearInterval(interval);
                    if (!hasEnded.current) {
                        hasEnded.current = true;
                        onCountdownEnd();
                    }
                    return 0;
                }
                const newFormattedTime = formatTime(prevTimer - 1);
                onTimeUpdate(newFormattedTime);
                return prevTimer - 1;
            })
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [onCountdownEnd, onTimeUpdate]);

    return (

        <div className="example-container sticky-container">

            <motion.div drag dragConstraints={fullBodyConstraint}
                whileHover={{ scale: 1.05, boxShadow: '5px 2px 30px rgb(0, 0, 0, .5)' }}
                whileTap={{ scale: 0.95, boxShadow: '5px 2px 10px rgb(0, 0, 0, .5)' }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }} >
                <p>X-MAS</p><p>in</p>
                <p>{formatTime(timer)}</p>
            </motion.div >
        </div>

    )
}

export default CountdownTimer
