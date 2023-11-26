'use client'
import React from "react";
import styles from './card.module.css';

const Card = ({ onClick, card, index, isMatched, isFlipped }) => {
    const handleClick = () => {
      !isFlipped && onClick(index);
    };

    const dynamicStyle = {
      transform: isFlipped ? ' rotateY(180deg)' : 'none',
      opacity: isMatched ? 0 : 1,
    }; 

    return (
    <div className={styles.cardContainer} style={dynamicStyle} onClick={handleClick}>
      <div className={`${styles["covered"]}`}>
        <img className={styles.cardImage} src="/Furniture_NH_Inv_Icon.png" alt="cover" />
      </div>
      <div className={`${styles["covered"]} ${styles["backface"]}`}>
        <img className={styles.cardImage} src={card.image} alt="image" />
      </div>
    </div>
    );
  };
  
  export default Card;
