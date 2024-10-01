import { PropTypes } from 'prop-types';
import classNames from 'classnames';

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
    const { isDone, isEditing } = item;
    let classes = '';
    if (isDone) classes = classNames(classes, 'completed');
    if (isEditing) classes = classNames(classes, 'editing');

    return (
      <li
        key={item.created}
        className={classes}
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
