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
    console.log(`source: ${sourceId}, target: ${targetId}`);
  }
}