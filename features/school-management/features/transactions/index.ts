// Transactions Feature - School Management
// Complete financial management system

export * from "./components/transactions-dashboard";
export * from "./api/use-transactions";

// Feature configuration
export const TransactionsFeature = {
  name: 'transactions',
  enabled: true,
  version: '1.0.0',
  routes: [
    { path: '/school-management/transactions', name: 'Transactions' },
    { path: '/school-management/transactions/new', name: 'Add Transaction' },
  ],
  permissions: ['VIEW_TRANSACTIONS', 'MANAGE_TRANSACTIONS'],
};

// Main exports
export { default as TransactionsDashboard } from "./components/transactions-dashboard";
