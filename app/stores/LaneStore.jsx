import update from 'react-addons-update';
import LaneActions from '../actions/LaneActions';

export default class LaneStore {
  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [];
  }

  create(lane) {
    // Si no hay notas creamos un array vacío
    lane.notes = lane.notes || [];

    this.setState({
      lanes: this.lanes.concat(lane)
    });
  }

  update(updatedLane) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if (lane.id === updatedLane.id) {
          return Object.assign({}, lane, updatedLane);
        }
        return lane;
      })
    });
  }

  delete(laneId) {
    this.setState({
      lanes: this.lanes.filter(lane => lane.id !== laneId)
    });
  }

  attachToLane({ laneId, noteId }) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if (lane.notes.includes(noteId)) {
          lane.notes = lane.notes.filter(note => note !== noteId);
        }
        if (lane.id === laneId) {
          lane.notes = lane.notes.concat([noteId]);
        }
        return lane;
      })
    });
  }

  detachFromLane({ laneId, noteId }) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if (lane.id === laneId) {
          lane.notes = lane.notes.filter(note => note !== noteId);
        }
        return lane;
      })
    });
  }

  move({ sourceId, targetId }) {
    const lanes = this.lanes;
    const sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
    const targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0];

    const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
    const targetNoteIndex = targetLane.notes.indexOf(targetId);

    if (sourceLane === targetLane) {
      // Las mueve en bloque para evitar complicaciones 
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceId]
        ]
      });
    } else {
      // Elimina la nota del origen
      sourceLane.notes.splice(sourceNoteIndex, 1);
      // y la mueve al objetivo
      targetLane.notes.splice(targetNoteIndex, 0, sourceId);
    }
    this.setState({ lanes });
  }
}