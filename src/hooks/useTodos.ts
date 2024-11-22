import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { mockApi } from '../api/mockApi';

export const useTodos = () => {
  return useInfiniteQuery(
    'todos',
    ({ pageParam = 1 }) => mockApi.getTodos(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(mockApi.addTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos'),
  });
};

export const useToggleComplete = () => {
  const queryClient = useQueryClient();
  return useMutation(mockApi.toggleComplete, {
    onSuccess: () => queryClient.invalidateQueries('todos'),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(mockApi.deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos'),
  });
};
