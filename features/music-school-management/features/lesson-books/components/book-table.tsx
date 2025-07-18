"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import type { LessonBook } from "../types"

interface BookTableProps {
  books: LessonBook[]
  onEdit: (book: LessonBook) => void
  onDelete: (id: string) => void
}

export function BookTable({ books, onEdit, onDelete }: BookTableProps) {
  const [filter, setFilter] = useState("")

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.author?.toLowerCase().includes(filter.toLowerCase()) ||
      book.course.name.toLowerCase().includes(filter.toLowerCase()) ||
      book.level?.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Filter books..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Level/Part</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author || "N/A"}</TableCell>
              <TableCell>${book.price.toFixed(2)}</TableCell>
              <TableCell>{book.course.name}</TableCell>
              <TableCell>{book.level || "N/A"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(book)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(book.id)}>Delete</DropdownMenuItem>
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
