import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import Notes from './Notes';

const Lane = ({
	lane, notes, LaneActions, NoteActions, ...props
}) => {
	const editNote = (id, task) => {
		NoteActions.update({ id, task, editing: false });
	};

	const addNote = e => {
		e.stopPropagation();
		const noteId = uuid.v4();
		NoteActions.create({
			id: noteId,
			task: 'New Task'
		});
		LaneActions.attachToLane({
			laneId: lane.id,
			noteId
		});
	};

	const deleteNote = (noteId, e) => {
		e.stopPropagation();
		LaneActions.detachFromLane({
			laneId: lane.id,
			noteId
		});
		NoteActions.delete(noteId);
	};

	const activateNoteEdit = id => {
		NoteActions.update({ id, editing: true });
	}

	return (
		<div {...props}>
			<div className="lane-header">
				<div className="lane-add-note">
					<button onClick={addNote}>+ Añadir Nota</button>
				</div>
				<div className="lane-name">{lane.name}</div>
			</div>
			<Notes
				notes={selectNotesByIds(notes, lane.notes)}
				onNoteClick={activateNoteEdit}
				onEdit={editNote}
				onDelete={deleteNote} />
		</div>
	);
};

function selectNotesByIds(allNotes, notesIds = []) {
	// `reduce` es un método poderoso que nos permite
	// agrupar datos. Puedes implementar filter` y `map`
	// dentro de él. Nosotros lo estamos usando para
	// concatenar notas cuyos id coincidan
	return notesIds.reduce((notes, id) =>
		// Concatena ids que encajen al resultado
		notes.concat(
			allNotes.filter(note => note.id === id)
		)
		, []
	);
}

export default connect(
	({ notes }) => ({
		notes
	}), {
	NoteActions,
	LaneActions
}
)(Lane)