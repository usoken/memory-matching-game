'use client'
import globalcss from '../page.module.css'
import styles from './gameboard.module.css'
import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from "react";
const Card = dynamic(() => import('./card'), {
  ssr: false,
});
const cardArray = [
  {
    name: "Blanche",
    image: "/Blanche_NH_Villager_Icon.png"
  },
  {
    name: "Fang",
    image: "/Fang_NH_Villager_Icon.png"
  },
  {
    name: "June",
    image: "/June_NH_Villager_Icon.png"
  },
  {
    name: "Gala",
    image: "/Gala_NH_Villager_Icon.png"
  },
  {
    name: "Julian",
    image: "/Julian_NH_Villager_Icon.png"
  },
  {
    name: "Marshal",
    image: "/Marshal_NH_Villager_Icon.png"
  }
];

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

export default function App() {
  const [cards] = useState(() => shuffleCards(cardArray.concat(cardArray)));
  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const closeModal = () => {
    setShowDialog(false);
  };
  const timeout = useRef(null);

  const checkGameCompletion = () => {
    if (Object.keys(matchedCards).length === cardArray.length) {
      setShowDialog(true);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    if (cards[first].name === cards[second].name) {
      setMatchedCards((prev) => ({ ...prev, [cards[first].name]: true }));
      setOpenCards([]);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => prev.concat(index));
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkGameCompletion();
  }, [matchedCards]);

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsMatched = (card) => {
    return Boolean(matchedCards[card.name]);
  };

  const restartGame = () => {
    setShowDialog(false);
    setTimeout(() => {
      window.location.reload();
    }, 500); 
  };

  return (
    <div className={`${globalcss.main} ${styles.app}`}>
      <h3>
        ·.★·.·´¯`·.·★ 🅲🅻🅸🅲🅺 🅾🅽 🆃🆆🅾 🆃🅸🅻🅴🆂 🆃🅾 🅵🅸🅽🅳 🆃🆆🅾 🅼🅰🆃🅲🅷🅸🅽🅶 🅸🅼🅰🅶🅴🆂. ★·.·´¯`·.·★.·
      </h3>
      <audio autoPlay loop muted={false} controls>
          <source src="/mixaund-dreamers.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
      </audio>
      <div className={styles.container}>
        {cards.map((card, index) => {
            return (
                <Card
                key={index}
                card={card}
                index={index}
                isMatched={checkIsMatched(card)}
                isFlipped={checkIsFlipped(index)}
                onClick={handleCardClick}
                />
            );
        })}
        {showDialog && (
          <dialog open={true} className={styles.modal}  onClose={closeModal}>
            <h2>Well done! You've won!</h2>
            <button className={styles.modalBtn} onClick={restartGame}>Restart Game</button>
          </dialog>
        )}
      </div>
      <footer className={globalcss.footer}>
        <p>The icons and images used in this game are the property of Nintendo Co., Ltd. and are protected by copyright laws. I do not own the copyrights to these images and is using them solely for educational purposes under the principles of fair use.</p>
        <p>Background Music:"Dreamers" by Mixaund. Licensed under Creative Commons: Attribution-NonCommercial [CC BY-NC], Link to Mixaund's website: https://mixaund.bandcamp.com/track/dreamers-3</p>
      </footer>
    </div>
  );
}
