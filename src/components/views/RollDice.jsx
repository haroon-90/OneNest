import React, { useState } from "react";
import { motion } from "framer-motion";
import Dice0 from "../../assets/Logo/Dice_0.svg";
import Dice1 from "../../assets/Logo/Dice_1.svg";
import Dice2 from "../../assets/Logo/Dice_2.svg";
import Dice3 from "../../assets/Logo/Dice_3.svg";
import Dice4 from "../../assets/Logo/Dice_4.svg";
import Dice5 from "../../assets/Logo/Dice_5.svg";
import Dice6 from "../../assets/Logo/Dice_6.svg";

const diceImages = [Dice0, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const RollDice = () => {
  const [diceValue, setDiceValue] = useState(0);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);

    let rollCount = 0;
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(randomValue);
      rollCount++;
      if (rollCount >= 10) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 100);
  };

  return (
    <div className="w-[50vw] h-auto text-white flex flex-col items-center p-6 bg-[#1E1F24] rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Roll Dice</h2>

      <motion.img
        key={diceValue} // triggers animation on change
        src={diceImages[diceValue]}
        alt={`Dice ${diceValue}`}
        className="w-[15vw] h-[15vw] m-6"
        initial={{ rotate: 0, scale: 0.8 }}
        animate={{
          rotate: [0, 180, 270, 360],
          scale: [1, 1.15, 1.05, 1],
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
      />

      <button
        onClick={rollDice}
        disabled={rolling}
        className="mt-6 bg-[#25d366] hover:bg-[#2dfcb4] text-black font-bold py-2 px-6 rounded shadow-md transition-all duration-300"
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
};

export default RollDice;
