import { useRef, useState } from 'react';

export default function NewTaskForm({ onAddItem }) {
  const [newTask, setNewTask] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const newTaskRef = useRef(null);

  const onNewItemInput = (event) => {
    const { value, id } = event.target;

    if (id === 'newTask') setNewTask(value);
    if (id === 'minutes') setMinutes(value);
    if (id === 'seconds') setSeconds(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!newTask.trim()) {
      return;
    }

    onAddItem(newTask, minutes, seconds);
    newTaskRef.current.focus();

    setNewTask('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className='new-todo-form'
    >
      <input
        ref={newTaskRef}
        onChange={onNewItemInput}
        className='new-todo'
        placeholder='Task'
        id='newTask'
        value={newTask}
        autoFocus
        autoComplete='off'
        required
      />
      <input
        onChange={onNewItemInput}
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
        onChange={onNewItemInput}
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
