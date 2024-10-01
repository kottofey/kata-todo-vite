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
    // TODO Вынести форму editForm в return самый конец.
    //  Стили её правильно обрабатывают, не нужно городить
    //  велосипеды с тернарными операторами итд
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
            id={Date.parse(created) + description}
            className='toggle'
            type='checkbox'
            defaultChecked={isDone}
            onClick={onToggleDone}
          />
          <label htmlFor={Date.parse(created) + description}>
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
  description: 'Default Task, something\u0039s w\u0039ong',
  created: Date.now(),
  isDone: false,
  isEditing: false,
};

Task.propTypes = {
  description: PropTypes.string,
  created: PropTypes.number,
  isDone: PropTypes.bool,
  isEditing: PropTypes.bool,
};
