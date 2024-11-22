// src/api/mockApi.ts
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let mockTodos: Todo[] = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
];

export const mockApi = {
  getTodos: async (page: number = 1, limit: number = 5) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const todos = mockTodos.slice(start, end);
    const hasNextPage = end < mockTodos.length;

    return new Promise<{ todos: Todo[]; nextPage: number | null }>((resolve) =>
      setTimeout(() => {
        resolve({ todos, nextPage: hasNextPage ? page + 1 : null });
      }, 500)
    );
  },
  addTodo: async (title: string) => {
    const newTodo = { id: Date.now(), title, completed: false };
    mockTodos = [newTodo, ...mockTodos];
    return new Promise<Todo>((resolve) =>
      setTimeout(() => resolve(newTodo), 500)
    );
  },
  toggleComplete: async (id: number) => {
    mockTodos = mockTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  },
  deleteTodo: async (id: number) => {
    mockTodos = mockTodos.filter((todo) => todo.id !== id);
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  },
};
