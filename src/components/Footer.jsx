import TasksFilter from './TasksFilter';

function Footer() {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TasksFilter />
      <button type="button" className="clear-completed">Clear completed</button>
    </footer>
  );
}

export default Footer;
