import React, { Component } from 'react';

import TodosForm from '../components/TodosForm';
import TodoItem from '../components/TodoItem';
import StatusBar from '../components/StatusBar';
import PopupModal from '../components/PopupModal';

class Home extends Component {
	constructor(props) {
		super(props);
		//get initiate todo list
		let todos = []
		if(JSON.parse(localStorage.getItem('todos')) !== null) {
			todos = JSON.parse(localStorage.getItem('todos')).slice(0);
		} else {
			localStorage.setItem('todos', JSON.stringify(todos));
		}

		//get initiate history list
		if(JSON.parse(localStorage.getItem('history')) === null) {
			let history = [];
			localStorage.setItem('history', JSON.stringify(history));
		}
		
		this.state = {
			todos: todos,
			allCompleted: false,
			modalIsOpen: false, 
			message: '',
			searchText: ''
		};
	}
	//add new todo item
	addTodo(todo) {
		const todos = JSON.parse(localStorage.getItem('todos')).slice(0);
		todo.index = (todos.length > 0) ? (todos[todos.length - 1].index + 1) : 1;
		let newTodos = todos.concat(todo);
		this.setState({todos: newTodos});
		//save new list to localStorage and state
		localStorage.setItem('todos', JSON.stringify(newTodos));
		//call search function to restore current search of user
		this.searchTodos(this.state.searchText);

		//update allCompleted status
		if(this.state.allCompleted === true) {
			this.setState({allCompleted: false});
		}

		//save new history
		const history = JSON.parse(localStorage.getItem('history')).slice(0);
		let newHistory = history.concat({
			'index': todo.index,
			'title': todo.title,
			'description': todo.description,
			'date': todo.created,
			'action': 'Add'
		});
		localStorage.setItem('history', JSON.stringify(newHistory));
	}
	//remove todo item
	deleteTodo(index, completed) {
		//check if item is completed
		if(completed === true) {
			let todos = JSON.parse(localStorage.getItem('todos')).slice(0);
			const history = JSON.parse(localStorage.getItem('history')).slice(0);

			//find and remove item
			for (let i = 0; i < todos.length; i++) {
				if(todos[i].index == index) {
					//save removed item to history					
					let newHistory = history.concat({
						'index': todos[i].index,
						'title': todos[i].title,
						'description': todos[i].description,
						'date': (new Date()).toLocaleString(),
						'action': 'Remove'
					});
					localStorage.setItem('history', JSON.stringify(newHistory));

					//remove item
					todos.splice(i, 1);
					break;
				}
			}
			//save new list to localStorage and state
			this.setState({todos: todos});
			localStorage.setItem('todos', JSON.stringify(todos));
			//call search function to restore current search of user
			this.searchTodos(this.state.searchText);

			//update allCompleted status
			if(this.state.allCompleted === true && todos.length == 0) {
				this.setState({allCompleted: false});
			}
		} else {
			//show error if item is incompleted
			this.openModal('Please mark this task as completed before deleting it.');
		}
	}
	//search todo items
	searchTodos(searchText) {
		this.state.searchText = searchText;
		const todos = JSON.parse(localStorage.getItem('todos')).slice(0);
		//check to search only when search text is equal or more than 3 characters
		if(searchText.length >= 3) {
			let searchResult = [];
			for (let i = 0; i < todos.length; i++) {
				//check if item's title or item's description contain search text
				if(todos[i].title.toLowerCase().indexOf(searchText) >= 0 || 
					todos[i].description.toLowerCase().indexOf(searchText) >= 0) {
					searchResult.push(todos[i]);
				}
			}
			//set search result to state, to update view
			this.setState({todos: searchResult});
		} else {
			//display full list if search text is less than 3 characters
			this.setState({todos: todos});
		}
	}
	//Update item as completed/incompleted
	updateCompletion(index, isAll) {
		const todos = JSON.parse(localStorage.getItem('todos')).slice(0);
		const history = JSON.parse(localStorage.getItem('history')).slice(0);
		let newTodos = todos.map((item) => {
			//check if we need to update all items in list
			if(isAll === true) {
				//update all items
				return Object.assign({}, item, {completed: !this.state.allCompleted});
			} else {
				//update item with matched index
				if(item.index == index) {
					let todo = Object.assign({}, item, {completed: !item.completed});

					//save new history
					let newHistory = history.concat({
						'index': index,
						'title': todo.title,
						'description': todo.description,
						'date': (new Date()).toLocaleString(),
						'action': 'Mark as ' + ((todo.completed === true) ? 'completed' : 'incompleted')
					});
					localStorage.setItem('history', JSON.stringify(newHistory));

					return todo;
				}
				return item;
			}
		});

		//set new list to localStorage
		localStorage.setItem('todos', JSON.stringify(newTodos));
		//call search function to restore current search of user
		this.searchTodos(this.state.searchText);
		if(isAll === true) {
			//save allCompleted status
			this.setState({allCompleted: !this.state.allCompleted});

			//save new history
			let newHistory = []
			for (let i = 0; i < newTodos.length; i++) {
				newHistory.push({
					'index': newTodos[i].index,
					'title': newTodos[i].title,
					'description': newTodos[i].description,
					'date': (new Date()).toLocaleString(),
					'action': 'Mark as ' + ((this.state.allCompleted === true) ? 'incompleted' : 'completed')
				});
			}

			localStorage.setItem('history', JSON.stringify(history.concat(newHistory)));
		}

		let newAllCompleted = true;
		for (let i = 0; i < newTodos.length; i++) {
			if(newTodos[i].completed === false) newAllCompleted = false;
		}
		this.setState({allCompleted: newAllCompleted});
	}
	//update title/description of item
	updateDetails(index, title, description) {
		const todos = JSON.parse(localStorage.getItem('todos')).slice(0);
		const history = JSON.parse(localStorage.getItem('history')).slice(0);
		let isUpdated = false;
		let newTodos = todos.map((item) => {
			//check and update item with matched index
			if((item.index == index) && (item.title !== title || item.description !== description)) {
				let todo = Object.assign({}, item, {title: title, description: description, modified: (new Date()).toLocaleString()});
				isUpdated = true;
				return todo;
			}
			return item;
		});
		//save new list to localStorage
		localStorage.setItem('todos', JSON.stringify(newTodos));
		//call search function to restore current search of user
		this.searchTodos(this.state.searchText);

		if(isUpdated === true) {
			//save new history
			let newHistory = history.concat({
				'index': index,
				'title': title,
				'description': description,
				'date': (new Date()).toLocaleString(),
				'action': 'Update Details'
			});
			localStorage.setItem('history', JSON.stringify(newHistory));
		}
	}
	//remove all completed items
	clearCompletedItem() {
		const todos = JSON.parse(localStorage.getItem('todos')).slice(0);
		const history = JSON.parse(localStorage.getItem('history')).slice(0);
		let newTodos = [];
		//check and keep only incompleted items
		for (let i = 0; i < todos.length; i++) {
			if(todos[i].completed === false) {
				newTodos.push(todos[i]);
			}
		}

		//save all removed items to history
		let newHistory = []
		for (let i = 0; i < todos.length; i++) {
			if(todos[i].completed === true) {
				newHistory.push({
					'index': todos[i].index,
					'title': todos[i].title,
					'description': todos[i].description,
					'date': (new Date()).toLocaleString(),
					'action': 'Remove'
				});
			}
		}
		localStorage.setItem('history', JSON.stringify(history.concat(newHistory)));

		//save new list to localStorage
		localStorage.setItem('todos', JSON.stringify(newTodos));
		//call search function to restore current search of user
		this.searchTodos(this.state.searchText);

		//update allCompleted status
		if(this.state.allCompleted === true && newTodos.length == 0) {
			this.setState({allCompleted: false});
		}
	}
	//count number of incompleted item
	countIncompletedTodo() {
		let count = 0;
		for (let i = 0; i < this.state.todos.length; i++) {
			if(this.state.todos[i].completed === false) {
				count++;
			}
		}
		return count;
	}
	//count number of completed item
	countCompletedTodo() {
		return this.state.todos.length - this.countIncompletedTodo();
	}
	//show popup
	openModal(message) {
	    this.setState({modalIsOpen: true, message: message});
	    setTimeout(() => {
			this.closeModal();
		}, 3000);
	}

