import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/singlecard';


const cardImages =[
  {"src" : "/img/helmet-1.png", matched : false},
  {"src" : "/img/potion-1.png", matched : false},
  {"src" : "/img/ring-1.png", matched : false},
  {"src" : "/img/scroll-1.png", matched : false},
  {"src" : "/img/shield-1.png", matched : false},
  {"src" : "/img/sword-1.png",matched : false}
]

function App() {
  const[cards, setCards] = useState([]);
  const[count, setCount] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)

// Duplicates the crads, Shuffles them and tart the game
  const shuffleCards = () => {
    const duplicateCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(duplicateCards);
    setCount(0);
  }

  //checks if the cards match
  useEffect(() => {
    if (choiceOne &&  choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(previousCard => {
          return previousCard.map(card => {
            if ( card.src === choiceOne.src ) {
              return {...card, matched : true }
            } else{
              return card;
            }
          })
        })
        resetTurn()
      } else{
        setTimeout(() => resetTurn(), 900)
      }
    }
  }, [choiceOne,choiceTwo])

  console.log(cards);
  
  // Resets the cards
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setCount(previousTurn => previousTurn + 1) 
    setDisabled(false)
  }

  const handleChoice =(card)=> {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  // Starts the game at the begining
  useEffect(() => {
    shuffleCards()
  }, [])
  // Gives an alert message when the game is completed
  useEffect(() => {
    if (cards.every(card => card.matched)) {
      alert(`Congartulations! You have completed the game in ${ count } turns`)
    }
  })
  

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards} >New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice ={handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled ={disabled}
            />
        ))}
      </div>
      <p>Turns: {count}</p>
    </div>
  );
}

export default App