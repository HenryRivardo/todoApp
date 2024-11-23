import React, { useState } from 'react';
import { useAddTodo } from '@/hooks/useTodos';
import styles from './AddTodo.module.scss';

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const addTodo = useAddTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newTodo = {
        title,
        completed: false,
        date: new Date().toISOString(),
      };

      addTodo.mutate(newTodo, {
        onSuccess: () => {
          console.log('Todo added successfully');
          setTitle('');
        },
        onError: (error) => {
          console.error('Error adding todo:', error);
        },
      });
    } else {
      console.warn('Title cannot be empty');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['add-todo']}>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Create new task'
        className={styles['add-todo__input']}
      />
      <button type='submit' className={styles['add-todo__button']}>
        Add
      </button>
    </form>
  );
};

export default AddTodo;