	//update data/element after shown popup
	afterOpenModal() {
	    // references are now sync'd and can be accessed.
	}

	//close popup
	closeModal() {
	    this.setState({modalIsOpen: false});
	}

	//render whole Home page - the Todos app
	render() {
		//create list of todo items from state data
		let todos = this.state.todos.map((todo, index) => {
   			return (
   				<TodoItem title={todo.title} description={todo.description} created={todo.created} 
   				modified={todo.modified} key={index} index={todo.index} completed={todo.completed}
   				deleteTodo={(index, completed) => this.deleteTodo(index, completed)}
   				updateCompletion={(index, isAll) => this.updateCompletion(index, isAll)}
   				updateDetails={(index, title, description) => this.updateDetails(index, title, description)}
   				showError={(message) => this.openModal(message)}/>
   			);
   		});

		//generate Todos view structure
		return (
			<div className="text-center container">
				<h1 className="mt-4">Todos</h1>
				<div className="clearfix"><a href="/history" className="nav-link float-right mb-4">History</a></div>

				<TodosForm addTodo={(todo) => this.addTodo(todo)} searchTodos={(event) => this.searchTodos(event)} 
				allCompleted={this.state.allCompleted} updateCompletion={(index, isAll) => this.updateCompletion(index, isAll)}
				showError={(message) => this.openModal(message)}/>

				{todos}
				
				<StatusBar incompletedCount={this.countIncompletedTodo()} completedCount={this.countCompletedTodo()} 
				clearCompletedItem={() => this.clearCompletedItem()}/>

				<PopupModal modalIsOpen={this.state.modalIsOpen} 
		        afterOpenModal={() => this.afterOpenModal()} 
		        closeModal={() => this.closeModal()}
		        message={this.state.message}/>
			</div>
		);
	}
}

export default Home;