import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Cards from './Cards';
import GameOver from './GameOver';

const cards= [
    {id:0, revealed:false, solved:false, color:"red"},
    {id:1, revealed:false, solved:false, color:"red"},
    {id:2, revealed:false, solved:false, color:"blue"},
    {id:3, revealed:false, solved:false, color:"blue"},
    {id:4, revealed:false, solved:false, color:"black"},
    {id:5, revealed:false, solved:false, color:"black"},
    {id:6, revealed:false, solved:false, color:"orange"},
    {id:7, revealed:false, solved:false, color:"orange"},
    {id:8, revealed:false, solved:false, color:"pink"},
    {id:9, revealed:false, solved:false, color:"pink"},
    {id:10, revealed:false, solved:false, color:"yellow"},
    {id:11, revealed:false, solved:false, color:"yellow"},
    {id:12, revealed:false, solved:false, color:"purple"},
    {id:13, revealed:false, solved:false, color:"purple"},
    {id:14, revealed:false, solved:false, color:"green"},
    {id:15, revealed:false, solved:false, color:"green"},
  ];
      
class App extends Component {
  constructor(props){
    super(props);

    const shuffledCards = this.Shuffle(cards.slice());
    
    this.state = {
      cards: shuffledCards,
      cardsRevealed: [],
      numCardsRevealed: 0,
      gameComplete: false
    };
    
    this.Shuffle = this.Shuffle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkGameEnd = this.checkGameEnd.bind(this);
    this.newGame = this.newGame.bind(this);
  }
  
  Shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  handleClick(e) {
    	
    // Find the card in state
    const id = e.target.id.split('-')[1];
    const newState = Object.assign(this.state);
    const index = newState.cards.findIndex(card => card.id == id);
  
    // handle the rest of the stuff
    if (newState.numCardsRevealed === 0) {
      // Prep card.revealed=true
      newState.cards[index].revealed = true;
  
      // Prep numCardsRevealed + 1
      newState.numCardsRevealed += 1;
  
      // Prep cardsRevealed.push
      newState.cardsRevealed.push(newState.cards[index]);
  
      // setState
      this.setState({
        ...newState
      });
  
    } else if (newState.numCardsRevealed === 1) {
  		// Prep card.revealed=true
  		newState.cards[index].revealed = true;

  		// Prep numCardsRevealed + 1
  		newState.numCardsRevealed += 1;

  		// Prep cardsRevealed.push
  		newState.cardsRevealed.push(newState.cards[index]);

  		// setState
  		this.setState({
  			...newState
  		}, function () {
  		  // If the two cards don't match...
  			if (newState.cardsRevealed[0].color !== newState.cardsRevealed[1].color) {
  			 // Map array where the unmatching cards are reset to revealed:false by pulling from cardsRevealed array
  			  const cardsRevert = newState.cards.map(card => {
  			    if(card.id === newState.cardsRevealed[0].id){
  			      newState.cardsRevealed[0].revealed = false;
  			      return newState.cardsRevealed[0];
  			    } else if (card.id === newState.cardsRevealed[1].id) {
  			      newState.cardsRevealed[1].revealed = false;
  			      return newState.cardsRevealed[1];
  			    } else {
  			      return card;
  			    }
  			   });

          // After 1.5 seconds setState to prepare for next picks
  				setTimeout(() => {
  					this.setState({
  						cards:cardsRevert,
  						numCardsRevealed:0,
  						cardsRevealed:[]
  					});
  				}, 1500);
  			}
  			else {
  			  const updateSolvedCards = newState.cards.map(card => {
  			    if(card.id === newState.cardsRevealed[0].id){
  			      newState.cardsRevealed[0].solved = true;
  			      return newState.cardsRevealed[0];
  			    } else if (card.id === newState.cardsRevealed[1].id) {
  			      newState.cardsRevealed[1].solved = true;
  			      return newState.cardsRevealed[1];
  			    } else {
  			      return card;
  			    }
  			  });
  			  
  				// And reset everything else to prepare for next picks
  				this.setState({
  					cards:updateSolvedCards,
  					numCardsRevealed:0,
  					cardsRevealed:[]
  				}, this.checkGameEnd(this.state.cards) /* And check whether the game is over after setting state */
  				);
  			} 
  		});
  	}
  }
  
  checkGameEnd(array) {
    //Check whether every card is solved
    const complete = array.every((card) => card.solved === true);
    if(complete) {
      this.setState({gameComplete:true});
    }
  }
    
 
  
  newGame () {
    const shuffledCards = this.Shuffle(cards);
    shuffledCards.forEach(card => card.revealed = false);

    this.setState({
      cards:shuffledCards, 
      cardsRevealed:[], 
      numCardsRevealed:0, 
      gameComplete:false
    });
  }

  
  
  render() {
    if(this.state.gameComplete === true){
      return (
      <div className="App">
        <Navbar newGame={this.newGame}/>
        <GameOver  />
        <Cards cards={this.state.cards} handleClick={this.handleClick} />
      </div>
    );
    }
    return (
      <div className="App">
        <Navbar newGame={this.newGame} />
        <Cards cards={this.state.cards} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
