import React, {Component} from 'react';
import './Cards.css';

class Cards extends Component{
    render(){
        const cards = this.props.cards.map((card, index) => {
            const id = "card-"+card.id;
            
            if(card.revealed === true) {
                return <div key={card.id} className="card" id={id} style={{backgroundColor: card.color}} onClick={this.props.handleClick} ></div>
            }
            return <div key={card.id} className="card" id={id} style={{backgroundColor: 'grey'}} onClick={this.props.handleClick}></div>
        })
        
        return (
            <div className="Cards">
                {cards}
            </div>
        )
    }
}


export default Cards; 