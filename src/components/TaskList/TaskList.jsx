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
  return (
    <ul className='todo-list'>
      {todoItems.map((item) => {
        if (item.hidden) return false;

        const { isDone, isEditing } = item;

        const classes = classNames({
          completed: isDone,
          editing: isEditing,
        });

        return (
          <li
            key={item.created}
            className={classes}
          >
            <Task
              {...item}
              onDeleteItem={() => onDeleteItem(item.created)}
              onToggleDone={() => onToggleDone(item.created)}
              onEditStart={() => onEditStart(item.created)}
              onEditComplete={(value) =>
                onEditComplete(value, item.created)
              }
            />
          </li>
        );
      })}
    </ul>
  );
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
