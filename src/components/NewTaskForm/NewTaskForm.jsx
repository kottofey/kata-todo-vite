import { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    newTask: '',
    minutes: '',
    seconds: '',
  };

  onNewItemInput = (event) => {
    const { value, id } = event.target;

    let newValue = Number.parseInt(value, 10);

    if (id === 'seconds') {
      if (newValue > 60) newValue = 60;
      if (newValue < 0) newValue = 0;
      if (Number.isNaN(newValue)) newValue = '';
    } else {
      newValue = value;
    }

    console.log(id, newValue);
    this.setState({ [id]: newValue });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { newTask, minutes, seconds } = this.state;
    const { onAddItem } = this.props;

    if (!newTask.trim()) {
      return;
    }
    onAddItem(
      newTask,
      Number.parseInt(minutes, 10),
      Number.parseInt(seconds, 10)
    );

    this.setState({ newTask: '', minutes: '', seconds: '' });
  };

  render() {
    const { newTask, minutes, seconds } = this.state;
    return (
      <form
        onSubmit={this.onSubmit}
        className='new-todo-form'
      >
        <input
          onChange={this.onNewItemInput}
          className='new-todo'
          placeholder='Task'
          id='newTask'
          value={newTask}
          autoFocus
        />
        <input
          onChange={this.onNewItemInput}
          className='new-todo-form__timer'
          placeholder='Min'
          id='minutes'
          value={minutes}
          min={0}
          autoFocus
        />
        <input
          onChange={this.onNewItemInput}
          className='new-todo-form__timer'
          placeholder='Sec'
          id='seconds'
          min={0}
          max={60}
          maxLength={2}
          value={seconds}
          autoFocus
        />
        <input
          type='submit'
          hidden
        />
      </form>
    );
  }
}
