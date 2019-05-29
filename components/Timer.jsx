import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: props.initialHours,
      mins: props.initialMinutes,
      seconds: props.initialSeconds,
      timerOn: false,
      reset: false
    };
    // Determinc animation duration in seconds
    this.timerBarAnimationStyle = {
      animationDuration: `${props.initialHours * 60 * 60 +
        props.initialMinutes * 60 +
        props.initialSeconds}s`
    };
    // Bind context of event handlers and methods
    this.handlePlayBtnClick = this.handlePlayBtnClick.bind(this);
    this.handleRemoveBtnClick = this.handleRemoveBtnClick.bind(this);
    this.handleResetBtnClick = this.handleResetBtnClick.bind(this);
    this.tick = this.tick.bind(this);
  }

  /**
   *  React Lifecycle Method: Clears any interval set for this Timer instance before it's removed from the DOM
   */
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  /**
   *  Start/Pause the Timer
   */
  handlePlayBtnClick(e) {
    if (this.state.timerOn) {
      clearInterval(this.timerId);
    } else {
      // assign interval's id to a property of this component's instance (not needed to put in state, since it won't be updated)
      this.timerId = setInterval(this.tick, 1000);
    }
    // update btn state
    this.setState({
      timerOn: !this.state.timerOn,
      reset: false
    });
  }

  /**
   * Delete the Timer
   */
  handleRemoveBtnClick() {
    this.props.onRemoveTimer(this.props.id);
  }

  /**
   * Reset the Timer
   */
  handleResetBtnClick() {
    // Stop the timer
    clearInterval(this.timerId);
    // Update state to initially set time
    this.setState({
      hours: this.props.initialHours,
      mins: this.props.initialMinutes,
      seconds: this.props.initialSeconds,
      timerOn: false,
      reset: true
    });
  }

  /**
   *  Update time (called by setInterval() every second)
   */
  tick() {
    let { hours, mins, seconds } = this.state;

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
    // determine if start/stop button should be disabled
    let isDisabled = hours === 0 && mins === 0 && seconds === 0 ? true : false;
    // add 0 prefix for single digits
    hours = hours < 10 ? `0${hours}` : hours;
    mins = mins < 10 ? `0${mins}` : mins;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    // Conditionally render button icon
    let playBtnName = this.state.timerOn ? "⏸" : "▶"; //using emojis for symbols
    // Start/Stop animation (adds css animation property to component)
    let timerBarStyle = "timer-bar";
    timerBarStyle = this.state.timerOn
      ? timerBarStyle + " play-animation"
      : timerBarStyle + " pause-animation";
    // Determine if animation needs to be reset
    timerBarStyle = this.state.reset
      ? timerBarStyle + " reset-animation"
      : timerBarStyle;

    console.log(this);
    return (
      <div className="timer">
        <div style={this.timerBarAnimationStyle} className={timerBarStyle} />
        <div className="timer-content">
          <div className="timer-title">{this.props.timerTitle}</div>
          <div className="time-text">
            {hours}:{mins}:{seconds}
          </div>
          <button
            className="btn start-btn"
            name="playTimerBtn"
            title="Start/Stop Timer"
            onClick={this.handlePlayBtnClick}
            disabled={isDisabled}
          >
            {playBtnName}
          </button>
          <button
            className="btn reset-btn"
            name="resetTimerBtn"
            onClick={this.handleResetBtnClick}
            title="Reset Timer"
          >
            &#x1F501;
          </button>
          <button
            className="btn remove-btn"
            name="removeTimerBtn"
            onClick={this.handleRemoveBtnClick}
            title="Remove Timer"
          >
            &#x274C;
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
