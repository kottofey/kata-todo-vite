import { Component } from 'react';

export default class FilterItem extends Component {
  state = {
    // selected: false,
  };

  render() {
    let classNames = '';
    const { isSelected, label, onFilterSelected } = this.props;

    if (isSelected) { classNames = 'selected'; }
    return (
      <li>
        <button
          type="button"
          className={classNames}
          onClick={onFilterSelected}
        >
          {label}
        </button>
      </li>
    );
  }
}
