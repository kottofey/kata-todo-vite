import classNames from 'classnames';

import Task from '../Task';

export default function TaskList({
  todoItems,
  onDeleteItem,
  onToggleDone,
  onEditStart,
  onEditComplete,
}) {
  return (
    <ul className='todo-list'>
      {todoItems.map((item) => {
        const { isDone, isEditing, isHidden, created } = item;

        const classes = classNames({
          completed: isDone,
          editing: isEditing,
          hidden: isHidden,
        });

        return (
          <li
            key={created}
            className={classes}
          >
            <Task
              {...item}
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
