import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: props.initialHours,
      mins: props.initialMinutes,
      seconds: props.initialSeconds,
      timerOn: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleClick(e) {
    if (this.state.timerOn) {
      clearInterval(this.timerId);
    } else {
      // assign interval's id to a property of this component's instance (not needed to put in state, since it won't be updated)
      this.timerId = setInterval(this.tick, 1000);
    }
    // update btn state
    this.setState({
      timerOn: !this.state.timerOn
    });
  }

  // Called by setInterval every second
  tick() {
    let { hours, mins, seconds } = this.state;
    console.log(this);
    if (seconds > 0) {
      this.setState((state, props) => ({
        seconds: --state.seconds
      }));
    } else {
      if (mins > 0) {
        this.setState((state, props) => ({
          mins: --state.mins,
          seconds: 59
        }));
      } else {
        if (hours > 0) {
          this.setState((state, props) => ({
            hours: --state.hours,
            mins: 59,
            seconds: 59
          }));
        } else {
          clearInterval(this.timerId);
          this.setState((state, props) => ({
            timerOn: false
          }));
        }
      }
    }
  }

  render() {
    let { hours, mins, seconds } = this.state;
    let btnName = this.state.timerOn ? "pause" : "play";
    let isDisabled =
      (hours === 0) & (mins === 0) & (seconds === 0) ? true : false;
    return (
      <div>
        <div className="time">
          {hours}:{mins}:{seconds}
        </div>
        <button
          value={btnName}
          onClick={this.handleClick}
          disabled={isDisabled}
        >
          {btnName}
        </button>
      </div>
    );
  }
}

export default Timer;
