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

    this.animationDurationStyle = {
      animationDuration: `${props.initialHours * 60 * 60 +
        props.initialMinutes * 60 +
        props.initialSeconds}s`
    };

    this.handlePlayBtnClick = this.handlePlayBtnClick.bind(this);
    this.handleRemoveBtnClick = this.handleRemoveBtnClick.bind(this);
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
      timerOn: !this.state.timerOn
    });
  }

  /**
   * Delete the Timer
   */
  handleRemoveBtnClick() {
    this.props.onRemoveTimer(this.props.id);
  }

  /**
   *  Update time (called by setInterval() every second)
   */
  tick() {
    let { hours, mins, seconds } = this.state;
    // console.log(this);
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
    // add 0 prefix
    let { hours, mins, seconds } = this.state;
    hours = hours < 10 ? `0${hours}` : hours;
    mins = mins < 10 ? `0${mins}` : mins;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    // determine animation duration

    // let animationDurationStyle = { animationDuration: timerInSeconds };
    // determine button text
    let playBtnName = this.state.timerOn ? "pause" : "play";
    let timerBarStyle = "timer-bar";
    timerBarStyle = this.state.timerOn
      ? timerBarStyle + " play-animation"
      : timerBarStyle + " pause-animation";
    let isDisabled =
      (hours === 0) & (mins === 0) & (seconds === 0) ? true : false;

    return (
      <div className="timer">
        <div className={timerBarStyle} style={this.animationDurationStyle} />
        <div className="timer-content">
          <div className="timer-title">{this.props.timerTitle}</div>
          <div className="time-text">
            {hours}:{mins}:{seconds}
          </div>
          <button
            className="btn start-btn"
            name="playTimerBtn"
            onClick={this.handlePlayBtnClick}
            disabled={isDisabled}
          >
            {playBtnName}
          </button>
          <button
            className="btn remove-btn"
            name="removeTimerBtn"
            onClick={this.handleRemoveBtnClick}
          >
            remove
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
