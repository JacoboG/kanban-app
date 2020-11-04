import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';

import connect from '../libs/connect';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [
				{
					id: uuid.v4(),
					task: 'Aprender React'
				},
				{
					id: uuid.v4(),
					task: 'Crear Ejemplo'
				},
				{
					id: uuid.v4(),
					task: 'Avanzar en React'
				}
			]
		}
	}

	render() {
		const { notes } = this.state;
		return (
			<div>
				{this.props.test}
				<button
					className={"add-note"}
					onClick={this.addNote}>
					+ Añadir Nota
				</button>
				<Notes
					notes={notes}
					onNoteClick={this.activateNoteEdit}
					onEdit={this.editNote}
					onDelete={this.deleteNote}
				/>
			</div>
		);
	}

	addNote = () => {
		this.setState({
			notes: this.state.notes.concat([{
				id: uuid.v4(),
				task: 'Nueva Tarea'
			}])
		});

		/*
		// Notacion Spread (incluida en ES6)
		// Hace los mismo que lode arriba
		this.setState({
			notes: [... this.state.notes, {
				id: uuid.v4(),
				task: 'Nueva Tarea'
			}]
		});
		*/
	}

	activateNoteEdit = (id) => {
		this.setState({
			notes: this.state.notes.map(note => {
				if (note.id === id) {
					note.editing = true;
				}
				return note;
			})
		});
	}

	editNote = (id, task) => {
		this.setState({
			notes: this.state.notes.map(note => {
				if (note.id === id) {
					note.editing = false;
					note.task = task;
				}
				return note;
			})
		});
	}

	deleteNote = (id, e) => {
		e.stopPropagation();
		this.setState({
			notes: this.state.notes.filter(note => note.id !== id)
		});
	};
}

export default connect(() => ({
	test: 'test'
}))(App)