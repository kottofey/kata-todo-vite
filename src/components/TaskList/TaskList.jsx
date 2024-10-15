import { PropTypes } from 'prop-types';
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
        const { isDone, isEditing, hidden, created } = item;

        if (hidden) return false;

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
