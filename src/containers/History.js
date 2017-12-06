import React, { Component } from 'react';

class History extends Component {
	constructor(props) {
		super(props);

		//get initiate history list
		let history = []
		if(JSON.parse(localStorage.getItem('history')) !== null) {
			history = JSON.parse(localStorage.getItem('history')).slice(0);
		} else {
			localStorage.setItem('history', JSON.stringify(history));
		}

		this.state = {
			history: history
		};
	}
	render() {
		let history = this.state.history.map((row, index) => {
   			return (
   				<tr>
					<th scope="row">{row.index}</th>
					<td>{row.title}</td>
					<td>{row.description}</td>
					<td>{row.date}</td>
					<td>{row.action}</td>
				</tr>
   			);
   		});

		return (
			<div className="text-center container">
				<h1 className="mt-4">History</h1>
				<div className="clearfix"><a href="/" className="nav-link float-right mb-4">Back to Todo list</a></div>

				<table className="table text-left">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Title</th>
							<th scope="col">Description</th>
							<th scope="col">Date</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{history}
					</tbody>
				</table>
			</div>
		);
	}
}

export default History;