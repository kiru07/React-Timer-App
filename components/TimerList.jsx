import React from "react";
import Timer from "./Timer";

class TimerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timers: [],
      setHours: 0,
      setMins: 0,
      setSeconds: 0,
      setTimerTitle: ""
    };

    // Bind context of event handlers to this component
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveTimer = this.handleRemoveTimer.bind(this);
  }

  /**
   *  Handle user input
   */
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value // using 'computed property name' syntax to update state property corresponding to given input name
    });
  }

  /**
   *  Add new Timer
   */
  handleSubmit(e) {
    e.preventDefault();

    let { timers, setHours, setMins, setSeconds, setTimerTitle } = this.state;
    let newTimers = timers.slice(); // returns a new array (not reference to array <- we don't want to directly mutate the state -> so make a copy)
    let timerId = Date.now();
    newTimers.push(
      <Timer
        initialHours={setHours}
        initialMinutes={setMins}
        initialSeconds={setSeconds}
        onRemoveTimer={this.handleRemoveTimer}
        timerTitle={setTimerTitle}
        key={timerId} //unique key
        id={timerId}
      />
    );
    // update timers array with new timer and reset input fields
    this.setState({
      timers: newTimers,
      setHours: 0,
      setMins: 0,
      setSeconds: 0,
      setTimerTitle: ""
    });
  }

  /**
   *  Remove existing Timer
   */
  handleRemoveTimer(id) {
    let { timers } = this.state;
    // make a copy of the array
    let newTimers = [...timers];
    // find index of timer element to be removed
    let timerIndex = timers.findIndex(timer => timer.props.id === id);
    // remove the timer from the array copy
    newTimers.splice(timerIndex, 1); // remove element at timerIndex. (1 -> number of elements to remove from specified index)
    // update state with new timers array.
    this.setState({
      timers: newTimers
    });
  }

  render() {
    return (
      <div>
        <div className="createTimerForm">
          <form onSubmit={this.handleSubmit}>
            <label>
              Timer Name:
              <input
                type="text"
                name="setTimerTitle"
                value={this.state.setTimerTitle}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Hours:
              <input
                type="number"
                name="setHours"
                min="0"
                max="23"
                value={this.state.setHours}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Minutes:
              <input
                type="number"
                name="setMins"
                min="0"
                max="59"
                value={this.state.setMins}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Seconds:
              <input
                type="number"
                name="setSeconds"
                min="0"
                max="59"
                value={this.state.setSeconds}
                onChange={this.handleChange}
              />
            </label>
            <button type="submit">Create Timer</button>
          </form>
        </div>
        <div className="timers">{this.state.timers}</div>
      </div>
    );
  }
}

export default TimerList;
