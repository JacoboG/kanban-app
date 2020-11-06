import React from 'react';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../constants/itemTypes';
import connect from '../libs/connect';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import Notes from './Notes';
import LaneHeader from './LaneHeader';
import itemTypes from '../constants/itemTypes';

const Lane = ({
	connectDropTarget,
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

	return connectDropTarget(
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

const noteTarget = {
	hover(targetProps, monitor) {
		const sourceProps = monitor.getItem();
		const sourceId = sourceProps.id;
		// Si el carril destino no tiene notas
		// la damos la nota.
		// `àttachToLane` hace la limpiez necesaria
		// por defecto y garantiza que una nota sólo
		// pueda pertenecer a un carril
		if (!targetProps.lane.notes.length) {
			LaneActions.attachToLane({
				laneId: targetProps.lane.id,
				noteId: sourceId
			});
		}
	}
};

export default compose(
	DropTarget(itemTypes.NOTE, noteTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	connect(({ notes }) => ({
		notes
	}), {
		NoteActions,
		LaneActions
	})
)(Lane) 