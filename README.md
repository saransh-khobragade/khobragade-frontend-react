# Expense Tracker Frontend

Frontend application for the Expense Tracker built with React, TypeScript, Vite, and shadcn/ui.

## Features

- User authentication (login/register)
- File upload for Excel bank statements
- Interactive charts:
  - Credit transactions over time (line chart)
  - Debit transactions over time (line chart)
  - Expense categories breakdown (pie chart)
- Modern UI with shadcn/ui components
- Responsive design

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Create a `.env` file (optional):
```env
VITE_BACKEND_BASE_URL=http://localhost:8080/api
```

3. Run the development server:
```bash
yarn dev
```

The app will start on `http://localhost:5173`

## Project Structure

```
src/
  ├── components/
  │   ├── auth/          # Authentication components
  │   ├── expense/       # Expense tracking components
  │   └── ui/            # shadcn/ui components
  ├── contexts/          # React contexts
  │   └── AuthContext.tsx
  ├── services/          # API services
  │   ├── authService.ts
  │   └── transactionService.ts
  └── types/             # TypeScript types
      ├── auth.ts
      └── transaction.ts
```

## Usage

1. Register a new account or login
2. Upload your Excel bank statement (.xls or .xlsx)
3. View your expense analytics in the dashboard:
   - Credit transactions timeline
   - Debit transactions timeline
   - Expense categories breakdown
