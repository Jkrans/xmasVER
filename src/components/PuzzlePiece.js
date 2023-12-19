import { useState } from 'react'
import { motion } from "framer-motion"

const PuzzlePiece = ({ number, onDragEnd, constraints }) => {
    const [rotation, setRotation] = useState(0);
    const [enableTransition, setEnableTransition] = useState(false);
    const [zIndex, setZIndex] = useState(1);

    const handleDoubleClick = () => {
        setEnableTransition(true); // Enable transition on double click
        setRotation(prevRotation => prevRotation + 90);
    };

    const handleDragStart = () => {
        setEnableTransition(false); // Disable transition on drag start
        setZIndex(prevZIndex => prevZIndex + 1)
    };

    return (
        <motion.div
            drag
            dragConstraints={constraints}
            onDragStart={handleDragStart}
            onDragEnd={(e, info) => onDragEnd(number, info)}
            className="puzzle-piece"
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px 5px rgb(0, 0, 0, .5)' }}
            onDoubleClick={handleDoubleClick}
            style={{
                rotate: rotation,
                transition: enableTransition ? "transform 0.25s ease" : "none",
                zIndex: zIndex
            }}
        // whileTap={{ scale: 0.95, boxShadow: '5px 2px 10px rgb(0, 0, 0, .5)' }}
        // transition={{ type: "spring", stiffness: 400, damping: 10 }} 
        >
            <h1>{number}</h1>
        </motion.div>
    )
}

export default PuzzlePiece
