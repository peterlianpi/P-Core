"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

// Types
export interface Transaction {
  id: string;
  type: "income" | "expense";
  category: "tuition" | "materials" | "salary" | "utilities" | "maintenance" | "other";
  amount: number;
  currency: string;
  description: string;
  date: string;
  paymentMethod: "cash" | "card" | "bank_transfer" | "mobile_payment" | "other";
  status: "pending" | "completed" | "cancelled" | "refunded";
  reference?: string;
  studentId?: string;
  courseId?: string;
  teacherId?: string;
  invoiceNumber?: string;
  receiptNumber?: string;
  notes?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  orgId: string;
}

export interface CreateTransactionData {
  type: "income" | "expense";
  category: "tuition" | "materials" | "salary" | "utilities" | "maintenance" | "other";
  amount: number;
  currency?: string;
  description: string;
  date: string;
  paymentMethod: "cash" | "card" | "bank_transfer" | "mobile_payment" | "other";
  studentId?: string;
  courseId?: string;
  teacherId?: string;
  reference?: string;
  notes?: string;
}

export interface UpdateTransactionData extends Partial<CreateTransactionData> {
  status?: "pending" | "completed" | "cancelled" | "refunded";
  invoiceNumber?: string;
  receiptNumber?: string;
  attachments?: string[];
}

export interface TransactionFilters {
  type?: "income" | "expense";
  category?: string;
  status?: string;
  paymentMethod?: string;
  dateFrom?: string;
  dateTo?: string;
  studentId?: string;
  courseId?: string;
  teacherId?: string;
}

export interface TransactionStats {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  pendingAmount: number;
  transactionCount: number;
  monthlyGrowth: number;
  topCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

// API Hooks

// Get all transactions with filters
export const useGetTransactions = (filters?: TransactionFilters) => {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
      }
      
      const response = await client.api.transactions.$get({
        query: Object.fromEntries(params),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return response.json();
    },
  });
};

// Get transaction by ID
export const useGetTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transaction");
      }
      return response.json();
    },
    enabled: !!id,
  });
};

// Create transaction
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionData) => {
      const response = await client.api.transactions.$post({
        json: data,
      });
      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction-stats"] });
      toast.success("Transaction created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create transaction: " + error.message);
    },
  });
};

// Update transaction
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTransactionData }) => {
      const response = await client.api.transactions[":id"].$patch({
        param: { id },
        json: data,
      });
      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions", id] });
      queryClient.invalidateQueries({ queryKey: ["transaction-stats"] });
      toast.success("Transaction updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update transaction: " + error.message);
    },
  });
};

// Delete transaction
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await client.api.transactions[":id"].$delete({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction-stats"] });
      toast.success("Transaction deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete transaction: " + error.message);
    },
  });
};

// Get transaction statistics
export const useGetTransactionStats = (dateRange?: { from: string; to: string }) => {
  return useQuery({
    queryKey: ["transaction-stats", dateRange],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (dateRange) {
        params.append("from", dateRange.from);
        params.append("to", dateRange.to);
      }
      
      const response = await client.api.transactions.stats.$get({
        query: Object.fromEntries(params),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transaction statistics");
      }
      return response.json();
    },
  });
};

// Update transaction status
export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      status 
    }: { 
      id: string; 
      status: "pending" | "completed" | "cancelled" | "refunded" 
    }) => {
      const response = await client.api.transactions[":id"].status.$patch({
        param: { id },
        json: { status },
      });
      if (!response.ok) {
        throw new Error("Failed to update transaction status");
      }
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions", id] });
      queryClient.invalidateQueries({ queryKey: ["transaction-stats"] });
      toast.success("Transaction status updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update transaction status: " + error.message);
    },
  });
};

// Bulk operations
export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await client.api.transactions.bulk.delete.$post({
        json: { ids },
      });
      if (!response.ok) {
        throw new Error("Failed to delete transactions");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction-stats"] });
      toast.success("Transactions deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete transactions: " + error.message);
    },
  });
};

// Export transactions
export const useExportTransactions = () => {
  return useMutation({
    mutationFn: async (filters?: TransactionFilters & { format: "csv" | "pdf" | "excel" }) => {
      const response = await client.api.transactions.export.$post({
        json: filters || { format: "csv" },
      });
      if (!response.ok) {
        throw new Error("Failed to export transactions");
      }
      
      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-${new Date().toISOString().split('T')[0]}.${filters?.format || 'csv'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return { success: true };
    },
    onSuccess: () => {
      toast.success("Transactions exported successfully");
    },
    onError: (error) => {
      toast.error("Failed to export transactions: " + error.message);
    },
  });
};

// Generate invoice/receipt
export const useGenerateInvoice = () => {
  return useMutation({
    mutationFn: async ({ 
      transactionId, 
      type 
    }: { 
      transactionId: string; 
      type: "invoice" | "receipt" 
    }) => {
      const response = await client.api.transactions[":id"][type].$post({
        param: { id: transactionId },
      });
      if (!response.ok) {
        throw new Error(`Failed to generate ${type}`);
      }
      
      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-${transactionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return { success: true };
    },
    onSuccess: (_, { type }) => {
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} generated successfully`);
    },
    onError: (error) => {
      toast.error("Failed to generate document: " + error.message);
    },
  });
};
