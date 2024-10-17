import { formatDistance } from 'date-fns';
import { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Task extends Component {
  state = {
    value: this.props.description,
  };

  onEditInput = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };

  onSubmit = (e) => {
    const { onEditComplete } = this.props;
    const { value } = this.state;

    e.preventDefault();

    if (!value.trim()) {
      return;
    }
    onEditComplete(value);
  };

  render() {
    const {
      description,
      created,
      onDeleteItem,
      onToggleDone,
      onEditStart,
      isDone,
      isEditing,
      minutes,
      seconds,
    } = this.props;

    const { value } = this.state;

    return (
      <>
        <div className='view'>
          <input
            id={created}
            className='toggle'
            type='checkbox'
            defaultChecked={isDone}
            onClick={onToggleDone}
          />
          <label htmlFor={created}>
            <span className='title'>{description}</span>
            <Timer
              minutes={minutes}
              seconds={seconds}
            />
            <span className='description'>
              {formatDistance(created, Date.now(), {
                includeSeconds: true,
                addSuffix: true,
              })}
            </span>
          </label>
          <button
            type='button'
            className='icon icon-edit'
            onClick={onEditStart}
          />
          <button
            type='button'
            className='icon icon-destroy'
            onClick={onDeleteItem}
          />
        </div>
        {isEditing && (
          <form
            id={`edit-${created}`}
            onSubmit={this.onSubmit}
            hidden
          />
        )}
        <input
          onChange={this.onEditInput}
          className='edit'
          value={value}
          form={`edit-${created}`}
        />
      </>
    );
  }
}

class Timer extends Component {
  state = {};

  componentDidMount() {
    const { minutes, seconds } = this.props;
    // const timerId = setInterval(() => {}, 0);
    this.setState({ minutes, seconds });
  }

  componentDidUpdate(prevProps, prevState) {
    const { timerId: prevTimerId, isPaused: prevIsPaused } =
      prevState;

    const { timerId, seconds, minutes, isPaused } = this.state;

    if (prevTimerId !== timerId && !prevIsPaused) {
      clearTimeout(prevTimerId);

      let newTimerId = setTimeout(() => {
        let newIsPaused = isPaused;
        let newMinutes = minutes;
        let newSeconds = seconds - 1;

        if (newSeconds === -1) {
          newMinutes = minutes - 1;
          newSeconds = 59;
        }

        if (newMinutes === 0 && newSeconds === 1) {
          newTimerId = undefined;
          newIsPaused = true;
        }

        this.setState({
          minutes: newMinutes,
          seconds: newSeconds,
          timerId: newTimerId,
          isPaused: newIsPaused,
        });
      }, 1000);
    }
  }

  onTimerStart = (e) => {
    e.preventDefault();

    const newTimerId = setTimeout(() => {
      this.setState({
        timerId: newTimerId,
        isPaused: false,
      });
    }, 0);
  };

  onTimerPause = (e) => {
    e.preventDefault();

    const { timerId } = this.state;

    clearTimeout(timerId);
    this.setState({ isPaused: true });
  };

  render() {
    const { minutes, seconds } = this.state;

    return (
      <span className='description'>
        <button
          className='icon icon-play'
          type='button'
          onClick={(e) => this.onTimerStart(e)}
        />
        <button
          className='icon icon-pause'
          type='button'
          onClick={(e) => this.onTimerPause(e)}
        />
        {minutes}:{seconds}
      </span>
    );
  }
}

Task.defaultProps = {
  description: 'Default Task, something\u0039s w\u0039ong',
  created: new Date().getTime(),
  isDone: false,
};

Task.propTypes = {
  description: PropTypes.string,
  created: PropTypes.number,
  isDone: PropTypes.bool,
};
