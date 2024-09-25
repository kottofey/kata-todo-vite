import './App.css';
import { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import AddButton from '../AddButton';
import createTask from '../../helpers/createTask';
import getItemKey from '../../helpers/getItemKey';
import updateTodoItemFiltered from '../../helpers/updateTodoItemFiltered';

export default class App extends Component {
  state = {
    todoItems: [
      createTask('Сделать раз'),
      createTask('Сделать два'),
      createTask('Сделать три'),
    ],
    filterSelected: {
      current: 'all',
      all: 'selected',
      active: 'no',
      completed: 'nooo',
    },
  };

  onDeleteItem = (id) => {
    this.setState(({ todoItems }) => {
      const idx = todoItems.findIndex((item) => getItemKey(item) === id);

      return {
        todoItems: [
          ...todoItems.slice(0, idx),
          ...todoItems.slice(idx + 1),
        ],
      };
    });
  };

  onAddItem = (text) => {
    const newItem = createTask(`${text} ${(new Date()).getMilliseconds()}`);

    this.setState(({ todoItems }) => {
      const newArr = [
        ...todoItems,
        newItem,
      ];

      return {
        todoItems: newArr,
      };
    });
  };

  onClearCompleted = () => {
    const { todoItems } = this.state;
    this.setState(() => ({ todoItems: todoItems.filter((item) => !item.isDone) }));
  };

  onToggleDone = (id) => {
    const { todoItems, filterSelected } = this.state;

    const idx = todoItems.findIndex((item) => getItemKey(item) === id);
    this.setState(() => {
      let doneItem = { ...todoItems[idx] };
      doneItem.isDone = !doneItem.isDone;

      doneItem = updateTodoItemFiltered(filterSelected.current, doneItem);

      return {
        todoItems: [
          ...todoItems.slice(0, idx),
          doneItem,
          ...todoItems.slice(idx + 1),
        ],
      };
    });
  };

  onEditing = (id) => {
    const { todoItems } = this.state;

    const idx = todoItems.findIndex((item) => getItemKey(item) === id);
    this.setState(() => {
      const doneItem = { ...todoItems[idx] };
      doneItem.isEditing = !doneItem.isEditing;
      doneItem.isDone = false;

      return {
        todoItems: [
          ...todoItems.slice(0, idx),
          doneItem,
          ...todoItems.slice(idx + 1),
        ],
      };
    });
  };

  onFilterClick = (filterId) => {
    const { todoItems } = this.state;

    const filteredArray = todoItems.map((item) => updateTodoItemFiltered(filterId, item));

    this.setState(() => ({
      filterSelected: {
        [filterId]: 'selected',
        current: filterId,
      },
      todoItems: filteredArray,
    }));
  };

  render() {
    const { todoItems, filterSelected } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList
            todoItems={todoItems}
            onDeleted={this.onDeleteItem}
            onToggleDone={this.onToggleDone}
            onEditing={this.onEditing}
          />
          <Footer
            onFilterClick={this.onFilterClick}
            onClearCompleted={this.onClearCompleted}
            filterSelected={filterSelected}
            itemsLeft={todoItems.filter((item) => !item.isDone).length}
          />
          <AddButton
            onAdded={this.onAddItem}
          />

        </section>
      </section>

    );
  }
}
