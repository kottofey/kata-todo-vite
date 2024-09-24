import reducedHash from '../helpers/reducedHash';

import Task from './Task';

export default function TaskList({ todoItems, onDeleted }) {
  const items = todoItems.map((item) => (
    <li key={reducedHash(item.description)} className={item.taskState}>
      <Task
        {...item}
        onDeleted={() => onDeleted(reducedHash(item.description))}
      />
    </li>
  ));

  return (
    <ul className="todo-list">
      {items}
    </ul>
  );
}
