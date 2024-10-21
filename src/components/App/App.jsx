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
    filterSelected: 'all',
  };

  onAddItem = (text, minutes, seconds) => {
    this.setState(({ todoItems, filterSelected }) => {
      let newItem = createTask(text, minutes, seconds);
      newItem = updateTodoItemFiltered(filterSelected, newItem);
      const newArr = [...todoItems, newItem];

      return {
        todoItems: newArr,
      };
    });
  };

  onDeleteItem = (id) => {
    this.setState(({ todoItems }) => {
      const idx = getItemIndex(todoItems, id);
      clearTimeout(todoItems[idx].timerId);

      return {
        todoItems: [
          ...todoItems.slice(0, idx),
          ...todoItems.slice(idx + 1),
        ],
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

      doneItem = updateTodoItemFiltered(filterSelected, doneItem);

      return {
        todoItems: [
          ...todoItems.slice(0, idx),
          doneItem,
          ...todoItems.slice(idx + 1),
        ],
      };
    });
  };

  onFilterClick = (filter) => {
    this.setState(({ todoItems }) => {
      const filteredArray = todoItems.map((item) =>
        updateTodoItemFiltered(filter, item)
      );

      return {
        filterSelected: filter,
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
        todoItems: [
          ...todoItems.slice(0, idx),
          editItem,
          ...todoItems.slice(idx + 1),
        ],
        editItems: newEditItems,
      };
    });
  };

  onEditComplete = (value, id) => {
    this.setState(({ todoItems, filterSelected }) => {
      const idx = getItemIndex(todoItems, id);
      let editItem = {
        ...todoItems[idx],
        description: value,
        isEditing: false,
      };

      editItem = updateTodoItemFiltered(filterSelected, editItem);

      const newArr = [
        ...todoItems.slice(0, idx),
        editItem,
        ...todoItems.slice(idx + 1),
      ];

      return {
        todoItems: newArr,
      };
    });
  };

  onTimerStart = (itemId) => {
    const { todoItems } = this.state;

    const idx = getItemIndex(todoItems, itemId);
    const { minutes, seconds } = todoItems[idx];

    const timerId = setTimeout(() => {
      this.timerTick(itemId, minutes, seconds, timerId);
    }, 1000);

    this.updateTimer(itemId, minutes, seconds, timerId);
  };

  onTimerPause = (itemId) => {
    const { todoItems } = this.state;

    const idx = getItemIndex(todoItems, itemId);
    const { timerId, minutes, seconds } = todoItems[idx];

    clearTimeout(timerId);

    this.updateTimer(itemId, minutes, seconds, null);
  };

  timerTick = (itemId, minutes, seconds, timerId) => {
    clearTimeout(timerId);

    let newMinutes = minutes;
    let newSeconds = seconds - 1;

    if (newSeconds === -1) {
      newMinutes = minutes - 1;
      newSeconds = 59;
    }

    if (newMinutes === 0 && newSeconds === 0) {
      this.updateTimer(itemId, newMinutes, newSeconds, timerId);
      return;
    }

    const newTimerId = setTimeout(() => {
      this.timerTick(itemId, newMinutes, newSeconds, newTimerId);
    }, 1000);
    this.updateTimer(itemId, newMinutes, newSeconds, newTimerId);
  };

  updateTimer = (itemId, minutes, seconds, timerId) => {
    this.setState(({ todoItems }) => {
      const idx = getItemIndex(todoItems, itemId);
      let item = todoItems[idx];

      item = {
        ...item,
        minutes,
        seconds,
        timerId,
      };

      return {
        todoItems: [
          ...todoItems.slice(0, idx),
          item,
          ...todoItems.slice(idx + 1),
        ],
      };
    });
  };

  render() {
    const { todoItems, filterSelected } = this.state;

    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <NewTaskForm onAddItem={this.onAddItem} />
        </header>
        <section className='main'>
          <TaskList
            todoItems={todoItems}
            onTimerStart={this.onTimerStart}
            onTimerPause={this.onTimerPause}
            onDeleteItem={this.onDeleteItem}
            onToggleDone={this.onToggleDone}
            onEditStart={this.onEditStart}
            onEditComplete={this.onEditComplete}
          />
          <Footer
            onFilterClick={this.onFilterClick}
            onClearCompleted={this.onClearCompleted}
            filterSelected={filterSelected}
            itemsLeft={
              todoItems.filter((item) => !item.isDone).length
            }
          />
        </section>
      </section>
    );
  }
}
