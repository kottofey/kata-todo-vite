import './App.css';
import { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import AddButton from '../AddButton';
import createTask from '../../helpers/createTask';
import getItemKey from '../../helpers/getItemKey';

export default class App extends Component {
  state = {
    todoItems: [
      createTask('Сделать раз'),
      createTask('Сделать два'),
      createTask('Сделать три'),
    ],
  };

  deleteItem = (id) => {
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

  addItem = (text) => {
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

  onToggleDone = (id) => {
    const { todoItems } = this.state;

    const idx = todoItems.findIndex((item) => getItemKey(item) === id);
    this.setState(() => {
      const doneItem = { ...todoItems[idx] };
      doneItem.isDone = !doneItem.isDone;

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

  render() {
    const { todoItems } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList
            todoItems={todoItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditing={this.onEditing}
          />
          <Footer />
          <AddButton
            onAdded={this.addItem}
          />

        </section>
      </section>

    );
  }
}
