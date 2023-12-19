import React, { useState } from 'react';
import { motion } from 'framer-motion';
import treeicon from '../images/card-icons/tree-icon.png'

const Card = ({ id, content, onFlip, isFlipped }) => {
    const handleClick = () => {
        if (!isFlipped) {
            onFlip(id);
        }
    };

    return (
        <motion.div className={`card ${isFlipped ? 'is-flipped' : ''}`} onClick={handleClick}>
            <div className=" card-face card-front">
                <div className="card-front-inner">
                    <img src={treeicon} alt="Card Back" height='85%' />
                </div>
            </div>
            <div className="card-face card-back">
                <div className="card-back-inner">
                    <p>{content}</p>
                </div>
            </div>
        </motion.div>
    );
};


export default Card;