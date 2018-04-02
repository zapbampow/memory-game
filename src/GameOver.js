import React, { Component } from 'react';
import './GameOver.css'

class GameOver extends Component {
    render() {

        return (
            <div className='GameOver'>
                <h1>You win!</h1>
                <button className="gameover-new-game" onClick={this.props.newGame}>New Game </button>
            
            
            </div>
        )

    }
}

export default GameOver;