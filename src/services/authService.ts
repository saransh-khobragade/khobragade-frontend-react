import type { AuthResponse, LoginData, RegisterData } from '@/types/auth';

const API_BASE_URL =
  import.meta.env['VITE_BACKEND_BASE_URL'] ?? 'http://localhost:8080/api';

export const authService = {
  async login(data: LoginData): Promise<AuthResponse['data']> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as AuthResponse;

    if (!response.ok || !result.success) {
      throw new Error(result.message ?? 'Login failed');
    }

    if (result.data) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }

    return result.data;
  },

  async register(data: RegisterData): Promise<AuthResponse['data']> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as AuthResponse;

    if (!response.ok || !result.success) {
      throw new Error(result.message ?? 'Registration failed');
    }

    if (result.data) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }

    return result.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): { user: any; token: string } | null {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      return {
        token,
        user: JSON.parse(userStr),
      };
    }
    return null;
  },
};


