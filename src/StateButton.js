import React, {Component} from 'react';


class StateButton extends Component {
    render() {
        return (
            <button onClick={this.props.ButtonClick}>Change State</button>
        )
    }
}

export default StateButton;