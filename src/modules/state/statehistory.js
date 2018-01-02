/*!
 * Description: Object to store a history of Redux states.
 *
 * This object is used by the HistoryContainer component to pass props
 * to the History component.
 *
 * The purpose of the object is to make it possible to "travel-in-time"
 * through the history of states.
 *
 * The public properties are;
 * - past, array to store past states
 * - present, to store the current state
 * - future, array of future states
 *
 * The public methods are;
 * - undo, is used to undo and go to previous state
 * - redo, is used to redo and go to next state
 * - gotoState,
 *
 *
 * Author:  Henrik Grönvall
 * File:
 * Version: 0.0.1
 * Created on 2016-10-16
 */
export default {
  past: [],
  present: undefined,
  future: [],

  thereIsAPresent() { return this.present !== undefined; },
  thereIsAPast() { return this.past.length > 0; },
  thereIsAFuture() { return this.future.length > 0; },
  setPresent(state) { this.present = state; },
  movePresentToPast() { this.past.push(this.present); },
  push(currentState) {
    if (this.thereIsAPresent()) {
      this.movePresentToPast();
    }
    this.setPresent(currentState);
  },
  getIndex() {
    return this.past.length;
  },
  undo() {
    if (this.thereIsAPast()) {
      this.gotoState(this.getIndex() - 1);
    }
  },
  redo() {
    if (this.thereIsAFuture()) {
      this.gotoState(this.getIndex() + 1);
    }
  },
  gotoState(i) {
    const index = Number(i);
    const allstates = [...this.past, this.present, ...this.future];
    this.present = allstates[index];
    this.past = allstates.slice(0, index);
    this.future = allstates.slice(index + 1, allstates.length);
  },
};