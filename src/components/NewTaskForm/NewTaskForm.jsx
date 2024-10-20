import { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    newTask: '',
    minutes: '',
    seconds: '',
  };

  onNewItemInput = (event) => {
    const { value, id } = event.target;

    this.setState({ [id]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { newTask, minutes, seconds } = this.state;
    const { onAddItem } = this.props;

    if (!newTask.trim()) {
      return;
    }

    onAddItem(newTask, minutes, seconds);
    this.newTaskRef.focus();

    this.setState({
      newTask: '',
      minutes: '',
      seconds: '',
    });
  };

  render() {
    const { newTask, minutes, seconds } = this.state;
    return (
      <form
        onSubmit={this.onSubmit}
        className='new-todo-form'
      >
        <input
          ref={(newTaskRef) => (this.newTaskRef = newTaskRef)}
          onChange={this.onNewItemInput}
          className='new-todo'
          placeholder='Task'
          id='newTask'
          value={newTask}
          autoFocus
          autoComplete='off'
          required
        />
        <input
          onChange={this.onNewItemInput}
          className='new-todo-form__timer'
          placeholder='Min'
          type='number'
          id='minutes'
          value={minutes}
          min={0}
          autoComplete='off'
          required
        />
        <input
          onChange={this.onNewItemInput}
          className='new-todo-form__timer'
          placeholder='Sec'
          type='number'
          id='seconds'
          min={0}
          max={59}
          maxLength={2}
          value={seconds}
          autoComplete='off'
          required
        />
        <button
          type='submit'
          hidden
        />
      </form>
    );
  }
}
