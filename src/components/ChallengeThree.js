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
            { id: 1, content: '⅓ + 5/3 ', answer: 2 },
            { id: 2, content: '25% of 8', answer: 2 },
            { id: 3, content: '⅖ x 20', answer: 8 },
            { id: 4, content: '40% of 20', answer: 8 },
            { id: 5, content: '3/50 + 11/20 ', answer: .61 },
            { id: 6, content: '2.36-1.75 ', answer: .61 },
            { id: 7, content: 'Area of triangle with a base of 4 and height of 3', answer: 6 },
            { id: 8, content: '30% of 20', answer: 6 },
            { id: 9, content: 'The GCF of 42 & 28', answer: 7 },
            { id: 10, content: '(3 x 8) ÷ 2 - 5', answer: 7 },
            { id: 11, content: '14.2 x 2.3 ', answer: 32.66 },
            { id: 12, content: '102.3-69.64', answer: 32.66 },
            { id: 13, content: '4/5 - ½', answer: .3 },
            { id: 14, content: '10-9.7', answer: .3 },
            { id: 15, content: 'Area of a rectangle with a base of 6 and height of 8', answer: 48 },
            { id: 16, content: '5:6 and 40:?', answer: 48 },
            // ...and so on for each pair
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
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(255, 255, 255, 0.8)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(181, 92, 7)";
        })


        return () => {
            // Remove styles when the component unmounts
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="main--witch">
            <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/10" color="rgb(255,255,255,0.8)" width="70%" />
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
