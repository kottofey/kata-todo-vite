import classNames from 'classnames';

import Task from '../Task';

export default function TaskList({
  todoItems,
  onTimerStart,
  onTimerPause,
  onDeleteItem,
  onToggleDone,
  onEditStart,
  onEditComplete,
}) {
  return (
    <ul className='todo-list'>
      {todoItems.map((item) => {
        const { isDone, isEditing, isHidden, created } = item;

        if (isHidden) return false;

        const classes = classNames({
          completed: isDone,
          editing: isEditing,
        });

        return (
          <li
            key={created}
            className={classes}
          >
            <Task
              {...item}
              onTimerStart={() => onTimerStart(created)}
              onTimerPause={() => onTimerPause(created)}
              onDeleteItem={() => onDeleteItem(created)}
              onToggleDone={() => onToggleDone(created)}
              onEditStart={() => onEditStart(created)}
              onEditComplete={(value) =>
                onEditComplete(value, created)
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
