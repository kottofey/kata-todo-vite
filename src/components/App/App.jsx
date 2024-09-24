import './App.css';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

const todoItems = [
  { taskState: 'done', description: 'DONE!', created: '09-19-2024 01:24:00' },
  { taskState: 'editing', description: 'Editing', created: '11-12-2024 12:00' },
  { taskState: 'active', description: 'To be done...', created: '9-12-2024 12:00' },
  { description: 'No default state task', created: '9-12-2024 12:00' },
];

export default function App() {
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
