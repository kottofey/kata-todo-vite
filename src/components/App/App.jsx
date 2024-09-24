import './App.css';
import { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import reducedHash from '../../helpers/reducedHash';

export default class App extends Component {
  state = {
    todoItems: [
      { taskState: 'done', description: 'DONE!', created: '09-19-2024 01:24:00' },
      // { taskState: 'editing', description: 'Editing', created: '11-12-2024 12:00' },
      { taskState: 'active', description: 'To be done...', created: '9-12-2024 12:00' },
      { description: 'No defined taskState task', created: '1-12-2024 12:00' },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ todoItems }) => {
      const idx = todoItems.findIndex((item) => reducedHash(item.created) === id);

      return {
        todoItems: [
          ...todoItems.slice(0, idx),
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
          />
          <Footer />
        </section>
      </section>
    );
  }
}
