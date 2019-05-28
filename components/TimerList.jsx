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

    let newTimers = this.state.timers.slice(); // returns a new array (not reference to array <- we don't want to directly mutate the state -> so make a copy)
    newTimers.push(
      <Timer
        initialHours={this.state.setHours}
        initialMinutes={this.state.setMins}
        initialSeconds={this.state.setSeconds}
        key={Date.now()} //unique key
      />
    );
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
