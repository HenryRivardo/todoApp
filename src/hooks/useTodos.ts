import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import * as todoApi from '@/api/todoApi';

// Helper untuk memperbarui cache React Query
const updateCache = (queryClient: any, updater: (todos: any) => any) => {
  queryClient.setQueryData('todos', (oldData: any) => {
    if (!oldData) return;
    return {
      ...oldData,
      pages: oldData.pages.map((page: any) => ({
        ...page,
        todos: updater(page.todos),
      })),
    };
  });
};

export const useTodos = () => {
  return useInfiniteQuery(
    'todos',
    async ({ pageParam = 1 }) => {
      const response = await todoApi.getTodos(pageParam);

      // Urutkan todos berdasarkan tanggal secara descending
      return {
        ...response,
        todos: response.todos.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(todoApi.addTodo, {
    onSuccess: (newTodo) => {
      // Update cache lokal
      queryClient.setQueryData('todos', (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) => {
            if (index === 0) {
              return { ...page, todos: [newTodo, ...page.todos] };
            }
            return page;
          }),
        };
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(todoApi.deleteTodo, {
    onMutate: async (id: number) => {
      await queryClient.cancelQueries('todos');
      const previousData = queryClient.getQueryData('todos');

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

      return { previousData };
    },
    onError: (_error, _id, context: any) => {
      queryClient.setQueryData('todos', context.previousData); // Rollback data jika gagal
    },
    onSettled: () => {
      console.log('Todo deleted in cache, no invalidation needed');
    },
  });
};

export const useToggleComplete = () => {
  const queryClient = useQueryClient();

  return useMutation(todoApi.toggleComplete, {
    onMutate: async ({ id, completed }: { id: string; completed: boolean }) => {
      await queryClient.cancelQueries('todos');
      const previousData = queryClient.getQueryData('todos');

      console.log('Cache sebelum toggle:', previousData);

      queryClient.setQueryData('todos', (oldData: any) => {
        if (!oldData) return;

        console.log('old data:', oldData);

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            todos: page.todos.map((todo: any) =>
              todo.id === id ? { ...todo, completed } : todo
            ),
          })),
        };
      });
    },

    onError: (_error, _variables, context: any) => {
      queryClient.setQueryData('todos', context.previousData);
    },

    onSuccess: (updatedTodo) => {
      console.log('Data baru dari backend setelah toggle:', updatedTodo);

      queryClient.setQueryData('todos', (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            todos: page.todos.map((todo: any) =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            ),
          })),
        };
      });
    },

    onSettled: () => {},
  });
};
