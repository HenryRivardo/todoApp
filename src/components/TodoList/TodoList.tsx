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
    id: string;
    title: string;
  } | null>(null);

  // Handle open edit modal
  const handleOpenEdit = (task: { id: string; title: string }) => {
    setEditingTask(task);
    setEditOpen(true);
  };

  const handleSave = (updatedTitle: string) => {
    if (editingTask) {
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

  const handleDelete = (id: number) => {
    deleteTodo.mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData('todos', (oldData: any) => {
          if (!oldData) return;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              todos: page.todos.filter((todo: any) => todo.id !== id),
            })),
          };
        });
      },
    });
  };

  // Render loading state
  if (status === 'loading') return <p>Loading...</p>;

  // Render error state
  if (status === 'error') return <p>Error loading todos</p>;

  return (
    <div className={styles['todo-list-container']}>
      {/* Todo List */}
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {Array.isArray(page.todos) &&
            page.todos.map((todo: any) => (
              <div key={todo.id} className={styles['todo-item']}>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() =>
                    toggleComplete.mutate({
                      id: todo.id,
                      completed: !todo.completed,
                      title: todo.title,
                      date: todo.date,
                    })
                  }
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
                  onClick={() => handleDelete(todo.id)}
                  className={styles['todo-item__delete']}
                >
                  Delete
                </button>
              </div>
            ))}
        </React.Fragment>
      ))}

      {/* Load More Button */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={styles['todo-list__load-more']}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}

      {/* Edit Task Modal */}
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
