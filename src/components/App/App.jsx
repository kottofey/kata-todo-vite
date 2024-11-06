import { useState } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import createTask from '../../helpers/createTask';
import updateTodoItemFiltered from '../../helpers/updateTodoItemFiltered';
import getItemIndex from '../../helpers/getItemIndex';

export default function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [filterSelected, setFilterSelected] = useState('all');

  const onAddItem = (text, minutes, seconds) => {
    let newItem = createTask(text, minutes, seconds);
    newItem = updateTodoItemFiltered(filterSelected, newItem);
    // const newArr = [...todoItems, newItem];

    setTodoItems((prevTodoItems) => [...prevTodoItems, newItem]);
  };

  const onDeleteItem = (id) => {
    const idx = getItemIndex(todoItems, id);
    clearTimeout(todoItems[idx].timerId);

    setTodoItems((prevTodoItems) => [
      ...prevTodoItems.slice(0, idx),
      ...prevTodoItems.slice(idx + 1),
    ]);
  };

  const onClearCompleted = () => {
    setTodoItems((prevTodoItems) =>
      prevTodoItems.filter((item) => !item.isDone)
    );
  };

  const onToggleDone = (id) => {
    const idx = getItemIndex(todoItems, id);

    let doneItem = {
      ...todoItems[idx],
      isDone: !todoItems[idx].isDone,
    };

    doneItem = updateTodoItemFiltered(filterSelected, doneItem);

    setTodoItems((prevTodoItems) => [
      ...prevTodoItems.slice(0, idx),
      doneItem,
      ...prevTodoItems.slice(idx + 1),
    ]);
  };

  const onFilterClick = (filter) => {
    setFilterSelected(filter);
    setTodoItems((prevTodoItems) => {
      return prevTodoItems.map((item) =>
        updateTodoItemFiltered(filter, item)
      );
    });
  };

  const onEditStart = (id) => {
    const idx = getItemIndex(todoItems, id);

    const editItem = {
      ...todoItems[idx],
      isEditing: true,
    };

    setTodoItems((prevTodoItems) => [
      ...prevTodoItems.slice(0, idx),
      editItem,
      ...prevTodoItems.slice(idx + 1),
    ]);
  };

  const onEditComplete = (value, id) => {
    const idx = getItemIndex(todoItems, id);
    let editItem = {
      ...todoItems[idx],
      description: value,
      isEditing: false,
    };

    editItem = updateTodoItemFiltered(filterSelected, editItem);

    setTodoItems((prevTodoItems) => [
      ...prevTodoItems.slice(0, idx),
      editItem,
      ...prevTodoItems.slice(idx + 1),
    ]);
  };

  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <NewTaskForm onAddItem={onAddItem} />
      </header>
      <section className='main'>
        <TaskList
          todoItems={todoItems}
          onDeleteItem={onDeleteItem}
          onToggleDone={onToggleDone}
          onEditStart={onEditStart}
          onEditComplete={onEditComplete}
        />
        <Footer
          onFilterClick={onFilterClick}
          onClearCompleted={onClearCompleted}
          filterSelected={filterSelected}
          itemsLeft={todoItems.filter((item) => !item.isDone).length}
        />
      </section>
    </section>
  );
}
