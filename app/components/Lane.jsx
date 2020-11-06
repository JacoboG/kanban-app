import React from 'react';
import connect from '../libs/connect';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import Notes from './Notes';
import LaneHeader from './LaneHeader';

const Lane = ({
	lane, notes, LaneActions, NoteActions, ...props
}) => {
	const editNote = (id, task) => {
		NoteActions.update({ id, task, editing: false });
	};

	const deleteNote = (noteId, e) => {
		e.stopPropagation();
		LaneActions.detachFromLane({ laneId: lane.id, noteId });
		NoteActions.delete(noteId);
	};

	const activateNoteEdit = id => {
		NoteActions.update({ id, editing: true });
	}

	return (
		<div {...props}>
			<LaneHeader lane={lane} />
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