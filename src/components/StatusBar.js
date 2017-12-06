import React, { Component } from 'react';

import '../styles/StatusBar.css';

class StatusBar extends Component {
	render() {
		//check plural or singular form of 'item' text
		let incompletedText = this.props.incompletedCount + ((this.props.incompletedCount > 1) ? ' items ' : ' item ') + 'left';
		let completedText = 'Clear ' + this.props.completedCount + ' completed ' +  ((this.props.completedCount > 1) ? ' items ' : ' item ');
		
		//render status bar - bottom bar of page
		return (
			<div className="status-bar mt-4">
				<div className="float-left mb-3">{incompletedText}</div>
				<button onClick={() => this.props.clearCompletedItem()}  className="float-right mb-3">{completedText}</button>
			</div>
		);
	}
}

export default StatusBar;