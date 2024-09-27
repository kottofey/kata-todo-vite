import calcItemKey from '../helpers/calcItemKey';

import Task from './Task';

export default function TaskList({
  todoItems, onDeleted,
  onToggleDone, onEditStart, onEditInput,
  onEditComplete,
}) {
  const items = todoItems.map((item) => {
    let classNames = '';
    if (item.isDone) classNames += ' completed';
    if (item.isEditing) classNames += ' editing';

    return (
      <li
        key={calcItemKey(item)}
        className={classNames}
        hidden={item.hidden}
      >
        <Task
          {...item}
          onDeleted={() => onDeleted(calcItemKey(item))}
          onToggleDone={() => onToggleDone(calcItemKey(item))}
          onEditStart={() => onEditStart(calcItemKey(item))}
          onEditInput={onEditInput}
          onEditComplete={(value) => onEditComplete(value, calcItemKey(item))}
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
