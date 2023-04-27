import React, { useState } from 'react'
import Die from './Components/Die'
import Confetti from './Components/Confetti'
import { nanoid } from 'nanoid'
import './App.css'

function App() {

  // INTIALIZE STATE WITH A CALL TO OUR FUNCTION
  const [dice, setDice] = useState(allNewDice)

  // STATE REPRESENTS IF USER HAS WON THE GAME
  const [tenzies, setTenzies] = useState(false)

  // Keeping 2 pieces of state in sync is why were using useEffect
  React.useEffect(() => {

    const allHeld = dice.every(die => die.isHeld === true)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)


    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You Won!")
    }

  }, [dice])

  // Generate and return an array of random numbers 
  // function allNewDice() {
  //   const diceNumArray = [];
  //   for (let i = 0; i < 10; i++) {
  //     diceNumArray.push(Math.floor(((Math.random() * 6) + 1)))
  //   }
  //   console.log(diceNumArray);
  //   return diceNumArray;
  // }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }


  // Generate and return an array of objects 
  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDie())
    }
    // console.log(diceArray);
    return diceArray;
  }

  // 
  function holdDice(id) {

    const clickedDice = dice.find(die => die.id === id)

    // when using the setState function we want to 
    // return the same thing execpt few changes

    setDice(oldDice => oldDice.map(die => {
      // returns an array where the die
      // with the id that was clicked
      // has its isHeld property flipped 
      return die.id === id ?
        // spread in the previous die object and
        // flip the isHeld property
        { ...die, isHeld: !die.isHeld } : // else
        //if not the id that we clicked on keep the same
        die
    }))

  }

  // MAP OVER STATE AND RETURN DICE COMPONENT
  const diceElements = dice.map(dice => {
    return (
      <Die
        key={dice.id}
        id={dice.id}
        value={dice.value}
        isHeld={dice.isHeld}
        handleClick={holdDice}
      />
    )
  })

  // ROLL DICE --> RE-RENDER NEW DICE VALUES TO SCREEN
  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }

  }



  return (
    <main className='main'>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button
        className='roll-btn'
        onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
