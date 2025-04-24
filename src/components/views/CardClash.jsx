import React, { useEffect, useState } from "react";
import backCard from "../../assets/images/back_card.png";

import img1 from "../../assets/images/card1.jpg";
import img2 from "../../assets/images/card2.jpg";
import img3 from "../../assets/images/card3.jpg";
import img4 from "../../assets/images/card4.jpg";
import img5 from "../../assets/images/card5.jpg";
import img6 from "../../assets/images/card6.jpg";
import img7 from "../../assets/images/card7.jpg";
import img8 from "../../assets/images/card8.jpg";

const cardImages = [img1, img2, img3, img4, img5, img6, img7, img8];

const shuffleCards = () => {
  const duplicatedCards = [...cardImages, ...cardImages];
  return duplicatedCards
    .map((img, index) => ({ id: index, img, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
};

const CardClash = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setmoves] = useState(0);

  useEffect(() => {
    setCards(shuffleCards());
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].img === cards[second].img) {
        const newCards = cards.map((card, idx) =>
          idx === first || idx === second
            ? { ...card, matched: true }
            : card
        );
        setCards(newCards);
        setmoves(moves + 1);
      } else {
        setTimeout(() => {
          const newCards = cards.map((card, idx) =>
            idx === first || idx === second
              ? { ...card, flipped: false }
              : card
          );
          setCards(newCards);
          setmoves(moves + 1);
        }, 500);
      }
      setFlippedCards([]);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !cards[index].flipped && !cards[index].matched) {
      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);
      setFlippedCards([...flippedCards, index]);
    }
  };

  const resetGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setmoves(0);
  };

  return (
    <div className="bg-[#3c3d3f] min-h-screen  p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mt-4 mb-4">
        <h1 className="text-3xl font-bold text-white">Card Clash</h1>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto mt-10 p-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="w-24 h-32 cursor-pointer"
            onClick={() => handleCardClick(index)}
          >
            <img
              src={card.flipped || card.matched ? card.img : backCard}
              alt="card"
              className={`w-full h-full object-cover rounded-lg shadow-md transition-transform duration-500 ${card.flipped ? 'rotate-y-180' : ''
                }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 bg-[#1A1B1F] p-4 rounded-xl shadow-lg">
        <div className="relative group">
          <span className="text-white text-base sm:text-lg cursor-pointer">How to play?</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-40 mb-2 w-48 bg-gray-800 text-white text-sm rounded-md p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Match all the pairs of cards in as few moves as possible. Click on a card to flip it, and click on another to find its match!
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold border border-[#25d366] rounded-full px-5 py-2 text-white shadow-inner">
            {moves} moves
          </span>

          <button
            onClick={resetGame}
            className="bg-[#25d366] hover:bg-[#5fffc1] text-black font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:scale-105"
          >
            Reset
          </button>
        </div>
      </div>

    </div>
  );
};

export default CardClash;
