import { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    value: '',
  };

  onNewItemInput = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

  onSubmit = (event) => {
    const { value } = this.state;
    const { onAddItem } = this.props;

    onAddItem(value);

    this.setState({ value: '' });
    event.preventDefault();
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onNewItemInput}
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
        />
      </form>
    );
  }
}
