export default function TasksFilter({ onFilterClick, filterSelected }) {
  return (
    <ul className='filters'>
      <li>
        <button
          type='button'
          onClick={() => onFilterClick('all')}
          className={filterSelected.all}
        >
          All
        </button>
      </li>
      <li>
        <button
          type='button'
          onClick={() => onFilterClick('active')}
          className={filterSelected.active}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type='button'
          onClick={() => onFilterClick('completed')}
          className={filterSelected.completed}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
