import reducedHash from '../helpers/reducedHash';

import Task from './Task';

function reducedHash(str) {

function TaskList({ todoItems }) {
  const items = todoItems.map((item) => (
    <li key={reducedHash(item.description)} className={item.taskState}>
      <Task props={item} />
    </li>
  ));

  return (
    <ul className="todo-list">
      {items}
    </ul>
  );
}

export default TaskList;
