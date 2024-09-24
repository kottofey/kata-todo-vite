import getItemKey from '../helpers/getItemKey';

import Task from './Task';

export default function TaskList({
  todoItems, onDeleted,
  onToggleDone, onEditing,
}) {
  const items = todoItems.map((item) => {
    let classNames = '';
    if (item.isDone) classNames += 'completed';
    if (item.isEditing) classNames += 'editing';

    return (
      <li key={getItemKey(item)} className={classNames}>
        <Task
          {...item}
          onDeleted={() => onDeleted(getItemKey(item))}
          onToggleDone={() => onToggleDone(getItemKey(item))}
          onEditing={() => onEditing(getItemKey(item))}
        />
      </li>
    );
  });

  return (
    <ul className="todo-list">
      {items}
    </ul>
  );
}
