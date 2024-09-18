import Task from './Task';

function TaskList({ todoItems }) {
  const items = todoItems.map((item) => {
    const { key, ...restProps } = item;
    return (
      <li key={key} className={item.taskState}>
        <Task props={{ ...restProps }} />
      </li>
    );
  });

  return (
    <ul className="todo-list">
      {items}
    </ul>
  );
}

export default TaskList;
