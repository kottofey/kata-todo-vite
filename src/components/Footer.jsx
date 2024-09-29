import TasksFilter from './TasksFilter';

export default function Footer({ onFilterClick, filterSelected, onClearCompleted, itemsLeft }) {
  return (
    <footer className='footer'>
      <span className='todo-count'>{`${itemsLeft} items left`}</span>
      <TasksFilter
        onFilterClick={onFilterClick}
        filterSelected={filterSelected}
      />
      <button
        type='button'
        className='clear-completed'
        onClick={() => onClearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
}
