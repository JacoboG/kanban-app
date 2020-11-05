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
          console.log('lane: ');
          console.log(lane);
          console.log('updatedLane: ');
          console.log( updatedLane);
          return Object.assign({}, lane, updatedLane);
        }
        return lane;
      })
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

  detachFromLane(laneId, noteId) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if (lane.id === laneId) {
          lane.notes = lane.notes.filter(note => note !== noteId);
        }
        return lane;
      })
    });
  }
}