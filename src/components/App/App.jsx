import { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import createTask from '../../helpers/createTask';
import updateTodoItemFiltered from '../../helpers/updateTodoItemFiltered';
import getItemIndex from '../../helpers/getItemIndex';

export default class App extends Component {
  state = {
    todoItems: [],
    filterSelected: {
      current: 'all',
      all: 'selected',
      active: '',
      completed: '',
    },
  };

  onAddItem = (text) => {
    this.setState(({ todoItems, filterSelected }) => {
      let newItem = createTask(text);
      newItem = updateTodoItemFiltered(filterSelected.current, newItem);
      const newArr = [...todoItems, newItem];

      return {
        todoItems: newArr,
      };
    });
  };

  onDeleteItem = (id) => {
    this.setState(({ todoItems }) => {
      const idx = getItemIndex(todoItems, id);

      return {
        todoItems: [...todoItems.slice(0, idx), ...todoItems.slice(idx + 1)],
      };
    });
  };

  onClearCompleted = () => {
    this.setState(({ todoItems }) => ({
      todoItems: todoItems.filter((item) => !item.isDone),
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoItems, filterSelected }) => {
      const idx = getItemIndex(todoItems, id);

      let doneItem = {
        ...todoItems[idx],
        isDone: !todoItems[idx].isDone,
      };

      doneItem = updateTodoItemFiltered(filterSelected.current, doneItem);

      return {
        todoItems: [...todoItems.slice(0, idx), doneItem, ...todoItems.slice(idx + 1)],
      };
    });
  };

  onFilterClick = (filterId) => {
    this.setState(({ todoItems }) => {
      const filteredArray = todoItems.map((item) => updateTodoItemFiltered(filterId, item));

      return {
        filterSelected: {
          [filterId]: 'selected',
          current: filterId,
        },
        todoItems: filteredArray,
      };
    });
  };

  onEditStart = (id) => {
    this.setState(({ todoItems, editItems }) => {
      const idx = getItemIndex(todoItems, id);

      const editItem = {
        ...todoItems[idx],
        isEditing: true,
      };
      const newEditItems = {
        ...editItems,
        [idx]: editItem.description,
      };

      return {
        todoItems: [...todoItems.slice(0, idx), editItem, ...todoItems.slice(idx + 1)],
        editItems: newEditItems,
      };
    });
  };

  onEditComplete = (value, id) => {
    this.setState(({ todoItems, filterSelected }) => {
      const idx = getItemIndex(todoItems, id);
      let editItem = { ...todoItems[idx], description: value };
      editItem.isEditing = false;
      editItem = updateTodoItemFiltered(filterSelected.current, editItem);

      const newArr = [...todoItems.slice(0, idx), editItem, ...todoItems.slice(idx + 1)];

      return {
        todoItems: newArr,
      };
    });
  };

  render() {
    const { todoItems, filterSelected } = this.state;

    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <NewTaskForm
            onAddItem={this.onAddItem}
            filterId={filterSelected.current}
          />
        </header>
        <section className='main'>
          <TaskList
            todoItems={todoItems}
            onDeleteItem={this.onDeleteItem}
            onToggleDone={this.onToggleDone}
            onEditStart={this.onEditStart}
            onEditComplete={this.onEditComplete}
          />
          <Footer
            onFilterClick={this.onFilterClick}
            onClearCompleted={this.onClearCompleted}
            filterSelected={filterSelected}
            itemsLeft={todoItems.filter((item) => !item.isDone).length}
          />
        </section>
      </section>
    );
  }
}
