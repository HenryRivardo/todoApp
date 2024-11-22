import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useTodos, useToggleComplete, useDeleteTodo } from '@/hooks/useTodos';
import EditTaskModal from '@/components/EditTaskModal/EditTaskModal';
import styles from './TodoList.module.scss';

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useTodos();
  const toggleComplete = useToggleComplete();
  const deleteTodo = useDeleteTodo();

  const [isEditOpen, setEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const handleOpenEdit = (task: { id: number; title: string }) => {
    setEditingTask(task);
    setEditOpen(true);
  };

  // Fungsi menyimpan perubahan
  const handleSave = (updatedTitle: string) => {
    if (editingTask) {
      // Perbarui data di cache
      queryClient.setQueryData('todos', (oldData: any) => ({
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          todos: page.todos.map((todo: any) =>
            todo.id === editingTask.id ? { ...todo, title: updatedTitle } : todo
          ),
        })),
      }));

      setEditOpen(false);
      setEditingTask(null);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p>Error loading todos</p>;

  return (
    <div className={styles['todo-list-container']}>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.todos.map((todo) => (
            <div key={todo.id} className={styles['todo-item']}>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleComplete.mutate(todo.id)}
                className={styles['todo-item__checkbox']}
              />
              <span
                className={`${styles['todo-item__text']} ${
                  todo.completed ? styles['todo-item__text--completed'] : ''
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() =>
                  handleOpenEdit({ id: todo.id, title: todo.title })
                }
                className={styles['todo-item__edit']}
              >
                Edit
              </button>
              <button
                className={styles['todo-item__delete']}
                onClick={() => deleteTodo.mutate(todo.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={styles['todo-list__load-more']}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
      <EditTaskModal
        isOpen={isEditOpen}
        taskTitle={editingTask?.title || ''}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default TodoList;
