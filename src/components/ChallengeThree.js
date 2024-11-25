// matching cards

import React, { useEffect, useState, useRef } from 'react'
import Story from './Story'
import Card from './card'

const ChallengeThree = ({ onPass }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);


    const gridRef = useRef(null);

    const initializeCards = () => {
        const initialCards = [
            { id: 1, content: '7 x 7', answer: 49 },
            { id: 2, content: '100 - 51', answer: 49 },
            { id: 3, content: '6 + 14', answer: 20 },
            { id: 4, content: '4 x 5', answer: 20 },
            { id: 5, content: '12 - 5', answer: 7 },
            { id: 6, content: '3 x 3 - 2', answer: 7 },
            { id: 7, content: '8 + 16', answer: 24 },
            { id: 8, content: '3 x 8', answer: 24 },
            { id: 9, content: '15 ÷ 3', answer: 5 },
            { id: 10, content: '10 ÷ 2', answer: 5 },
            { id: 11, content: '9 + 9', answer: 18 },
            { id: 12, content: '2 x 9', answer: 18 },
            { id: 13, content: '12 ÷ 4', answer: 3 },
            { id: 14, content: '6 ÷ 2', answer: 3 },
            { id: 15, content: '11 + 11', answer: 22 },
            { id: 16, content: '2 x 11', answer: 22 },
        ];

        // Shuffle the cards
        initialCards.sort(() => Math.random() - 0.5);

        return initialCards;
    };


    useEffect(() => {
        setCards(initializeCards());
    }, []);


    const handleFlip = (cardId) => {
        // Prevent flipping more than two cards or already matched cards
        if (flippedCards.length === 2 || matchedCards.includes(cardId)) return;

        setFlippedCards(prevFlippedCards => [...prevFlippedCards, cardId]);

        if (flippedCards.length === 1) {
            // Check for a match
            const firstCard = cards.find(card => card.id === flippedCards[0]);
            const secondCard = cards.find(card => card.id === cardId);

            if (firstCard.answer === secondCard.answer) {
                // It's a match
                setMatchedCards(prevMatchedCards => {
                    const newMatchedCards = [...prevMatchedCards, firstCard.id, secondCard.id];

                    // Check if all cards are matched
                    if (newMatchedCards.length === cards.length) {
                        // All cards are matched
                        setTimeout(() => { onPass(); }, 2000)

                    }

                    return newMatchedCards;
                });

                setFlippedCards([]);
            } else {
                // No match, flip them back after a delay
                setTimeout(() => {
                    setFlippedCards([]);
                }, 2000);
            }
        }
    };



    useEffect(() => {
        // Set styles when the component mounts
        document.body.style.background = 'linear-gradient(rgb(124, 3, 108) 25%, rgb(181, 7, 7)';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(150, 216, 255, .8)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(181, 7, 7)";
        })


        return () => {
            // Remove styles when the component unmounts
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="main--witch">
            <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/10" color="rgb(255,255,255,0.8)" width="70%" />
            {/* <button onClick={onPass}>click</button> */}
            <div ref={gridRef} className="puzzle-grid">

                {cards.map(card => (
                    <Card
                        key={card.id}
                        id={card.id}
                        content={card.content}
                        isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
                        onFlip={handleFlip}
                    />
                ))}


            </div>

        </div>
    )
}
export default ChallengeThree
