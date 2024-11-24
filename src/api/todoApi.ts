import { customAxios } from './index';

// Contoh endpoint: /todos?_sort=date&_order=desc
export const getTodos = async (pageParam: number = 1) => {
  const response = await customAxios.get(`/todos`, {
    params: { _page: pageParam, _limit: 10, _sort: 'date', _order: 'desc' },
  });

  return {
    todos: response.data.todos,
    nextPage: response.data.length === 10 ? pageParam + 1 : undefined,
  };
};

export const addTodo = async (newTodo: {
  title: string;
  completed: boolean;
  date: string;
}) => {
  try {
    const response = await customAxios.post('/todos', newTodo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id: number) => {
  await customAxios.delete(`/todos/${id}`);
  return id;
};

export const toggleComplete = async ({
  id,
  completed,
  title,
  date,
}: {
  id: string;
  completed: boolean;
  title: string;
  date: string;
}) => {
  const response = await customAxios.put(`/todos/${id}`, {
    completed,
    title,
    date,
  });

  return response.data;
};
