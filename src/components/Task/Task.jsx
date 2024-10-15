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

Task.defaultProps = {
  description: 'Default Task, something\u0039s w\u0039ong',
  minutes: null,
  seconds: null,
  created: new Date().getTime(),
  isDone: false,
};

Task.propTypes = {
  description: PropTypes.string,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  created: PropTypes.number,
  isDone: PropTypes.bool,
};
