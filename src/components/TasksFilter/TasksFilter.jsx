export default function TasksFilter({ onFilterClick, filterSelected }) {
  return (
    <ul className='filters'>
      <li>
        <button
          type='button'
          onClick={() => onFilterClick('all')}
          className={filterSelected === 'all' ? 'selected' : ''}
        >
          All
        </button>
      </li>
      <li>
        <button
          type='button'
          onClick={() => onFilterClick('active')}
          className={filterSelected === 'active' ? 'selected' : ''}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type='button'
          onClick={() => onFilterClick('completed')}
          className={filterSelected === 'completed' ? 'selected' : ''}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
