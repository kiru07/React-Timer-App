import React from "react";
import Timer from "./Timer";

class TimerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timers: [],
      setHours: 0,
      setMins: 0,
      setSeconds: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveTimer = this.handleRemoveTimer.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let { timers, setHours, setMins, setSeconds } = this.state;
    let newTimers = timers.slice(); // returns a new array (not reference to array <- we don't want to directly mutate the state -> so make a copy)
    let timerId = Date.now();
    newTimers.push(
      <Timer
        initialHours={setHours}
        initialMinutes={setMins}
        initialSeconds={setSeconds}
        onRemoveTimer={this.handleRemoveTimer}
        key={timerId} //unique key
        id={timerId}
      />
    );
    this.setState({
      timers: newTimers
    });
  }

  handleRemoveTimer(id) {
    console.log(this);
    let { timers } = this.state;
    let timerIndex = timers.findIndex(timer => timer.id === id);
    let newTimers = timers.slice(timerIndex, timerIndex + 1); // slice(begin, end) (not including end)
    this.setState({
      timers: newTimers
    });
  }

  render() {
    return (
      <div>
        <div className="createTimer" onSubmit={this.handleSubmit}>
          <form>
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
