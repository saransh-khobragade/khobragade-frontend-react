import type { Todo, CreateTodoData, UpdateTodoData } from '@/types/todo';

const API_BASE_URL =
  import.meta.env['VITE_BACKEND_BASE_URL'] ?? 'http://localhost:8080/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !data.success) {
    throw new Error(data.message ?? 'An error occurred');
  }
  if (!data.data) {
    throw new Error('No data received');
  }
  return data.data;
};

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos`);
    return handleResponse<Todo[]>(response);
  },

  async getTodoById(id: number): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);
    return handleResponse<Todo>(response);
  },

  async createTodo(data: CreateTodoData): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Todo>(response);
  },

  async updateTodo(id: number, data: UpdateTodoData): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Todo>(response);
  },

  async toggleTodo(id: number): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
      method: 'PATCH',
    });
    return handleResponse<Todo>(response);
  },

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const data = (await response.json()) as ApiResponse<unknown>;
      throw new Error(data.message ?? 'Failed to delete todo');
    }
  },
};

