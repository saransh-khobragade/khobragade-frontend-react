import type { Transaction, ChartData } from '@/types/transaction';

const API_BASE_URL =
  import.meta.env['VITE_BACKEND_BASE_URL'] ?? 'http://localhost:8080/api';

export const transactionService = {
  async uploadFile(file: File): Promise<Transaction[]> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/transactions/upload`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message ?? 'File upload failed');
    }

    return result.data || [];
  },

  async getTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message ?? 'Failed to fetch transactions');
    }

    return result.data || [];
  },

  async getChartData(): Promise<ChartData['data']> {
    const response = await fetch(`${API_BASE_URL}/transactions/charts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = (await response.json()) as ChartData;

    if (!response.ok || !result.success) {
      throw new Error(result.message ?? 'Failed to fetch chart data');
    }

    return result.data;
  },
};


