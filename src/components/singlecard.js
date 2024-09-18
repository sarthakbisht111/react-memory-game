import "./singlecard.css"

const SingleCard = ({ card , handleChoice, flipped , disabled }) =>{

  const handleClick =() => {
    if (!disabled) {
      handleChoice(card)
    } 
  }

  return(
    <div className="card" key={card.id} >
      <div className={flipped? "flipped" : ""} >
        <img src={card.src} alt="front view" className="front" />
        <img src="/img/cover.png" alt="back view" className="back" onClick={handleClick} />
      </div>
    </div>
  );
}

export default SingleCard