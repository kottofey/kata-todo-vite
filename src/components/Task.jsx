import { formatDistance } from 'date-fns';
import { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Task extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.description,
  };

  onEditInput = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };

  onSubmit = (e) => {
    const { onEditComplete } = this.props;
    const { value } = this.state;

    if (!value.trim()) {
      e.preventDefault();
      return;
    }

    onEditComplete(value);
    e.preventDefault();
  };

  render() {
    const { description, created, onDeleted, onToggleDone, onEditStart, isEditing, isDone } = this.props;

    const { value } = this.state;

    const editField = (
      <>
        <form
          onSubmit={this.onSubmit}
          id='edit-form'
          hidden
        />
        <input
          onChange={this.onEditInput}
          className='edit'
          value={value}
          form='edit-form'
        />
      </>
    );

    return (
      <>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            defaultChecked={isDone}
            onClick={onToggleDone}
          />
          <label>
            <span className='description'>{description}</span>
            <span className='created'>
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
            onClick={onDeleted}
          />
        </div>
        {isEditing ? editField : false}
      </>
    );
  }
}

Task.defaultProps = {
  // eslint-disable-next-line prettier/prettier
  description: 'Default Task, something\'s w\'ong',
  created: Date.now(),
  isDone: false,
  isEditing: false,
};

Task.propTypes = {
  description: PropTypes.string,
  created: PropTypes.instanceOf(Date),
  isDone: PropTypes.bool,
  isEditing: PropTypes.bool,
};
