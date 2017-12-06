import React, { Component } from 'react';

import '../styles/TodoItem.css';

class TodoItem extends Component {
	constructor(props) {
		super(props);

		//set state to check current active item
		this.state = {
			isActive: false
		};
	}

	//update new title and description of todo item
	updateDetails(event) {
		event.preventDefault();

		//check description up to 140 alphanumeric characters
		let descReg = /^[0-9a-zA-Z\s]+$/;
		let trimDesc = this.descInput.value.trim().substr(0, 140).replace(/\s+/g,' ');

		if(descReg.test(trimDesc) === true) {
			//trim 30 characters of each words
			let descWords = trimDesc.split(/\s+/);
			for(let i = 0; i < descWords.length; i++) {
				descWords[i] = descWords[i].substr(0, 30);
			}
			trimDesc = descWords.join(' ');
			this.descInput.value = trimDesc;
			//call updateDetails function from Home.js
			this.props.updateDetails(this.props.index, this.titleInput.value.trim(), trimDesc);
		} else {
			//show error popup when description is not valid
			this.props.showError('Description is up to 140 alphanumeric characters!');
		}
		//hide all input fields
		this.descGroup.classList.remove('show-edit');
		this.titleGroup.classList.remove('show-edit');
	}

	//show input field to edit title/description when clicking on the label
	updateInputVal(type) {
		//reset value of inputs to newest data
		this.titleInput.value = this.props.title;
		this.descInput.value = this.props.description;

		//check to show title or description input
		if(type === 'title') {
			this.titleGroup.classList.add('show-edit');
			this.titleInput.focus();
			this.descGroup.classList.remove('show-edit');
		} else if(type === 'desc'){
			this.descGroup.classList.add('show-edit');
			this.descInput.focus();
			this.titleGroup.classList.remove('show-edit');
		} else {
			this.descGroup.classList.remove('show-edit');
			this.titleGroup.classList.remove('show-edit');
		}
	}

	//update isActive value, to show/hide created date and modified date
	toggleDetails() {
		this.setState({isActive: !this.state.isActive});
	}

	//render content of todo item
	render() {
		return (
			<div className={'todo-item ' + ((this.props.completed === true) ? 'completed ' : '') + ((this.state.isActive === true) ? 'show' : 'hide')}>
				<input type="checkbox" onChange={(index, isAll) => this.props.updateCompletion(this.props.index, false)} 
				checked={(this.props.completed === true) ? 'checked' : ''} />

				<form onSubmit={(event) => this.updateDetails(event)}>
					<div ref={titleGroup => this.titleGroup = titleGroup}>
						<p className="title" onClick={(type) => this.updateInputVal('title')}>{this.props.title}</p>
						<input type="text" className="form-control" placeholder="Title" aria-label="Todo title" 
						defaultValue={this.props.title} ref={titleInput => this.titleInput = titleInput} required
						onBlur={(event) => this.updateDetails(event)}/>
					</div>

					<div ref={descGroup => this.descGroup = descGroup}>
						<p className="description" onClick={(type) => this.updateInputVal('desc')}>{this.props.description}</p>
						<input type="text" className="form-control" placeholder="Description" aria-label="Todo description"
						defaultValue={this.props.description} ref={descInput => this.descInput = descInput} required maxLength="140"
						onBlur={(event) => this.updateDetails(event)}/>
					</div>
					<button type="submit" className="btn btn-primary">Update</button>
				</form>

				<p className="created-date">Created: {this.props.created}</p>
				<p className="modified-date">Last Modified: {this.props.modified}</p>

				<button onClick={(index, completed) => this.props.deleteTodo(this.props.index, this.props.completed)}
				className="delete-btn"><span aria-hidden="true">&times;</span></button>
				<button onClick={() => this.toggleDetails()} 
				className="show-hide-btn"></button>
			</div>
		);
	}
}

export default TodoItem;