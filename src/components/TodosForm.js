import React, { Component } from 'react';

import searchIcon from '../images/search.png';
import '../styles/TodosForm.css';

class TodosForm extends Component {
	//add new todo item
	addTodo(event) {
		event.preventDefault();

		//validate description field up to 140 alphanumeric characters 
		let descReg = /^[0-9a-zA-Z\s]+$/;
		let trimDesc = this.descInput.value.trim().substr(0, 140).replace(/\s+/g,' ');
		if(descReg.test(trimDesc) === true) {
			//trim 30 first characters of each word
			let descWords = trimDesc.split(/\s+/);
			for(let i = 0; i < descWords.length; i++) {
				descWords[i] = descWords[i].substr(0, 30);
			}
			trimDesc = descWords.join(' ');

			//get current date
			let date = (new Date()).toLocaleString();
			let todo = {
				title: this.titleInput.value.trim(),
				description: trimDesc,
				created: date,
				modified: date,
				completed: false
			};

			//call addTodo function from Home.js
			this.props.addTodo(todo);
			//reset all input fields
			this.titleInput.value = '';
			this.descInput.value = '';
			this.titleInput.focus();
		} else {
			//show error popup when description is not valid
			this.props.showError('Description is up to 140 alphanumeric characters!');
		}
	}

	//search todo items
	searchTodos(event) {
		const searchText = event.target.value.trim().toLowerCase();
		//call searchTodos from Home.js
		this.props.searchTodos(searchText);

	}

	//show add/search form when clicking on add/search icon
	showForm(event, type){
		event.preventDefault();
		if(type === 'add') {
			this.addForm.classList.add('active');
			this.searchForm.classList.remove('active');
		} else if(type === 'search') {
			this.addForm.classList.remove('active');
			this.searchForm.classList.add('active');
		}
	}

	//render content of todo forms
	render() {
		return (
			<div>
				<form className="add-form active" onSubmit={(event) => this.addTodo(event)} ref={addForm => this.addForm = addForm}>
					<div className="form-groups">
						<div className="form-group">
						    <input type="text" className="form-control" placeholder="Title" 
						    aria-label="Todo title" ref={titleInput => this.titleInput = titleInput} required/>
						</div>
						<div className="form-group">
						    <input type="text" className="form-control" placeholder="Description" 
						    aria-label="Todo description" ref={descInput => this.descInput = descInput} required maxLength="140"/>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">+</button>
					<div className="overlay" onClick={(event, type) => this.showForm(event, 'add')}></div>
				</form>

				<form className="search-form" ref={searchForm => this.searchForm = searchForm}>
					<div className="form-group">
					    <input type="text" className="form-control" placeholder="Search recipe" 
					    aria-label="Search recipe" onChange={(event) =>this.searchTodos(event)}/>
					</div>
					<button className="btn btn-primary" onClick={(event, type) => this.showForm(event, 'search')}>
						<img src={searchIcon} alt="Search" width="30"/>
					</button>
				</form>

				<div className="form-check mb-4 text-left mark-all-chb">
				    <label className="form-check-label">
				    	<input type="checkbox" className="form-check-input mr-2" 
				    	onChange={(index, isAll, isCompleted) => this.props.updateCompletion(this.props.index, true)} 
				    	checked={(this.props.allCompleted === true) ? 'checked' : ''}/> 
				    	Mark all as completed
				    </label>
				</div>
			</div>
		);
	}
}

export default TodosForm;