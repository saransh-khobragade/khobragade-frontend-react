import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { transactionService } from '@/services/transactionService';
import { toast } from 'sonner';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

interface ChartsProps {
  refreshKey?: number;
}

export function Charts({ refreshKey }: ChartsProps) {
  const [chartData, setChartData] = useState<{
    credits: Array<{ date: string; amount: number }>;
    debits: Array<{ date: string; amount: number }>;
    expenses: Array<{ category: string; amount: number }>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadChartData = async () => {
    try {
      setIsLoading(true);
      const data = await transactionService.getChartData();
      if (data) {
        setChartData(data);
      }
    } catch (error) {
      toast.error('Failed to load chart data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChartData();
  }, [refreshKey]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Credit Transactions</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Debit Transactions</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!chartData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Data</CardTitle>
          <CardDescription>Upload a bank statement to see charts</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Credit Chart */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Credit Transactions</CardTitle>
          <CardDescription>Money received over time</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.credits.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.credits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    if (value >= 1000) {
                      return `₹${(value / 1000).toFixed(0)}k`;
                    }
                    return `₹${value}`;
                  }}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={formatDate}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#00C49F"
                  strokeWidth={2}
                  name="Credit"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              No credit transactions
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debit Chart */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Debit Transactions</CardTitle>
          <CardDescription>Money spent over time</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.debits.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.debits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    if (value >= 1000) {
                      return `₹${(value / 1000).toFixed(0)}k`;
                    }
                    return `₹${value}`;
                  }}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={formatDate}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#FF8042"
                  strokeWidth={2}
                  name="Debit"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              No debit transactions
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expense Pie Chart */}
      <Card className="md:col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
          <CardDescription>Breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.expenses.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.expenses}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={(entry: { category: string; percent?: number }) => {
                    const percent = ((entry.percent || 0) * 100).toFixed(0);
                    // Show category name and percentage, truncate if too long
                    const category = entry.category.length > 15 
                      ? entry.category.substring(0, 12) + '...' 
                      : entry.category;
                    return `${category}\n${percent}%`;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {chartData.expenses.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number | undefined) => formatCurrency(value || 0)} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              No expense data
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


