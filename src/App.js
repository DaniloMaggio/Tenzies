import './App.css';
import React, { useEffect, useState } from 'react';
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("Hai vinto!")
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
      }

      return newDice
    }

  function rollDice () {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
          die :
          generateNewDie()

      }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
          {...die, isHeld: !die.isHeld} :
          die
    }))
}

  const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    )) 

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className='instructions'>Lancia i dadi finché non sono tutti uguali. Clicca su un dado
      per bloccare il suo valore durante un lancio ed un altro. </p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button 
      className='roll-dice' 
      onClick={rollDice}
      >
        {tenzies ? "Nuova Partita" : "Lancia i dadi"}
      </button>
    </main>
  )}

export default App;
