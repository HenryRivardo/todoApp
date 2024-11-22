// src/components/TodoItem.tsx
import React from 'react';

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      <span>{todo.title}</span>
      <button onClick={() => onEdit(todo.id)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
