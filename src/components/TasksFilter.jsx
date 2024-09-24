import { Component } from 'react';

export default class TasksFilter extends Component {
  state = {

  };

  render() {
    return (
      <ul className="filters">
        <li>
          <button type="button" className="selected">All</button>
        </li>
        <li>
          <button type="button">Active</button>
        </li>
        <li>
          <button type="button">Completed</button>
        </li>
      </ul>
    );
  }
}
