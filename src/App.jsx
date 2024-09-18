import './App.css';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

const todoItems = [
  {
    taskState: 'done', description: 'DONE!', created: '09-19-2024 01:24:00',
  },
  {
    taskState: 'editing', description: 'Editing', created: '11-12-2024 12:00',
  },
  {
    taskState: 'active', description: 'To be done...', created: '9-12-2024 12:00',
  },
];

function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todoItems={todoItems} />
        <Footer />
      </section>
    </section>
  );
}

export default App;
