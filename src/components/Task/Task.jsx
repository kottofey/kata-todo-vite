import { formatDistance } from 'date-fns';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

import Timer from '../Timer';

export default function Task({
  description,
  created,
  onDeleteItem,
  onToggleDone,
  onEditStart,
  isDone,
  isEditing,
  minutes,
  seconds,
  onTimerStart,
  onTimerPause,
  onEditComplete,
}) {
  const [value, setValue] = useState(description);

  const onEditInput = (e) => {
    const { value: editValue } = e.target;
    setValue(editValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) {
      return;
    }
    onEditComplete(value);
  };

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
            onTimerStart={onTimerStart}
            onTimerPause={onTimerPause}
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
          onSubmit={onSubmit}
          hidden
        />
      )}
      <input
        onChange={onEditInput}
        className='edit'
        value={value}
        form={`edit-${created}`}
      />
    </>
  );
}

// Task.defaultProps = {
//   description: 'Something wong',
//   created: new Date().getTime(),
//   minutes: 0,
//   seconds: 0,
//   isDone: false,
//   isEditing: false,
// };
//
// Task.propTypes = {
//   description: PropTypes.string,
//   created: PropTypes.number,
//   minutes: PropTypes.number,
//   seconds: PropTypes.number,
//   isDone: PropTypes.bool,
//   isEditing: PropTypes.bool,
// };
