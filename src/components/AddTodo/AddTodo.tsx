import React, { useState } from 'react';
import { useAddTodo } from '../../hooks/useTodos';
import styles from '@/components/AddTodo/AddTodo.module.scss';

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const addTodo = useAddTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo.mutate(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['add-todo']}>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Create new task'
        className='add-todo__input'
      />
      <button type='submit' className='add-todo__button'>
        Add
      </button>
    </form>
  );
};

export default AddTodo;
