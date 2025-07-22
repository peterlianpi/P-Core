export interface Transaction {
  id: string
  studentName: string
  type: "Tuition Fee" | "Book Sale" | "Other"
  amount: number
  date: string // ISO string format
  status: "Completed" | "Pending" | "Cancelled"
  createdAt: string
  updatedAt: string
}

export type TransactionFormValues = Omit<Transaction, "id" | "createdAt" | "updatedAt">
