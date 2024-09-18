import Task from './Task';

function reducedHash(str) {
  // eslint-disable-next-line no-bitwise
  return str.split('').reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0);
}

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
