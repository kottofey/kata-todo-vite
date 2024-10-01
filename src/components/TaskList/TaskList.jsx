import { PropTypes } from 'prop-types';

import Task from '../Task';

export default function TaskList({
  todoItems,
  onDeleteItem,
  onToggleDone,
  onEditStart,
  onEditInput,
  onEditComplete,
}) {
  const items = todoItems.map((item) => {
    let classNames = '';
    if (item.isDone) classNames += 'completed';
    if (item.isEditing) classNames += ' editing';

    return (
      <li
        key={item.created}
        className={classNames}
        hidden={item.hidden}
      >
        <Task
          {...item}
          onDeleteItem={() => onDeleteItem(item.created)}
          onToggleDone={() => onToggleDone(item.created)}
          onEditStart={() => onEditStart(item.created)}
          onEditInput={onEditInput}
          onEditComplete={(value) =>
            onEditComplete(value, item.created)
          }
        />
      </li>
    );
  });

  return <ul className='todo-list'>{items}</ul>;
}

// defaultProps is deprecated, used for training only
TaskList.defaultProps = {
  todoItems: [],
};

TaskList.propTypes = {
  todoItems: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      created: PropTypes.number,
      isDone: PropTypes.bool,
      isEditing: PropTypes.bool,
    })
  ),
};
