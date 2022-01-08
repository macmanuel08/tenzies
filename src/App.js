import './App.css';
import Die from './Die';
import React from 'react';
import Confetti from "react-confetti";

function App() {

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allDiceHeld = dice.every(die => die.isHeld);
    const firstDieValue = dice[0].value;
    const allDiceSameValue = dice.every(die => die.value === firstDieValue);

    if (allDiceHeld && allDiceSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const randomNums = []

    for (let i = 0; i < 10; i++) {
      randomNums[i] = {id: i, value: generateNewNumber(), isHeld: false};
    }

    return randomNums;
  }

  function generateNewNumber() {
    return Math.ceil(Math.random() * 6);
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die;
    }));
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return !die.isHeld ? {...die, value: generateNewNumber()} : die
      }));
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
    
  }

  const diceComponents = dice.map((die) => {
    return <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  })
  
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceComponents}
      </div>
      <button 
          className="roll-dice" 
          onClick={rollDice}
      >
          {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App;
