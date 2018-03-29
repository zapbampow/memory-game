import React, { Component } from 'react';
import './Navbar.css'

class Navbar extends Component {
    render(){
        return(
            <div className='Navbar'>
                <span className="navbar-title">Memory Game</span>
                <span className="navbar-new-game" onClick={this.props.newGame}>New Game</span>
            </div>
        )
    }
}


export default Navbar;