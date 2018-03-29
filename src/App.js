import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Cards from './Cards';
import GameOver from './GameOver';

class App extends Component {
  constructor(props){
    super(props);
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
  	const index = this.state.cards.findIndex(card => card.id == id);
  	const cards = this.state.cards.slice();

  	// handle the rest of the stuff
  	if (this.state.numCardsRevealed === 0) {
  		// Prep card.revealed=true

  		cards[index].revealed = true;

  		// Prep numCardsRevealed + 1
  		let numCardsRevealed = Object.assign(this.state.numCardsRevealed);
  		numCardsRevealed += 1;

  		// Prep cardsRevealed.push
  		const cardsRevealed = this.state.cardsRevealed.slice();
  		cardsRevealed.push(cards[index]);

  		// setState
  		this.setState({
  			cards,
  			numCardsRevealed,
  			cardsRevealed
  		});

  	} else if (this.state.numCardsRevealed === 1) {
  		// Prep card.revealed=true
  		const cards = this.state.cards.slice();
  		cards[index].revealed = true;

  		// Prep numCardsRevealed + 1
  		let numCardsRevealed = Object.assign(this.state.numCardsRevealed);
  		numCardsRevealed += 1;

  		// Prep cardsRevealed.push
  		const cardsRevealed = this.state.cardsRevealed.slice();
  		cardsRevealed.push(cards[index]);

  		// setState
  		this.setState({
  			cards,
  			numCardsRevealed,
  			cardsRevealed
  		}, function () {
  		  // If the two cards don't match
  			if (cardsRevealed[0].color !== cardsRevealed[1].color) {
  			 // Set revealed to false for those cars
  				for (let i = 0; i < 2; i++) {
  					const index = cards.findIndex(card => card.id == cardsRevealed[i].id);
  					cards[index].revealed = false;
  				}
          // After 1.5 seconds setState to prepare for next picks
  				setTimeout(() => {
  					const cardsRevealed = [];
  					const numCardsRevealed = 0;
  					this.setState({
  						cards,
  						numCardsRevealed,
  						cardsRevealed
  					});
  				}, 1500);

  			} else {
  			 // If they match, set solved to true for those two cards
  			 let cardsRevealed = this.state.cardsRevealed.slice();
  			  for (let i = 0; i < 2; i++) {
  					const index = cards.findIndex(card => card.id == cardsRevealed[i].id);
  					cards[index].solved = true;
  				}
  				// And reset everything else to prepare for next picks
  				cardsRevealed = [];
  				const numCardsRevealed = 0;
  				this.setState({
  					cards,
  					numCardsRevealed,
  					cardsRevealed
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
    this.Shuffle(cards);
    const cardsRevealed = [];
    const numCardsRevealed = 0;
    const gameComplete = false; 
    this.setState({cards, cardsRevealed, numCardsRevealed, gameComplete}, ()=> console.log(this.state) );
  }

  
  
  render() {
    if(this.state.gameComplete === true){
      return (
      <div className="App">
        <Navbar newGame={this.newGame}/>
        <GameOver />
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
