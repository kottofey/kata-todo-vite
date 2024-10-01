import { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import createTask from '../../helpers/createTask';
import updateTodoItemFiltered from '../../helpers/updateTodoItemFiltered';
import getItemIndexByKey from '../../helpers/getItemIndexByKey';

export default class App extends Component {
  state = {
    todoItems: [createTask('Сделать раз'), createTask('Сделать два'), createTask('Сделать три')],
    filterSelected: {
      current: 'all',
      all: 'selected',
      active: 'oh no',
      completed: 'nooo-no-nooooooo',
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

  onDeleteItem = (key) => {
    this.setState(({ todoItems }) => {
      const idx = getItemIndexByKey(todoItems, key);

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

  onToggleDone = (key) => {
    this.setState(({ todoItems, filterSelected }) => {
      const idx = getItemIndexByKey(todoItems, key);

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

  onEditStart = (key) => {
    this.setState(({ todoItems, editItems }) => {
      const idx = getItemIndexByKey(todoItems, key);

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

  onEditComplete = (value, key) => {
    this.setState(({ todoItems, filterSelected }) => {
      const idx = getItemIndexByKey(todoItems, key);
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
            onDeleted={this.onDeleteItem}
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
