"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionTable } from "@/features/transactions/components/transaction-table"
import { TransactionForm, type TransactionFormValues } from "@/features/transactions/components/transaction-form"
import type { Transaction } from "@/features/transactions/types"

// Mock data for transactions
const initialTransactions: Transaction[] = [
  {
    id: "t1",
    studentName: "Alice Smith",
    type: "Tuition Fee",
    amount: 250.0,
    date: "2024-01-05T00:00:00Z",
    status: "Completed",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "t2",
    studentName: "Bob Johnson",
    type: "Book Sale",
    amount: 120.0,
    date: "2024-02-10T00:00:00Z",
    status: "Pending",
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "t3",
    studentName: "Charlie Brown",
    type: "Tuition Fee",
    amount: 250.0,
    date: "2024-03-01T00:00:00Z",
    status: "Completed",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined)
  const searchParams = useSearchParams()

  // Effect to open form automatically if 'add=true' is in URL
  useEffect(() => {
    if (searchParams.get("add") === "true") {
      handleAddTransaction()
    }
  }, [searchParams])

  const handleAddTransaction = () => {
    setEditingTransaction(undefined)
    setIsFormOpen(true)
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsFormOpen(true)
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.id !== id))
  }

  const handleSaveTransaction = (transactionData: TransactionFormValues) => {
    const now = new Date().toISOString()
    if (editingTransaction) {
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === editingTransaction.id
            ? { ...transaction, ...transactionData, updatedAt: now }
            : transaction,
        ),
      )
    } else {
      const newTransaction: Transaction = {
        id: `t${Date.now()}`, // Simple unique ID generation
        createdAt: now,
        updatedAt: now,
        ...transactionData,
      }
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction])
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <Card className="rounded-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold">Transactions</CardTitle>
            <CardDescription>Manage financial transactions for your music school.</CardDescription>
          </div>
          <Button onClick={handleAddTransaction} className="w-full sm:w-auto rounded-lg">
            Add New Transaction
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          <TransactionTable
            transactions={transactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </CardContent>
      </Card>

      <TransactionForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        transaction={editingTransaction}
        onSave={handleSaveTransaction}
      />
    </div>
  )
}
