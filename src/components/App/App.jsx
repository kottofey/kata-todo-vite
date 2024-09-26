import './App.css';
import { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import AddButton from '../AddButton';
import createTask from '../../helpers/createTask';
import updateTodoItemFiltered from '../../helpers/updateTodoItemFiltered';
import getItemIndexById from '../../helpers/getItemIndexById';

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
      const idx = getItemIndexById(todoItems, id);

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
    this.setState(({ todoItems }) => ({ todoItems: todoItems.filter((item) => !item.isDone) }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoItems, filterSelected }) => {
      const idx = getItemIndexById(todoItems, id);

      let doneItem = {
        ...todoItems[idx],
        isDone: !todoItems[idx].isDone,
      };

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
    this.setState(({ todoItems }) => {
      const idx = getItemIndexById(todoItems, id);

      const doneItem = {
        ...todoItems[idx],
        isEditing: !todoItems[idx].isEditing,
      };
      // TODO не забыть вернуть isDone = true, когда закончится правка элемента
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
