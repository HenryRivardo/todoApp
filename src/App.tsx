import React from 'react';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';

import './scss/globals.scss';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <Header />
      <AddTodo />
      <TodoList />
    </div>
  );
};
console.log('Base URL (from App):', import.meta.env.VITE_BASE_API_URL);
console.log('API Key (from App):', import.meta.env.VITE_PRIVATE_API_KEY);

export default App;
