// src/App.tsx
import React from 'react';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
// src/main.tsx
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

export default App;
