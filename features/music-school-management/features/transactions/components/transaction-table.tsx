"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import type { Transaction } from "../types"

interface TransactionTableProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
}

export function TransactionTable({ transactions, onEdit, onDelete }: TransactionTableProps) {
  const [filter, setFilter] = useState("")

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.studentName.toLowerCase().includes(filter.toLowerCase()) ||
      transaction.type.toLowerCase().includes(filter.toLowerCase()) ||
      transaction.status.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Filter transactions..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.studentName}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(transaction)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(transaction.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
