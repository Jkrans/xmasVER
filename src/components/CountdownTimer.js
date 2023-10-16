import {useState, useEffect, useRef} from 'react'

const CountdownTimer = ({ onCountdownEnd, onTimeUpdate }) => {
    const [timer, setTimer] = useState(40 * 60);
    
    const hasEnded = useRef(false); // to help ensure onCountdownEnd is only called once

    // Function to format the time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    useEffect(() => {
        const interval = setInterval(() =>{
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
        <div className="countdown">
            <div>
                <p>RIP in:</p>
                <p>{formatTime(timer)}</p>    
            </div>
        </div>
    )
}

export default CountdownTimer
