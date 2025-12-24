export interface Transaction {
  id: string;
  userId: string;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  amount: number;
  category?: string;
  createdAt: string;
}

export interface ChartData {
  success: boolean;
  data?: {
    credits: Array<{ date: string; amount: number }>;
    debits: Array<{ date: string; amount: number }>;
    expenses: Array<{ category: string; amount: number }>;
  };
  message?: string;
}


